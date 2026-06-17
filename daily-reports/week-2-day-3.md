# Week 2 Day 3 Daily Report

## Date
Week 2 Day 3

## Tasks Completed
* Built a combined auth page with a Sign in and Register toggle
* Used React Hook Form to manage both forms
* Created Zod validation schemas for login and register
* Connected Zod to the forms using zodResolver
* Showed inline validation error messages under each field
* Added loading, success, and error states on submit
* Created a NestJS users resource (module, controller, service)
* Added a CreateUserDto with class validator decorators
* Enabled the global ValidationPipe in main.ts
* Built and tested the create user endpoint on port 3001

## Frontend Work
Single auth screen at /auth with a toggle between login and register. React Hook Form plus Zod handle validation, with error messages and submit states.

## Backend Work
NestJS users resource with a validated POST /users endpoint. The ValidationPipe rejects invalid input with a 400 and accepts valid input.

## Links/PRs
(paste your PR link)

## AI Tools Used
Claude

## What I Learned
(your words)

## Tomorrow Plan
Week 2 Day 4: connect the Next.js forms to the NestJS API.

## Deadline Status
On-time
