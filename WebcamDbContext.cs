using Microsoft.EntityFrameworkCore;
using webcam_image_viewer.Entities;

namespace webcam_image_viewer
{
    public class WebcamDbContext : DbContext
    {
        public DbSet<GarageImage> GarageImages => Set<GarageImage>();
        public DbSet<WebcamUser> WebcamUsers => Set<WebcamUser>();
        public Guid? _currentUserSub;

        public WebcamDbContext(DbContextOptions<WebcamDbContext> dbContextOptions) : base(dbContextOptions)
        {
        }



        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var user = await WebcamUsers.FirstAsync(x => x.Sub == _currentUserSub, cancellationToken: cancellationToken);

            AddCreatedByOrUpdatedBy(user);

            return await base.SaveChangesAsync(true, cancellationToken);
        }

        public override int SaveChanges()
        {
            var user = WebcamUsers.First(x => x.Sub == _currentUserSub);

            AddCreatedByOrUpdatedBy(user);

            return base.SaveChanges();
        }

        public void AddCreatedByOrUpdatedBy(WebcamUser? user)
        {
            user ??= GetNewWebcamUser();

            foreach (var changedEntity in ChangeTracker.Entries())
            {
                if (changedEntity.Entity is TrackedEntity entity)
                {
                    switch (changedEntity.State)
                    {
                        case EntityState.Added:
                            entity.CreatedBy = user;
                            entity.ModifiedBy = user;
                            break;
                        case EntityState.Modified:
                            Entry(entity).Reference(x => x.CreatedBy).IsModified = false;
                            entity.ModifiedBy = user;
                            break;
                    }
                }
            }
        }

        private WebcamUser? GetNewWebcamUser()
        {
            if (_currentUserSub == null)
            {
                return null;
            }
            return new WebcamUser()
            {
                Sub = (Guid)_currentUserSub
            };

        }
    }

}