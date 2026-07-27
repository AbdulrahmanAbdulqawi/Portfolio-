namespace AdminApi.Models;

public class Certification
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public int SortOrder { get; set; }
    public string TextEn { get; set; } = "";
    public string TextAr { get; set; } = "";
}
