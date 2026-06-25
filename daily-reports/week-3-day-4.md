# Week 3 Day 4 Daily Report

Date: 2026-06-25

## Tasks Completed
1. Added a query DTO that safely reads and validates search, completed, sort, order, page, and limit.
2. Upgraded the tasks endpoint to filter, sort, and paginate using Prisma.
3. Returned data, total, page, and lastPage so the frontend knows how many pages exist.
4. Made search match every typed word across the title and description, in any order.
5. Added a search box on the frontend that queries the API.
6. Added filter controls for all, done, and to do.
7. Added sort and order controls for the list.
8. Added Previous and Next pagination with a page indicator and total count.
9. Added an empty state for when a search or filter matches nothing.
10. Tested search, filter, sort, and pagination together and recorded a walkthrough.

## Links and PRs
Branch: week-3-day-4-search-filter-pagination
Pull request: https://github.com/abdnad-ai/internship-roadmap/pull/19

## AI Tools Used
Claude

## Prompts Used
1. Asked Claude to confirm the Day 4 tasks against the internship roadmap.
2. Asked it to add query parameters for search, filter, sort, and pagination to the tasks endpoint.
3. Asked for a query DTO that validates those parameters.
4. Asked for the frontend controls that drive the query string.
5. Asked to upgrade search so each typed word is matched in any order.

## Manual Changes Made
1. Created the query DTO and pasted the code.
2. Updated the service findAll to build the filter, sort, and pagination, and replaced the controller findAll to pass the query.
3. Replaced the frontend page to add the controls and to read the new response shape.
4. Swapped the search block to the word based version after testing.
5. Added sample tasks, ran both servers, and tested every control myself.

## Bugs and Blockers
1. Searching a gapped phrase like "AI chatbot" did not match a task titled "AI whatsapp chatbot", because the simple contains search looked for one continuous string. I upgraded search to match each word separately, in any order, which fixed it.
2. The response shape changed from a plain array to an object with data, total, page, and lastPage, which would have broken the frontend until I updated it to read result.data.

## What I Learned
Query parameters are the extra values after the question mark in a URL, and they let one endpoint return many different views of the same data without new routes. On the backend, Prisma builds the result from a where filter, an orderBy, and skip and take for paging, and a separate count query gives the total so the frontend can work out the number of pages. I also learned that a simple contains search only matches a continuous string, so splitting the search into words and requiring each word with an AND makes search feel much smarter. Finally, changing a response shape is a breaking change, the frontend has to be updated to match or it stops working.

## Tomorrow Plan
Start Week 3 Day 5, the assessment, by pulling the whole task manager together into a complete working full stack CRUD app.

## Deadline Status
All Day 4 tasks completed and submitted through the pull request. 