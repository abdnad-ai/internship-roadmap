 # Week 7 Day 5 Daily Report

Date: 2026-07-27

## Tasks Completed
1. Reviewed both services for production readiness, added helmet middleware to the backend for security headers (CSP, HSTS, X-Frame-Options, and others).
2. Added a global exception filter so all errors return a consistent JSON shape (statusCode, timestamp, path, message) instead of NestJS's default inconsistent formats.
3. Added request logging middleware that logs every request's method, path, status code, and duration through NestJS's built-in Logger.
4. Found and fixed a real security gap while reviewing the Tasks controller: it had no authentication guard at all, meaning anonymous requests could read, create, update, or delete any task. Applied JwtAuthGuard at the controller level to close it.
5. Verified all 5 required backend environment variables (DATABASE_URL, JWT_SECRET, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRES, GEMINI_API_KEY) are correctly set on Render, alongside NODE_ENV.
6. Verified NEXT_PUBLIC_API_URL is correctly set on the frontend Render service and forwarded as a Docker build argument, consistent with the Day 4 build-arg fix.
7. Confirmed no secrets are hardcoded anywhere in the codebase; every secret is read through NestJS's ConfigService.
8. Tested edge cases against the local server: invalid registration input correctly rejected with validation errors, unauthenticated requests to /tasks correctly rejected with 401 after the guard fix, valid token requests correctly returning 200, and rate limiting on /auth/login correctly triggering a 429 on the 6th rapid request.
9. Wrote DEPLOYMENT.md, documenting the full setup from scratch across the database, backend, and frontend.
10. Wrote ROLLBACK.md, covering Render's built-in rollback flow, a git revert procedure for source-level rollbacks, and database rollback considerations for Prisma migrations.
11. Confirmed logs and monitoring are accessible for both services through Render's dashboard Logs tab.
12. Updated the README with a summary of today's production hardening work and links to the new deployment and rollback docs.

## Links and PRs
Branch: week-7-day-5-production-readiness
Pull request: [add after opening] 

## AI Tools Used
Claude

## Prompts Used
1. Asked Claude to walk through a production readiness review of both services, one item at a time, verifying each change with real terminal output before moving on.
2. Asked for help diagnosing why the exception filter and helmet headers weren't appearing in test responses, which turned out to be a stale server process left running from restarting start:dev in the wrong directory.
3. Asked Claude to review the Tasks controller for guard usage, which surfaced the missing JwtAuthGuard.
4. Asked for help drafting DEPLOYMENT.md and ROLLBACK.md based on the project's actual stack and existing deployment setup.

## Manual Changes Made
1. Manually restarted the backend server and killed stale processes on port 3001 after diagnosing the wrong-directory restart issue.
2. Manually ran curl-based tests for every change, invalid input, missing/valid tokens, and rate limiting, confirming real HTTP responses rather than relying on code review alone.
3. Manually checked Render's dashboard Environment tab for both services to confirm variable names matched what the code expects.
4. Manually checked Render's dashboard Logs tab for both services to confirm log accessibility.

## Bugs and Blockers
1. Initial testing of the exception filter and helmet headers showed no changes taking effect, traced back to a leftover start:dev process still running from an earlier terminal session in the wrong directory, holding port 3001 with stale code.
2. Discovered the Tasks controller had no authentication guard applied at all, a real production vulnerability, not caused by today's changes but only surfaced during this review.

## What I Learned
Restarting a dev server from the wrong working directory can silently leave an old process running on the same port, making it look like code changes aren't taking effect when actually the new code was never loaded at all, checking with netstat and killing the correct PID resolved it. I also learned that having authentication configured somewhere in an app (JWT strategies, guards elsewhere) doesn't guarantee every controller actually uses it, each controller needs its own explicit guard, and a production readiness review is exactly the right time to catch that kind of gap.

## Tomorrow Plan
Open a pull request for today's changes, merge to main, and verify all of today's fixes (helmet, exception filter, logging, Tasks guard) are correctly live on Render.

## Deadline Status
All Day 5 tasks completed, pending PR creation and merge.