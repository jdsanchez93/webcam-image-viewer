using System.Security.Claims;

namespace webcam_image_viewer.Services;
public class UserResolverService
{
    private readonly IHttpContextAccessor _context;
    public UserResolverService(IHttpContextAccessor context)
    {
        _context = context;
    }

    public Guid? GetUserSub()
    {
        var sub = _context.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (Guid.TryParse(sub, out Guid result))
        {
            return result;
        }

        return null;
    }
}