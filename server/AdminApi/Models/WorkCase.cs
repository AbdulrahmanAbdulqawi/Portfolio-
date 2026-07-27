namespace AdminApi.Models;

public enum WorkPanelKind
{
    Stats,
    Image,
    Terminal,
}

public class WorkCase
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public int SortOrder { get; set; }
    /// <summary>Differs per language (Arabic-Indic numerals, e.g. "01" vs "٠١").</summary>
    public string NumberEn { get; set; } = "";
    public string NumberAr { get; set; } = "";
    public string Name { get; set; } = "";
    public string StackLine { get; set; } = "";
    public string HeadlineEn { get; set; } = "";
    public string HeadlineAr { get; set; } = "";
    public string DescriptionEn { get; set; } = "";
    public string DescriptionAr { get; set; } = "";
    public string RepoUrl { get; set; } = "";
    public WorkPanelKind PanelKind { get; set; }

    /// <summary>
    /// Raw JSON, shape depends on <see cref="PanelKind"/> (same kind both languages, text differs):
    /// Stats -> {"stats":[{"value":"17","label":"MODULES"}, ...]}
    /// Image -> {"src":"...","alt":"..."}
    /// Terminal -> {"lines":[{"text":"...","accent":true}, ...]}
    /// A true discriminated union isn't worth normalizing into separate tables/columns.
    /// </summary>
    public string PanelDataJsonEn { get; set; } = "{}";
    public string PanelDataJsonAr { get; set; } = "{}";
}
