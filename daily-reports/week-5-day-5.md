# Week 5 Day 5 Daily Report

Date: 2026-07-17

## Tasks Completed
1. Ran through the AI Support Agent MVP end to end, submitting queries, getting categorized responses, and confirming they saved to history.
2. Added a visible validation message for empty query submissions instead of silently doing nothing.
3. Removed a leftover debug console.error from the support agent's error handling, confirmed no console logs remain across the AI feature.
4. Confirmed no hardcoded secrets exist, the Gemini API key is only ever read from environment variables.
5. Wrote prompt documentation covering all three prompts used in the AI service, the plain test prompt, the streaming formatting prompt, and the structured support agent JSON prompt.
6. Updated the backend README with the support agent and history endpoints, and a link to the prompt documentation.
7. Rewrote the frontend README's AI section, replacing content that had been copied from the backend, with the actual frontend pages and their behavior.
8. Took screenshots of the support agent response and the history page.
9. Fixed a misplaced prompts folder that had been created inside the backend project instead of the repository root.
10. Committed and pushed all changes.

## Links and PRs
Branch: week-5-day-5-assessment
Pull request: 

## AI Tools Used
Claude

## Prompts Used
1. Asked Claude to confirm the Day 5 assessment tasks against the internship roadmap.
2. Asked for help writing prompt documentation that accurately reflected the real prompts already in the code, rather than generic placeholder text.
3. Asked for a fix to the silent empty query submission, replacing it with a visible message.
4. Asked for help diagnosing why edits kept landing in the wrong README file, and why staged screenshots weren't appearing in git status output.

## Manual Changes Made
1. Manually verified every prompt documented matched the exact text in the code, using Select-String rather than trusting memory.
2. Manually tested the empty query message and the full support agent flow after each change.
3. Caught that frontend README content had accidentally been pasted into the backend README, and rebuilt both files cleanly from verified content.
4. Diagnosed that staged screenshots were not missing, just hidden by terminal scrolling, using git diff --cached --stat to confirm instead of relying on the truncated git status view.
5. Manually moved the prompt documentation folder from an incorrect nested location to the repository root.

## Bugs and Blockers
1. Gemini occasionally failed on the first attempt during testing with rate limit or temporary overload errors, requiring a retry, this is an upstream API limitation rather than a bug in the app.
2. An editing mix up caused frontend README content to be pasted into the backend README, caught by checking both files directly with their full paths rather than assuming the edit landed correctly.
3. The prompts folder was created inside the wrong project directory, caught by checking file paths explicitly rather than assuming a relative path resolved as expected.

## What I Learned
Assessment days are as much about auditing your own past work as building anything new, most of today was verifying that earlier days' code actually matched what the documentation claimed, and catching drift between the two. I also learned to distrust a clean looking terminal output when working across multiple files with similar names or shared section headers, checking exact file paths and using targeted commands like git diff --cached instead of a full status listing avoided several false alarms today.

## Tomorrow Plan
Finish recording the walkthrough video for Week 5 Day 5 once Gemini's request limits stabilize, then merge the PR and move to Week 6.

## Deadline Status
All Day 5 tasks completed except the walkthrough video, which will be added once available. Submitted through the pull request. 