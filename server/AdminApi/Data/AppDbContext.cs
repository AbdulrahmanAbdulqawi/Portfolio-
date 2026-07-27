using AdminApi.Models;
using Microsoft.EntityFrameworkCore;

namespace AdminApi.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<SiteConfig> SiteConfigs => Set<SiteConfig>();
    public DbSet<AboutContent> AboutContents => Set<AboutContent>();
    public DbSet<Recommendation> Recommendations => Set<Recommendation>();
    public DbSet<Experience> Experiences => Set<Experience>();
    public DbSet<StackGroup> StackGroups => Set<StackGroup>();
    public DbSet<EducationEntry> EducationEntries => Set<EducationEntry>();
    public DbSet<Certification> Certifications => Set<Certification>();
    public DbSet<WorkCase> WorkCases => Set<WorkCase>();
    public DbSet<AlsoBuiltItem> AlsoBuiltItems => Set<AlsoBuiltItem>();
    public DbSet<AdminUser> AdminUsers => Set<AdminUser>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<SiteConfig>(e =>
        {
            e.Property(p => p.HeroHeadlineLinesEn).HasJsonConversion();
            e.Property(p => p.HeroHeadlineLinesAr).HasJsonConversion();
            e.Property(p => p.FactBarEn).HasJsonConversion();
            e.Property(p => p.FactBarAr).HasJsonConversion();
            e.Property(p => p.SocialLinks).HasJsonConversion();
        });

        modelBuilder.Entity<AboutContent>(e =>
        {
            e.Property(p => p.ParagraphsEn).HasJsonConversion();
            e.Property(p => p.ParagraphsAr).HasJsonConversion();
        });

        modelBuilder.Entity<Experience>(e =>
        {
            e.Property(p => p.Chips).HasJsonConversion();
            e.HasIndex(p => p.SortOrder);
        });

        modelBuilder.Entity<StackGroup>(e =>
        {
            e.Property(p => p.Skills).HasJsonConversion();
            e.HasIndex(p => p.SortOrder);
        });

        modelBuilder.Entity<EducationEntry>(e => e.HasIndex(p => p.SortOrder));
        modelBuilder.Entity<Certification>(e => e.HasIndex(p => p.SortOrder));

        modelBuilder.Entity<WorkCase>(e =>
        {
            e.Property(p => p.PanelDataJsonEn).HasColumnType("jsonb");
            e.Property(p => p.PanelDataJsonAr).HasColumnType("jsonb");
            e.HasIndex(p => p.SortOrder);
        });

        modelBuilder.Entity<AlsoBuiltItem>(e => e.HasIndex(p => p.SortOrder));

        modelBuilder.Entity<AdminUser>(e =>
        {
            e.HasIndex(p => p.Email).IsUnique();
        });
    }
}
