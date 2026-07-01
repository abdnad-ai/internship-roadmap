# Week 4 Day 3 AI Usage Report

## Feature or Task
Build the frontend auth: login and register screens, token handling, a protected dashboard, route protection, logout, and auto refresh.

## AI Tool Used
Claude

## Prompt Given
I asked Claude to walk me through the frontend auth step by step. This included a token helper that saves tokens and auto refreshes on a 401, login and register screens in a premium dark split screen style with animated counters, a protected dashboard that reads the current user, route protection that redirects when there is no valid token, and a logout that clears everything. I also asked how to prove the auto refresh actually fires.

## AI Output Summary
Claude gave the token helper with a fetch wrapper that attaches the access token and refreshes once on a 401, then the shared side panel with count up animations, the login and register pages, and the protected dashboard. It explained the token storage choice and its tradeoff, and walked me through temporarily shortening the token expiry to watch the refresh sequence in the network tab.

## What I Accepted
1. The token helper and the auto refresh logic.
2. The split screen auth design with animated counters.
3. The protected dashboard and the route protection.
4. The logout that clears tokens on both sides.

## What I Rejected
I changed the product name from the reference name to SkillForge to match my earlier project. I also did not leave the shortened token expiry in place, I set it back to one hour after testing.

## Manual Changes Made
1. Created all the pages and the token helper and renamed the product.
2. Temporarily shortened the access token to prove auto refresh, then restored it.
3. Ran both servers, tested the full flow, and captured the network tab evidence.

## Risks Found
1. localStorage tokens are readable by JavaScript, so a real production app is safer with httpOnly cookies.
2. Route protection on the client is for user experience, the real security is the backend guard, the frontend redirect can be bypassed but the API still rejects invalid tokens.
3. The shortened token expiry had to be reverted, or every real login would expire in 30 seconds.

## Final Explanation in My Own Words
The frontend logs the user in by sending their credentials to the backend and saving the two tokens it returns. From then on it attaches the access token to every request, and if the backend says the token expired, it quietly uses the refresh token to get a new one and retries, so the user never notices. The dashboard is protected by checking for a valid token and redirecting to login if there is none, though the real protection is the backend guard, the frontend redirect is just for a smooth experience. Logging out clears the tokens on the frontend and tells the backend to clear the stored refresh token so it cannot be reused.