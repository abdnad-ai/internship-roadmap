# Week 4 Day 2 AI Usage Report

## Feature or Task
Build the secure auth flow: a JWT strategy and guard, a protected current user endpoint, refresh tokens with hashed storage, and a refresh and logout flow.

## AI Tool Used
Claude

## Prompt Given
I asked Claude to walk me through building the secure auth flow step by step. This included a JWT strategy and guard, a protected /auth/me endpoint, issuing access and refresh tokens, storing the refresh token hashed with a migration, a refresh endpoint that returns new tokens, and a logout that revokes the refresh token. I also asked for test commands for the whole flow.

## AI Output Summary
Claude gave step by step code for each part. It provided the JWT strategy, the guard, and the current user decorator, then the refresh strategy and guard, the updated service that issues and stores both tokens, and the refresh and logout endpoints. It explained why access tokens are short lived, why refresh tokens are stored as a hash, and why logout clears the hash to revoke access. It also gave test commands proving the guard blocks unauthenticated requests, refresh returns new tokens, and refresh fails after logout.

## What I Accepted
1. The JWT strategy, guard, and current user endpoint.
2. The two token approach with a separate refresh secret.
3. Storing the refresh token as a bcrypt hash and clearing it on logout.
4. The refresh and logout endpoints and the test commands.

## What I Rejected
I did not store the refresh token in plain text, I kept only its hash. I also kept both secrets only in the env file, never in code.

## Manual Changes Made
1. Created the strategies, guards, and decorator and registered them in the module.
2. Added the hashedRefreshToken field, ran the migration, and regenerated the client.
3. Updated the service and controller, and added the refresh and logout flow.
4. Added the refresh secret and expiry to the env file.
5. Ran every test and captured screenshots of the results.

## Risks Found
1. Both secrets must stay in the env file, anyone with them can forge tokens.
2. The refresh token must be stored hashed, a plain token in the database would be a usable credential if leaked.
3. Logout must clear the stored hash, otherwise an old refresh token would keep working after the user logs out.

## Final Explanation in My Own Words
When a user logs in, the server gives them two tokens. The access token is short lived and proves who they are on each request, checked by a guard that runs the JWT strategy. The refresh token lasts longer and is used only to get a new access token when the old one expires, so the user does not have to log in again. The server stores only a hashed copy of the refresh token, so even a leaked database does not reveal a usable token, and on logout it clears that hash, which makes any existing refresh token stop working. This is a stateless and secure flow, the server trusts the signed tokens without keeping sessions, but can still revoke access when needed. 