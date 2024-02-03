namespace webcam_image_viewer.Entities;

public class QueueMessage
{
    public string? ImageId { get; set; }

    public WebcamSettings? WebcamSettings { get; set; }

    public SmartLightSettings? LightSettings { get; set; }

    public int LastImageId { get; set; }
}
