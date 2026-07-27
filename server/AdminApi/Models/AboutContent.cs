namespace AdminApi.Models;

public class AboutContent
{
    public int Id { get; set; } = 1;
    public string HeadlineEn { get; set; } = "";
    public string HeadlineAr { get; set; } = "";
    public List<string> ParagraphsEn { get; set; } = new();
    public List<string> ParagraphsAr { get; set; } = new();
    public DateTimeOffset UpdatedAt { get; set; }
}
