 # SkillForge - Task Manager API

Backend for SkillForge, a full-stack task manager with JWT authentication, refresh tokens, and role-based access control.

## Related Projects

- next.js-projects/week-3-task-manager-web - the frontend app

## Prerequisites

- Node.js installed
- PostgreSQL installed and running
- A PostgreSQL database named task_manager

## Environment Variables

Create a .env file in the week-3-task-manager-api folder with:

DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/task_manager?schema=public"
JWT_SECRET="your-access-token-secret"
JWT_REFRESH_SECRET="your-refresh-token-secret"
GEMINI_API_KEY="your-gemini-api-key"

## Setup

npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev

Backend runs on http://localhost:3001

Frontend setup instructions are in the frontend repo, runs on http://localhost:3000

## Authentication System

- JWT access tokens (short-lived) and refresh tokens (long-lived) with bcrypt password hashing
- Silent refresh on the frontend keeps the session alive without re-login
- Guards protect routes based on login status and user role
- Roles: USER and ADMIN, with an admin panel restricted to ADMIN role only

## Test Accounts

| Role  | Email                  | Password    |
|-------|------------------------|-------------|
| Admin | superadmin@test.com    | super12345  |
| User  | an289321@gmail.com     | abdnad23    |

## Auth Endpoints

- POST /auth/register - create a new user
- POST /auth/login - returns access and refresh tokens
- POST /auth/refresh - returns a new access token
- GET /auth/me - returns the current logged in user

## AI Service

- Uses Google Gemini (gemini-3.5-flash) to generate text responses from prompts
- POST /ai/test - accepts a prompt string and returns the generated response, used for testing the AI service connection
- POST /ai/stream - streams a Gemini response back in chunks for the chat interface
- POST /ai/support - JWT protected, accepts a support query and returns a structured response with an automatic category and priority, and saves the conversation to the database
- GET /ai/support/history - JWT protected, returns the current user's past support conversations, most recent first
- Includes prompt length validation and empty prompt rejection before calling the API
- Prompt templates are documented in prompts/ai-service/prompt-documentation.md