# Week 3 Day 3 Daily Report

Date: 2026-06-24

## Tasks Completed
1. Scaffolded a new Next.js frontend project named week-3-task-manager-web.
2. Built a tasks page that fetches and lists all tasks from the GET /tasks endpoint.
3. Added loading, empty, and error states, with a try again button on error.
4. Added a create form that posts a new task and refreshes the list so it appears.
5. Added edit mode so a task title and description can be updated through PATCH.
6. Added a done toggle that flips completed on or off through PATCH.
7. Added delete that removes a task through DELETE and updates the list.
8. Confirmed the frontend talks to the backend across ports, CORS was already allowed.
9. Styled the whole UI with Tailwind into a warm dark theme with smooth transitions.
10. Tested the full flow in the browser and recorded a walkthrough video as proof.

## Links and PRs
Branch: week-3-day-3-task-manager-ui
Pull request: 

## AI Tools Used
Claude

## Prompts Used
1. Asked Claude to confirm the Day 3 tasks against the internship roadmap.
2. Asked it to build a tasks page that lists tasks with loading, empty, and error states.
3. Asked for a create form wired to the POST endpoint.
4. Asked for edit and a done toggle, both using the PATCH endpoint.
5. Asked for delete wired to the DELETE endpoint.
6. Asked it to restyle the UI into a warm playful dark theme and to smooth the transitions.

## Manual Changes Made
1. Ran create-next-app and removed the nested git folder so the parent repo stays clean.
2. Pasted and saved the tasks page code.
3. Adjusted the theme myself, changed the background and cards to dark, made the input text white, removed the strikethrough on done titles, and kept the warm orange and amber accents.
4. Ran both servers and tested every action in the browser.
5. Recorded the walkthrough video and captured the empty state screenshot.

## Bugs and Blockers
1. The page first showed connection refused because the frontend dev server was not running. I started it on port 3000.
2. The page then showed failed to fetch because the backend was not running. I started the backend on port 3001, and the list loaded.
3. After switching the cards to dark, the input text and some labels were hard to read. I changed the input text to white and lightened the card text.

## What I Learned
A frontend and a backend are two separate programs that run at the same time and talk over the network, the frontend on port 3000 and the backend on port 3001. The browser blocks calls from one origin to another unless the backend allows it through CORS, which is why a frontend and backend that work alone can still fail to connect. I also learned how the four states of a screen work in practice, loading while the request is in flight, empty when there is no data, error when the request fails, and success when data is shown, and that updating the backend then refetching keeps the screen in sync with the database. This is the same create, read, update, delete pattern that sits behind almost every real app.

## Tomorrow Plan
Start Week 3 Day 4 by adding search, filters, pagination, and sorting to the task list using query parameters.

## Deadline Status
All Day 3 tasks completed and submitted through the pull request.