using Microsoft.EntityFrameworkCore;
using webcam_image_viewer.Entities;

namespace webcam_image_viewer
{
    public class WebcamDbContext : DbContext
    {
        public DbSet<GarageImage> GarageImages => Set<GarageImage>();
        public DbSet<WebcamUser> WebcamUsers => Set<WebcamUser>();

        public WebcamDbContext(DbContextOptions<WebcamDbContext> dbContextOptions) : base(dbContextOptions)
        {
        }
    }

} 