using Amazon.S3;
using Amazon.SQS;
using Microsoft.EntityFrameworkCore;
using webcam_image_viewer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddNewtonsoftJson();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Note: this requires configuration such as AWS:Profile
// See https://docs.aws.amazon.com/sdk-for-net/v3/developer-guide/net-dg-config-netcore.html
builder.Services.AddAWSService<IAmazonSQS>();
builder.Services.AddAWSService<IAmazonS3>();

builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
    })
    .AddCookie()
    .AddOpenIdConnect(options =>
    {
        options.ResponseType = "code";
        options.MetadataAddress = builder.Configuration["Auth:MetadataAddress"];
        options.ClientId = builder.Configuration["Auth:ClientId"];
        options.ClientSecret = builder.Configuration["Auth:ClientSecret"];
        options.SaveTokens = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true
        };
    });


builder.Services.AddDbContext<WebcamDbContext>(
    dbContextOptions => dbContextOptions
        .UseMySql(builder.Configuration.GetConnectionString("Mysql"), new MySqlServerVersion(new Version(8, 0, 28)))
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<WebcamDbContext>();
    db.Database.Migrate();
}

app.UseStaticFiles();

var cookiePolicyOptions = new CookiePolicyOptions
{
    MinimumSameSitePolicy = SameSiteMode.Lax,
};
app.UseCookiePolicy(cookiePolicyOptions);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();
