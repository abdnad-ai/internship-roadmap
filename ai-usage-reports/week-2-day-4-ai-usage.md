@'
# AI Usage Report - Week 2 Day 4

## Feature/Task
Connect the Next.js users page to the NestJS backend with loading and error states.

## AI Tool Used
Claude

## Prompt Given
* Build a users list page in Next.js that fetches from the NestJS API with loading, error, and empty states
* Update the NestJS users endpoint to return a list and enable CORS

## AI Output Summary
Provided the updated users service returning an in memory list, CORS setup in main.ts, and a users page using useEffect fetch with the four states.

## What I Accepted
I accepted the in memory users list on the backend, the CORS configuration, and the users page structure with the four states, since they matched what the day required.

## What I Rejected
I did not add anything beyond the users list page, since the deliverable was specifically the list connected to the backend, not the full create flow from the form.

## Manual Changes Made
I created the route in the correct folder, ran both servers, verified the JSON endpoint, and tested the error state by stopping the backend.

## Risks Found
* The localhost URL is hardcoded and would move to an env variable for real deployment.
* In memory data resets on server restart, real persistence comes with a database in Week 3.

## Final Explanation in My Own Words
(your words: how data flows from the UI fetch to the NestJS endpoint and back, and why CORS and loading and error states matter)
'@ | Set-Content -Path "C:\Users\abdullah\Desktop\internship-roadmap\ai-usage-reports\week-2-day-4-ai-usage.md" -Encoding utf8  