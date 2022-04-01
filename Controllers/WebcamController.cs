using Amazon.S3;
using Amazon.S3.Model;
using Amazon.SQS;
using Amazon.SQS.Model;
using webcam_image_viewer.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.JsonPatch;

namespace webcam_image_viewer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WebcamController : ControllerBase
{
    private readonly ILogger<WebcamController> _logger;
    private readonly IConfiguration _configuration;
    private readonly WebcamDbContext _context;

    public const int MAX_RETRIES = 5;

    public WebcamController(ILogger<WebcamController> logger, IConfiguration configuration, WebcamDbContext context)
    {
        _logger = logger;
        _configuration = configuration;
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        try
        {
            var queueName = _configuration["Aws:QueueUrl"];
            var bucketName = _configuration["Aws:BucketName"];
            var sqsClient = new AmazonSQSClient();

            var imageId = Guid.NewGuid().ToString();
            await SendMessage(sqsClient, queueName, imageId);

            var s3Client = new AmazonS3Client();

            var s3key = imageId + ".png";


            var b = await DoesPrefixExist(s3Client, bucketName, s3key);
            Console.WriteLine($"DoesPrefixExist {b}");

            var presignedUrl = GeneratePreSignedURL(bucketName, s3key, s3Client, 1);

            var garageImage = new GarageImage()
            {
                S3Key = s3key,
                ImageDate = DateTime.UtcNow,
                PresignedUrl = presignedUrl,
            };

            _context.GarageImages.Add(garageImage);
            _context.SaveChanges();
            return Ok(garageImage);
        }
        catch (System.Exception e)
        {

            _logger.LogError("Get", e);
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    //
    // Method to put a message on a queue
    // Could be expanded to include message attributes, etc., in a SendMessageRequest
    private static async Task SendMessage(IAmazonSQS sqsClient, string qUrl, string messageBody)
    {
        SendMessageResponse responseSendMsg = await sqsClient.SendMessageAsync(qUrl, messageBody);
    }

    private static string GeneratePreSignedURL(string bucketName, string? objectKey, AmazonS3Client s3Client, double duration)
    {
        string urlString = "";
        try
        {
            GetPreSignedUrlRequest request1 = new GetPreSignedUrlRequest
            {
                BucketName = bucketName,
                Key = objectKey,
                Expires = DateTime.UtcNow.AddHours(duration)
            };
            urlString = s3Client.GetPreSignedURL(request1);
        }
        catch (AmazonS3Exception e)
        {
            Console.WriteLine("Error encountered on server. Message:'{0}' when writing an object", e.Message);
        }
        catch (Exception e)
        {
            Console.WriteLine("Unknown encountered on server. Message:'{0}' when writing an object", e.Message);
        }
        return urlString;
    }

    private async Task<Boolean> DoesPrefixExist(AmazonS3Client s3Client, string bucketName, string prefix)
    {
        try
        {
            ListObjectsV2Request request = new ListObjectsV2Request
            {
                BucketName = bucketName,
                Prefix = prefix
            };

            var retries = 0;
            var retry = true;

            do
            {
                var delay = Math.Pow(2, retries) * 100;
                Console.WriteLine($"delay {delay}");
                await Task.Delay(((int)delay));

                ListObjectsV2Response response = await s3Client.ListObjectsV2Async(request);
                Console.WriteLine($"ListObjectsV2Async {response.HttpStatusCode}");
                Console.WriteLine($"Objects.count {response.S3Objects.Count()}");
                foreach (var item in response.S3Objects)
                {
                    Console.WriteLine(item.Key);
                }

                if (response.S3Objects.Count() >= 1)
                {
                    retry = false;
                }
                retries += 1;


            } while (retry && (retries < MAX_RETRIES));

            return retry;

        }
        catch (System.Exception e)
        {
            this._logger.LogError(e, "Error calling ListObjectsV2Async");
            return false;
        }
    }

    [HttpGet("History")]
    public async Task<IActionResult> GetHistory()
    {
        try
        {
            var history = await _context.GarageImages.OrderByDescending(x => x.ImageDate).Take(10).ToListAsync();

            var bucketName = _configuration["Aws:BucketName"];
            var s3Client = new AmazonS3Client();
            history.ForEach(x => x.PresignedUrl = GeneratePreSignedURL(bucketName, x.S3Key, s3Client, 1));
            return Ok(history);
        }
        catch (System.Exception e)
        {

            _logger.LogError("GetHistory", e);
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpPatch("{id}")]
    public IActionResult Patch([FromRoute] int id, [FromBody] JsonPatchDocument<GarageImage> patchDoc)
    {
        try
        {
            var i = _context.GarageImages.Find(id);
            if (i == null)
                return NotFound();
            patchDoc.ApplyTo(i);
            _context.SaveChanges();
            return NoContent();
        }
        catch (System.Exception e)
        {
            _logger.LogError("Patch", e);
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}
