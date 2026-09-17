using System.Text;
using System.Threading.RateLimiting;
using AdminApi.Auth;
using AdminApi.Data;
using AdminApi.Endpoints;
using AdminApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
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
builder.Services.AddHttpClient();

// Behind Coolify's reverse proxy every request arrives from the proxy; trust its
// X-Forwarded-For so the rate limiter sees real visitors. The container publishes no
// port, so only the proxy can reach it.
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    options.KnownIPNetworks.Clear();
    options.KnownProxies.Clear();
});

builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.AddPolicy(ContactEndpoints.RateLimitPolicy, context =>
        RateLimitPartition.GetFixedWindowLimiter(
            context.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            _ => new FixedWindowRateLimiterOptions { PermitLimit = 5, Window = TimeSpan.FromMinutes(10) }));
});

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

    // Hosts without shell access (e.g. Coolify) can't run `seed-admin`: create the first
    // admin from Admin:Email / Admin:Password instead. Only when no admin exists yet, so
    // changing the password later is done with seed-admin, not by editing these values.
    var adminEmail = app.Configuration["Admin:Email"];
    var adminPassword = app.Configuration["Admin:Password"];
    if (!string.IsNullOrWhiteSpace(adminEmail) && !string.IsNullOrWhiteSpace(adminPassword)
        && !await db.AdminUsers.AnyAsync())
    {
        db.AdminUsers.Add(new AdminUser { Email = adminEmail, PasswordHash = BCrypt.Net.BCrypt.HashPassword(adminPassword) });
    }

    await db.SaveChangesAsync();
}

Directory.CreateDirectory(uploadsPath);

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseForwardedHeaders();
app.UseCors();

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(uploadsPath),
    RequestPath = "/uploads",
});

app.UseAuthentication();
app.UseAuthorization();
app.UseRateLimiter();

app.MapGet("/api/health", () => Results.Ok(new { status = "ok" }));
app.MapAuthEndpoints();
app.MapContentEndpoints();
app.MapBlogEndpoints();
app.MapUploadEndpoints(uploadsPath);
app.MapContactEndpoints();

app.Run();
return 0;
