# Watchpost web

This is the Next.js frontend for Watchpost. It provides registration and login, monitor management, on-demand checks, check history, and notifications.

## Development

```powershell
npm ci
npm run dev
```

The application is available at `http://localhost:3000` and calls `http://localhost:4000` by default. To use a different backend, create `.env.local`:

```text
NEXT_PUBLIC_API_URL=https://your-api.example.com
```

`NEXT_PUBLIC_API_URL` is embedded at build time. For Render Docker deployments, set it in the web service environment before deploying; Render passes it to the Docker build.

## Verification

```powershell
npm run lint
npm run build
```

For end-to-end setup, Docker Compose, deployment, cron, and security guidance, see the [root Watchpost README](../README.md).
