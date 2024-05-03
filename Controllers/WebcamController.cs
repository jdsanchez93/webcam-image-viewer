using Amazon.S3;
using Amazon.S3.Model;
using Amazon.SQS;
using Amazon.SQS.Model;
using webcam_image_viewer.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.JsonPatch;
using System.Text.Json;
using System.Security.Claims;

namespace webcam_image_viewer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WebcamController : ControllerBase
{
    private readonly ILogger<WebcamController> _logger;
    private readonly IConfiguration _configuration;
    private readonly WebcamDbContext _context;
    private readonly IAmazonSQS _sqsClient;
    private readonly IAmazonS3 _s3Client;

    public const int MAX_RETRIES = 5;

    public WebcamController(ILogger<WebcamController> logger, IConfiguration configuration, WebcamDbContext context, IAmazonSQS sqsClient, IAmazonS3 s3Client)
    {
        _logger = logger;
        _configuration = configuration;
        _context = context;
        _sqsClient = sqsClient;
        _s3Client = s3Client;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] QueueMessage queueMessage)
    {
        try
        {
            var user = GetWebcamUser();
            // Mark image for deletion
            var i = _context.GarageImages.Find(queueMessage.LastImageId);
            if (i == null)
            {
                _logger.LogWarning("Unable to delete imageId {x} (not found)", queueMessage.LastImageId);
            }
            else
            {
                i.IsDelete = true;
                i.ModifiedBy = user;
                i.ModifiedDate = DateTime.UtcNow;
            }

            var queueName = _configuration["Aws:QueueUrl"];
            var bucketName = _configuration["Aws:BucketName"];

            var imageId = Guid.NewGuid().ToString();
            queueMessage.ImageId = imageId;

            string jsonString = JsonSerializer.Serialize(queueMessage);
            await SendMessage(_sqsClient, queueName, jsonString);

            var s3key = imageId + ".png";


            var s3ObjectExists = await DoesPrefixExist(bucketName, s3key);

            Console.WriteLine($"DoesPrefixExist {s3ObjectExists}");

            if (!s3ObjectExists)
            {
                return NotFound(s3key);
            }

            var presignedUrl = GeneratePreSignedURL(bucketName, s3key, 1);

            var garageImage = new GarageImage()
            {
                S3Key = s3key,
                ImageDate = DateTime.UtcNow,
                PresignedUrl = presignedUrl,
                CreatedBy = user,
                CreatedDate = DateTime.UtcNow
            };

            _context.GarageImages.Add(garageImage);
            _context.SaveChanges();
            return Ok(garageImage);
        }
        catch (System.Exception e)
        {

            _logger.LogError(e, "Get");
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

    private string GeneratePreSignedURL(string bucketName, string? objectKey, double duration)
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
            urlString = _s3Client.GetPreSignedURL(request1);
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

    private async Task<Boolean> DoesPrefixExist(string bucketName, string prefix)
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

                ListObjectsV2Response response = await _s3Client.ListObjectsV2Async(request);
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

            return !retry;

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
            var history = await _context.GarageImages
                .Where(i => i.IsDelete == false)
                .OrderByDescending(x => x.ImageDate).Take(10).ToListAsync();

            var bucketName = _configuration["Aws:BucketName"];
            history.ForEach(x => x.PresignedUrl = GeneratePreSignedURL(bucketName, x.S3Key, 1));
            return Ok(history);
        }
        catch (System.Exception e)
        {

            _logger.LogError(e, "GetHistory");
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
            _logger.LogError(e, "Patch");
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpGet("QueueStatus")]
    public async Task<IActionResult> GetQueueStatus()
    {
        try
        {
            var queueName = _configuration["Aws:QueueUrl"];
            ReceiveMessageRequest request = new ReceiveMessageRequest
            {
                WaitTimeSeconds = 0,
                QueueUrl = queueName,
            };
            var x = await _sqsClient.ReceiveMessageAsync(request);

            _logger.LogInformation($"Messages in queue: {x.Messages.Count}");
            if (x.Messages.Count() == 0)
            {
                return Ok("Queue is empty");
            }
            return StatusCode(StatusCodes.Status503ServiceUnavailable, $"Messages in queue: {x.Messages.Count}");
        }
        catch (System.Exception e)
        {
            _logger.LogError(e, "GetQueueStatus");
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }
    }

    private WebcamUser? GetWebcamUser()
    {
        var sub = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!Guid.TryParse(sub, out Guid result))
        {
            return null;
        }

        var user = _context.WebcamUsers.Find(result) ?? new WebcamUser()
        {
            Sub = result
        };
        return user;
    }

}
