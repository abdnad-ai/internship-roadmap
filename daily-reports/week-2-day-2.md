# Week 2 Day 2 Daily Report

## Date

Week 2 Day 2

## Tasks Completed

* Practiced Tailwind UI structure.
* Created reusable frontend components in Next.js.
* Built a route-based dashboard layout.
* Created separate feature pages for the dashboard.
* Built the SkillForge Studio dashboard concept.
* Created a NestJS Users module.
* Created a Users controller.
* Created a Users service.
* Built a users CRUD skeleton.
* Tested the NestJS users API locally.
* Added learning notes and reports.

## Frontend Work

Created a Next.js dashboard project with a custom premium theme and separate pages.

Pages created:

* Command Center
* Skill Map
* Mission Board
* Talent Pods
* Reflection Vault

Reusable components created:

* AppShell
* Sidebar
* PageHeader
* SignalCard
* MissionCard
* PodCard

## Backend Work

Created a NestJS users API project with CRUD skeleton routes.

Routes tested:

* GET /users
* GET /users/1

Additional CRUD skeleton routes created:

* POST /users
* PATCH /users/:id
* DELETE /users/:id

## Issues Faced

* The nest command was not recognized globally, so I used npx with the NestJS CLI.
* Some dashboard routes showed 404 at first because page.js files were not created yet.
* I fixed the issue by adding page.js files inside each route folder.

## Outcome

Completed the Week 2 Day 2 dashboard layout and users CRUD skeleton tasks.
 