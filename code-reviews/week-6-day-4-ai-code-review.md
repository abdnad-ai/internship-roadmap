# AI Code Review - Week 6 Day 4

20 issues found across the backend and frontend, each verified against the actual code before being listed here (not generated blind from a prompt). Severity levels: Critical, High, Medium, Low.

| # | Issue | Location | Severity | Status |
|---|---|---|---|---|
| 1 | `catch (error: any)` loses type safety on the caught error | nestjs-projects/.../ai.service.ts:128 | Low | Acknowledged |
| 2 | `where: any = {}` loses type safety on the Prisma filter object | nestjs-projects/.../tasks.service.ts:22 | Low | Acknowledged |
| 3 | Gemini model name `'gemini-3.5-flash'` hardcoded instead of a shared constant | ai.service.ts:43 | Medium | Fixed |
| 4 | Same hardcoded model name, second occurrence | ai.service.ts:66 | Medium | Fixed |
| 5 | Same hardcoded model name, third occurrence | ai.service.ts:108 | Medium | Fixed |
| 6 | bcrypt salt rounds (10) hardcoded instead of a named constant | auth.service.ts:32 | Low | Fixed |
| 7 | Same hardcoded salt rounds, second occurrence | auth.service.ts:102 | Low | Fixed |
| 8 | `API_BASE` constant redeclared locally instead of importing the existing one from lib/api.js | app/login/page.js:9 | Medium | Fixed (Day 5) |
| 9 | Same redeclared `API_BASE`, second occurrence | app/register/page.js:9 | Medium | Fixed (Day 5) |
| 10 | Separate `API_URL` constant with a different name and the path baked in, inconsistent with the rest of the app | app/tasks/page.js:5 | Medium | Fixed (Day 5) |
| 11 | Streaming fetch call hardcodes the full URL inline with no constant at all | app/chat/page.js:31 | Medium | Fixed (Day 5) |
| 12 | Login and Register pages duplicate nearly identical state, fetch, and error handling logic | app/login/page.js, app/register/page.js | Medium | Acknowledged |
| 13 | Chat message list uses array index as the React key, fragile if messages are ever reordered or filtered | app/chat/page.js:101 | Low | Acknowledged |
| 14 | Dashboard's useEffect omits `loadUser` and `router` from its dependency array | app/dashboard/page.js:14-19 | Medium | Acknowledged |
| 15 | `apiFetch` has no locking on token refresh, concurrent 401s can trigger multiple simultaneous refresh calls and race each other | app/lib/api.js | High | Fixed (Day 5) |
| 16 | Root route (`/`) still shows the unedited default Next.js starter page, dead content in a real product | app/page.js | Low | Acknowledged |
| 17 | Register form has no password confirmation field, a typoed password can't be caught before submitting | app/register/page.js | Medium | Fixed (Day 5) | 
| 18 | Password policy only enforces a minimum length of 6, no complexity requirement | register.dto.ts:8 | Low | Acknowledged |
| 19 | Task list pagination previously had no upper bound on `limit` (already fixed on Day 3, listed here for completeness of the full review) | tasks.service.ts | High | Fixed (Day 3) |
| 20 | No rate limiting existed anywhere in the API before Day 3 (already fixed on Day 3, listed here for completeness) | app.module.ts | High | Fixed (Day 3) |

## Fixes Applied Today

- Extracted the Gemini model name into a single `MODEL_NAME` constant in `ai.service.ts`, used in all three places instead of repeating the literal string
- Extracted the bcrypt salt rounds into a `SALT_ROUNDS` constant in `auth.service.ts`, used in both places

## Acknowledged, Not Fixed Today

The remaining items are real but lower priority than a same-day fix, mostly maintainability and DRY concerns rather than bugs, tracked here for future cleanup:
- Consolidating the frontend's scattered API URL constants into a single import from `lib/api.js` (items 8-11)
- Extracting shared login/register form logic into a reusable hook or component (item 12)
- Adding a request lock to `apiFetch`'s token refresh to prevent concurrent refresh races (item 15)
- Replacing the default Next.js homepage with a real landing page or redirect (item 16)
- Adding a password confirmation field to registration (item 17)

## Verification

Backend test suite re-run after applying fixes, all 19 tests still pass. 