# Developer Prompts

## Week 1 Day 1 - Environment Setup and Repository Initialization

### Prompt 1

Guide me step by step for Week 1 Day 1 of my internship roadmap. Tell me what tasks I need to complete today.

### Prompt 2

Help me create the correct folder structure for my internship roadmap repository according to the roadmap document.

### Prompt 3

Create a simple README.md file for my internship roadmap repository using Next.js, NestJS, PostgreSQL, Prisma, Docker, GitHub Actions, and AI tools.

### Prompt 4

Create a daily report template for Week 1 Day 1 based on the tasks completed today.

### Prompt 5

Create an AI usage report for Week 1 Day 1 explaining how AI was used for setup guidance.

### Prompt 6

Help me fix the Git error: “git is not recognized as the name of a cmdlet.”

### Prompt 7

Help me configure Git username and GitHub no-reply email before committing my code.

### Prompt 8

Guide me to push my local internship-roadmap folder to my GitHub repository.

### Prompt 9

Help me verify Node.js, npm, Docker, PostgreSQL, Postman, Cursor, and React DevTools installation status.

### Prompt 10

Help me fix PostgreSQL psql PATH issue so I can run psql --version from VS Code terminal.

## Week 1 Day 2 - Git Workflow Prompts
### Prompt 1

Guide me through Week 1 Day 2 of my internship roadmap and explain what Git workflow tasks I need to complete today.

### Prompt 2

Explain what a Git branch is in simple terms and why we create separate branches for daily work.

### Prompt 3

Explain the difference between git add ., git add filename, and why specific file commits are better for clean Git history.

### Prompt 4

Help me create meaningful commit messages for Git workflow practice.

### Prompt 5

Explain what a Pull Request is and how it helps in professional development workflow.

### Prompt 6

Explain Git merge and conflict resolution in beginner-friendly language.

### Prompt 7

Help me organize Week 1 Day 2 Git learning journal notes.

### Prompt 8

Help me prepare a daily report and AI usage report for Week 1 Day 2.

## Week 1 Day 3 - AI Prompting and Developer Prompt Library

# Developer Prompt Library

## 1. Git Prompts

1. I am working on a feature branch and want to understand exactly what changed before committing. Analyze the difference between  git status ,  git diff , and  git diff --staged , then give me a safe review checklist before I stage any files.

2. I changed multiple files but only want to commit one specific file for my daily report. Give me the exact Git workflow to stage only that file, write a meaningful conventional commit message, verify the commit, and avoid accidentally committing unrelated changes.

3. I need to improve my commit messages for an internship repository. Review these file changes and suggest 5 conventional commit messages, then explain which one best communicates the purpose of the change.

4. I created a new branch for today’s task and need to push it to GitHub for the first time. Explain how to push the branch, set upstream tracking, verify it exists remotely, and avoid pushing directly to  main .

5. My feature branch is behind  main , and I want to update it safely. Explain the difference between pulling, merging, and rebasing in beginner-friendly terms, then recommend the safest approach for an internship workflow.

6. I accidentally edited a file that I do not want to keep, but I have other important uncommitted work. Explain how to discard changes for only that file without affecting the rest of my working directory.

7. I want to review my Git history before pushing my work. Give me commands to view recent commits clearly, check which branch I am on, confirm the latest commit is included, and verify that my working tree is clean.

8. I created a Pull Request on GitHub and need to review it before merging. Give me a practical PR review checklist covering changed files, commit quality, conflicts, branch direction, screenshots, and whether the PR is safe to merge.

9. I have a merge conflict in a markdown file. Explain what  Current Change ,  Incoming Change , and conflict markers mean, then guide me through resolving the conflict while preserving the correct content.

10. I merged a Pull Request into  main . Explain the correct post-merge workflow: syncing local  main , checking status, deleting old branches if safe, and confirming the GitHub repository reflects the final work.

## 2. Next.js Frontend Prompts

1. I am building a Next.js dashboard page with summary cards, a table, filters, and action buttons. Suggest a clean component structure, explain which parts should be reusable, and describe how to keep the page maintainable as it grows.

2. I am creating a form in Next.js that includes input fields, validation, loading state, success message, and error handling. Guide me on how to structure the component logic clearly without overcomplicating it.

3. I am unsure whether a Next.js page should be a server component or client component. Ask me for the page behavior, then decide which approach is better based on interactivity, data fetching, state, and performance.

