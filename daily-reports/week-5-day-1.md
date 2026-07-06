# Week 5 Day 1 Daily Report

Date: 2026-07-06

## Tasks Completed
1. Chose Google Gemini as the LLM provider for the AI feature.
2. Generated a Gemini API key and stored it in the backend .env file, regenerated it after an accidental exposure while testing.
3. Installed the Gemini SDK and Nest CLI as dependencies in the backend project.
4. Created a new AI module in the backend with a service, controller, and module file.
5. Built an AI service that sends a prompt to the Gemini API and returns the generated response.
6. Added a prompt template builder method that supports variable substitution for reusable prompts.
7. Added input validation to reject empty prompts and prompts over a length limit, using class-validator decorators on the request DTO.
8. Added error handling for failed API calls, returning a clean 500 instead of leaking internal errors.
9. Built a POST /ai/test endpoint to send prompts and confirm the AI service works end to end.
10. Tested the endpoint with two different prompts and confirmed both returned correct, consistent responses.
11. Tested the empty prompt case and confirmed validation correctly rejects it before reaching the AI service.
12. Documented the Gemini API key setup and the AI service in the backend README.

## Links and PRs
Branch: week5-day1-ai-service-scaffold
Pull request: 

## AI Tools Used
Claude

## Prompts Used
1. Asked Claude to confirm the Day 1 tasks against the internship roadmap.
2. Asked for a NestJS AI service structured around the Gemini API, including a prompt template builder, validation, and error handling.
3. Asked for help debugging a validation error where a valid prompt was being rejected.
4. Asked for help debugging a Gemini API 404 error after the initial model name stopped working.
5. Asked for README content documenting the new AI service and its environment variable.

## Manual Changes Made
1. Accidentally ran the Nest CLI generate commands and npm installs from the repo root instead of the backend folder, then deleted the stray files and moved the work into the correct folder.
2. Regenerated the Gemini API key twice after it was exposed while pasting into chat and terminal output.
3. Fixed a TypeScript strict mode error on the DTO class property using a definite assignment assertion.
4. Diagnosed a Gemini 404 error by adding temporary logging, found the model name was deprecated, and switched to a currently supported model.
5. Ran all endpoint tests manually with PowerShell and confirmed both success and validation failure cases.
6. Reverted a stray blank line change in the frontend README that was unrelated to today's work.

## Bugs and Blockers
1. Running CLI and npm commands from the wrong directory created files and dependencies at the repo root instead of inside the backend project, this was caught and fixed before committing.
2. The initial Gemini model name used in the service was deprecated and returned a 404, switching to a current model name fixed it.
3. PowerShell's curl.exe mangled escaped quotes in POST request bodies, using Invoke-RestMethod instead solved this.

## What I Learned
Always confirm the current working directory before running scaffolding commands or installs, a wrong directory silently creates files in the wrong place without any error. LLM provider APIs change their supported model names over time, so a service that calls an external AI API needs to be checked against the provider's current model list rather than assumed from memory. Also learned that request validation pipes in NestJS strip or reject unrecognized properties by default, so any DTO used with a global ValidationPipe needs proper class-validator decorators or valid data gets rejected as if it were malformed.

## Tomorrow Plan
Start Week 5 Day 2, building the streaming chat interface on top of this AI service.

## Deadline Status
All Day 1 tasks completed and submitted through the pull request.