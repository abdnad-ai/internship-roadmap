# SkillForge - Task Manager Web

Frontend for SkillForge, a full-stack task manager with JWT authentication, protected routes, and role-based dashboard views.

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