 # Deployment Documentation - SkillForge

## Overview
SkillForge is a full-stack task manager with two services:
- Backend: NestJS + Prisma + PostgreSQL, deployed on Render
- Frontend: Next.js (App Router), deployed on Render
- Database: PostgreSQL hosted on Neon

## Live URLs
- Backend: https://skillforge-backend-zb0w.onrender.com
- Frontend: https://skillforge-frontend-9ahm.onrender.com

## Prerequisites
- GitHub repo access: abdnad-ai/internship-roadmap
- Render account (connected to GitHub repo)
- Neon account for PostgreSQL

## Database Setup (Neon)
1. Create a Neon project and database.
2. Copy the connection string (DATABASE_URL).
3. Run Prisma migrations against it:
   cd nestjs-projects/week-3-task-manager-api
   npx prisma migrate deploy

## Backend Deployment (Render)
1. Create a new Web Service on Render, connect to the GitHub repo.
2. Set root directory to nestjs-projects/week-3-task-manager-api.
3. Render auto-detects the Dockerfile and builds from it.
4. Set environment variables (Render dashboard - Environment tab):
   - DATABASE_URL
   - JWT_SECRET
   - JWT_REFRESH_SECRET
   - JWT_REFRESH_EXPIRES
   - GEMINI_API_KEY
   - NODE_ENV=production
5. Deploy. Confirm the service responds at its Render URL.

## Frontend Deployment (Render)
1. Create a new Web Service on Render, connect to the same repo.
2. Set root directory to next.js-projects/week-3-task-manager-web.
3. Render auto-detects the Dockerfile.
4. Set environment variables:
   - NEXT_PUBLIC_API_URL = backend's live URL (must be set before build - Render passes these as Docker build args automatically, and Next.js bakes NEXT_PUBLIC_* vars into the client bundle at build time, not runtime)
   - NODE_ENV=production
5. Deploy. Confirm the frontend loads and can reach the backend (check /tasks, login, etc.)

## CORS Configuration
The backend's main.ts explicitly allows the frontend's origin:

app.enableCors({
  origin: [
    'http://localhost:3000',
    'https://skillforge-frontend-9ahm.onrender.com',
  ],
});

If the frontend URL ever changes, this list must be updated and redeployed.

## CI/CD
GitHub Actions runs lint/test/build on every push (.github/workflows/). Render auto-deploys from main on every merge.

## Post-Deploy Verification Checklist
- [ ] Backend root route responds
- [ ] Register/login work on live frontend
- [ ] Task CRUD works end to end
- [ ] AI chat/support endpoints respond
- [ ] Security headers present (helmet: CSP, HSTS, X-Frame-Options, etc.)
- [ ] Unauthenticated requests to protected routes return 401
- [ ] Rate limiting triggers after repeated requests (429) 