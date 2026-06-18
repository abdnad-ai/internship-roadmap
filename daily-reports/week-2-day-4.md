@'
# Week 2 Day 4 Daily Report

## Date
Week 2 Day 4

## Tasks Completed
* Updated the NestJS users endpoint to return a real users list
* Enabled CORS so the frontend can call the backend
* Built a users list page in Next.js at /users
* Fetched users from the backend when the page loads
* Added loading, error, and empty states
* Displayed the users in a styled list
* Tested success and error states with both servers running

## Frontend Work
Built a users page at /users in the Next.js project. It uses useEffect to fetch from the NestJS backend when the page loads, and renders four states: loading while the request runs, error if it fails, empty if the list is empty, and the user list on success. Each user shows name, email, and id in a styled card.

## Backend Work
Updated the users service so GET /users returns an in memory list of users, and the create method adds new users to that same list. Enabled CORS in main.ts for http://localhost:3000 so the frontend is allowed to call the API on port 3001.

## Links/PRs
Merged into main through the week-2-day-4-users-list-integration pull request.

## AI Tools Used
Claude

## Prompts Used
* Update the NestJS users endpoint to return a list and enable CORS
* Build a Next.js users page that fetches from the backend with loading, error, and empty states

## Manual Changes Made
Created the users route inside the correct project folder, pasted the page and backend code, verified the JSON response in the browser, and tested the error state by stopping the backend and refreshing.

## Bugs/Blockers
The users folder was first created in the wrong directory because the terminal was at the repo root. Fixed it by running the command from inside the frontend project folder.

## What I Learned
I learned how a frontend talks to a backend over an API, how to fetch data when a page loads, and why CORS is needed when the two run on different ports. I also understood the difference between in memory data, which resets on restart, and real database storage that comes later.

## Tomorrow Plan
Week 2 Day 5: timed assessment building a dashboard and users API.

## Deadline Status
On-time
'@ | Set-Content -Path "C:\Users\abdullah\Desktop\internship-roadmap\daily-reports\week-2-day-4.md" -Encoding utf8 