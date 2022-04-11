using System.ComponentModel.DataAnnotations.Schema;

namespace webcam_image_viewer.Entities;

public class QueueMessage
{
    public string? ImageId { get; set; }

    public int? Brightness { get; set; }
}
