# Week 4 Day 4 AI Usage Report

## Feature or Task
Add role based access control: a user role, roles in the token, a roles guard, an admin only endpoint, and an admin panel on the dashboard.

## AI Tool Used
Claude

## Prompt Given
I asked Claude to walk me through role based access step by step. This included adding a role to the user and the token, a roles decorator and guard, an admin only endpoint that lists users, and a dashboard admin panel shown only to admins. I also asked for help debugging a 403 the admin was wrongly getting.

## AI Output Summary
Claude gave the Role enum and migration, the changes to put the role in the token, the roles decorator and guard, and the admin endpoint that selects only safe fields. It built the dashboard admin panel that fetches the user list when the role is admin and hides it otherwise. When the admin got a 403, it traced the cause to the JWT strategy not returning the role and had me fix the validate method.

## What I Accepted
1. The role field and the role in the token.
2. The roles decorator and guard and the admin endpoint.
3. The dashboard admin panel and the role badges.
4. The debugging steps that found the missing role in the strategy.

## What I Rejected
Nothing major. I did change test accounts to clean known ones when I lost track of passwords.

## Manual Changes Made
1. Removed a duplicate User model and added the role field, then ran the migration.
2. Fixed the JWT strategy validate to include the role.
3. Created the decorator, guard, and admin endpoint, and the dashboard panel.
4. Promoted a test account to admin and tested both roles.

## Risks Found
1. The admin endpoint must select only safe fields, never the password or refresh token.
2. The frontend gating is not security, the backend guard is what actually protects the data.
3. The role is baked into the token at login, so a promoted user must log in again to get the new role, an old token still carries the old role.

## Final Explanation in My Own Words
Every user has a role stored in the database, and when they log in that role is put into their token. On each request the guard reads the role from the token and checks it against what the route requires, allowing admins and blocking everyone else with a 403. The dashboard reads the same role and only shows the admin panel to admins, but that is just for a clean experience, the real protection is on the backend, since the API refuses unauthorized users no matter what the frontend shows. A subtle point is that the token must carry the role and the strategy must pass it through, or the guard has nothing to check.