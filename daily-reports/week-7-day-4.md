# Week 7 Day 4 Daily Report

Date: 2026-07-26

## Tasks Completed
1. Chose Render for hosting and Neon for the database, after Render's free PostgreSQL tier turned out to require card verification, avoiding that by pairing Render's free web services with Neon's genuinely free managed Postgres.
2. Deployed the backend to Render as a Docker-based web service, connected to Neon via DATABASE_URL, with all required secrets set as environment variables.
3. Ran all 5 Prisma migrations against the fresh Neon database.
4. Deployed the frontend to Render as a Docker-based web service.
5. Found and fixed a Root Directory misconfiguration where the frontend service was accidentally building and running the backend's Docker image, confirmed by reading the actual runtime logs rather than trusting the service name shown in the UI.
6. Made the frontend's API base URL configurable via NEXT_PUBLIC_API_URL instead of hardcoded, for deployment.
7. Fixed the backend's CORS configuration to allow the deployed frontend's real origin alongside localhost.
8. Diagnosed and fixed a second, less obvious issue, NEXT_PUBLIC_API_URL needed to be passed as a Docker build argument, not just a runtime environment variable, since Next.js bakes NEXT_PUBLIC_ values into the client bundle at build time rather than reading them at runtime.
9. Verified the fix in a private browser window to rule out caching before concluding it was a real deployment configuration issue.
10. Tested the live app end to end: registration, dashboard, full task CRUD, the AI support agent with history, and the streaming chat, all confirmed working on the live URLs.
11. Documented the full deployment setup, both platforms, environment variables, the build-arg gotcha, and known limitations, in the README.

## Links and PRs
Branch: week-7-day-4-deployment
Pull request: https://github.com/abdnad-ai/internship-roadmap/pull/40 

## AI Tools Used
Claude

## Prompts Used
1. Asked Claude to confirm the Day 4 tasks and recommend a deployment platform, given uncertainty about which platforms still have genuine free tiers.
2. Asked for help after Render unexpectedly asked for card details, and decided on a Render plus Neon combination to avoid that.
3. Asked for help diagnosing a runtime error that turned out to be a Root Directory misconfiguration, verified by reading the actual deployed logs rather than trusting the dashboard's service name label.
4. Asked for help after a CORS error and, separately, after a persistent failed to fetch error that turned out to be caused by how Next.js and Docker interact around build-time environment variables.

## Manual Changes Made
1. Manually created the Neon project and copied its connection string, keeping it out of chat and out of any committed file.
2. Ran the Prisma migration against Neon locally using a temporary gitignored env file, rather than storing the production connection string anywhere permanent.
3. Manually configured both Render services' settings, root directory, branch, and environment variables, and manually triggered several redeploys, including cache-cleared rebuilds, to isolate whether failures were code issues or stale build artifacts.
4. Tested every fix in a private browser window specifically to rule out client side caching as an explanation before concluding a fix hadn't actually taken effect.
5. Manually tested the complete live application end to end across five separate features rather than only checking that the homepage loaded.

## Bugs and Blockers
1. Render's PostgreSQL creation flow asked for card verification unexpectedly, avoided by using Neon for the database instead, which has a genuinely card-free free tier.
2. The frontend Render service was accidentally configured with the backend's Root Directory, causing it to build and run the wrong project entirely, confirmed by reading the actual runtime stack trace rather than trusting the service name shown in the dashboard.
3. The backend's CORS configuration only allowed localhost, blocking the deployed frontend, resolved by adding the real deployed origin.
4. NEXT_PUBLIC_API_URL was set correctly in Render's dashboard but had no effect, because Next.js requires NEXT_PUBLIC_ variables to be available during the build step to bake them into the client bundle, while Render's dashboard environment variables are only guaranteed to reach a Docker container at runtime unless explicitly declared as build arguments in the Dockerfile.

## What I Learned
A service's name and label in a dashboard UI is not proof of what's actually running inside it, the frontend service genuinely said "skillforge-frontend" while running the backend's compiled code, and only reading the real runtime logs revealed the actual cause. I also learned that Next.js's NEXT_PUBLIC_ environment variables have a build time versus runtime distinction that matters enormously for Docker based deployments, a variable can be perfectly correctly set in a platform's dashboard and still never reach the compiled client bundle if the Dockerfile doesn't explicitly forward it as a build argument. Ruling out browser caching with a private window before concluding a deployment fix hadn't worked saved real time by keeping the two very different explanations, a stale local cache versus a genuinely stale deployment, clearly separated.

## Tomorrow Plan
Start Week 7 Day 5, production readiness review, environment variable audit, edge case testing, and rollback documentation.
 
## Deadline Status
All Day 4 tasks completed and submitted through the pull request. 