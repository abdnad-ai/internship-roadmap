# Week 4 Day 1 Daily Report

Date: 2026-06-29

## Tasks Completed
1. Added a User model to Prisma with a unique email and a password, and ran a migration to create the table.
2. Created an auth module, controller, and service in the task manager backend.
3. Added password hashing with bcrypt so passwords are never stored as plain text.
4. Built register that hashes the password, saves the user, and rejects a duplicate email. 
5. Built login that finds the user by email and verifies the password.
6. Added JWT and configured it with a secret stored in the env file.
7. Returned a signed access token when login or register succeeds.
8. Added register and login DTOs to validate the email and password input.
9. Handled errors: duplicate email returns 409, wrong credentials return 401, invalid input returns 400.
10. Tested register and login and confirmed an access token comes back, and verified the password is stored hashed in the database.

## Links and PRs
Branch: week-4-day-1-auth-jwt
Pull request: 

## AI Tools Used
Claude

## Prompts Used
1. Asked Claude to confirm the Day 1 tasks against the internship roadmap.
2. Asked it to add a User model and set up an auth module in the existing backend.
3. Asked for password hashing with bcrypt and the register and login logic.
4. Asked how to configure JWT with a secret from the env file.
5. Asked for test commands to check register, login, and the error cases.

## Manual Changes Made
1. Added the User model to the Prisma schema and ran the migration.
2. Added a JWT secret to the env file.
3. Pasted and saved the auth service, controller, DTOs, and module.
4. Fixed app.module.ts so ConfigModule sits inside the imports array, and added the not null marks to the DTO fields.
5. Ran every test myself and confirmed the hashed password in Prisma Studio.

## Bugs and Blockers
1. The nest command was not recognized, so I ran it through npx.
2. app.module.ts failed to compile because ConfigModule.forRoot was placed outside the imports array. I moved it inside as the first import.
3. The DTO fields showed a no initializer error under strict mode. I added the not null mark to each field.
4. Prisma Studio first tried to install Prisma 7 and failed, because I ran it from the repo root. Running it from inside the project folder used the correct Prisma 6 and connected.

## What I Learned
Authentication has two parts, proving who a user is and giving them a token to stay logged in. Passwords are never stored directly. Bcrypt turns a password into a one way hash, and on login it compares the typed password against that hash without ever unscrambling it, which is why a leaked database does not reveal real passwords. A JWT is a signed token the server gives back on a successful login, signed with a secret that lives in the env file, so the server can later trust it without storing sessions. I also learned to return the same message for a missing user and a wrong password, so an attacker cannot tell which emails exist.

## Tomorrow Plan
Start Week 4 Day 2, refresh tokens, route guards, and a current user endpoint.

## Deadline Status
All Day 1 tasks completed and submitted through the pull request.