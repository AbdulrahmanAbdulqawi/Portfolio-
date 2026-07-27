namespace AdminApi.Endpoints;

public static class UploadEndpoints
{
    private static readonly HashSet<string> AllowedExtensions = new(StringComparer.OrdinalIgnoreCase)
    {
        ".png", ".jpg", ".jpeg", ".svg", ".webp", ".pdf",
    };

    public static void MapUploadEndpoints(this IEndpointRouteBuilder app, string uploadsPath)
    {
        app.MapPost("/api/uploads", async (IFormFile file) =>
        {
            if (file.Length == 0) return Results.BadRequest("Empty file.");
            if (file.Length > 10 * 1024 * 1024) return Results.BadRequest("File too large (max 10MB).");

            var extension = Path.GetExtension(file.FileName);
            if (!AllowedExtensions.Contains(extension)) return Results.BadRequest("Unsupported file type.");

            Directory.CreateDirectory(uploadsPath);
            var fileName = $"{Guid.NewGuid():N}{extension.ToLowerInvariant()}";
            var fullPath = Path.Combine(uploadsPath, fileName);

            await using (var stream = File.Create(fullPath))
            {
                await file.CopyToAsync(stream);
            }

            return Results.Ok(new { url = $"/uploads/{fileName}" });
        }).RequireAuthorization().DisableAntiforgery();
    }
}
