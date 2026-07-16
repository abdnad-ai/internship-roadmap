# Week 5 Day 4 Daily Report

Date: 2026-07-16

## Tasks Completed
1. Added a SupportConversation model to the Prisma schema, storing the query, response, category, priority, and a relation to the user.
2. Ran the migration and regenerated the Prisma client.
3. Wired PrismaModule into the AI module so the AI service can access the database.
4. Updated the support agent service method to save each conversation to the database after generating a response.
5. Added a getSupportHistory method to fetch a user's past conversations, most recent first.
6. Protected the support endpoints with JWT auth and pulled the user ID from the current session instead of accepting it as input.
7. Added a GET /ai/support/history endpoint.
8. Updated the frontend to use the existing authenticated apiFetch helper instead of a raw fetch call.
9. Built a support history page displaying past conversations with category, priority, timestamp, the original question, and the response.
10. Linked the history page from the main support page.
11. Verified persistence directly in Prisma Studio and confirmed the history page correctly loads saved conversations.

## Links and PRs
Branch: week5-day4-ai-history
Pull request: https://github.com/abdnad-ai/internship-roadmap/pull/30 

## AI Tools Used
Claude

## Prompts Used
1. Asked Claude to confirm the Day 4 tasks against the internship roadmap.
2. Asked for a Prisma schema addition to store AI conversations tied to a user.
3. Asked for the backend changes to persist conversations and expose a history endpoint, following the existing JWT auth pattern already used elsewhere in the app.
4. Asked for a frontend history page styled consistently with the support page.
5. Asked for help diagnosing a 401 error and a Gemini 503 error during testing.

## Manual Changes Made
1. Ran the Prisma migration and regenerated the client myself, resolving a file lock error by stopping the dev server first.
2. Restarted the TypeScript server in the editor after adding the new Prisma model to clear a stale type error.
3. Traced a support agent failure to an expired login session using the browser's network tab, then logged back in to confirm the fix.
4. Verified saved conversations directly in Prisma Studio.
5. Manually tested the full flow, submitting a question, confirming it saves, and confirming it appears on the history page.

## Bugs and Blockers
1. Prisma client generation failed with a file lock error because the dev server was still running, resolved by stopping it before regenerating.
2. A support request failed with a 401 after an extended break between sessions, caused by an expired login session, resolved by logging back in.
3. Gemini returned a temporary 503 service unavailable error a few times during testing, unrelated to the code, resolved by retrying after a short wait.

## What I Learned
Persisting AI results is mostly standard CRUD work once the AI response itself is structured, the model already returns a clean shape, so saving it is just a Prisma create call. The more interesting part was reusing the app's existing auth patterns instead of inventing a new one, checking how another controller already handled JWT guards and the current user decorator saved time and kept the codebase consistent. I also learned that a 401 and a 503 can look identical from the frontend's point of view, a generic error message, so checking the actual network response status early saves a lot of guessing.

## Tomorrow Plan
Start Week 5 Day 5, the assessment, running the full AI feature end to end, cleaning up, and documenting the prompts used across the AI service.

## Deadline Status
All Day 4 tasks completed and submitted through the pull request.