using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AdminApi.Data;

public static class JsonbExtensions
{
    private static readonly JsonSerializerOptions Options = new();

    /// <summary>
    /// Stores a POCO/collection property as a Postgres jsonb column, serialized via System.Text.Json.
    /// Used for the small bilingual/array attributes that are never queried independently
    /// (headline lines, fact-bar cells, chips, nested skills, etc.).
    /// </summary>
    public static PropertyBuilder<T> HasJsonConversion<T>(this PropertyBuilder<T> builder) where T : class
    {
        builder.HasConversion(
            v => JsonSerializer.Serialize(v, Options),
            v => JsonSerializer.Deserialize<T>(v, Options)!);

        builder.Metadata.SetValueComparer(new ValueComparer<T>(
            (l, r) => JsonSerializer.Serialize(l, Options) == JsonSerializer.Serialize(r, Options),
            v => JsonSerializer.Serialize(v, Options).GetHashCode(),
            v => JsonSerializer.Deserialize<T>(JsonSerializer.Serialize(v, Options), Options)!));

        builder.HasColumnType("jsonb");

        return builder;
    }
}
