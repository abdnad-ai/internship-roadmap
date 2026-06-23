# Week 3 Day 2 AI Usage Report

## Feature or Task
Build the full CRUD API for tasks in NestJS using Prisma, with a shared PrismaService, a clean service layer, validated DTOs, and all five endpoints.

## AI Tool Used
Claude

## Prompt Given
I asked Claude to walk me through building task CRUD endpoints in NestJS step by step. This included creating a PrismaService that connects to the database and can be injected, generating the tasks module, controller, and service, writing CreateTaskDto and UpdateTaskDto with validation, implementing the create, read, update, and delete methods with not found handling, wiring the controller to the service, and giving me test commands for every endpoint including the missing id case.

## AI Output Summary
Claude gave step by step instructions and code for each part. It provided the PrismaService and PrismaModule, the commands to generate the tasks files through npx, the two DTOs with class-validator decorators, the service with create, findAll, findOne, update, and remove methods using Prisma, and the controller that maps each endpoint to a service method using ParseIntPipe for the id. It also gave Invoke-RestMethod commands to test create, read, update, delete, and the 404 case, and explained why each piece mattered.

## What I Accepted
1. The PrismaService and PrismaModule for a shared database connection.
2. The three layer structure of module, controller, and service.
3. The two DTOs and the global ValidationPipe settings.
4. The service methods with not found handling and the controller mapping.
5. The test commands for all five endpoints and the error case.

## What I Rejected
I did not change the project to install the Nest CLI globally. I ran it through npx instead so the setup stayed simple and project local.

## Manual Changes Made
1. Created the Prisma files and pasted the code.
2. Installed class-validator and class-transformer in this project.
3. Added the not null mark to the required title field in the create DTO.
4. Confirmed the ValidationPipe and the port in main.ts.
5. Wrote the service and controller and ran every test myself.

## Risks Found
1. Without a not found check, update and delete on a missing id would throw a raw database error. The findOne check turns that into a clean 404.
2. The global ValidationPipe with whitelist and forbidNonWhitelisted is important, otherwise unknown or unsafe fields could reach the database.
3. Ids from the web address are text, so without ParseIntPipe the lookups would silently fail to match.

## Final Explanation in My Own Words
A CRUD API in NestJS is organized into clear layers. The controller is the front desk that receives requests at addresses like /tasks and passes them along. The service is the worker that actually talks to the database through Prisma, doing the create, read, update, and delete. The module ties them together and gives them the shared PrismaService. DTOs are the rules for incoming data, and the ValidationPipe enforces them before anything reaches the database. When a task id does not exist, the service throws a not found error, which the framework turns into a 404. So the request flows from controller to service to Prisma to PostgreSQL, and the response flows back the same way.
