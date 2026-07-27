namespace AdminApi.Models;

public enum BlogStatus
{
    Draft,
    Published,
}

public class BlogPost
{
    public Guid Id { get; set; } = Guid.NewGuid();
    /// <summary>Shared across languages — the public permalink segment. Unique.</summary>
    public string Slug { get; set; } = "";
    public BlogStatus Status { get; set; } = BlogStatus.Draft;
    public string TitleEn { get; set; } = "";
    public string TitleAr { get; set; } = "";
    public string ExcerptEn { get; set; } = "";
    public string ExcerptAr { get; set; } = "";
    /// <summary>Sanitized HTML produced by the admin's rich-text editor.</summary>
    public string BodyHtmlEn { get; set; } = "";
    public string BodyHtmlAr { get; set; } = "";
    public string? CoverImageUrl { get; set; }
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset UpdatedAt { get; set; } = DateTimeOffset.UtcNow;
    /// <summary>Set once on the first Draft→Published transition; later edits never change it.</summary>
    public DateTimeOffset? PublishedAt { get; set; }
}
