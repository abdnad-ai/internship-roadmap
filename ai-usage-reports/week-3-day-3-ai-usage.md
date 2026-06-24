# Week 3 Day 3 AI Usage Report

## Feature or Task
Build the Next.js task manager frontend and connect it to the Week 3 CRUD API, with create, list, edit, toggle, and delete, plus loading, empty, and error states and a custom theme.

## AI Tool Used
Claude

## Prompt Given
I asked Claude to walk me through building the task manager UI step by step. This included a tasks page that fetches and lists tasks with loading, empty, and error states, a create form wired to the POST endpoint, edit and a done toggle using PATCH, delete using DELETE, and then restyling the whole page into a warm playful dark theme with smooth transitions.

## AI Output Summary
Claude gave step by step code for each part. It built the tasks page with three states and a fetch on load, added the create form and a submit handler, added edit mode, a toggle that sends only the completed field, and a delete handler, each refetching the list after the change. It then restyled everything with Tailwind into a warm theme and explained why the connection failures were happening, the servers not running, and that CORS was already allowed.

## What I Accepted
1. The tasks page with loading, empty, and error states.
2. The create, edit, toggle, and delete handlers wired to the API.
3. The pattern of updating the backend then refetching the list.
4. The Tailwind theme and the smooth transition tweaks.

## What I Rejected
I did not keep the first light theme. I asked for a darker background and darker cards and adjusted the colors myself so it matched the look I wanted, and I removed the strikethrough on completed titles.

## Manual Changes Made
1. Ran create-next-app and removed the nested git folder.
2. Pasted the page code and saved it.
3. Changed the background and cards to dark, made the input text white, and removed the strikethrough.
4. Tested every action in the browser and recorded the walkthrough.

## Risks Found
1. The frontend and backend must both be running, otherwise the page fails with connection refused or failed to fetch. This is easy to forget with two servers.
2. CORS can block cross origin calls. It was already allowed here, but if it were not, the backend would need to permit the frontend origin.
3. After a theme change, text color has to be rechecked, since dark text on a dark card becomes unreadable.

## Final Explanation in My Own Words
The frontend is the screen the user sees and the backend is the service that stores the data, and they run as two separate programs that talk over the network. When the page loads it asks the backend for the tasks and shows them, and while it waits it shows a loading message, if there are none it shows an empty message, and if the request fails it shows an error with a retry. When the user adds, edits, toggles, or deletes a task, the page sends that change to the backend, the backend updates the database, and the page refetches the list so the screen matches the database. The browser also protects users by blocking calls between different origins unless the backend allows it, which is what CORS does. 