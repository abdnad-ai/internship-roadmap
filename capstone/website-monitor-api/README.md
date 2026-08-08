# Watchpost API

NestJS API for Watchpost, an AI-powered website and API monitor. A monitor fetches a target on demand or through the cron endpoint, asks an LLM whether the user’s natural-language condition is true, then stores a check log and optional notification.

## Local setup

1. Copy `.env.example` to `.env` and provide the database, JWT, cron, and AI values.
2. Install dependencies with `npm install`.
3. Apply migrations with `npx prisma migrate deploy`.
4. Start the API with `npm run start:dev`.

The API listens on `http://localhost:4000` and accepts the frontend origin at `http://localhost:3000`.

## AI configuration

Standard Gemini Developer API keys (`AIza...`) use `GEMINI_API_KEY`. Google’s currently issued `AQ.` keys are not supported by the Gemini Developer API—even through its raw REST endpoint—so Watchpost supports Vertex AI as the reliable alternative.

To use Vertex AI:

1. In the Google Cloud project, enable the Vertex AI API.
2. Create a dedicated service account with the `Vertex AI User` role.
3. Create a JSON key for that service account. Treat it as a secret; do not commit it.
4. Set `VERTEX_AI_PROJECT_ID` and set `VERTEX_AI_SERVICE_ACCOUNT_JSON` to the complete JSON key on one line in `.env` or the Render environment settings.

When both Vertex variables are present, the API uses OAuth service-account authentication and calls the Vertex `generateContent` endpoint. Access tokens are cached in memory and refreshed before expiry. `GEMINI_MODEL` defaults to `gemini-2.5-flash`.

## Checks and scheduling

- `POST /monitors/:id/check` runs a user-owned monitor immediately.
- `POST /monitors/check-all` runs every active monitor. Send the `x-cron-secret` header with the configured `CRON_SECRET`; this endpoint is intended for an external scheduler.

## Verification

```powershell
npm.cmd test -- --runInBand
npm.cmd run build
```
