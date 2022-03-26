using System.ComponentModel.DataAnnotations.Schema;

namespace webcam_image_viewer.Entities;

public class GarageImage
{
    public int GarageImageId { get; set; }

    public string? S3Key { get; set; }

    public DateTime ImageDate { get; set; }

    public int? NumberOfCars { get; set; }

    [NotMapped]
    public string? PresignedUrl { get; set; }
}
