# Internship Roadmap

This repository contains my 8-week AI-Native Software Engineering Internship work.

## Main Stack

- Frontend: Next.js
- Backend: NestJS
- Database: PostgreSQL
- ORM: Prisma
- DevOps: Docker and GitHub Actions
- Version Control: Git and GitHub
- AI Tools: ChatGPT, Cursor, Claude Code, and GitHub Copilot

## Repository Structure

- daily-reports/
- ai-usage-reports/
- prompts/
- nextjs-projects/
- nestjs-projects/
- fullstack-projects/
- database-designs/
- code-reviews/
- architecture-notes/
- assessments/
- capstone/

## Week 1 Day 1 Progress

- Created internship repository structure.
- Added README file.
- Prepared folders for daily reports, AI usage reports, prompts, Next.js projects, NestJS projects, full-stack projects, assessments, and capstone work.
- Prepared the repository for GitHub submission. 

## Week 1 Day 1 Setup Status

## Completed:
- Git and GitHub setup
- Repository initialized and pushed
- VS Code setup
- Node.js and npm setup
- React DevTools setup
- Postman setup
- Cursor setup
- Docker Desktop installation
- PostgreSQL installation and PATH setup

## Pending:
- Claude Code setup, pending company authentication/access
- Final Docker Engine runtime verification, if required  


## Week 1 Day 2 Progress

* Practiced Git workflow using a separate Day 2 branch.
* Created and updated the Git workflow learning journal.
* Created a Git cheat sheet for common Git commands.
* Added notes for branches, commits, push/pull workflow, Pull Requests, merging, and conflict resolution.
* Practiced making small and meaningful commits.
* Updated the prompts file with Week 1 Day 2 Git-related prompts.
* Prepared the Week 1 Day 2 daily report and AI usage report.
* Added Git workflow practice checklist.

## Week 1 Day 2 Git Workflow Status

## Completed:

* Day 2 branch created: `week-1-day-2-git-workflow`
* Git workflow notes added
* Git cheat sheet added
* Meaningful commit message examples added
* Pull Request workflow notes added
* Merge workflow notes added
* Conflict resolution notes added
* Day 2 prompts documented
* Day 2 daily report prepared
* Day 2 AI usage report prepared
* Git workflow practice checklist added

## Docker Compose

Runs the full stack, PostgreSQL, the backend, and the frontend, together with a single command.

Setup:
1. Create a ".env" file at the repo root (same level as "docker-compose.yml"), based on ".env.example", with your real JWT_SECRET, JWT_REFRESH_SECRET, and GEMINI_API_KEY.
2. Run "docker compose up --build" to build and start all three services.

Notes:
- The backend connects to the database using the service name "postgres", not "localhost", since containers on the same Compose network reach each other by service name.
- PostgreSQL's data persists in a named volume, so it survives container restarts.
- The database starts empty on first run. After the postgres service is healthy, run "docker compose exec backend npx prisma migrate deploy" once to apply all migrations.
- This is a separate database from any local PostgreSQL install, existing local data will not appear here.
- If port 5432 is already in use locally (a native PostgreSQL install, for example), the compose file maps the container's Postgres to host port 5433 instead, this only affects connecting from your host machine, not how the backend reaches it internally.

## Continuous Integration

Two GitHub Actions workflows run automatically on every pull request and push to main:

- ".github/workflows/backend-ci.yml" - installs dependencies, generates the Prisma client, runs lint, runs the test suite (with a real PostgreSQL service container available), and builds the NestJS app
- ".github/workflows/frontend-ci.yml" - installs dependencies, runs lint, runs the test suite, and builds the Next.js app

Each workflow only triggers when files under its own project (or its own workflow file) change, so an unrelated change to one project doesn't run the other's pipeline.

Required GitHub repo secrets for the backend workflow: JWT_SECRET, JWT_REFRESH_SECRET, GEMINI_API_KEY (Settings -> Secrets and variables -> Actions).

