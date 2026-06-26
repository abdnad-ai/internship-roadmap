# Week 3 Day 5 AI Usage Report

## Feature or Task
Week 3 assessment. Verify, polish, and document the complete full stack task manager and present it as one finished CRUD app.

## AI Tool Used
Claude

## Prompt Given
I asked Claude to confirm the Day 5 assessment tasks, walk me through verifying the whole app end to end, fix the description field so I could write multiple lines, and write a README that documents both the backend and frontend. I also asked it to explain how the Day 5 deliverable differs from Day 4.

## AI Output Summary
Claude gave a verification checklist covering create, read, update, delete, search, filter, sort, pagination, and the empty and error states. It changed the description inputs to textareas with line break support and fixed the edit field text colors for the dark theme. It produced a full README with features, tech stack, setup steps for both projects, environment variables, and an API reference. It also explained that Day 5 is an assessment that packages and proves the existing app rather than adding features.

## What I Accepted
1. The end to end verification checklist.
2. The textarea change and the readable text color fix.
3. The README content and structure.
4. The explanation of the assessment purpose.

## What I Rejected
I did not put my real database password in the README. I kept the placeholder and left the real value only in the gitignored env file.

## Manual Changes Made
1. Tested every feature in the browser myself.
2. Applied the textarea and color changes and saved the file.
3. Wrote the README to match my actual project.
4. Added fresh tasks and recorded the walkthrough video.

## Risks Found
1. A README is committed to GitHub, so putting a real password in it would leak the secret. The placeholder avoids that.
2. Delete is permanent, so testing the delete feature really removes data. The database, not the screen, is the source of truth.
3. After a theme change, every text field has to be rechecked for contrast, since dark text on a dark card becomes invisible.

## Final Explanation in My Own Words
The assessment is not about building something new, it is about showing that the whole app works as one product. The frontend lets a user manage tasks, the backend stores them in PostgreSQL through Prisma, and the two talk over the network. Everything a user does is saved straight to the database, which is the real record, while the screen just shows what the current query returns. Documenting the app in a README and demoing it on video proves I understand how the pieces fit together and can hand the project to someone else.