using AdminApi.Data;
using AdminApi.Dtos;
using AdminApi.Models;
using Ganss.Xss;
using Microsoft.EntityFrameworkCore;

namespace AdminApi.Endpoints;

public static class BlogEndpoints
{
    private static readonly HtmlSanitizer Sanitizer = BuildSanitizer();

    public static void MapBlogEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/blog", GetPublicList);
        app.MapGet("/api/blog/{slug}", GetPublicBySlug);

        app.MapGet("/api/admin/blog", GetAdminList).RequireAuthorization();
        app.MapGet("/api/admin/blog/{id:guid}", GetAdminById).RequireAuthorization();
        app.MapPost("/api/admin/blog", CreatePost).RequireAuthorization();
        app.MapPut("/api/admin/blog/{id:guid}", UpdatePost).RequireAuthorization();
        app.MapDelete("/api/admin/blog/{id:guid}", DeletePost).RequireAuthorization();
    }

    // ---- public reads ----

    private static async Task<List<BlogPostSummaryDto>> GetPublicList(AppDbContext db)
    {
        var posts = await db.BlogPosts.Where(p => p.Status == BlogStatus.Published)
            .OrderByDescending(p => p.PublishedAt).ToListAsync();
        return posts.Select(ToSummaryDto).ToList();
    }

    private static async Task<IResult> GetPublicBySlug(string slug, AppDbContext db)
    {
        var post = await db.BlogPosts.FirstOrDefaultAsync(p => p.Slug == slug && p.Status == BlogStatus.Published);
        return post is null ? Results.NotFound() : Results.Ok(ToDetailDto(post));
    }

    // ---- admin reads ----

    private static async Task<List<BlogPostAdminSummaryDto>> GetAdminList(AppDbContext db)
    {
        var posts = await db.BlogPosts.OrderByDescending(p => p.UpdatedAt).ToListAsync();
        return posts.Select(ToAdminSummaryDto).ToList();
    }

    private static async Task<IResult> GetAdminById(Guid id, AppDbContext db)
    {
        var post = await db.BlogPosts.FindAsync(id);
        return post is null ? Results.NotFound() : Results.Ok(ToAdminDetailDto(post));
    }

    // ---- writes ----

    private static async Task<IResult> CreatePost(BlogPostWriteDto dto, AppDbContext db)
    {
        var slug = NormalizeSlug(dto.Slug);
        if (string.IsNullOrWhiteSpace(slug)) return Results.BadRequest("Slug is required.");
        if (!Enum.TryParse<BlogStatus>(dto.Status, ignoreCase: true, out var status)) return Results.BadRequest("Invalid status.");
        if (await SlugExistsAsync(db, slug)) return Results.Conflict(new { message = "Slug already in use." });

        var now = DateTimeOffset.UtcNow;
        var post = new BlogPost
        {
            Slug = slug,
            Status = status,
            TitleEn = dto.Title.En,
            TitleAr = dto.Title.Ar,
            ExcerptEn = dto.Excerpt.En,
            ExcerptAr = dto.Excerpt.Ar,
            BodyHtmlEn = Sanitizer.Sanitize(dto.BodyHtml.En),
            BodyHtmlAr = Sanitizer.Sanitize(dto.BodyHtml.Ar),
            CoverImageUrl = dto.CoverImageUrl,
            CreatedAt = now,
            UpdatedAt = now,
            PublishedAt = status == BlogStatus.Published ? now : null,
        };
        db.BlogPosts.Add(post);
        await db.SaveChangesAsync();
        return Results.Created($"/api/admin/blog/{post.Id}", ToAdminDetailDto(post));
    }

    private static async Task<IResult> UpdatePost(Guid id, BlogPostWriteDto dto, AppDbContext db)
    {
        var post = await db.BlogPosts.FindAsync(id);
        if (post is null) return Results.NotFound();

        var slug = NormalizeSlug(dto.Slug);
        if (string.IsNullOrWhiteSpace(slug)) return Results.BadRequest("Slug is required.");
        if (!Enum.TryParse<BlogStatus>(dto.Status, ignoreCase: true, out var status)) return Results.BadRequest("Invalid status.");
        if (await SlugExistsAsync(db, slug, id)) return Results.Conflict(new { message = "Slug already in use." });

        post.Slug = slug;
        post.TitleEn = dto.Title.En;
        post.TitleAr = dto.Title.Ar;
        post.ExcerptEn = dto.Excerpt.En;
        post.ExcerptAr = dto.Excerpt.Ar;
        post.BodyHtmlEn = Sanitizer.Sanitize(dto.BodyHtml.En);
        post.BodyHtmlAr = Sanitizer.Sanitize(dto.BodyHtml.Ar);
        post.CoverImageUrl = dto.CoverImageUrl;
        post.UpdatedAt = DateTimeOffset.UtcNow;
        if (status == BlogStatus.Published && post.PublishedAt is null) post.PublishedAt = DateTimeOffset.UtcNow;
        post.Status = status;

        await db.SaveChangesAsync();
        return Results.Ok(ToAdminDetailDto(post));
    }

    private static async Task<IResult> DeletePost(Guid id, AppDbContext db)
    {
        var post = await db.BlogPosts.FindAsync(id);
        if (post is null) return Results.NotFound();
        db.BlogPosts.Remove(post);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    // ---- helpers ----

    private static Task<bool> SlugExistsAsync(AppDbContext db, string slug, Guid? excludeId = null) =>
        db.BlogPosts.AnyAsync(p => p.Slug == slug && (excludeId == null || p.Id != excludeId));

    private static string NormalizeSlug(string raw) => raw.Trim().ToLowerInvariant();

    private static BlogPostSummaryDto ToSummaryDto(BlogPost p) => new(
        p.Id, p.Slug, new Bilingual<string>(p.TitleEn, p.TitleAr), new Bilingual<string>(p.ExcerptEn, p.ExcerptAr),
        p.CoverImageUrl, p.PublishedAt!.Value);

    private static BlogPostDetailDto ToDetailDto(BlogPost p) => new(
        p.Id, p.Slug, new Bilingual<string>(p.TitleEn, p.TitleAr), new Bilingual<string>(p.ExcerptEn, p.ExcerptAr),
        new Bilingual<string>(p.BodyHtmlEn, p.BodyHtmlAr), p.CoverImageUrl, p.PublishedAt!.Value);

    private static BlogPostAdminSummaryDto ToAdminSummaryDto(BlogPost p) => new(
        p.Id, p.Slug, new Bilingual<string>(p.TitleEn, p.TitleAr), p.Status.ToString().ToLowerInvariant(),
        p.PublishedAt, p.CreatedAt, p.UpdatedAt);

    private static BlogPostAdminDetailDto ToAdminDetailDto(BlogPost p) => new(
        p.Id, p.Slug, new Bilingual<string>(p.TitleEn, p.TitleAr), new Bilingual<string>(p.ExcerptEn, p.ExcerptAr),
        new Bilingual<string>(p.BodyHtmlEn, p.BodyHtmlAr), p.CoverImageUrl, p.Status.ToString().ToLowerInvariant(),
        p.PublishedAt, p.CreatedAt, p.UpdatedAt);

    private static HtmlSanitizer BuildSanitizer()
    {
        var sanitizer = new HtmlSanitizer();
        sanitizer.AllowedAttributes.Add("target");
        return sanitizer;
    }
}
