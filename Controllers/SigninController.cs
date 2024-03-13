using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using System.Reflection.Metadata.Ecma335;

namespace webcam_image_viewer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SigninController : ControllerBase
{
    private readonly ILogger<SigninController> _logger;

    public SigninController(ILogger<SigninController> logger)
    {
        _logger = logger;
    }

    [HttpGet("/signout")]
    public async Task Signout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        await HttpContext.SignOutAsync(OpenIdConnectDefaults.AuthenticationScheme);
    }

}
