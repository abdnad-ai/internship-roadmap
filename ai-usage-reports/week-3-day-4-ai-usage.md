# Week 3 Day 4 AI Usage Report

## Feature or Task
Add search, filtering, sorting, and pagination to the task manager, on both the backend tasks endpoint and the frontend controls.

## AI Tool Used
Claude

## Prompt Given
I asked Claude to walk me through adding search, filter, sort, and pagination step by step. This included a query DTO that validates the parameters, upgrading the tasks endpoint to filter, sort, and paginate with Prisma and return a total count, and adding frontend controls, a search box, filter, sort, order, and Previous and Next pagination, that drive the query string. I also asked to upgrade search so each typed word matches in any order.

## AI Output Summary
Claude gave step by step code for each part. It provided the query DTO with validation, a rewritten findAll that builds a where filter for search and completed, an orderBy for sort and order, and skip and take for paging, returning data, total, page, and lastPage. It updated the controller to read the query, and replaced the frontend page to add the controls and read the new response shape. It then gave a word based search block that splits the input and requires each word with an AND.

## What I Accepted
1. The query DTO and its validation of safe sort and order values.
2. The Prisma based filter, sort, and pagination in the service.
3. The returned object with data, total, page, and lastPage.
4. The frontend controls and the URLSearchParams query building.
5. The word based search upgrade.

## What I Rejected
I did not keep the simple contains search, because it failed on gapped phrases like searching "AI chatbot" against "AI whatsapp chatbot". I switched to the word based version that matches each word in any order.

## Manual Changes Made
1. Created the query DTO and pasted the service and controller changes.
2. Replaced the frontend page to add the controls and read result.data.
3. Swapped in the word based search block after testing.
4. Added sample tasks and tested every control in the browser.
5. Recorded the walkthrough video.

## Risks Found
1. The sort field had to be whitelisted to a few known columns, otherwise a user could ask to sort by any field, which is unsafe.
2. Changing the response shape is a breaking change, the frontend would error until updated to read result.data.
3. Page must reset to 1 when search or filter changes, otherwise the user can be left on a page that no longer exists.

## Final Explanation in My Own Words
Query parameters let one endpoint serve many views of the same data. The backend reads them, builds a filter for search and completed, decides the order, and returns only the slice for the current page along with the total count, so the frontend can show how many pages there are. The frontend keeps the controls in state, builds them into a query string, and refetches whenever a control changes, which keeps the list in sync with what the user picked. Search was improved by splitting the typed text into words and requiring each one to appear, so the order of words no longer matters.