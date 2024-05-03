using System.ComponentModel.DataAnnotations.Schema;

namespace webcam_image_viewer.Entities;

public class TrackedEntity
{
    public DateTime CreatedDate { get; set; }

    public Guid? CreatedBy { get; set; }

    public DateTime? ModifiedDate { get; set; }

    public Guid? ModifiedBy { get; set; }
}
