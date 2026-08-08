# Watchpost

Watchpost monitors a webpage or JSON API against a natural-language condition. It records each check, creates an in-app notification when the condition is met, and can optionally send email alerts.

## Architecture

| Component | Purpose |
| --- | --- |
| `website-monitor-web` | Next.js dashboard for authentication, monitors, check history, and notifications. |
| `website-monitor-api` | NestJS API, Prisma migrations, JWT access/refresh authentication, scheduled check endpoint, and AI evaluation. |
| PostgreSQL / Neon | Stores users, monitors, check logs, refresh tokens, and notifications. |
| Vertex AI | Production Gemini inference using a Google Cloud service account. |
| `demo-target` | Small controllable API and webpage for repeatable local demos. |

The browser calls the API using `NEXT_PUBLIC_API_URL`. The API permits browser origins in the comma-separated `FRONTEND_URL` setting, writes data to PostgreSQL, and calls Vertex AI for production monitor checks.

## Local setup

Prerequisites: Node.js 20+, npm, PostgreSQL (or a Neon database), and Docker Desktop for the Compose workflow.

1. Install dependencies in both applications.

   ```powershell
   cd website-monitor-api; npm ci
   cd ..\website-monitor-web; npm ci
   ```

2. Copy `website-monitor-api/.env.example` to `website-monitor-api/.env` and populate the required values below. Never commit this file.

3. Generate and apply Prisma migrations.

   ```powershell
   cd website-monitor-api
   npx prisma generate
   npx prisma migrate deploy
   ```

4. Start the API and frontend in separate terminals.

   ```powershell
   cd website-monitor-api; npm run start:dev
   cd website-monitor-web; npm run dev
   ```

The frontend defaults to `http://localhost:4000`. Set `NEXT_PUBLIC_API_URL` in `website-monitor-web/.env.local` when using another API URL.

### Backend environment variables

| Variable | Required | Notes |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL/Neon connection string. |
| `JWT_SECRET` | Yes | Unique long random access-token secret. |
| `JWT_REFRESH_SECRET` | Yes | A different long random refresh-token secret. |
| `JWT_REFRESH_EXPIRES` | Yes | Normally `7d`. |
| `CRON_SECRET` | Yes | Third unique long random value for the protected bulk-check endpoint. |
| `FRONTEND_URL` | Yes in production | Comma-separated permitted browser origins. |
| `AI_PROVIDER` | Yes | Use `vertex` in production; `mock` is local-demo only. |
| `VERTEX_AI_PROJECT_ID` | With Vertex | Google Cloud project ID. |
| `VERTEX_AI_LOCATION` | With Vertex | `asia-southeast1`. |
| `VERTEX_AI_SERVICE_ACCOUNT_JSON` | With Vertex | Entire service-account JSON on one line, stored as a secret. |
| `GEMINI_MODEL` | With Vertex | `gemini-2.5-flash`. |
| `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM` | Optional | SMTP settings for email alerts. |

`GEMINI_API_KEY` is not required and must not be set for Vertex deployments. The Gemini Developer API path only accepts regular `AIza...` keys; do not use an old `AQ.` key.

## Neon and Prisma

Create a PostgreSQL database in Neon, copy its application connection string into `DATABASE_URL`, then run `npx prisma migrate deploy` from `website-monitor-api`. The API Docker image performs the same migration command before starting, so an initial Render deployment creates the schema automatically.

## Vertex AI setup

1. Select the Google Cloud project, enable billing and the Vertex AI API.
2. Create a dedicated service account such as `watchpost-vertex` and grant it **Vertex AI User** (`roles/aiplatform.user`).
3. Create and download a JSON key. Keep it off disk where possible after configuring the secret.
4. In the deployment platform's secret-variable UI, set `VERTEX_AI_SERVICE_ACCOUNT_JSON` to the complete JSON compressed to one line. Set `VERTEX_AI_PROJECT_ID`, `VERTEX_AI_LOCATION=asia-southeast1`, `AI_PROVIDER=vertex`, and `GEMINI_MODEL=gemini-2.5-flash`.

Never put the service-account JSON in source control, an `.env` file that can be committed, or chat.

## Docker Compose and demo target

Start the complete local stack from this directory:

```powershell
docker compose up --build
```

This starts PostgreSQL, the API at `http://localhost:4000`, the frontend at `http://localhost:3000`, and the demo target at `http://localhost:5050`. Compose deliberately defaults `AI_PROVIDER` to `mock` for deterministic local demonstrations; it is not a production configuration.

Use `http://demo-target:8080/api/status` as the monitor URL inside Docker, or `http://localhost:5050/api/status` from the host. To change the demo state:

```powershell
Invoke-RestMethod -Method Post http://localhost:5050/admin/state -Headers @{ 'x-demo-secret' = 'local-demo-secret' } -ContentType 'application/json' -Body '{"jobPostingOpen":true}'
```

Set `jobPostingOpen` to `false` to reset it. The `/jobs` endpoint is the matching webpage target.

## Deploying to Render

Deploy the API before the web app. Connect the GitHub repository and the branch containing this `capstone` directory.

### 1. API service

The configured Git remote is the parent `internship-roadmap` repository, so create a Docker Web Service named `watchpost-api` with root directory `capstone/website-monitor-api`. With that root directory, select `Dockerfile` if Render asks for its path. (If this capstone is moved to its own repository, use `website-monitor-api` and `website-monitor-api/Dockerfile` instead.) Add the required variables from the table above, including:

```text
AI_PROVIDER=vertex
VERTEX_AI_LOCATION=asia-southeast1
GEMINI_MODEL=gemini-2.5-flash
JWT_REFRESH_EXPIRES=7d
```

Generate separate random values for `JWT_SECRET`, `JWT_REFRESH_SECRET`, and `CRON_SECRET` in Render's secret fields. Do not set `GEMINI_API_KEY` for this Vertex service. Deploy and verify the logs show Prisma migrations completing followed by the Nest application starting. Do not manually set `PORT`; Render provides it.

### 2. Web service

After the API has a public URL, create Docker Web Service `watchpost-web` with root directory `capstone/website-monitor-web`. Set:

```text
NEXT_PUBLIC_API_URL=https://<watchpost-api>.onrender.com
```

Render passes this value into the Docker build, which is required because Next.js bakes public variables into its client build.

### 3. Finalize CORS

Return to `watchpost-api`, add:

```text
FRONTEND_URL=https://<watchpost-web>.onrender.com
```

Redeploy the API. For custom domains or preview frontends, add each allowed origin as a comma-separated value. Verify login and authenticated browser requests have no CORS errors.

### Optional: live demo target

Before deploying `demo-target` to Render, change its listener to `process.env.PORT || 8080`. Then deploy it as a Docker web service rooted at `capstone/demo-target` and use `https://<demo-target>.onrender.com/api/status` as a reliable stage-demo monitor target.

## External cron

In cron-job.org, configure a job every 15 minutes:

- Method: `POST`
- URL: `https://<watchpost-api>.onrender.com/monitors/check-all`
- Header: `x-cron-secret: <CRON_SECRET>`

Confirm the stored secret gets HTTP 200 and a missing or wrong secret gets HTTP 403.

## Tests

```powershell
cd website-monitor-api
npm run lint
npm test -- --runInBand
npm run build

cd ..\website-monitor-web
npm run lint
npm run build
```

## Security

Never commit `.env` files, service-account JSON, Neon database URLs, JWT secrets, refresh secrets, cron secrets, or SMTP credentials. Keep production secrets only in Render's secret environment-variable fields, rotate them if exposure is suspected, and use different values for each environment.
