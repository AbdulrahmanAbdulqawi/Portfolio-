using System.ComponentModel.DataAnnotations;
using System.Net.Http.Headers;

namespace AdminApi.Endpoints;

public record ContactRequest(string? Name, string? Email, string? Message, string? BotField);

/// <summary>
/// Public contact form → email via Resend (https://resend.com/docs/api-reference/emails/send-email).
/// Config: Resend:ApiKey, Contact:To (your inbox), Contact:From (an address on a domain verified in Resend).
/// </summary>
public static class ContactEndpoints
{
    public const string RateLimitPolicy = "contact";

    private static readonly EmailAddressAttribute EmailCheck = new();

    public static void MapContactEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/contact", async (
            ContactRequest request,
            IConfiguration config,
            IHttpClientFactory httpFactory,
            ILogger<ContactRequest> logger,
            CancellationToken ct) =>
        {
            // Honeypot: real visitors never see this field. Pretend success so bots don't retry.
            if (!string.IsNullOrWhiteSpace(request.BotField)) return Results.Ok();

            var name = request.Name?.Trim() ?? "";
            var email = request.Email?.Trim() ?? "";
            var message = request.Message?.Trim() ?? "";

            if (name.Length is 0 or > 100 || email.Length > 200 || !EmailCheck.IsValid(email)
                || message.Length is 0 or > 5000)
            {
                return Results.BadRequest(new { error = "Please fill in a name, a valid email and a message." });
            }

            var apiKey = config["Resend:ApiKey"];
            var to = config["Contact:To"];
            var from = config["Contact:From"];
            if (string.IsNullOrWhiteSpace(apiKey) || string.IsNullOrWhiteSpace(to) || string.IsNullOrWhiteSpace(from))
            {
                logger.LogError("Contact form is not configured: set Resend__ApiKey, Contact__To and Contact__From.");
                return Results.Problem("Contact form is not configured.", statusCode: 503);
            }

            var http = httpFactory.CreateClient();
            using var send = new HttpRequestMessage(HttpMethod.Post, "https://api.resend.com/emails")
            {
                Content = JsonContent.Create(new
                {
                    from,
                    to = new[] { to },
                    reply_to = email,
                    // Plain text only: nothing the visitor typed is ever rendered as HTML.
                    subject = $"Portfolio contact: {name}",
                    text = $"Name: {name}\nEmail: {email}\n\n{message}",
                }),
            };
            send.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

            using var res = await http.SendAsync(send, ct);
            if (!res.IsSuccessStatusCode)
            {
                var body = await res.Content.ReadAsStringAsync(ct);
                logger.LogError("Resend rejected the contact email: {Status} {Body}", (int)res.StatusCode, body);
                return Results.Problem("Could not send the message.", statusCode: 502);
            }

            return Results.Ok();
        }).RequireRateLimiting(RateLimitPolicy);
    }
}
