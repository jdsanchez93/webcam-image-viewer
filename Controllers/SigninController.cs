using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using webcam_image_viewer.Entities;

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

    [Authorize]
    [HttpGet("/signout")]
    public async Task Signout()
    {
        await HttpContext.SignOutAsync(OpenIdConnectDefaults.AuthenticationScheme);
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
    }

    [HttpGet("/login")]
    public async Task Signin(string? returnUrl = "/")
    {
        var props = new AuthenticationProperties
        {
            RedirectUri = returnUrl
        };
        await HttpContext.ChallengeAsync(OpenIdConnectDefaults.AuthenticationScheme, props);
    }

    [HttpGet("GetUser")]
    public IActionResult GetUser()
    {
        var isAuthenticated = HttpContext.User.Identity?.IsAuthenticated;
        if (isAuthenticated == true)
        {
            return Ok(HttpContext.User.FindFirstValue("cognito:username"));
        }
        return Ok("not signed in");
    }

    [Authorize]
    [HttpGet("Test")]
    public IActionResult Test()
    {
        var x = new GarageImage()
        {
            GarageImageId = 1,
            PresignedUrl = User?.Identity?.Name,
            S3Key = User?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value,

        };
        return Ok(x);
    }

}
