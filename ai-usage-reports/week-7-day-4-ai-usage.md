 # Week 7 Day 4 AI Usage Report

## Feature or Task
Deploy the full-stack app to production: backend and frontend on Render, database on Neon, with all environment variables, CORS, and build configuration working correctly end to end.

## AI Tool Used
Claude

## Prompt Given
I asked Claude to confirm the Day 4 tasks and recommend a deployment platform, given uncertainty about which platforms still have genuine free tiers. I asked for help after Render unexpectedly asked for card details on its PostgreSQL offering, after a runtime error that turned out to be a Root Directory misconfiguration, after a CORS error, and after a persistent "failed to fetch" error that turned out to be caused by how Next.js and Docker interact around build-time environment variables.

## AI Output Summary
Claude recommended pairing Render's free web services with Neon's genuinely card-free managed Postgres after Render's own database option required card verification. When the frontend service threw an unexpected runtime error, Claude helped trace it to a Root Directory misconfiguration by reading the actual deployed logs rather than trusting the service name shown in the dashboard. After a CORS error, Claude identified the backend needed the deployed frontend's real origin added explicitly. The hardest issue was NEXT_PUBLIC_API_URL being set correctly in Render's dashboard but never reaching the client bundle, Claude explained that Next.js bakes NEXT_PUBLIC_ variables in at build time, not runtime, so the Dockerfile needed to declare it as a build ARG and forward it via ENV before the build step.

## What I Accepted
1. The Render plus Neon platform combination.
2. The Root Directory fix for the frontend service.
3. The CORS configuration fix adding the deployed frontend's real origin.
4. The Dockerfile fix declaring NEXT_PUBLIC_API_URL as a build ARG.
5. The recommendation to verify every fix in a private browser window to rule out caching.

## What I Rejected
Nothing major. All fixes were verified against real deployed behavior before being accepted as correct.

## Manual Changes Made
1. Manually created the Neon project and copied its connection string, kept out of chat and out of any committed file.
2. Ran the Prisma migration against Neon locally using a temporary gitignored env file.
3. Manually configured both Render services' settings, root directory, branch, and environment variables, and manually triggered several redeploys, including cache-cleared rebuilds.
4. Tested every fix in a private browser window to rule out client-side caching before concluding a fix hadn't taken effect.
5. Manually tested the complete live application end to end across five separate features.

## Risks Found
1. A dashboard's service name label is not proof of what's actually running inside it, the frontend service was labeled correctly but was running the backend's compiled code until the Root Directory was fixed.
2. Next.js's NEXT_PUBLIC_ environment variables have a build-time versus runtime distinction that matters enormously for Docker-based deployments, a variable can be set correctly in a platform's dashboard and still never reach the compiled client bundle if the Dockerfile doesn't explicitly forward it as a build argument.
3. Browser caching can look identical to a genuinely stale deployment, ruling it out with a private window before investigating further saved real debugging time.

## Final Explanation in My Own Words
Today's deployment surfaced two non-obvious platform-specific issues rather than ordinary code bugs: a dashboard mislabeling what was actually running, and a build-time versus runtime distinction in how Next.js and Docker interact around environment variables. Neither was something local development would ever have caught, since both only manifest in a containerized production build. Verifying against real runtime logs and using a private browser window to rule out caching were what actually resolved these, rather than assuming the dashboard configuration or the code itself was the full picture. 

