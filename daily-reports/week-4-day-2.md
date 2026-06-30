# Week 4 Day 2 Daily Report

Date: 2026-06-30

## Tasks Completed
1. Added a JWT strategy with passport-jwt that reads and verifies the access token from the Authorization header.
2. Added a JWT auth guard that blocks any request without a valid token.
3. Added a protected current user endpoint, GET /auth/me, that returns the logged in user from the token.
4. Changed login and register to issue two tokens, a short lived access token and a longer lived refresh token.
5. Added a hashedRefreshToken field to the User model and ran a migration.
6. Stored the refresh token as a bcrypt hash on the user, never the raw token.
7. Added a refresh strategy and guard, and a refresh endpoint that returns a new token pair.
8. Added a logout endpoint that clears the stored refresh token so it can no longer be used.
9. Added the refresh secret and expiry settings to the env file.
10. Tested the full flow, login returns both tokens, /auth/me works only with a valid token, refresh issues new tokens, and refresh fails after logout.

## Links and PRs
Branch: week-4-day-2-guards-refresh-tokens
Pull request: https://github.com/abdnad-ai/internship-roadmap/pull/22

## AI Tools Used
Claude

## Prompts Used
1. Asked Claude to confirm the Day 2 tasks against the internship roadmap.
2. Asked it to add a JWT strategy and guard and a protected current user endpoint.
3. Asked how refresh tokens work and to build the refresh and logout flow.
4. Asked for the migration to store the hashed refresh token.
5. Asked for test commands to prove the guard, refresh, and logout all work.

## Manual Changes Made
1. Created the JWT and refresh strategies, the guards, and the current user decorator.
2. Added the hashedRefreshToken field and ran the migration, then regenerated the Prisma client.
3. Updated the auth service to issue and store both tokens, and added refresh and logout.
4. Added the refresh and logout endpoints to the controller and registered the strategies in the module.
5. Added the refresh secret and expiry to the env file and ran every test myself.

## Bugs and Blockers
1. The Prisma client did not know the new hashedRefreshToken field until I regenerated it and restarted the editor TypeScript server.
2. The refresh and logout routes were missing because the controller file was not saved, so the old build was running. Saving showed the real errors.
3. The refresh guard and the auth service still had errors because their code had not been saved. After saving both, all five auth routes mapped correctly.

## What I Learned
A login token alone is not enough, the server also needs to check that token on every later request, which is what a strategy and a guard do. The strategy reads the token from the header and verifies its signature, and the guard blocks anything without a valid one. Refresh tokens solve the problem of short lived access tokens, a separate longer lived token signed with its own secret can be traded for a new access token without a password. Storing only a hash of the refresh token means a leaked database does not expose usable tokens, and clearing that hash on logout instantly revokes access. I also learned a practical lesson, an unsaved file looks correct on screen but the old version is what runs, so I now wait for the terminal to show no errors and the full route list before testing.

## Tomorrow Plan
Start Week 4 Day 3, the Next.js auth screens, protected routes, and token handling on the frontend.

## Deadline Status
All Day 2 tasks completed and submitted through the pull request. 