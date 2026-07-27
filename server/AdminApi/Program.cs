using System.Text;
using AdminApi.Auth;
using AdminApi.Data;
using AdminApi.Endpoints;
using AdminApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();

var jwtSection = builder.Configuration.GetSection("Jwt");
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSection["Issuer"],
            ValidAudience = jwtSection["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSection["Key"]!)),
        };
    });
builder.Services.AddAuthorization();

var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [];
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(allowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddOpenApi();

var uploadsPath = Path.GetFullPath(builder.Configuration["Uploads:Path"] ?? "wwwroot/uploads");

var app = builder.Build();

if (args.Contains("seed-admin"))
{
    var idx = Array.IndexOf(args, "seed-admin");
    if (idx + 2 >= args.Length)
    {
        Console.Error.WriteLine("Usage: dotnet run -- seed-admin <email> <password>");
        return 1;
    }

    var email = args[idx + 1];
    var password = args[idx + 2];

    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await db.Database.MigrateAsync();

    var existing = await db.AdminUsers.FirstOrDefaultAsync(u => u.Email == email);
    var hash = BCrypt.Net.BCrypt.HashPassword(password);
    if (existing is null)
    {
        db.AdminUsers.Add(new AdminUser { Email = email, PasswordHash = hash });
    }
    else
    {
        existing.PasswordHash = hash;
    }

    await db.SaveChangesAsync();
    Console.WriteLine($"Admin user '{email}' seeded.");
    return 0;
}

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await db.Database.MigrateAsync();

    // Singletons always have exactly one row (Id = 1) so the read/write endpoints never
    // have to special-case "not seeded yet" — insert blank defaults the first time.
    if (!await db.SiteConfigs.AnyAsync()) db.SiteConfigs.Add(new SiteConfig());
    if (!await db.AboutContents.AnyAsync()) db.AboutContents.Add(new AboutContent());
    if (!await db.Recommendations.AnyAsync()) db.Recommendations.Add(new Recommendation());
    await db.SaveChangesAsync();
}

Directory.CreateDirectory(uploadsPath);

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors();

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(uploadsPath),
    RequestPath = "/uploads",
});

app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/api/health", () => Results.Ok(new { status = "ok" }));
app.MapAuthEndpoints();
app.MapContentEndpoints();
app.MapUploadEndpoints(uploadsPath);

app.Run();
return 0;
