# Week 6 Day 3 Daily Report

Date: 2026-07-17

## Tasks Completed
1. Reviewed input validation coverage across all backend DTOs, task, auth, query, and AI endpoints.
2. Found and fixed a gap in the login DTO where the password field only had @IsString, allowing an empty string to pass validation, added @IsNotEmpty.
3. Found and fixed unbounded pagination in the tasks list endpoint, limit had no upper cap, allowing an arbitrarily large result set to be requested, capped it between 1 and 100 and floored page at 1.
4. Confirmed no hardcoded secrets exist in either the backend or frontend codebase, and that .env is properly gitignored.
5. Installed and configured @nestjs/throttler, adding a global default rate limit of 20 requests per minute per IP.
6. Added a stricter rate limit of 5 attempts per minute on the login and register endpoints, tested and confirmed a 429 response after 5 rapid attempts.
7. Reviewed authentication and authorization, confirmed reasonable token expiry times, confirmed logout properly invalidates the refresh token server side, and confirmed role checks are applied per route with no bypass risk.
8. Confirmed no raw SQL queries exist anywhere, all database access goes through Prisma's parameterized query builder.
9. Confirmed no dangerouslySetInnerHTML usage in the frontend, all user content is protected by React's default escaping.
10. Confirmed CORS is explicitly restricted to the frontend's origin rather than a wildcard.
11. Wrote a security checklist document summarizing every area reviewed, what passed, and what was fixed.
12. Ran the full backend test suite and confirmed all 19 tests still pass after the security fixes.

## Links and PRs
Branch: week-6-day-3-security
Pull request: 

## AI Tools Used
Claude

## Prompts Used
1. Asked Claude to confirm the Day 3 tasks against the internship roadmap.
2. Asked for a systematic review of input validation, rate limiting, secrets, auth, injection risks, and CORS, checking real code rather than assuming.
3. Asked for a rate limiting setup using @nestjs/throttler, with a stricter limit specifically on login and register.
4. Asked for a security checklist document summarizing the findings.

## Manual Changes Made
1. Manually reviewed each DTO file directly rather than assuming validation was complete based on the endpoint working correctly in normal use.
2. Manually traced how page and limit query parameters were actually used in the Tasks service before concluding they needed bounds.
3. Manually tested the new rate limit by sending 6 rapid login requests and confirming the 6th returned 429.
4. Ran the full test suite after all security changes to confirm nothing regressed.

## Bugs and Blockers
None today, this was a review and hardening day rather than new feature work, the three issues found were fixed within the same session they were discovered.

## What I Learned
A feature working correctly under normal use doesn't mean its validation is complete, the login password field worked fine for real logins but would have silently accepted an empty string if someone sent one directly to the API. Pagination is a common overlooked spot, an endpoint can look completely safe and still allow a caller to request an unbounded amount of data if the limit parameter isn't capped. Rate limiting is also easy to forget entirely until you specifically look for it, the API had none at all until today despite having sensitive endpoints like login that are natural targets for brute force attempts.

## Tomorrow Plan
Start Week 6 Day 4, the AI code review workflow, generating a review, verifying it, and classifying issues by severity.

## Deadline Status
All Day 3 tasks completed and submitted through the pull request. 