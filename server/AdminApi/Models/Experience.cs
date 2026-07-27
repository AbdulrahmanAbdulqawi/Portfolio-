namespace AdminApi.Models;

public class Experience
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public int SortOrder { get; set; }
    public string PeriodEn { get; set; } = "";
    public string PeriodAr { get; set; } = "";
    public string TitleEn { get; set; } = "";
    public string TitleAr { get; set; } = "";
    public string Company { get; set; } = "";
    public string ParagraphEn { get; set; } = "";
    public string ParagraphAr { get; set; } = "";
    /// <summary>Empty list means "no chips" (e.g. the co-founder role) — mapped to an omitted field on the wire.</summary>
    public List<string> Chips { get; set; } = new();
    public string? LogoUrl { get; set; }
}
