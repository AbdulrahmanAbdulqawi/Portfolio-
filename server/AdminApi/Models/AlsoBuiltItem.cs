namespace AdminApi.Models;

public class AlsoBuiltItem
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public int SortOrder { get; set; }
    public string NameEn { get; set; } = "";
    public string NameAr { get; set; } = "";
    public string Url { get; set; } = "";
}
