@'
# AI Usage Report - Week 2 Day 5

## Feature/Task
Users dashboard for the timed assessment, connected to the Day 4 users API, with add, remove, and working tabs.

## AI Tool Used
Claude

## Prompt Given
* Build a users dashboard connected to my Day 4 users API with loading and error states
* Restyle it like a premium dark SaaS design, and add a remove user option and working Dashboard, Users, and Settings tabs

## AI Output Summary
Provided the dashboard page that fetches users, adds users through the validated backend, removes users through the delete endpoint, switches between three tabs with state, and shows loading, error, and empty states, styled with a dark glow layout. Also fixed a duplicate id bug in the backend.

## What I Accepted
I accepted the dashboard layout, the add and remove logic, the tab switching, the dark SaaS styling, and the id fix, since they matched what I wanted and what the assessment needed.

## What I Rejected
I chose to reuse my Day 4 users API instead of building a new one to fit the time limit, and I asked for the design to be changed to match a reference I liked.

## Manual Changes Made
Created the route in the right folder, ran both servers, and tested add, remove, the tabs, and the error state myself.

## Risks Found
* The backend URL is hardcoded and would move to an environment variable for real deployment.
* The data is stored in memory and resets on restart, so a database is needed for real persistence.
* There is no confirmation step before removing a user, which a real app should add.

## Final Explanation in My Own Words
The dashboard talks to my NestJS API on port 3001. On load it fetches the users with a GET request and shows loading, error, or the list. Adding a user sends a POST that the backend validates before saving, then the list reloads. Removing a user sends a DELETE for that id, then reloads. The tabs are different views controlled by a state value. The id bug happened because the backend numbered users by list length, so after a delete an id got reused, and the fix was a counter that only goes up.
'@ | Set-Content -Path "C:\Users\abdullah\Desktop\internship-roadmap\ai-usage-reports\week-2-day-5-ai-usage.md" -Encoding utf8 