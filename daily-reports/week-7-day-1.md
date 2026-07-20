# Week 7 Day 1 Daily Report

Date: 2026-07-20

## Tasks Completed
1. Wrote a multi-stage Dockerfile for the NestJS backend, compiling TypeScript in a build stage and running only production dependencies in a lean runtime stage.
2. Wrote a multi-stage Dockerfile for the Next.js frontend, building the production output in a build stage and serving it from a lean runtime stage.
3. Added a .dockerignore to each project excluding node_modules, .env files, and build artifacts.
4. Built the backend image, working through and resolving several real build failures along the way.
5. Built the frontend image, which succeeded on the first attempt.
6. Ran the backend container locally against the real PostgreSQL database running on the host machine, confirmed it starts cleanly and responds to requests.
7. Ran the frontend container locally, confirmed it serves both the default page and real app routes like the login page correctly.
8. Documented how to build and run each container in their respective READMEs.

## Links and PRs
Branch: week-7-day-1-docker
Pull request: https://github.com/abdnad-ai/internship-roadmap/pull/37 

## AI Tools Used
Claude

## Prompts Used
1. Asked Claude to confirm the Day 1 tasks against the internship roadmap.
2. Asked for multi-stage Dockerfiles for both the NestJS backend and Next.js frontend.
3. Asked for help diagnosing a series of real build and runtime failures, a broken Prisma client generation on Alpine, a database connection URL formatting issue, and a stray character in an environment file.
4. Asked for the Docker documentation to be added to both READMEs.

## Manual Changes Made
1. Manually ran and read every build and run attempt myself, insisting on root causing the actual error before accepting a proposed fix, rather than trying random suggestions.
2. Verified the real cause of a Prisma generate failure by checking the package's own bin field, confirming the correct entry file rather than guessing.
3. Verified process.env.DATABASE_URL directly inside the running container using node -e, isolating the value seen by Node itself from the value seen by the shell, which narrowed down a stray leading space that a shell-only check wouldn't have caught as precisely.
4. Manually created a gitignored .env.docker override file so the container could reach the host database, rather than modifying the real .env file used for local development.
5. Verified both containers actually served real functionality, an API request and a real app page, not just that they started without crashing.

## Bugs and Blockers
1. Prisma's client generation failed inside the Alpine-based image with a reproducible npm bug, "Exit handler never called!", that silently corrupted the install and left node_modules/.bin empty, confirmed by comparing the same install against the local Windows environment where it worked correctly. Resolved by switching the base image from node:20-alpine to node:20-slim.
2. Docker's --env-file does not strip quotes the way Node's dotenv does, so the quoted values in the real .env file were being passed through literally, breaking the database URL's protocol. Resolved by using an unquoted override file for container runs.
3. A stray leading space in the database URL, invisible in a simple truncated print, caused Prisma's protocol validation to fail. Found by explicitly bracketing the printed value and checking its exact boundaries.
4. Two container run attempts failed on already-allocated ports, caused by earlier containers still running in the background, resolved by checking docker ps and stopping them explicitly.

## What I Learned
Docker build failures on a fresh base image can uncover real bugs that never show up locally, the Alpine npm corruption here worked completely differently than the same install running natively on Windows, and only became obvious by comparing the two environments directly rather than assuming the Dockerfile itself was wrong. I also learned that debugging environment variables passed into a container needs precision, a truncated print can look correct while still hiding a single stray character, bracketing the exact value and checking its length and hidden characters explicitly caught what a casual glance would have missed.

## Tomorrow Plan
Start Week 7 Day 2, Docker Compose with PostgreSQL, running the full app stack together through a single compose file.

## Deadline Status
All Day 1 tasks completed and submitted through the pull request.