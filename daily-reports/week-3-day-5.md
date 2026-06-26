# Week 3 Day 5 Daily Report

Date: 2026-06-26

## Tasks Completed
1. Verified the complete task manager end to end, create, read, edit, toggle, and delete all work.
2. Confirmed search, filter, sort, and pagination work together.
3. Confirmed all four UI states show correctly: loading, empty, error, and success.
4. Confirmed errors are handled on both sides, a missing task returns a 404 and invalid input is rejected.
5. Confirmed secrets stay in the env file and nothing sensitive is committed.
6. Polished the description field to a textarea so descriptions can span multiple lines.
7. Fixed the edit field colors so text is readable on the dark theme.
8. Wrote a README with what the app is, setup, how to run the backend and frontend, environment variables, and the API reference.
9. Recorded a full walkthrough video of the complete app.

## Links and PRs
Branch: week-3-day-5-assessment
Pull request: https://github.com/abdnad-ai/internship-roadmap/pull/20

## AI Tools Used
Claude

## Prompts Used
1. Asked Claude to confirm the Day 5 assessment tasks against the internship roadmap.
2. Asked it to walk me through verifying the whole app end to end.
3. Asked it to fix the description field so I could write multiple lines.
4. Asked it for a README that documents both the backend and frontend.
5. Asked it to explain how Day 5 differs from Day 4.

## Manual Changes Made
1. Ran both servers and tested every feature myself.
2. Changed the description inputs to textareas and made the edit field text white.
3. Wrote and saved the README, keeping the database password out of it.
4. Added fresh tasks and recorded the walkthrough video.

## Bugs and Blockers
1. The edit description text was dark on the dark card and could not be read. I changed it to white to match the theme.
2. I thought some test tasks had not saved, but the database showed the real count. The missing ones had been deleted during earlier testing, so saving was working correctly.

## What I Learned
An assessment day is about proving the whole app works together, not adding features. The same create, read, update, delete app from Days 1 to 4 becomes the deliverable once it is verified, polished, and documented. I also understood clearly that every task is saved permanently in the database the moment it is added, and the database is the source of truth, the screen only reflects what the queries return. Writing the README showed me how to document a project so someone else can set it up, and why the real password belongs only in the env file while the README uses a placeholder.

## Tomorrow Plan
Begin Week 4, authentication, authorization, and the dashboard.

## Deadline Status
Week 3 assessment completed and submitted through the pull request.