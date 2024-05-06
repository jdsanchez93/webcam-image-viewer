using Microsoft.AspNetCore.Authentication.OpenIdConnect;

namespace webcam_image_viewer.OpenIdConnect;

public static class OpenIdConnectHelper
{
    public static Task OnSignedOutCallbackRedirect(RemoteSignOutContext context)
    {
        var configuration = context.HttpContext.RequestServices.GetRequiredService<IConfiguration>();
        context.Properties ??= new Microsoft.AspNetCore.Authentication.AuthenticationProperties()
        {
            RedirectUri = context.Options.SignedOutRedirectUri
        };
        return Task.CompletedTask;
    }

    public static Task OnRedirectToIdentityProviderForSignOut(RedirectContext context)
    {
        var configuration = context.HttpContext.RequestServices.GetRequiredService<IConfiguration>();
        context.ProtocolMessage.Scope = "openid";
        context.ProtocolMessage.ResponseType = "code";

        var cognitoDomain = configuration["Cognito:Domain"];
        var clientId = configuration["Cognito:ClientId"];
        var appSignOutUrl = configuration["Cognito:AppSignOutUrl"];

        var logoutUrl = $"{context.Request.Scheme}://{context.Request.Host}{appSignOutUrl}";

        context.ProtocolMessage.IssuerAddress = $"{cognitoDomain}/logout?client_id={clientId}" +
                                                $"&logout_uri={logoutUrl}";

        return Task.CompletedTask;
    }
}