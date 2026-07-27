namespace AdminApi.Models;

public class EducationEntry
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public int SortOrder { get; set; }
    public string SchoolEn { get; set; } = "";
    public string SchoolAr { get; set; } = "";
    public string DegreeEn { get; set; } = "";
    public string DegreeAr { get; set; } = "";
    public string LocationEn { get; set; } = "";
    public string LocationAr { get; set; } = "";
    public string PeriodEn { get; set; } = "";
    public string PeriodAr { get; set; } = "";
}
