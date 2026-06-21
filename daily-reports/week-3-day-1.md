# Week 3 Day 1 Daily Report

Date: 2026-06-22

## Tasks Completed
1. Created the PostgreSQL database task_manager.
2. Scaffolded a new NestJS project named week-3-task-manager-api.
3. Added Prisma and connected it to PostgreSQL using DATABASE_URL in the .env file.
4. Defined the Task model in the Prisma schema with id, title, description, completed, createdAt, and updatedAt fields.
5. Ran the first migration to create the Task table in the database.
6. Wrote a seed script that inserts four sample tasks.
7. Ran the seed and confirmed the four rows using psql and Prisma Studio.
8. Committed the work in three meaningful commits and opened a pull request.

## Links and PRs
Branch: week-3-day-1-prisma-postgres-task-model
Pull request: https://github.com/abdnad-ai/internship-roadmap/pull/16

## AI Tools Used
Claude

## Prompts Used
1. Asked Claude to confirm the Day 1 tasks against the internship roadmap.
2. Asked it to set up Prisma with PostgreSQL for a new NestJS task manager and walk through each step.
3. Asked whether to keep the Prisma version that installed by default or switch to a simpler one.
4. Asked for a Task model and the migration command.
5. Asked for a seed script with sample tasks and how to run it.
6. Asked for a clean commit, push, and pull request flow.

## Manual Changes Made
1. Edited prisma/schema.prisma to set the datasource and add the Task model.
2. Set DATABASE_URL in the .env file with my local database details.
3. Added the prisma seed config to package.json.
4. Wrote prisma/seed.js from the example.
5. Ran every command myself and checked the output at each step.

## Bugs and Blockers
1. The default Prisma install was version 7, which needs extra setup like a config file and a driver adapter. I switched to Prisma 6 for a simpler setup that matches most tutorials.
2. My first SELECT in psql failed because Postgres is case sensitive with quoted names. The table is "Task", not "TASK".
3. My first push failed because the branch name was missing a hyphen. I renamed the branch to the correct format and pushed again.

## What I Learned
A Prisma schema is the single file where I describe my database models. Each model becomes a table and each field becomes a column. A migration takes that schema and creates or updates the real tables in the database, and it saves a history file so the same change can be repeated on any machine. Seeding is a script that fills the database with starter data so the app has something to show during development. I also learned that Postgres treats quoted table names as case sensitive, and that keeping the connection string in .env keeps my password out of git.

## Tomorrow Plan
Start Week 3 Day 2 by building the CRUD endpoints for tasks in NestJS using Prisma.

## Deadline Status
All Day 1 tasks completed and submitted through pull request #16.
