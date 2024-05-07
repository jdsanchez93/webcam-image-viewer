using webcam_image_viewer.Services;

namespace webcam_image_viewer;
public class ExtendedWebcamDbContext
{
    public WebcamDbContext _context;
    public UserResolverService _userService;

    public ExtendedWebcamDbContext(WebcamDbContext context, UserResolverService userService)
    {
        _context = context;
        _userService = userService;
        _context._currentUserExternalId = _userService.GetUserSub();
    }
}