# Week 6 Quality Summary

Before and after snapshot of testing, security, and code quality across the four days of Week 6.

## Before Week 6

- 0 automated backend tests
- 0 automated frontend tests
- No rate limiting anywhere in the API
- A validation gap on the login password field
- Unbounded task list pagination
- No documented security posture
- No code review process, issues existed but were undocumented and unverified

## After Week 6

- 19 automated backend tests across services and controllers, all passing
- 6 automated frontend tests plus 2 documented manual test cases for WebGL-dependent behavior
- Global rate limiting at 20 requests/minute per IP, with a stricter 5/minute limit on login and register
- Login password validation fixed, pagination bounded to 1-100 per page
- Full security checklist covering validation, rate limiting, secrets, auth, injection risk, and CORS
- 20 code review issues found, verified, and classified by severity
- 8 of those 20 issues fixed (2 on Day 4, 3 more on Day 5), remaining items are deliberate architectural decisions documented for future work, not unaddressed bugs

## Issues Fixed This Week

| Day | Fix |
|---|---|
| 3 | Login password validation gap |
| 3 | Unbounded task pagination |
| 3 | Missing rate limiting, added globally with stricter auth limits |
| 4 | Duplicated Gemini model name extracted to a constant |
| 4 | Duplicated bcrypt salt rounds extracted to a constant |
| 5 | Token refresh race condition in apiFetch fixed with a request lock |
| 5 | Scattered API URL constants consolidated across 4 frontend files |
| 5 | Missing password confirmation field added to registration |

## Remaining Known Items

- Login and register pages still duplicate similar form logic, a reusable hook would reduce this but wasn't worth a same-week refactor
- The default Next.js homepage at `/` is still unused boilerplate, a product decision on what should live there rather than a code defect

## Test Coverage Snapshot

- Backend: 19/19 passing
- Frontend: 6/6 passing, plus 2 manual test cases documented 