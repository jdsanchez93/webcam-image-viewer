using System.Security.Claims;

namespace webcam_image_viewer.Services;
public class UserResolverService
{
    private readonly IHttpContextAccessor _context;
    public UserResolverService(IHttpContextAccessor context)
    {
        _context = context;
    }

    // private WebcamUser? GetWebcamUser()
    // {
    //     var sub = _context.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

    //     if (!Guid.TryParse(sub, out Guid result))
    //     {
    //         return null;
    //     }

    //     var user = _context.WebcamUsers.Find(result) ?? new WebcamUser()
    //     {
    //         Sub = result
    //     };
    //     return user;
    // }

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