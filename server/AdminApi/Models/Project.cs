namespace AdminApi.Models;

public enum ProjectStatus
{
    /// <summary>Source or product is reachable at <see cref="Project.Url"/>.</summary>
    Live,
    /// <summary>Closed source with nothing public to link. Renders as a label, never a link.</summary>
    Private,
    /// <summary>Finished and no longer maintained. Still worth listing.</summary>
    Archived,
}

/// <summary>
/// One entry in the full project index. Supersedes <see cref="AlsoBuiltItem"/>, which could only
/// hold a name and a url and so had no way to say "this exists but there is nothing to link to" —
/// the gap that left a dozen chips pointing at 404s.
/// </summary>
public class Project
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public int SortOrder { get; set; }

    /// <summary>Shown in the top grid before the reader expands the rest.</summary>
    public bool Featured { get; set; }

    public string NameEn { get; set; } = "";
    public string NameAr { get; set; } = "";
    public string DescriptionEn { get; set; } = "";
    public string DescriptionAr { get; set; } = "";

    /// <summary>Not translated: the same tech names in both languages, e.g. "C# · .NET 8 · Postgres".</summary>
    public string StackLine { get; set; } = "";

    /// <summary>Free text so ranges work too, e.g. "2026" or "2024-25".</summary>
    public string Year { get; set; } = "";

    /// <summary>Empty when <see cref="Status"/> is Private, or when nothing public exists.</summary>
    public string Url { get; set; } = "";

    public ProjectStatus Status { get; set; } = ProjectStatus.Live;
}
