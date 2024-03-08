using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;

namespace webcam_image_viewer.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SigninController : ControllerBase
{
    private readonly ILogger<SigninController> _logger;
    private readonly IConfiguration _configuration;

    public SigninController(ILogger<SigninController> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;
    }

    [HttpGet("/Logout")]
    public async Task<IActionResult> Signout()
    {
        // Redirects
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        await HttpContext.SignOutAsync(OpenIdConnectDefaults.AuthenticationScheme);
        return Ok();
    }

}
