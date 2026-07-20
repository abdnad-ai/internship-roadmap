# Week 7 Day 1 AI Usage Report

## Feature or Task
Containerize both the NestJS backend and Next.js frontend with multi-stage Dockerfiles, get both building and running locally against the real database, and document the process.

## AI Tool Used
Claude

## Prompt Given
I asked Claude for multi-stage Dockerfiles for both projects, then, when the backend build repeatedly failed, insisted on identifying the actual root cause of each failure with real evidence before applying any fix, rather than accepting a plausible sounding guess.

## AI Output Summary
Claude worked through four separate real failures in sequence, a Prisma client generation failure caused by a reproducible npm bug specific to the Alpine base image, a database URL protocol error caused by Docker's env-file not stripping quotes the way Node's dotenv does, a second identical-looking protocol error caused by a stray leading space in the value, and port conflicts from earlier containers still running. Each was diagnosed with a specific verification step, comparing the Alpine install against the same install on Windows, checking the package's own bin field for the correct entry path, and printing the exact bracketed value inside the running container, rather than moving straight to a fix.

## What I Accepted
1. The multi-stage Dockerfile design for both projects.
2. The diagnosis and fix for the Alpine npm bug, switching to node:20-slim.
3. The diagnosis and fix for the quoted environment variable issue.
4. The diagnosis and fix for the stray leading space, found through explicit bracketed output.
5. The Docker documentation added to both READMEs.

## What I Rejected
An initial attempted fix, upgrading npm globally inside the image to work around the missing bin symlinks, was correctly identified as introducing a new unrelated network dependency rather than fixing the actual root cause, and was abandoned in favor of switching the base image once the real cause was confirmed.

## Manual Changes Made
1. Ran and read every single build and run attempt directly, several rounds of real failures with real error output, not simulated.
2. Verified the correct Prisma entry file by checking the installed package's own package.json bin field rather than guessing a path.
3. Verified process.env.DATABASE_URL directly inside the running container using node -e, isolating exactly what Node itself saw.
4. Created a separate, gitignored .env.docker file for container testing rather than modifying the real local .env file.
5. Verified both final containers actually served real functionality, an API response and an authenticated app page, not just a successful build.

## Risks Found
1. A base image switch, like Alpine to a Debian-based slim image, can silently fix a bug that has nothing to do with the actual application code, worth confirming the real cause rather than just accepting that a different image happened to work.
2. Environment variable handling differs between tools, Docker's --env-file and Node's dotenv treat quoted values differently, an assumption carried over from local development can break silently in a container.
3. A truncated or casual print of a sensitive value during debugging can hide a single invisible character, like a stray leading space, that breaks validation in a way that looks identical to a completely different bug.

## Final Explanation in My Own Words
Getting a Dockerfile to build successfully is often the easy part, the real work today was in refusing to accept the first plausible sounding explanation for each failure and instead finding direct evidence, checking a package's actual manifest instead of guessing its file layout, comparing the same install across two environments to isolate what was actually different, and printing an environment variable with explicit boundary markers instead of trusting a casual glance. Each of the four failures encountered today looked similar to the last, generic error messages about missing files or invalid protocols, but had four completely 