# Week 2 Day 5 Daily Report

## Date
Week 2 Day 5

## Tasks Completed
* Built a users dashboard in Next.js for the timed assessment
* Reused the Day 4 NestJS users API as the backend
* Added a stats row showing total users and connection status
* Built an add user form that posts to the backend with validation
* Added a remove user option using the backend delete endpoint
* Made the Dashboard, Users, and Settings nav items working tabs
* Handled loading, error, and empty states
* Fixed a duplicate id bug by using an incrementing counter
* Recorded a video walkthrough of the working app

## Frontend Work
A dashboard page at /dashboard with a premium dark layout, a stats row, an add user form, a users list with remove buttons, and three working tabs for Dashboard, Users, and Settings. It fetches from the backend and handles loading, error, and empty states.

## Backend Work
Reused the Day 4 NestJS users API on port 3001, which provides list, validated create, and delete endpoints, with CORS enabled. Fixed the create method to assign unique ids with a counter so ids are never reused after deletion.

## Links/PRs
Merged into main through the week-2-day-5-assessment-dashboard pull request.

## AI Tools Used
Claude

## Prompts Used
* Build a users dashboard that connects to my Day 4 users API
* Make it look like a premium dark SaaS design with a remove option and working tabs

## Manual Changes Made
Created the dashboard route in the correct project folder, pasted and ran the code, started both servers, and tested add, remove, the tabs, and the error state.

## Bugs/Blockers
The frontend was not running at first, which caused a connection refused error. There was also a duplicate React key error caused by the backend reusing ids after a delete. Both were fixed.

## What I Learned
I learned how to combine fetch, create, and delete in one dashboard, how to switch views with state for working tabs, and why ids from a database or counter should never be reused once assigned.

## Tomorrow Plan
Week 3 Day 1: PostgreSQL and Prisma, schema, migrations, and seed data.

## Deadline Status
On-time
'@ | Set-Content -Path "C:\Users\abdullah\Desktop\internship-roadmap\daily-reports\week-2-day-5.md" -Encoding utf8