4. My Next.js route is not loading correctly. Ask me for the folder structure, route path, and relevant files, then give me a step-by-step debugging plan to find whether the issue is routing, naming, imports, or file placement.

5. I need to create a professional dashboard layout in Next.js with a sidebar, top header, and main content area. Suggest a simple structure that is responsive, readable, and easy to extend later.

6. I have repeated UI card code across several Next.js pages. Analyze the repeated pattern and suggest a reusable component design, including props, naming, file location, and how to avoid making the component too generic.

7. I am getting a hydration error in a Next.js page. Explain the common causes, such as client-only values, browser APIs, dates, random values, or mismatched rendering, and provide a safe debugging checklist.

8. I need to fetch data from a NestJS backend in a Next.js frontend. Explain where the API call should happen, how to handle loading and error states, and how to keep the frontend code clean.

9. I want to improve the responsiveness of a Next.js page. Review the layout structure and suggest practical improvements for spacing, alignment, table behavior, mobile layout, and readability.

10. My Next.js project fails during build before deployment. Help me analyze the build error, identify whether it is caused by TypeScript, missing imports, environment variables, server/client component misuse, or dependency issues, and suggest a safe fix.

## 3. NestJS Backend Prompts

1. I am creating a new NestJS feature module. Explain how the module, controller, service, DTO, and entity should work together in a clean request flow, and suggest what files I should create first.

2. I need to build a REST API endpoint in NestJS. Help me decide what belongs in the controller, what belongs in the service, and how to keep validation, business logic, and response formatting separate.

3. I am creating a DTO for a NestJS API request. Suggest appropriate validation decorators, explain what bad inputs they prevent, and show how validation improves backend reliability.

4. I am getting a NestJS dependency injection error. Ask me for the module, service, and provider code, then help me identify whether the issue is a missing import, missing provider, circular dependency, or incorrect export.

5. I need to connect a NestJS backend to PostgreSQL. Explain the required configuration, environment variables, database connection settings, and common mistakes that cause connection failures.

6. My NestJS controller currently contains business logic. Guide me through moving the logic into a service without changing the route, request body, response format, or existing frontend behavior.

7. I want better error handling in my NestJS API. Suggest a clean strategy for returning helpful errors while avoiding sensitive details, and explain when to use built-in HTTP exceptions.

8. I need to protect a NestJS route using authentication. Explain how guards work, where they fit in the request lifecycle, and what information should be checked before allowing access.

9. I want to organize a NestJS backend project professionally. Suggest a folder structure for modules, controllers, services, DTOs, entities, guards, common utilities, and configuration files.

10. I want consistent API responses across my NestJS backend. Suggest a simple response format for success and error cases, and explain how consistency helps the frontend handle API results.

## 4. Debugging Prompts

1. I am getting a terminal error while running my project. I will paste the full error, command used, and recent changes. Identify the root cause, likely file location, and safest fix without guessing.

2. My Next.js frontend shows a blank page. Give me a debugging checklist covering browser console errors, route files, imports, component rendering, environment variables, and whether the issue is client-side or server-side.

3. My NestJS API returns a 500 error. Tell me what information to collect first, including request body, endpoint, controller method, service method, logs, and database query, before suggesting a fix.

4. My API works in Postman but fails from the Next.js frontend. Help me determine whether the issue is CORS, wrong API URL, HTTP method, headers, request payload, environment variables, or browser restrictions.

5. My PostgreSQL query is returning incorrect or empty results. Guide me through checking table data, filters, joins, relationships, null values, case sensitivity, and query conditions.

6. My project works locally but fails after deployment. Give me a debugging plan covering build logs, environment variables, database connection, start command, port configuration, and platform-specific settings.

7. I installed a new npm package and now the project has dependency or build errors. Explain how to inspect package versions, lock files, peer dependency warnings, and whether reinstalling dependencies is safe.

8. A Git command produced an error and I do not want to lose my work. I will paste the command and output. Explain what happened, what not to do, and the safest next command.

9. My form submits successfully in the frontend, but the data is not saved in PostgreSQL. Help me debug the full flow from form state to API request, NestJS route, service logic, validation, and database insert.

10. I fixed a bug and want to verify it properly before committing. Create a verification checklist covering the original issue, related edge cases, regression risk, logs, UI/API behavior, and Git status.

