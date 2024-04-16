using Amazon.S3;
using Amazon.SQS;
using Auth0.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using webcam_image_viewer;
using webcam_image_viewer.Support;

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

builder.Services.AddAuth0WebAppAuthentication(options =>
{
    options.Domain = builder.Configuration["Auth0:Domain"];
    options.ClientId = builder.Configuration["Auth0:ClientId"];
});
builder.Services.ConfigureSameSiteNoneCookies();

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
app.UseCookiePolicy();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();
