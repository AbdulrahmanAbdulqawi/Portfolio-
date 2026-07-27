namespace AdminApi.Models;

public class StackGroup
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public int SortOrder { get; set; }
    public string TitleEn { get; set; } = "";
    public string TitleAr { get; set; } = "";
    public List<StackSkillData> Skills { get; set; } = new();
}

/// <summary>Level is one of "Daily" | "Solid" | "Familiar" (matches the frontend's SkillLevel union).</summary>
public class StackSkillData
{
    public string NameEn { get; set; } = "";
    public string NameAr { get; set; } = "";
    public string Level { get; set; } = "Solid";
}