## 5. Refactoring Prompts

1. I have a long function that is hard to understand. Review it and suggest how to split it into smaller functions while keeping the same input, output, and behavior.

2. I have repeated logic in multiple files. Identify the duplication and recommend whether it should become a helper function, reusable component, shared service, or utility module.

3. Review this code and suggest better variable, function, and file names. Keep the meaning the same, but make the code easier for another developer to understand.

4. My NestJS service method handles validation, database logic, and response formatting together. Suggest a cleaner structure that separates responsibilities without changing the API response.

5. My Next.js component contains too much JSX and logic in one file. Suggest how to break it into smaller components, custom hooks, or helper functions, and explain what each part should handle.

6. I want to refactor code safely in small steps. Give me a step-by-step refactoring plan that includes what to change first, how to test after each step, and when to commit.

7. I have deeply nested if-else logic. Suggest a cleaner version using early returns, guard clauses, or helper functions, and explain how the new structure improves readability.

8. I want to improve error handling in this function. Suggest a cleaner approach that improves clarity and maintainability while keeping the success flow unchanged.

9. I have hardcoded values in frontend and backend code. Identify which values should move to constants, configuration files, or environment variables, and explain why.

10. I refactored a file and want to confirm nothing broke. Give me a comparison checklist to verify old behavior, new behavior, API response, UI output, tests, and edge cases.

## 6. PostgreSQL / Database Prompts

1. I need to design a PostgreSQL table for a new feature. Ask me for the feature requirements first, then suggest columns, data types, primary keys, foreign keys, constraints, and relationships.

2. Explain primary keys and foreign keys using a practical users and tasks example, then show how these keys help maintain reliable relationships between tables.

3. I need to write a SQL query that joins related tables. Explain which join type is appropriate, how the tables connect, and what the final result should contain.

4. I am getting a duplicate key error in PostgreSQL. Explain what caused it, how to identify the duplicate record, and what safe options exist to fix it.

5. I want to improve query performance. Explain when an index is useful, which columns are good candidates, what tradeoffs indexes introduce, and how to avoid unnecessary indexes.

6. I need to create a database migration. Explain what should go inside the migration, what risks to check before running it, and how to make the change safe for existing data.

7. My NestJS backend cannot connect to PostgreSQL. Give me a checklist for database URL, username, password, host, port, SSL settings, database name, and environment variable loading.

8. I want to validate data before saving it to PostgreSQL. Explain what should be handled by NestJS DTO validation and what should be enforced by database constraints.

9. I need to model a one-to-many relationship in PostgreSQL. Use users and tasks as an example and explain where the foreign key belongs, how deletion should be handled, and what queries should be tested.

10. I am working with development data and want to avoid dangerous database mistakes. Suggest safe habits for backups, seed data, test data, destructive queries, and verifying changes before running them.

## 7. Testing Prompts

1. I created a new NestJS API endpoint. Suggest test cases for successful requests, missing fields, invalid data, unauthorized access, not-found records, duplicate data, and unexpected server errors.

2. I want to test a NestJS service method. Explain which dependencies should be mocked, what behavior should be tested directly, and how to avoid testing implementation details too tightly.

3. I want to manually test a Next.js form. Give me a checklist for input fields, validation messages, submit button behavior, loading state, success state, error state, and reset behavior.

4. I am testing an API in Postman. Tell me what request method, URL, headers, body, status code, response fields, and error scenarios I should verify.

5. I fixed a bug and need regression testing. Suggest test cases to confirm the bug is fixed, related features still work, and no old behavior was accidentally broken.

6. I need edge cases for a feature. Help me identify empty input, invalid input, duplicate records, large input, permission issues, slow network, and database failure scenarios.

7. I need to document test results for an internship report. Suggest a simple table format with test case, steps, expected result, actual result, status, and screenshot reference.

8. My automated test is failing, but the feature works manually. Help me determine whether the problem is test setup, mock data, async handling, environment configuration, or actual code behavior.

9. I want to test database-related backend logic. Explain how to verify create, read, update, delete, relationships, constraints, and rollback behavior.

10. I need screenshots as proof of testing and Git workflow. Suggest exactly what screenshots to capture for frontend testing, API testing, terminal commands, Git commits, Pull Requests, and GitHub push.

## 8. Documentation Prompts

