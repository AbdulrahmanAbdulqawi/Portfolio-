using AdminApi.Auth;
using AdminApi.Data;
using Microsoft.EntityFrameworkCore;

namespace AdminApi.Endpoints;

public record LoginRequest(string Email, string Password);
public record LoginResponse(string Token, string Email);

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/auth/login", async (LoginRequest request, AppDbContext db, IJwtTokenService jwt) =>
        {
            var user = await db.AdminUsers.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user is null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return Results.Unauthorized();
            }

            var token = jwt.CreateToken(user);
            return Results.Ok(new LoginResponse(token, user.Email));
        });
    }
}
