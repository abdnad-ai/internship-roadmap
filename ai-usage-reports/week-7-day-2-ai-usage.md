# Week 7 Day 2 AI Usage Report

## Feature or Task
Bring the full application stack, PostgreSQL, backend, and frontend, up together through a single Docker Compose file, and verify the whole thing works end to end against a real, freshly migrated database.

## AI Tool Used
Claude

## Prompt Given
I asked Claude for a docker-compose.yml covering all three services with correct internal networking, a health check gating the backend's startup, and persistent storage for the database. I also asked for help when the compose stack's default Postgres port conflicted with an existing local install, and for verifying that a task created through the browser was genuinely persisted inside the containerized database rather than assuming it.

## AI Output Summary
Claude designed the compose file so the backend reaches PostgreSQL by its service name rather than localhost, matching how Day 1's individual containers needed host.docker.internal for the same reason but in reverse. It caught, before creating any secrets file, that no root level gitignore existed yet, and created one first. When a port conflict came up with a local PostgreSQL install, it diagnosed the cause precisely and remapped only the host-facing port, leaving the internal service-to-service connection untouched. To verify real persistence rather than trusting the UI, it queried the containerized database directly, first listing the actual tables to get the correct name and casing rather than guessing, after an initial quoting attempt failed.

## What I Accepted
1. The full docker-compose.yml design, including the health check and named volume.
2. The root .gitignore and .env.example setup, created before any secrets file existed.
3. The port remapping fix for the local PostgreSQL conflict.
4. The direct database verification approach and its fix for a quoting issue while querying.
5. The fix for the gitignore pattern that was also blocking the safe example file.

## What I Rejected
Nothing major, every step was verified with real command output, container logs, and a direct database query, rather than assumed correct.

## Manual Changes Made
1. Ran docker compose up --build myself and read the full startup sequence for all three services before declaring it working.
2. Ran the actual Prisma migration command against the running container and confirmed all 5 migrations applied by reading the output.
3. Registered a real account and created a real task through the browser, then verified its presence with a direct psql query against the container, rather than trusting the browser alone.
4. Tested both check-ignore and git status directly to confirm the gitignore fix worked for both the file meant to be hidden and the file meant to be public.

## Risks Found
1. A UI showing success does not confirm data actually persisted where intended, especially when multiple databases exist across different environments, direct verification against the actual data store closes that gap.
2. A port conflict between a container and a pre-existing local service is easy to introduce without noticing, since the container's build and startup still succeed, only the port binding itself fails.
3. A gitignore pattern broad enough to protect every secret variant can just as easily catch a file that needs to be committed, both directions need to be tested, not just the one you're focused on.

## Final Explanation in My Own Words
Docker Compose's core value here is that it manages the wiring between services automatically, containers on the same compose network can reach each other by service name, so the backend's DATABASE_URL says postgres instead of localhost or the host.docker.internal workaround Day 1 needed for a single standalone container. The health check exists specifically so the backend doesn't try to connect before Postgres has actually finished starting up, avoiding a race condition on first boot. The most important step today wasn't getting the stack to start, it was proving the data was real, running an actual migration, creating an actual task through the actual UI, and confirming it with a direct query against the actual container, each link checked rather than assumed. 