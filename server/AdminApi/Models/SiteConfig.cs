namespace AdminApi.Models;

public class SiteConfig
{
    public int Id { get; set; } = 1;
    public string NameEn { get; set; } = "";
    public string NameAr { get; set; } = "";
    public string InitialsEn { get; set; } = "";
    public string InitialsAr { get; set; } = "";
    public string TitleEn { get; set; } = "";
    public string TitleAr { get; set; } = "";
    public string TaglineEn { get; set; } = "";
    public string TaglineAr { get; set; } = "";
    public string DescriptionEn { get; set; } = "";
    public string DescriptionAr { get; set; } = "";
    /// <summary>Shared across languages — the same inbox/number/file regardless of locale.</summary>
    public string Email { get; set; } = "";
    public string Phone { get; set; } = "";
    public string LocationEn { get; set; } = "";
    public string LocationAr { get; set; } = "";
    public string? ResumeUrl { get; set; }
    /// <summary>Hero portrait — shared across languages. Null means "use the bundled default photo."</summary>
    public string? HeroImageUrl { get; set; }
    public string AvailabilityLineEn { get; set; } = "";
    public string AvailabilityLineAr { get; set; } = "";
    public List<string> HeroHeadlineLinesEn { get; set; } = new();
    public List<string> HeroHeadlineLinesAr { get; set; } = new();
    public string HeroSublineEn { get; set; } = "";
    public string HeroSublineAr { get; set; } = "";
    public List<FactBarEntryData> FactBarEn { get; set; } = new();
    public List<FactBarEntryData> FactBarAr { get; set; } = new();
    public string ContactIntroEn { get; set; } = "";
    public string ContactIntroAr { get; set; } = "";
    public string ContactMetaEn { get; set; } = "";
    public string ContactMetaAr { get; set; } = "";
    public string FooterCopyrightEn { get; set; } = "";
    public string FooterCopyrightAr { get; set; } = "";
    public List<SocialLinkData> SocialLinks { get; set; } = new();
    public DateTimeOffset UpdatedAt { get; set; }
}

public class FactBarEntryData
{
    public string Label { get; set; } = "";
    public string Value { get; set; } = "";
}

public class SocialLinkData
{
    public string Platform { get; set; } = "";
    public string Url { get; set; } = "";
    public string Icon { get; set; } = "";
}
