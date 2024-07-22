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

        public string? _currentUserExternalId;

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            AddCreatedByOrUpdatedBy(GetWebcamUser());

            return await base.SaveChangesAsync(true, cancellationToken);
        }

        public override int SaveChanges()
        {
            AddCreatedByOrUpdatedBy(GetWebcamUser());

            return base.SaveChanges();
        }

        public void AddCreatedByOrUpdatedBy(WebcamUser? user)
        {
            foreach (var changedEntity in ChangeTracker.Entries())
            {
                if (changedEntity.Entity is TrackedEntity entity)
                {
                    switch (changedEntity.State)
                    {
                        case EntityState.Added:
                            entity.CreatedBy = user;
                            entity.CreatedDate = DateTime.UtcNow;
                            entity.ModifiedBy = user;
                            entity.ModifiedDate = DateTime.UtcNow;
                            break;
                        case EntityState.Modified:
                            Entry(entity).Reference(x => x.CreatedBy).IsModified = false;
                            entity.ModifiedBy = user;
                            entity.ModifiedDate = DateTime.UtcNow;
                            break;
                    }
                }
            }
        }

        private WebcamUser? GetWebcamUser()
        {
            if (!Guid.TryParse(_currentUserExternalId, out Guid result))
            {
                return null;
            }

            var user = WebcamUsers.Find(result) ?? WebcamUsers.Add(new WebcamUser() { Sub = result }).Entity;
            return user;
        }
    }

}