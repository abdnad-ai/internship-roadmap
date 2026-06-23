# Week 3 Day 2 Daily Report

Date: 2026-06-23

## Tasks Completed
1. Created a PrismaService and PrismaModule so the whole app shares one database connection.
2. Generated the tasks module, controller, and service.
3. Added CreateTaskDto and UpdateTaskDto with validation rules for title, description, and completed.
4. Enabled a global ValidationPipe in main.ts to enforce those rules.
5. Implemented create task as POST /tasks.
6. Implemented list all tasks as GET /tasks.
7. Implemented get one task as GET /tasks/:id with a not found error for missing ids.
8. Implemented update task as PATCH /tasks/:id.
9. Implemented delete task as DELETE /tasks/:id.
10. Kept all database logic in the service layer so the controller only handles requests.
11. Tested every endpoint and confirmed full CRUD works against the real task_manager database.

## Links and PRs
Branch: week-3-day-2-task-crud-endpoints
Pull request: https://github.com/abdnad-ai/internship-roadmap/pull/17

## AI Tools Used
Claude

## Prompts Used
1. Asked Claude to confirm the Day 2 tasks against the internship roadmap.
2. Asked it to set up a PrismaService that connects NestJS to the database and can be injected.
3. Asked how to generate the tasks module, controller, and service.
4. Asked for CreateTaskDto and UpdateTaskDto with validation rules.
5. Asked for the service methods that handle create, read, update, and delete with not found handling.
6. Asked for the controller that maps each endpoint to a service method.
7. Asked for test commands to check every endpoint and the 404 case.

## Manual Changes Made
1. Created the prisma.service.ts and prisma.module.ts files and pasted the code.
2. Added imports of PrismaModule into the tasks module.
3. Added the title not null mark in the create DTO and installed class-validator and class-transformer.
4. Confirmed the ValidationPipe settings in main.ts and the port 3001.
5. Wrote the service and controller files and ran every test myself.

## Bugs and Blockers
1. The nest command was not recognized as a global command. I ran it through npx so it used the project copy of the CLI.
2. The DTOs showed cannot find module class-validator because the package was not installed in this project. I installed class-validator and class-transformer.
3. TypeScript reported that title had no initializer. I added the not null mark to the required field to satisfy strict mode.

## What I Learned
A clean NestJS feature is split into three layers. The controller receives the HTTP request and does nothing else, the service holds all the database logic, and the module groups them and connects to Prisma. The PrismaService wraps the database connection in one injectable place so the whole app reuses a single connection instead of opening new ones. DTOs describe the exact shape and rules of incoming data, and the global ValidationPipe rejects bad input before it reaches the database. I also learned that ids in a web address arrive as text, so ParseIntPipe converts them to numbers, and that throwing a NotFoundException turns into a clean 404 response automatically.

## Tomorrow Plan
Start Week 3 Day 3 by building the Next.js task screens that connect to these endpoints, with create, list, edit, delete, and empty states.

## Deadline Status
All Day 2 tasks completed and submitted through pull request #17. 