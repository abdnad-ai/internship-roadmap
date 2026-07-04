# Week 4 Day 5 Daily Report

Date: 2026-07-04

## Tasks Completed
1. Ran the full JWT auth flow end to end, register, login, refresh, logout, and protected routes.
2. Verified the admin panel is visible for the admin role and hidden for the regular user role.
3. Checked backend and frontend for leftover console logs and unused code, found none.
4. Confirmed JWT secrets are pulled from environment variables, not hardcoded anywhere.
5. Confirmed the .env file is gitignored and not tracked by git.
6. Rewrote the backend README with setup steps, environment variables, auth system overview, and test accounts.
7. Replaced the default frontend README with setup steps, environment variables, auth system overview, and test accounts.
8. Pulled real test account emails and roles from Prisma Studio to document in both READMEs.
9. Captured screenshots of the login screen, dashboard, admin panel, and blocked admin view.
10. Recorded a walkthrough video covering login, refresh, route protection, and the role demo.

## Links and PRs
Branch: week4-day5-auth-assessment
Pull request: https://github.com/abdnad-ai/internship-roadmap/pull/25 

## AI Tools Used
Claude

## Prompts Used
1. Asked Claude to confirm the Day 5 assessment tasks against the internship roadmap.
2. Asked for a cleanup checklist to catch console logs, unused code, and hardcoded secrets.
3. Asked for a structured backend README covering setup, environment variables, auth overview, and test accounts.
4. Asked for a structured frontend README covering the same, adapted for the frontend.
5. Asked for a PR description template summarizing changes and test evidence.

## Manual Changes Made
1. Ran the full auth flow manually in the browser and confirmed every step passed.
2. Ran the console log and secret checks and confirmed the codebase was already clean.
3. Pulled test account emails and roles directly from Prisma Studio and matched them with known passwords.
4. Replaced the real database connection string in the README with a generic placeholder before committing.
5. Recorded the walkthrough video and took the screenshots myself.

## Bugs and Blockers
None, this was a review and documentation day, the auth system from Days 1 to 4 held up without issues.

## What I Learned
A production style handoff needs more than working code, it needs documentation someone else could follow from a clean clone. Writing the README forced me to re-check assumptions, like whether the .env was actually gitignored and whether the JWT secrets were really pulled from config instead of hardcoded. Running the full flow end to end once, instead of testing pieces in isolation, is also a good final check before calling a feature done.

## Tomorrow Plan
Start Week 5, AI feature integration, beginning with LLM API basics, prompt templates, and environment variable setup for the AI service.

## Deadline Status
All Day 5 tasks completed and submitted through the pull request.