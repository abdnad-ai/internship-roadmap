# Week 4 Day 3 Daily Report

Date: 2026-07-01

## Tasks Completed
1. Built a register page that calls the register endpoint and saves the returned tokens.
2. Built a login page that calls the login endpoint and saves the tokens.
3. Stored the access and refresh tokens in the browser so the user stays logged in.
4. Attached the access token to API requests through a shared fetch helper.
5. Built a protected dashboard that loads the current user from the me endpoint.
6. Protected routes so anyone without a valid token is redirected to login.
7. Added a logout button that calls the logout endpoint and clears the tokens.
8. Added auto refresh so an expired access token is renewed silently and the request is retried.
9. Added loading and error states on the auth screens and the dashboard.
10. Tested the full flow in the browser: register, login, reach the dashboard, refresh, logout, and blocked access when logged out.

## Links and PRs
Branch: week-4-day-3-auth-screens-protected-dashboard
Pull request: https://github.com/abdnad-ai/internship-roadmap/pull/23 

## AI Tools Used
Claude

## Prompts Used
1. Asked Claude to confirm the Day 3 tasks against the internship roadmap.
2. Asked it to build the token helper, then the login and register screens.
3. Asked for a premium dark split screen design with animated counters.
4. Asked for a protected dashboard with route protection and logout.
5. Asked how to prove the auto refresh actually fires.

## Manual Changes Made
1. Created the token helper, the shared side panel, the login, register, and dashboard pages.
2. Renamed the product to SkillForge in the side panel.
3. Temporarily set the access token to expire in 30 seconds to prove auto refresh, then set it back to 1 hour.
4. Ran both servers and tested the full flow, and captured the network tab showing the refresh sequence.

## Bugs and Blockers
1. The page threw an element type is invalid error after adding the side panel. It was a stale Next.js cache, deleting the .next folder and restarting fixed it.
2. I thought accounts were not being stored, but they are saved in the database. What does not persist is the session after logout, which is intended.
3. Auto refresh only fires when a request runs, so I had to reload the dashboard after the token expired to trigger it.

## What I Learned
The frontend does not do the auth work, it just talks to the backend and manages tokens. After login it saves the access and refresh tokens, attaches the access token to every request, and when a request comes back 401 it silently calls the refresh endpoint, gets a new token, and retries, so the user is never interrupted. Route protection is done by checking for a token and redirecting to login if it is missing or invalid. I also learned that storing tokens in localStorage is simple and keeps the user logged in across refreshes, but in a real production app httpOnly cookies are safer against certain script based attacks. Logout matters on both sides, the frontend clears the tokens and the backend clears the stored refresh token so it cannot be reused.

## Tomorrow Plan
Start Week 4 Day 4, roles and permissions with route protection and an admin and user access demo.

## Deadline Status
All Day 3 tasks completed and submitted through the pull request.