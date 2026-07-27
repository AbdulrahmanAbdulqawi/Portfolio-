using System.Text.Json;
using System.Text.Json.Nodes;
using AdminApi.Data;
using AdminApi.Dtos;
using AdminApi.Models;
using Microsoft.EntityFrameworkCore;

namespace AdminApi.Endpoints;

public static class ContentEndpoints
{
    public static void MapContentEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/content", GetContent);

        app.MapPut("/api/site", PutSite).RequireAuthorization();
        app.MapPut("/api/about", PutAbout).RequireAuthorization();
        app.MapPut("/api/recommendation", PutRecommendation).RequireAuthorization();
        app.MapPut("/api/experiences", PutExperiences).RequireAuthorization();
        app.MapPut("/api/stack-groups", PutStackGroups).RequireAuthorization();
        app.MapPut("/api/education-entries", PutEducationEntries).RequireAuthorization();
        app.MapPut("/api/certifications", PutCertifications).RequireAuthorization();
        app.MapPut("/api/work-cases", PutWorkCases).RequireAuthorization();
        app.MapPut("/api/also-built", PutAlsoBuilt).RequireAuthorization();
    }

    // ---- read ----

    private static async Task<ContentResponse> GetContent(AppDbContext db)
    {
        var site = await db.SiteConfigs.FirstAsync();
        var about = await db.AboutContents.FirstAsync();
        var recommendation = await db.Recommendations.FirstAsync();
        var experiences = await db.Experiences.OrderBy(e => e.SortOrder).ToListAsync();
        var stackGroups = await db.StackGroups.OrderBy(g => g.SortOrder).ToListAsync();
        var educationEntries = await db.EducationEntries.OrderBy(e => e.SortOrder).ToListAsync();
        var certifications = await db.Certifications.OrderBy(c => c.SortOrder).ToListAsync();
        var workCases = await db.WorkCases.OrderBy(w => w.SortOrder).ToListAsync();
        var alsoBuilt = await db.AlsoBuiltItems.OrderBy(a => a.SortOrder).ToListAsync();

        return new ContentResponse(
            Site: new Bilingual<SiteConfigDto>(ToSiteDto(site, "en"), ToSiteDto(site, "ar")),
            About: new Bilingual<AboutContentDto>(
                new AboutContentDto(about.HeadlineEn, about.ParagraphsEn),
                new AboutContentDto(about.HeadlineAr, about.ParagraphsAr)),
            Recommendation: new Bilingual<RecommendationDto>(
                new RecommendationDto(recommendation.ShortEn, recommendation.FullEn, recommendation.Author, recommendation.MetaEn),
                new RecommendationDto(recommendation.ShortAr, recommendation.FullAr, recommendation.Author, recommendation.MetaAr)),
            Experiences: new Bilingual<List<ExperienceDto>>(
                experiences.Select(e => ToExperienceDto(e, "en")).ToList(),
                experiences.Select(e => ToExperienceDto(e, "ar")).ToList()),
            StackGroups: new Bilingual<List<StackGroupDto>>(
                stackGroups.Select(g => ToStackGroupDto(g, "en")).ToList(),
                stackGroups.Select(g => ToStackGroupDto(g, "ar")).ToList()),
            EducationEntries: new Bilingual<List<EducationEntryDto>>(
                educationEntries.Select(e => ToEducationDto(e, "en")).ToList(),
                educationEntries.Select(e => ToEducationDto(e, "ar")).ToList()),
            Certifications: new Bilingual<List<string>>(
                certifications.Select(c => c.TextEn).ToList(),
                certifications.Select(c => c.TextAr).ToList()),
            WorkCases: new Bilingual<List<WorkCaseDto>>(
                workCases.Select(w => ToWorkCaseDto(w, "en")).ToList(),
                workCases.Select(w => ToWorkCaseDto(w, "ar")).ToList()),
            AlsoBuilt: new Bilingual<List<AlsoBuiltItemDto>>(
                alsoBuilt.Select(a => ToAlsoBuiltDto(a, "en")).ToList(),
                alsoBuilt.Select(a => ToAlsoBuiltDto(a, "ar")).ToList()));
    }

    private static SiteConfigDto ToSiteDto(SiteConfig s, string lang) => lang == "en"
        ? new SiteConfigDto(s.NameEn, s.InitialsEn, s.TitleEn, s.TaglineEn, s.DescriptionEn, s.Email, s.Phone, s.LocationEn, s.ResumeUrl, s.HeroImageUrl,
            s.AvailabilityLineEn, s.HeroHeadlineLinesEn, s.HeroSublineEn,
            s.FactBarEn.Select(f => new FactBarEntryDto(f.Label, f.Value)).ToList(),
            s.ContactIntroEn, s.ContactMetaEn, s.FooterCopyrightEn,
            s.SocialLinks.Select(l => new SocialLinkDto(l.Platform, l.Url, l.Icon)).ToList())
        : new SiteConfigDto(s.NameAr, s.InitialsAr, s.TitleAr, s.TaglineAr, s.DescriptionAr, s.Email, s.Phone, s.LocationAr, s.ResumeUrl, s.HeroImageUrl,
            s.AvailabilityLineAr, s.HeroHeadlineLinesAr, s.HeroSublineAr,
            s.FactBarAr.Select(f => new FactBarEntryDto(f.Label, f.Value)).ToList(),
            s.ContactIntroAr, s.ContactMetaAr, s.FooterCopyrightAr,
            s.SocialLinks.Select(l => new SocialLinkDto(l.Platform, l.Url, l.Icon)).ToList());

    private static ExperienceDto ToExperienceDto(Experience e, string lang) => lang == "en"
        ? new ExperienceDto(e.PeriodEn, e.TitleEn, e.Company, e.ParagraphEn, e.Chips.Count > 0 ? e.Chips : null, e.LogoUrl)
        : new ExperienceDto(e.PeriodAr, e.TitleAr, e.Company, e.ParagraphAr, e.Chips.Count > 0 ? e.Chips : null, e.LogoUrl);

    private static StackGroupDto ToStackGroupDto(StackGroup g, string lang) => lang == "en"
        ? new StackGroupDto(g.TitleEn, g.Skills.Select(s => new SkillDto(s.NameEn, s.Level)).ToList())
        : new StackGroupDto(g.TitleAr, g.Skills.Select(s => new SkillDto(s.NameAr, s.Level)).ToList());

    private static EducationEntryDto ToEducationDto(EducationEntry e, string lang) => lang == "en"
        ? new EducationEntryDto(e.SchoolEn, e.DegreeEn, e.LocationEn, e.PeriodEn)
        : new EducationEntryDto(e.SchoolAr, e.DegreeAr, e.LocationAr, e.PeriodAr);

    private static WorkCaseDto ToWorkCaseDto(WorkCase w, string lang)
    {
        var panelNode = JsonNode.Parse(lang == "en" ? w.PanelDataJsonEn : w.PanelDataJsonAr)!.AsObject();
        panelNode["kind"] = w.PanelKind.ToString().ToLowerInvariant();
        return lang == "en"
            ? new WorkCaseDto(w.NumberEn, w.Name, w.StackLine, w.HeadlineEn, w.DescriptionEn, w.RepoUrl, panelNode)
            : new WorkCaseDto(w.NumberAr, w.Name, w.StackLine, w.HeadlineAr, w.DescriptionAr, w.RepoUrl, panelNode);
    }

    private static AlsoBuiltItemDto ToAlsoBuiltDto(AlsoBuiltItem a, string lang) => lang == "en"
        ? new AlsoBuiltItemDto(a.NameEn, a.Url)
        : new AlsoBuiltItemDto(a.NameAr, a.Url);

    // ---- write ----

    private static async Task<IResult> PutSite(SiteConfigWriteDto dto, AppDbContext db)
    {
        var site = await db.SiteConfigs.FirstAsync();
        site.NameEn = dto.NameEn;
        site.NameAr = dto.NameAr;
        site.InitialsEn = dto.InitialsEn;
        site.InitialsAr = dto.InitialsAr;
        site.TitleEn = dto.TitleEn;
        site.TitleAr = dto.TitleAr;
        site.TaglineEn = dto.TaglineEn;
        site.TaglineAr = dto.TaglineAr;
        site.DescriptionEn = dto.DescriptionEn;
        site.DescriptionAr = dto.DescriptionAr;
        site.Email = dto.Email;
        site.Phone = dto.Phone;
        site.LocationEn = dto.LocationEn;
        site.LocationAr = dto.LocationAr;
        site.ResumeUrl = dto.ResumeUrl;
        site.HeroImageUrl = dto.HeroImage;
        site.AvailabilityLineEn = dto.AvailabilityLineEn;
        site.AvailabilityLineAr = dto.AvailabilityLineAr;
        site.HeroHeadlineLinesEn = dto.HeroHeadlineLinesEn;
        site.HeroHeadlineLinesAr = dto.HeroHeadlineLinesAr;
        site.HeroSublineEn = dto.HeroSublineEn;
        site.HeroSublineAr = dto.HeroSublineAr;
        site.FactBarEn = dto.FactBarEn.Select(f => new FactBarEntryData { Label = f.Label, Value = f.Value }).ToList();
        site.FactBarAr = dto.FactBarAr.Select(f => new FactBarEntryData { Label = f.Label, Value = f.Value }).ToList();
        site.ContactIntroEn = dto.ContactIntroEn;
        site.ContactIntroAr = dto.ContactIntroAr;
        site.ContactMetaEn = dto.ContactMetaEn;
        site.ContactMetaAr = dto.ContactMetaAr;
        site.FooterCopyrightEn = dto.FooterCopyrightEn;
        site.FooterCopyrightAr = dto.FooterCopyrightAr;
        site.SocialLinks = dto.SocialLinks.Select(l => new SocialLinkData { Platform = l.Platform, Url = l.Url, Icon = l.Icon }).ToList();
        site.UpdatedAt = DateTimeOffset.UtcNow;
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    private static async Task<IResult> PutAbout(AboutContentWriteDto dto, AppDbContext db)
    {
        var about = await db.AboutContents.FirstAsync();
        about.HeadlineEn = dto.HeadlineEn;
        about.HeadlineAr = dto.HeadlineAr;
        about.ParagraphsEn = dto.ParagraphsEn;
        about.ParagraphsAr = dto.ParagraphsAr;
        about.UpdatedAt = DateTimeOffset.UtcNow;
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    private static async Task<IResult> PutRecommendation(RecommendationWriteDto dto, AppDbContext db)
    {
        var rec = await db.Recommendations.FirstAsync();
        rec.ShortEn = dto.ShortEn;
        rec.ShortAr = dto.ShortAr;
        rec.FullEn = dto.FullEn;
        rec.FullAr = dto.FullAr;
        rec.Author = dto.Author;
        rec.MetaEn = dto.MetaEn;
        rec.MetaAr = dto.MetaAr;
        rec.UpdatedAt = DateTimeOffset.UtcNow;
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    private static async Task<IResult> PutExperiences(BilingualListWriteDto<ExperienceDto> dto, AppDbContext db)
    {
        if (dto.En.Count != dto.Ar.Count) return Results.BadRequest("en/ar arrays must be the same length.");

        db.Experiences.RemoveRange(await db.Experiences.ToListAsync());
        db.Experiences.AddRange(dto.En.Select((en, i) => new Experience
        {
            SortOrder = i,
            PeriodEn = en.Period,
            PeriodAr = dto.Ar[i].Period,
            TitleEn = en.Title,
            TitleAr = dto.Ar[i].Title,
            Company = en.Company,
            ParagraphEn = en.Paragraph,
            ParagraphAr = dto.Ar[i].Paragraph,
            Chips = en.Chips ?? new List<string>(),
            LogoUrl = en.Logo,
        }));
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    private static async Task<IResult> PutStackGroups(BilingualListWriteDto<StackGroupDto> dto, AppDbContext db)
    {
        if (dto.En.Count != dto.Ar.Count) return Results.BadRequest("en/ar arrays must be the same length.");

        db.StackGroups.RemoveRange(await db.StackGroups.ToListAsync());
        db.StackGroups.AddRange(dto.En.Select((en, i) =>
        {
            var ar = dto.Ar[i];
            if (en.Skills.Count != ar.Skills.Count) throw new InvalidOperationException("en/ar skills must be the same length.");
            return new StackGroup
            {
                SortOrder = i,
                TitleEn = en.Title,
                TitleAr = ar.Title,
                Skills = en.Skills.Select((s, si) => new StackSkillData { NameEn = s.Name, NameAr = ar.Skills[si].Name, Level = s.Level }).ToList(),
            };
        }));
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    private static async Task<IResult> PutEducationEntries(BilingualListWriteDto<EducationEntryDto> dto, AppDbContext db)
    {
        if (dto.En.Count != dto.Ar.Count) return Results.BadRequest("en/ar arrays must be the same length.");

        db.EducationEntries.RemoveRange(await db.EducationEntries.ToListAsync());
        db.EducationEntries.AddRange(dto.En.Select((en, i) => new EducationEntry
        {
            SortOrder = i,
            SchoolEn = en.School,
            SchoolAr = dto.Ar[i].School,
            DegreeEn = en.Degree,
            DegreeAr = dto.Ar[i].Degree,
            LocationEn = en.Location,
            LocationAr = dto.Ar[i].Location,
            PeriodEn = en.Period,
            PeriodAr = dto.Ar[i].Period,
        }));
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    private static async Task<IResult> PutCertifications(BilingualListWriteDto<string> dto, AppDbContext db)
    {
        if (dto.En.Count != dto.Ar.Count) return Results.BadRequest("en/ar arrays must be the same length.");

        db.Certifications.RemoveRange(await db.Certifications.ToListAsync());
        db.Certifications.AddRange(dto.En.Select((en, i) => new Certification
        {
            SortOrder = i,
            TextEn = en,
            TextAr = dto.Ar[i],
        }));
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    private static async Task<IResult> PutWorkCases(BilingualListWriteDto<WorkCaseDto> dto, AppDbContext db)
    {
        if (dto.En.Count != dto.Ar.Count) return Results.BadRequest("en/ar arrays must be the same length.");

        db.WorkCases.RemoveRange(await db.WorkCases.ToListAsync());
        db.WorkCases.AddRange(dto.En.Select((en, i) =>
        {
            var ar = dto.Ar[i];
            var (kind, jsonEn) = SplitPanel(en.Panel);
            var (_, jsonAr) = SplitPanel(ar.Panel);
            return new WorkCase
            {
                SortOrder = i,
                NumberEn = en.Number,
                NumberAr = ar.Number,
                Name = en.Name,
                StackLine = en.StackLine,
                HeadlineEn = en.Headline,
                HeadlineAr = ar.Headline,
                DescriptionEn = en.Description,
                DescriptionAr = ar.Description,
                RepoUrl = en.RepoUrl,
                PanelKind = kind,
                PanelDataJsonEn = jsonEn,
                PanelDataJsonAr = jsonAr,
            };
        }));
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    private static (WorkPanelKind kind, string json) SplitPanel(object panelObj)
    {
        var element = (JsonElement)panelObj;
        var node = JsonNode.Parse(element.GetRawText())!.AsObject();
        var kindStr = node["kind"]?.GetValue<string>() ?? "stats";
        node.Remove("kind");
        Enum.TryParse<WorkPanelKind>(kindStr, ignoreCase: true, out var kind);
        return (kind, node.ToJsonString());
    }

    private static async Task<IResult> PutAlsoBuilt(BilingualListWriteDto<AlsoBuiltItemDto> dto, AppDbContext db)
    {
        if (dto.En.Count != dto.Ar.Count) return Results.BadRequest("en/ar arrays must be the same length.");

        db.AlsoBuiltItems.RemoveRange(await db.AlsoBuiltItems.ToListAsync());
        db.AlsoBuiltItems.AddRange(dto.En.Select((en, i) => new AlsoBuiltItem
        {
            SortOrder = i,
            NameEn = en.Name,
            NameAr = dto.Ar[i].Name,
            Url = en.Url,
        }));
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
}
