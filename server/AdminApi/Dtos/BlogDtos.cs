namespace AdminApi.Dtos;

// ---- public: both languages returned together, matching the site's instant EN/AR toggle ----

public record BlogPostSummaryDto(
    Guid Id, string Slug, Bilingual<string> Title, Bilingual<string> Excerpt,
    string? CoverImageUrl, DateTimeOffset PublishedAt);

public record BlogPostDetailDto(
    Guid Id, string Slug, Bilingual<string> Title, Bilingual<string> Excerpt, Bilingual<string> BodyHtml,
    string? CoverImageUrl, DateTimeOffset PublishedAt);

// ---- admin: additionally exposes Status + all timestamps ----

public record BlogPostAdminSummaryDto(
    Guid Id, string Slug, Bilingual<string> Title, string Status,
    DateTimeOffset? PublishedAt, DateTimeOffset CreatedAt, DateTimeOffset UpdatedAt);

public record BlogPostAdminDetailDto(
    Guid Id, string Slug, Bilingual<string> Title, Bilingual<string> Excerpt, Bilingual<string> BodyHtml,
    string? CoverImageUrl, string Status,
    DateTimeOffset? PublishedAt, DateTimeOffset CreatedAt, DateTimeOffset UpdatedAt);

// ---- write: one shape for both create (POST) and update (PUT) ----

public record BlogPostWriteDto(
    string Slug, Bilingual<string> Title, Bilingual<string> Excerpt, Bilingual<string> BodyHtml,
    string? CoverImageUrl, string Status);
