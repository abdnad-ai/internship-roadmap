# Security Checklist - Week 6 Day 3

Review of the SkillForge backend and frontend across input validation, rate limiting, secrets, authentication, injection risks, and CORS.

## 1. Input Validation

| Area | Status | Notes |
|---|---|---|
| Task DTOs (create/update) | Pass | Proper class-validator decorators on all fields |
| Auth DTOs (register) | Pass | Email format, password minimum length enforced |
| Auth DTOs (login) | Fixed | Password only had @IsString, allowing empty string through, added @IsNotEmpty |
| Query pagination (page/limit) | Fixed | No upper bound on limit, allowed requesting unbounded result sets, capped limit to 1-100 and floored page at 1 |
| Global validation pipe | Pass | whitelist and forbidNonWhitelisted both enabled, stripping/rejecting unexpected fields |
| AI prompt inputs | Pass | Empty and oversized prompt/query rejected before reaching the AI service |

## 2. Rate Limiting

| Area | Status | Notes |
|---|---|---|
| Global API rate limit | Fixed | No rate limiting existed anywhere, added @nestjs/throttler with a default of 20 requests per minute per IP |
| Login and register | Fixed | Added a stricter limit of 5 attempts per minute per IP on both endpoints, tested and confirmed a 429 response on the 6th rapid attempt |

## 3. Secrets

| Area | Status | Notes |
|---|---|---|
| Hardcoded API keys or credentials | Pass | Searched both codebases for key-shaped strings and embedded database credentials, none found |
| .env gitignored | Pass | Confirmed .env and its variants are in .gitignore and not tracked |
| Secret strength | Pass | JWT_SECRET and JWT_REFRESH_SECRET are both well over the recommended minimum length |

## 4. Authentication and Authorization

| Area | Status | Notes |
|---|---|---|
| Access token expiry | Pass | 1 hour, reasonable for a short-lived access token |
| Refresh token expiry | Pass | 7 days, reasonable |
| Logout invalidation | Pass | Logout clears hashedRefreshToken server side, so a stolen refresh token is useless after logout, not just discarded client side |
| Role based access control | Pass | RolesGuard checks the authenticated user's role against required roles, applied per route rather than globally, no risk of accidental bypass on unguarded routes |

## 5. Injection Risks

| Area | Status | Notes |
|---|---|---|
| SQL/NoSQL injection | Pass | No raw queries anywhere in the backend, all database access goes through Prisma's parameterized query builder |
| XSS | Pass | No use of dangerouslySetInnerHTML anywhere in the frontend, all user generated content (task titles, AI responses, chat messages) goes through React's default escaping |

## 6. CORS

| Area | Status | Notes |
|---|---|---|
| CORS origin | Pass for dev | Explicitly restricted to http://localhost:3000, not a wildcard, correct for the current development setup. Needs updating to the real production domain before deployment |

## Summary

Three real issues found and fixed:
1. Login DTO allowed an empty string password to pass validation
2. Task list pagination had no upper bound on the requested page size
3. No rate limiting existed anywhere in the API

Everything else reviewed (secrets, auth token handling, role guards, injection risk, CORS) was already implemented correctly. 