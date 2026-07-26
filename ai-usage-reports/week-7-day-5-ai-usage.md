 # Week 7 Day 5 AI Usage Report

## Feature or Task
Production readiness review across both services: security headers, error handling, logging, environment variable audit, live edge case testing, deployment documentation, and rollback documentation.

## AI Tool Used
Claude 

## Prompt Given
I asked Claude to walk through the day's task list one item at a time, starting with security hardening on the backend. I asked for help after testing showed neither helmet's headers nor the new exception filter's response shape were appearing despite the code being in place, after discovering the Tasks controller returned data with no auth token at all, and for help drafting DEPLOYMENT.md and ROLLBACK.md based on the project's actual deployment setup.

## AI Output Summary
Claude generated the helmet setup, a global exception filter for consistent error responses, and a request logging middleware, then walked through verifying each with real build and curl output rather than assuming the code was correct. When the exception filter's response shape wasn't showing up in tests, Claude traced it to a stale server process still running from an earlier terminal session started in the wrong directory, found via netstat, resolved by killing the correct PID. Reviewing the Tasks controller for guard usage surfaced that it had no JwtAuthGuard applied at all despite JWT auth already existing elsewhere in the app, a real production vulnerability that was fixed on the spot. Claude also generated DEPLOYMENT.md and ROLLBACK.md tailored to the actual Render and Neon setup used in Week 7 Day 4.

## What I Accepted
1. The helmet, exception filter, and logging middleware implementations.
2. The diagnosis and fix for the stale server process on port 3001.
3. The JwtAuthGuard fix applied to the Tasks controller.
4. The full content of DEPLOYMENT.md and ROLLBACK.md.
5. The README additions summarizing today's hardening work.

## What I Rejected
Nothing major. Live re-testing on Render was deferred until after today's branch is merged, rather than merging mid-review just to test live, keeping the usual end-of-day PR workflow intact.

## Manual Changes Made
1. Ran netstat to find and killed the stale process holding port 3001 after restarting the server from the wrong directory.
2. Ran every verification step manually: npm run build, curl tests for invalid input, missing/valid tokens, and rate limiting, rather than trusting the code alone.
3. Checked Render's dashboard Environment tab for both services to confirm the exact variable names in use.
4. Checked Render's dashboard Logs tab for both services to confirm log accessibility.
5. Confirmed the frontend still worked correctly against the newly-guarded /tasks route before closing that item out.

## Risks Found
1. Restarting a NestJS dev server from the wrong working directory can silently leave an old process running on the same port, making code changes appear not to take effect when the new code was never actually loaded.
2. The Tasks controller had zero authentication enforced despite JWT auth existing elsewhere in the app, meaning any anonymous request could read, create, update, or delete any task, undiscovered until this review specifically checked for it.
3. Testing security fixes against a live/deployed instance without first confirming the code is actually deployed there can give a false sense of verification, todays's live test against the old production build showed the previous, unfixed response shape.

## Final Explanation in My Own Words
The most valuable part of today wasn't the security headers or logging themselves, it was that the review process caught a real gap that had existed unnoticed since the Tasks controller was first written: it had no authentication guard at all. That's the kind of issue a checklist-style production review is specifically meant to surface, since it's easy to assume auth is enforced everywhere once it exists somewhere in the app. Verifying every change against real terminal output, rather than trusting that code written correctly means it's running correctly, also caught a separate but easy-to-miss issue, a stale server process from an earlier session masking whether the new code was even live during testing.