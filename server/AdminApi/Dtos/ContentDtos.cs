namespace AdminApi.Dtos;

// ---- shared ----
public record Bilingual<T>(T En, T Ar);
public record FactBarEntryDto(string Label, string Value);
public record SocialLinkDto(string Platform, string Url, string Icon);
public record SkillDto(string Name, string Level);

// ---- read shapes: exactly what GET /api/content returns, matching the frontend's src/types/index.ts ----

public record SiteConfigDto(
    string Name, string Initials, string Title, string Tagline, string Description,
    string Email, string Phone, string Location, string? ResumeUrl, string? HeroImage,
    string AvailabilityLine, List<string> HeroHeadlineLines, string HeroSubline,
    List<FactBarEntryDto> FactBar, string ContactIntro, string ContactMeta, string FooterCopyright,
    List<SocialLinkDto> SocialLinks);

public record AboutContentDto(string Headline, List<string> Paragraphs);

public record RecommendationDto(string Short, string Full, string Author, string Meta);

public record ExperienceDto(string Period, string Title, string Company, string Paragraph, List<string>? Chips, string? Logo);

public record StackGroupDto(string Title, List<SkillDto> Skills);

public record EducationEntryDto(string School, string Degree, string Location, string Period);

public record WorkCaseDto(string Number, string Name, string StackLine, string Headline, string Description, string RepoUrl, object Panel);

public record AlsoBuiltItemDto(string Name, string Url);

public record ContentResponse(
    Bilingual<SiteConfigDto> Site,
    Bilingual<AboutContentDto> About,
    Bilingual<RecommendationDto> Recommendation,
    Bilingual<List<ExperienceDto>> Experiences,
    Bilingual<List<StackGroupDto>> StackGroups,
    Bilingual<List<EducationEntryDto>> EducationEntries,
    Bilingual<List<string>> Certifications,
    Bilingual<List<WorkCaseDto>> WorkCases,
    Bilingual<List<AlsoBuiltItemDto>> AlsoBuilt);

// ---- write shapes: what the admin PUT endpoints accept. Singletons take one flattened en+ar
// request (mirrors the single-row entity); lists take the two parallel en/ar arrays as-is,
// paired by position — every list endpoint fully replaces its table on save (single admin,
// no other table references these rows, so there's no diff/upsert bookkeeping worth doing). ----

public record SiteConfigWriteDto(
    string NameEn, string NameAr, string InitialsEn, string InitialsAr,
    string TitleEn, string TitleAr, string TaglineEn, string TaglineAr,
    string DescriptionEn, string DescriptionAr,
    string Email, string Phone, string LocationEn, string LocationAr, string? ResumeUrl, string? HeroImage,
    string AvailabilityLineEn, string AvailabilityLineAr,
    List<string> HeroHeadlineLinesEn, List<string> HeroHeadlineLinesAr,
    string HeroSublineEn, string HeroSublineAr,
    List<FactBarEntryDto> FactBarEn, List<FactBarEntryDto> FactBarAr,
    string ContactIntroEn, string ContactIntroAr,
    string ContactMetaEn, string ContactMetaAr,
    string FooterCopyrightEn, string FooterCopyrightAr,
    List<SocialLinkDto> SocialLinks);

public record AboutContentWriteDto(string HeadlineEn, string HeadlineAr, List<string> ParagraphsEn, List<string> ParagraphsAr);

public record RecommendationWriteDto(string ShortEn, string ShortAr, string FullEn, string FullAr, string Author, string MetaEn, string MetaAr);

public record BilingualListWriteDto<T>(List<T> En, List<T> Ar);
