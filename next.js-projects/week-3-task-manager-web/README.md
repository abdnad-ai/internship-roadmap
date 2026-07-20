 # SkillForge - Task Manager Web

Frontend for SkillForge, a full-stack task manager with JWT authentication, protected routes, role-based dashboard views, and AI features.

## Related Projects

- nestjs-projects/week-3-task-manager-api - the backend API

## Prerequisites

- Node.js installed
- Backend API running on http://localhost:3001

## Environment Variables

Create a .env.local file in the week-3-task-manager-web folder with:

NEXT_PUBLIC_API_URL="http://localhost:3001"

## Setup

npm install
npm run dev

Frontend runs on http://localhost:3000

## Authentication System

- Login and register screens with a split-screen dark violet/indigo theme
- Access token and refresh token stored client side, with silent refresh before token expiry
- Protected routes redirect to login if the user is not authenticated
- Role-based rendering, admin users see an admin panel, regular users do not

## Test Accounts

| Role  | Email                  | Password    |
|-------|------------------------|-------------|
| Admin | superadmin@test.com    | super12345  |
| User  | an289321@gmail.com     | abdnad23    |

## Pages

- /login - login screen
- /register - registration screen
- /dashboard - protected dashboard, visible to all logged in users
- /admin - protected admin panel, visible only to ADMIN role

## AI Features

- /chat - streaming AI chat interface, connects to the backend's streaming endpoint and renders responses as they arrive
- /support - AI Support Agent, submit a question and get a response with an automatic category and priority tag
- /support/history - JWT protected, shows the current user's past support conversations, most recent first
- The support pages require being logged in, requests are sent through the app's existing authenticated apiFetch helper 
## Testing

- npm test - runs the full Jest test suite (React Testing Library)
- npm test -- <filename> - runs a single test file, for example npm test -- login/page.test.js
- Covers the login form (rendering, input handling, loading state, error handling) and the AnimatedWaveBg component
- Components that depend on WebGL (HeroScene) can't be meaningfully tested with jsdom, see docs/manual-test-cases.md for documented manual test steps instead

## Docker

- "docker build -t skillforge-frontend ." - builds the image (multi-stage: builds the production Next.js output, then a lean runtime)
- "docker run -p 3000:3000 skillforge-frontend" - runs the container
- The container serves the app on port 3000, but still needs the backend running separately (either as its own container on port 3001, or locally) for anything that hits the API

