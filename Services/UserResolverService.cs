using System.Security.Claims;

namespace webcam_image_viewer.Services;
public class UserResolverService
{
    private readonly IHttpContextAccessor _context;
    public UserResolverService(IHttpContextAccessor context)
    {
        _context = context;
    }

    public string? GetUserSub()
    {
        return _context.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
    }
}