# Week 5 Day 3 Daily Report

Date: 2026-07-16

## Tasks Completed
1. Chose to build an AI Support Agent MVP over a Resume Analyzer.
2. Designed the input flow, a free text support query in, and a structured response out with an automatic category and priority tag.
3. Added a generateSupportResponse method to the AI service that sends a structured prompt to Gemini and parses a JSON response.
4. Added input validation for empty and oversized queries, reusing the existing length check already in the AI service.
5. Built a POST /ai/support endpoint.
6. Built the support page frontend, an input, a submit button, and a results section showing the response with category and priority badges.
7. Connected the frontend to the backend and displayed the structured result.
8. Added loading and error states, including rotating status messages while waiting for a response.
9. Redesigned the page with an animated multicolor wave background, a stronger headline, and a smoother submit interaction based on a reference design.
10. Adjusted the AI prompt to reduce excessive markdown formatting like asterisks and em dashes in responses.
11. Tested the feature with several realistic support queries and confirmed the category and priority tagging was sensible and consistent.

## Links and PRs
Branch: week5-day3-support-agent-mvp
Pull request: https://github.com/abdnad-ai/internship-roadmap/pull/29 

## AI Tools Used
Claude

## Prompts Used
1. Asked Claude to confirm the Day 3 tasks against the internship roadmap and help decide between the Resume Analyzer and Support Agent options.
2. Asked for a structured prompt design that returns a response, category, and priority as JSON from Gemini.
3. Asked for the support page UI, then for a redesign matching a reference landing page with an animated background.
4. Asked for help diagnosing Gemini rate limit and daily quota errors, and for a smoother loading and result transition experience.

## Manual Changes Made
1. Manually tested the endpoint directly with PowerShell before wiring up the frontend.
2. Diagnosed a missing constant bug that broke the page after an earlier edit, and restored it.
3. Diagnosed a Gemini daily quota error versus a temporary server overload error by reading the actual error responses in the backend logs.
4. Tried several Gemini model names after the original one hit its daily quota, settling on a currently available model.
5. Manually reviewed the redesigned page against the reference and iterated on spacing, the input field type, and the loading indicator based on visual feedback.

## Bugs and Blockers
1. A shared constant used for priority badge colors was accidentally lost during an earlier edit, causing a runtime error, found and fixed by checking the browser's error overlay.
2. Hit Gemini's free tier daily quota of 20 requests for the original model after heavy testing across the AI service, resolved by switching models.
3. Encountered temporary 503 errors from Gemini during testing, unrelated to the app itself, resolved by waiting and retrying.

## What I Learned
Structured JSON output from an LLM is reliable once the prompt explicitly defines the exact shape expected, but it still needs defensive parsing since the model can occasionally wrap its response in formatting that needs stripping first. I also learned the difference between a per minute rate limit and a daily quota on the Gemini free tier, they look similar in the error message but need different responses, waiting briefly versus switching models or waiting until the next day. Finally, a good loading state matters more than I expected, splitting a single generic loading label into a spinner plus rotating status text made a multi second wait feel much less broken.

## Tomorrow Plan
Move to Week 5 Day 4, persisting AI conversations in PostgreSQL and building a history page.

## Deadline Status
All Day 3 tasks completed and submitted through the pull request. 