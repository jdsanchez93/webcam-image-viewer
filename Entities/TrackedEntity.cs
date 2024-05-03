using System.ComponentModel.DataAnnotations.Schema;

namespace webcam_image_viewer.Entities;

public class TrackedEntity
{
    public DateTime CreatedDate { get; set; }

    public WebcamUser? CreatedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public WebcamUser? ModifiedBy { get; set; }
}
