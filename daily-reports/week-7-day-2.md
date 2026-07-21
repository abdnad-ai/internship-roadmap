# Week 7 Day 2 Daily Report

Date: 2026-07-21

## Tasks Completed
1. Wrote a docker-compose.yml at the repo root defining three services, PostgreSQL, backend, and frontend.
2. Configured PostgreSQL with a named volume so data persists across container restarts.
3. Configured the backend to connect to the database by its Compose service name (postgres) rather than localhost, and to wait for the database to report healthy before starting.
4. Configured the frontend to build and connect to the backend.
5. Set up a root level .env file (gitignored) for JWT and Gemini secrets, referenced via variable substitution in the compose file, and added a safe .env.example alongside it.
6. Added a PostgreSQL health check so the backend never starts before the database is actually ready to accept connections.
7. Brought the full stack up with a single docker compose up --build, all three services started cleanly on the first attempt.
8. Ran the Prisma migration against the fresh compose-managed database, applied all 5 existing migrations successfully, then registered a real account, created a task, and confirmed it through a direct psql query that the data was genuinely stored inside the containerized database, not the local one.
9. Documented Docker Compose usage in the root README.

## Links and PRs
Branch: week-7-day-2-docker-compose
Pull request: 

## AI Tools Used
Claude

## Prompts Used
1. Asked Claude to confirm the Day 2 tasks against the internship roadmap.
2. Asked for a docker-compose.yml covering all three services with proper networking, a health check, and persistent storage.
3. Asked for help resolving a port conflict with an existing local PostgreSQL install, and for verifying a database identifier casing issue while querying directly inside the container.
4. Asked for the Docker Compose documentation to be added to the root README.

## Manual Changes Made
1. Caught that a root level .gitignore didn't exist yet before creating a root .env file, and created one first to avoid any risk of committing secrets.
2. Discovered the local PostgreSQL Windows service was already using port 5432, remapped the container's exposed port to 5433 to avoid the conflict, while confirming this only affects host access, not the backend's internal connection to the database.
3. Ran the actual migration command against the running container rather than assuming the schema matched, confirmed all 5 migrations applied.
4. Verified data persistence by querying the containerized database directly with psql, rather than trusting the browser alone, and diagnosed a table name casing issue by listing the real tables first instead of guessing.
5. Caught that the .gitignore's wildcard pattern for env files was also blocking the safe .env.example file, and added an explicit exception for it.

## Bugs and Blockers
1. The compose file's default PostgreSQL port conflicted with an existing local PostgreSQL Windows service on the same machine, resolved by remapping the host-side port only.
2. A broad gitignore wildcard pattern intended to hide real secrets also accidentally hid the safe example file meant to be committed, resolved with an explicit negation rule.
3. A direct SQL query against the containerized database initially failed due to PowerShell mangling quote escaping around a case sensitive table name, resolved by listing the actual tables first and adjusting the quoting.

## What I Learned
Getting all three services to start doesn't confirm they can actually reach each other or that data survives correctly, verifying a task created through the browser was genuinely present by querying the database container directly closed that gap. I also learned that gitignore patterns need to be checked for unintended overreach, a wildcard broad enough to catch every possible secret file variant can just as easily catch a file that was deliberately meant to be public, worth testing both the files you want ignored and the files you don't.

## Tomorrow Plan
Start Week 7 Day 3, GitHub Actions for a lint, test, and build pipeline.

## Deadline Status
All Day 2 tasks completed and submitted through the pull request. 