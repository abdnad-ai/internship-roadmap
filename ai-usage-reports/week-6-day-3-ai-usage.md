# Week 6 Day 3 AI Usage Report

## Feature or Task
Security review of the SkillForge backend and frontend, covering input validation, rate limiting, secrets, authentication, injection risks, and CORS, fixing anything found and documenting the results.

## AI Tool Used
Claude

## Prompt Given
I asked Claude to systematically go through each security area one at a time, checking the actual code rather than assuming, and to fix anything genuinely wrong rather than just listing generic security advice. I also asked for a rate limiting setup and a checklist document summarizing the findings.

## AI Output Summary
Claude read through the real DTOs, service code, guards, and configuration files for each area before making any claims, rather than giving a generic checklist. It found and fixed three real issues, a validation gap on the login password, unbounded pagination limits, and a complete absence of rate limiting, then verified each fix by actually running the relevant test or request rather than assuming the fix worked.

## What I Accepted
1. The login DTO validation fix.
2. The pagination bounds fix.
3. The rate limiting setup and configuration, including the stricter limit on login and register.
4. The security checklist document.
5. The conclusion that secrets, injection risk, auth token handling, role guards, and CORS were already correctly implemented.

## What I Rejected
Nothing major, every finding was verified against real code or a real test result before being accepted as either a pass or a fix.

## Manual Changes Made
1. Manually traced how the page and limit query parameters flowed from the DTO into the actual Prisma query before concluding they were unbounded.
2. Manually ran the rate limit test, six rapid login requests, and confirmed the exact expected behavior, five 401s then a 429.
3. Ran the full backend test suite after every fix to catch any regression immediately rather than waiting until the end.

## Risks Found
1. A validation decorator that looks reasonable, like @IsString on a password field, can still allow meaningfully invalid input, an empty string, if the stronger decorator like @IsNotEmpty is missing.
2. Pagination and other list style endpoints are an easy place to miss bounds checking, since the endpoint works perfectly under normal use and only becomes a problem with adversarial or careless input.
3. Rate limiting is not something that gets added incidentally, an API can be otherwise well built and still have zero protection against brute force or abuse until someone specifically checks for it.

## Final Explanation in My Own Words
Today's work was auditing rather than building, going through each security category and checking the real code against what a secure implementation should look like, rather than assuming things were fine because the app worked correctly in normal use. The three fixes made were small individually, one missing decorator, two capped numbers, and one new module, but each closed a real gap, an empty password bypassing validation, an unbounded query that could return the entire task table in one request, and an API with no defense against rapid repeated requests on its most sensitive endpoints. Everything else reviewed, secrets, injection risk, token handling, and CORS, held up under direct inspection rather than just looking fine on the surface. 