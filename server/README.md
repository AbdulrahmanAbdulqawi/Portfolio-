# AdminApi

ASP.NET Core 10 + EF Core (Npgsql) + JWT auth backing the portfolio's admin panel. See the root
`README.md`/plan for the full picture — this covers just running it locally.

## Local development (e.g. in Visual Studio)

1. Have a PostgreSQL server reachable (a local install, or `docker compose up -d db` from this
   folder to run just the database via Docker on `localhost:5433`).
2. Copy the settings template and fill in your real connection string / a dev JWT key:
   ```bash
   cp AdminApi/appsettings.Development.json.example AdminApi/appsettings.Development.json
   ```
   (This file is gitignored — it's meant to hold your local credentials, never committed.)
3. Run it — F5 in Visual Studio, or `dotnet run --project AdminApi`. On startup it applies EF Core
   migrations automatically (creating the database if it doesn't exist yet) and seeds blank
   singleton rows (site/about/recommendation) so `GET /api/content` never 404s.
4. Create the one admin user (no public sign-up exists):
   ```bash
   dotnet run --project AdminApi -- seed-admin you@example.com your-password
   ```
5. Optionally push the portfolio's real content in (from the repo root, with the frontend's
   `npm` dependencies installed):
   ```bash
   SEED_API_BASE_URL=http://localhost:5149 SEED_ADMIN_EMAIL=you@example.com SEED_ADMIN_PASSWORD=your-password npm run seed:content
   ```
   (Adjust the URL/port to whatever your run profile actually listens on.)
6. Point the frontend at it: set `VITE_API_BASE_URL` in the repo root `.env` to the API's URL,
   then `npm run dev`.

## Full stack via Docker

`docker compose up -d --build` from this folder runs both the API and Postgres, API exposed on
`localhost:5080`. Same seed-admin/seed-content steps as above, just against `:5080`.

## Deploying (Coolify)

Deploy `AdminApi/Dockerfile` as a Dockerfile-based Application, plus a managed Postgres resource,
a persistent volume mounted at the uploads path, and a domain with SSL. Env vars to set:
`ConnectionStrings__Default`, `Jwt__Key`, `Cors__AllowedOrigins__0` (the deployed frontend's
origin), `Uploads__Path`.
