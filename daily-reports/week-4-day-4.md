# Week 4 Day 4 Daily Report

Date: 2026-07-01

## Tasks Completed
1. Added a role field to the User model with a Role enum, defaulting to user, and ran a migration.
2. Included the role in the JWT payload so it travels with every request.
3. Created a roles decorator to mark which roles a route requires.
4. Created a roles guard that checks the user's role against what the route requires.
5. Added an admin only endpoint that lists all users, protected by the roles guard.
6. Returned a clean 403 when a user without the right role tries to access it.
7. Read the role from the current user on the frontend and showed admin only UI to admins.
8. Added an admin panel on the dashboard that shows all users as cards, visible only to admins.
9. Hid the panel and showed a standard user note for non admins.
10. Tested with an admin account and a normal account: the admin gets the user list, the normal user is blocked with a 403.

## Links and PRs
Branch: week-4-day-4-roles-permissions
Pull request: 

## AI Tools Used
Claude

## Prompts Used
1. Asked Claude to confirm the Day 4 tasks against the internship roadmap.
2. Asked it to add a role to the user and put it in the token.
3. Asked for a roles decorator and guard and an admin only endpoint.
4. Asked for a dashboard admin panel gated by role.
5. Asked for help debugging why the admin was getting a 403.

## Manual Changes Made
1. Added the Role enum and role field, removing a duplicate User model that broke the schema.
2. Updated the service and strategy to carry the role, and fixed the strategy validate to include the role.
3. Created the roles decorator and guard and the admin endpoint.
4. Updated the dashboard to read the role and show the admin panel.
5. Promoted a test account to admin in Prisma Studio and tested both roles.

## Bugs and Blockers
1. The Prisma client did not know the role field until the migration ran, and the schema had a duplicate User model that had to be removed first.
2. The admin kept getting a 403 because the JWT strategy validate did not return the role, so the guard saw no role. Adding the role to validate fixed it.
3. I lost track of which test account was the admin and its password, so I created a clean known admin account to test with.

## What I Learned
Authorization is different from authentication. Authentication proves who you are, authorization decides what you are allowed to do. The role is stored on the user, baked into the token at login, and read on each request. A decorator marks which roles a route needs, and a guard compares the user's role to that list, returning a 403 if it does not match. An important lesson was that the token can carry the role, but if the strategy that rebuilds the user does not pass the role along, the guard never sees it. I also learned the frontend gating is only for experience, the real protection is the backend guard, since the API refuses unauthorized users even if the UI is bypassed.

## Tomorrow Plan
Start Week 4 Day 5, the assessment, a production style auth demo with a README and test accounts.

## Deadline Status
All Day 4 tasks completed and submitted through the pull request. 