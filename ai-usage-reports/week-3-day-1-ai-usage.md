# Week 3 Day 1 AI Usage Report

## Feature or Task
Set up the database layer for the task manager: the PostgreSQL database, Prisma, the Task model, the first migration, and a seed script.

## AI Tool Used
Claude

## Prompt Given
I asked Claude to walk me through setting up Prisma with PostgreSQL for a new NestJS project step by step, to help me define a Task model and run the first migration, to write a seed script with sample tasks, and to give me a clean commit and pull request flow. I also asked whether to keep the Prisma version that installed by default or switch to a simpler one.

## AI Output Summary
Claude gave step by step instructions for each part. It explained that the default install was Prisma 7, which needs a config file and a driver adapter, and recommended switching to Prisma 6 for a simpler setup. It provided the schema datasource block, the Task model with an explanation of each field, the migrate command, a seed script, the package.json seed config, and a three commit plan with a push and pull request flow.

## What I Accepted
1. The switch to Prisma 6 for a simpler setup.
2. The Task model fields and the explanation of each one.
3. The migrate dev command and the seed script.
4. The three meaningful commits: scaffold, schema and migration, seed.
5. The branch rename when the first push failed.

## What I Rejected
I did not keep the Prisma 7 setup that installed by default, because the extra config file and driver adapter added complexity I did not need for this task.

## Manual Changes Made
1. Edited schema.prisma and added the Task model.
2. Set my own DATABASE_URL in .env.
3. Added the seed config to package.json.
4. Created and ran the seed script.
5. Ran every command and checked each result myself.

## Risks Found
1. The .env file holds the database password, so it must stay in .gitignore and never be committed. I confirmed it was ignored before committing.
2. Prisma 7 is very new and has fewer guides, which would slow down learning. Prisma 6 is safer for now.
3. Postgres quoted table names are case sensitive, which can cause confusing query errors if the case is wrong.

## Final Explanation in My Own Words
The Prisma schema is the one file where I describe my data. Each model in it becomes a table and each field becomes a column with a type. When I run a migration, Prisma reads the schema, creates or changes the real tables in PostgreSQL to match, and saves a migration file that records exactly what changed. That history means the same database structure can be rebuilt on any machine by running the migrations in order. Seeding is a separate script that inserts starter rows so the app has data to work with during development. In short, the schema is the plan, the migration applies the plan to the real database, and the seed fills it with sample data.
