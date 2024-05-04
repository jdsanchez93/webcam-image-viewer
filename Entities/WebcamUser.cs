using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webcam_image_viewer.Entities;

[Table("WebcamUser")]
public class WebcamUser
{
    [Key]
    public Guid Sub { get; set; }

}