1. I completed a development task and need to update the README. Suggest sections for task summary, setup, commands used, features completed, screenshots, and repository status.

2. I completed an internship day task. Help me write a concise daily report with tasks completed, learning outcomes, problems faced, solutions applied, blockers, and next steps.

3. I used AI during development today. Help me write an AI usage report explaining prompts used, AI output reviewed, manual changes made, verification performed, and final result.

4. I need to document backend API endpoints. Suggest a clean format including method, route, purpose, request body, success response, error response, authentication requirement, and notes.

5. I learned a technical concept today. Help me structure learning notes with definition, why it matters, practical example, common mistakes, and my final understanding.

6. I need to document a Git workflow I practiced. Create a beginner-friendly explanation of branch creation, commits, push, Pull Request, merge, conflict creation, and conflict resolution.

7. I want to improve my documentation before submission. Review the text for clarity, professional tone, grammar, structure, missing details, and unnecessary wording.

8. I fixed a bug and need to document it. Suggest a professional format covering issue, cause, solution, files changed, verification steps, and screenshots.

9. I need a short submission message for completed internship work. Help me write it in clear bullet points with completed tasks, GitHub repository link, and proof added.

10. I want to maintain a learning journal during my internship. Suggest a repeatable structure for recording what I learned, commands used, mistakes made, corrections, and final outcome.

## 9. Deployment / Setup Prompts

1. I am setting up a project locally for the first time. Give me a setup checklist covering cloning the repo, installing dependencies, creating environment files, setting up PostgreSQL, running migrations, and starting the app.

2. I am deploying a Next.js frontend to Vercel. Explain what build settings, environment variables, API URLs, GitHub branch settings, and production checks I should verify.

3. I am deploying a NestJS backend to Render. Explain the correct build command, start command, port configuration, environment variables, database URL, and health check setup.

4. My deployment build failed. I will paste the logs. Help me identify whether the issue is TypeScript, dependency installation, missing environment variables, wrong build command, or platform configuration.

5. My deployed Next.js frontend cannot connect to the NestJS backend. Give me a checklist for API URL, CORS, backend health endpoint, environment variables, HTTPS, and browser network errors.

6. My NestJS backend works locally but not on Render. Explain how to check logs, start command, port binding, Node version, environment variables, and PostgreSQL connection.

7. I need to create a  .env.example  file. Suggest which variables should be included for frontend, backend, and database setup, while making sure no real secrets are exposed.

8. I want to prepare my GitHub repository for deployment. Explain which files should be committed, which files should be ignored, how to check  .gitignore , and how to avoid exposing secrets.

9. I am getting a database connection error after deployment. Help me debug the connection string format, credentials, SSL requirement, host, port, database access, and environment variable names.

10. I want to verify deployment after pushing changes. Give me a post-deployment checklist for frontend pages, backend health check, API endpoints, logs, database connection, and user-facing functionality.

## 10. AI Usage in Development Prompts

1. I want to ask AI for help with a coding task. Help me write a strong prompt that includes project stack, task goal, files involved, constraints, expected output, and what should not be changed.

2. I have a large development task and want to use prompt chaining. Break it into smaller AI prompts for understanding requirements, planning, implementation, testing, documentation, and final review.

3. I received AI-generated code. Give me a review checklist for correctness, security, readability, maintainability, project compatibility, and whether it changes existing behavior.

4. I want AI to debug an error without guessing. Help me prepare a complete prompt with error logs, command used, code snippets, expected behavior, actual behavior, and what I already tried.

5. I want AI to refactor code safely. Write a prompt that asks for cleaner code while clearly instructing AI not to change business logic, API response, database behavior, or existing tests.

6. AI suggested two different solutions for the same issue. Help me compare them based on simplicity, maintainability, risk, performance, project fit, and testing effort.

7. I want AI to explain code instead of rewriting it. Write a prompt asking for a line-by-line explanation, beginner-friendly summary, important concepts, and possible improvements.

8. I want to avoid blindly copying AI output. Give me a practical process for reviewing, testing, modifying, documenting, and committing AI-assisted changes responsibly.

9. I used AI during my internship task. Help me summarize how AI helped, what prompts I used, what output I accepted, what I changed manually, and how I verified the final work.

10. I have a weak prompt that gives poor AI answers. Rewrite it to include background context, constraints, expected output, examples, edge cases, and verification steps.
