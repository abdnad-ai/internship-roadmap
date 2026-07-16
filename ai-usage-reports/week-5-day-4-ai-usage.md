# Week 5 Day 4 AI Usage Report

## Feature or Task
Persist AI Support Agent conversations in PostgreSQL and build a history page showing past conversations for the logged in user.

## AI Tool Used
Claude

## Prompt Given
I asked Claude to design a Prisma model for storing support conversations tied to a user, wire it into the AI service, and expose a history endpoint following the same JWT auth pattern already used elsewhere in the app. I also asked for a frontend history page and help debugging a Prisma client generation error, a 401 error, and a Gemini 503 error during testing.

## AI Output Summary
Claude gave the SupportConversation Prisma model and migration, updated the AI service to save a conversation after each successful response and to fetch history by user, added JWT protected endpoints matching the existing AuthController pattern, and built a history page consistent with the support page's design. It also walked through diagnosing the Prisma file lock error, the expired session 401, and the Gemini 503 by checking actual error output rather than guessing.

## What I Accepted
1. The Prisma schema and migration.
2. The service changes to persist and fetch conversation history.
3. The JWT guard and current user pattern on the new endpoints, matched to the existing auth controller.
4. The history page UI.
5. The debugging steps for each of the three issues encountered.

## What I Rejected
Nothing major. Confirmed each fix manually before moving on rather than assuming it worked.

## Manual Changes Made
1. Stopped the dev server to resolve a Prisma client file lock before regenerating.
2. Restarted the TypeScript server in the editor to clear a stale type error after the schema change.
3. Checked the browser's network tab to find the actual HTTP status of a failing request rather than relying on the generic frontend error message.
4. Verified saved records directly in Prisma Studio.
5. Manually tested the full flow end to end, submit, save, then load from history.

## Risks Found
1. Persisting conversations tied to a user requires the request to be authenticated, which changes how the frontend must call the endpoint, from a plain fetch to one that attaches a valid token.
2. A 401 from an expired session and a 503 from an overloaded upstream API can present identically to the end user, checking the actual status code is the only reliable way to tell them apart.
3. Regenerating a Prisma client while the app that uses it is still running can fail with a file lock error, worth stopping the server first as a habit.

## Final Explanation in My Own Words
Once the AI service already returns a clean structured response, persistence is just a Prisma create call added right after that response is generated, storing the query, response, category, priority, and the ID of whoever asked. The history endpoint is a straightforward findMany scoped to the current user, sorted by newest first, and protected the same way every other authenticated route in this app already is, using a JWT guard and a decorator that pulls the user off the request. The frontend side just needed to switch from an unauthenticated fetch to the app's existing helper that automatically attaches the access token, and a new page that fetches and renders that history list on load.