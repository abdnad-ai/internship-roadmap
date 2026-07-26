# Week 7 Day 4 AI Usage Report

## Feature or Task
Deploy the full application, backend, frontend, and database, to a live environment, and get every feature genuinely working end to end on the real deployed URLs.

## AI Tool Used
Claude

## Prompt Given
I asked Claude to recommend a deployment platform given uncertainty about current free tier policies, then for help through a sequence of real deployment problems, an unexpected card verification requirement, a misconfigured service running the wrong project, a CORS failure, and a persistent fetch failure that survived multiple redeploys and even a private browser window test.

## AI Output Summary
Claude checked current information rather than relying on outdated assumptions about which platforms still offer genuine free tiers, catching that Render's database now requires card verification and recommending Neon as a card-free alternative for just the database. When a runtime error didn't match the service it was reported under, it read the actual stack trace rather than trusting the dashboard's label, which correctly identified a Root Directory misconfiguration. When a fetch failure persisted even after fixing the obvious CORS and env var issues, it recognized this as a Next.js and Docker interaction problem, NEXT_PUBLIC_ variables need to be available at build time, not just runtime, and fixed it by declaring the variable as a Docker build argument.

## What I Accepted
1. The Render plus Neon platform combination.
2. The Root Directory diagnosis and fix.
3. The CORS configuration fix.
4. The Docker build argument fix for the persistent NEXT_PUBLIC_API_URL issue.
5. The full end to end test plan covering five separate live features.

## What I Rejected
Nothing major, each diagnosis was verified against real logs or real browser behavior before being accepted, including deliberately testing in a private window specifically to rule out a caching explanation before concluding the fix itself was still wrong.

## Manual Changes Made
1. Created the Neon database and copied its connection string directly, without it ever appearing in chat.
2. Ran the production migration using a temporary gitignored local env file rather than storing the real connection string in any committed file.
3. Manually configured and reconfigured both Render services multiple times, including forcing cache cleared rebuilds, to distinguish real code issues from stale build artifacts.
4. Tested the same fix in a private browser window before accepting or rejecting it as the actual cause, rather than assuming a redeploy alone proved anything.
5. Manually walked through five separate live features, not just a homepage load, before considering the deployment actually done.

## Risks Found
1. A dashboard's display label for a service is not authoritative, the actual running code is the only real source of truth, confirmed here by a service labeled correctly by name while running an entirely different project's compiled output.
2. Free tier policies across hosting platforms change frequently and inconsistently between sources, verifying directly against what a platform's own signup flow actually shows was more reliable than search results describing supposed current pricing.
3. Environment variables have different lifecycles, build time versus runtime, that matter enormously for frontend frameworks that inline configuration into a client bundle, a variable can be set correctly in every dashboard and still never reach the browser if this distinction isn't respected in the Dockerfile.
4. A repeated symptom after a fix does not always mean the fix failed, ruling out browser caching explicitly, rather than assuming the deployment was still broken, kept the debugging path efficient.

## Final Explanation in My Own Words
Today's deployment surfaced a chain of genuinely different problems that each looked similar on the surface, a request failing, but had entirely different root causes, a wrong build target, a missing CORS origin, and a build time versus runtime environment variable mismatch specific to how Next.js and Docker interact. The most valuable habit throughout was refusing to treat any of these as solved until directly verified, reading the actual runtime stack trace instead of trusting a service's label, and testing in a private browser window before accepting that a redeploy had actually changed anything. The application is now live and confirmed working across registration, tasks, the AI support agent with history, and streaming chat, not because the deploy succeeded, but because each of those was manually walked through and confirmed on the real URLs. 