# Week 4 Day 1 AI Usage Report

## Feature or Task
Build the authentication backend: a User model, password hashing with bcrypt, register and login, and JWT access tokens.

## AI Tool Used
Claude 

## Prompt Given
I asked Claude to walk me through building the auth backend step by step. This included adding a User model and migration, setting up an auth module, hashing passwords with bcrypt, writing register and login with proper error handling, configuring JWT with a secret from the env file, and testing every endpoint including the failure cases.

## AI Output Summary
Claude gave step by step code for each part. It provided the User model, the auth module with JWT configured from the env, the auth service with bcrypt hashing and token signing, the register and login DTOs with validation, and the controller endpoints. It explained why passwords are hashed, why login returns the same error for a missing user and a wrong password, and gave test commands for register, login, wrong password, duplicate email, and invalid input.

## What I Accepted
1. The User model and the auth module structure.
2. The bcrypt hashing and the JWT token signing.
3. The register and login logic with 409, 401, and 400 handling.
4. The DTOs and the test commands.

## What I Rejected
I did not install the Nest CLI globally, I used npx instead. I also did not put the JWT secret anywhere except the env file.

## Manual Changes Made
1. Added the User model and ran the migration.
2. Added the JWT secret to the env file.
3. Pasted the service, controller, DTOs, and module, and fixed the app module imports.
4. Added the not null marks to the DTO fields.
5. Ran every test and confirmed the hashed password in the database.

## Risks Found
1. The JWT secret must stay in the env file and never be committed, since anyone who has it can forge tokens.
2. Passwords must always be hashed before saving, a plain text password in the database would be a serious leak.
3. Login error messages must not reveal whether an email exists, or an attacker can discover valid accounts.

## Final Explanation in My Own Words
When someone registers, the server hashes their password with bcrypt and stores only the hash, never the real password. When they log in, the server hashes the typed password the same way and compares it to the stored hash, and if it matches it hands back a signed JWT token. That token is proof the user is logged in, and it is signed with a secret only the server knows, so later requests can be trusted without storing a session. The validation rules block bad input before it reaches the database, and the error responses are deliberately vague about whether an email exists, to avoid helping attackers.