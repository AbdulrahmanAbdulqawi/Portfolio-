namespace AdminApi.Models;

public class Recommendation
{
    public int Id { get; set; } = 1;
    public string ShortEn { get; set; } = "";
    public string ShortAr { get; set; } = "";
    public string FullEn { get; set; } = "";
    public string FullAr { get; set; } = "";
    public string Author { get; set; } = "";
    public string MetaEn { get; set; } = "";
    public string MetaAr { get; set; } = "";
    public DateTimeOffset UpdatedAt { get; set; }
}
