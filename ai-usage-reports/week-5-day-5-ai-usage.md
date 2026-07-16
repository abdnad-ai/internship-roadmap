# Week 5 Day 5 AI Usage Report

## Feature or Task
Assessment day for the AI Support Agent MVP, running the feature end to end, cleaning up, documenting the prompts used across the AI service, and updating both READMEs.

## AI Tool Used
Claude

## Prompt Given
I asked Claude to walk through the assessment checklist, confirm no debug logs or hardcoded secrets remained, write documentation for the exact prompts already in the code, and update both project READMEs to reflect the finished AI feature set. I also asked for help after some edits landed in the wrong file and after staged screenshots appeared to be missing.

## AI Output Summary
Claude pulled the actual prompt text directly from the codebase using targeted searches before writing documentation, rather than reconstructing it from memory, to make sure the docs matched reality exactly. It caught that the frontend README's AI section had been copied verbatim from the backend one on an earlier day, and rewrote both files with content specific to each project. When screenshots appeared missing from git status, it used git diff --cached --stat to prove they were actually staged correctly and the issue was just terminal output being cut off.

## What I Accepted
1. The prompt documentation content, verified against the actual code.
2. The empty query validation fix.
3. The rewritten backend and frontend README AI sections.
4. The diagnosis that a misplaced prompts folder needed to move to the repository root.
5. The diagnosis that staged screenshots were present despite not appearing in the visible terminal output.

## What I Rejected
Nothing major, every fix was verified against actual file contents or command output before being treated as done.

## Manual Changes Made
1. Searched the actual ai.service.ts file for the exact prompt strings before documenting them, rather than assuming the documentation from memory.
2. Manually retested the empty query case and the full support flow after each fix.
3. Manually confirmed which README had which content using full absolute paths, after an editing mix up crossed the two files.
4. Manually moved a misplaced folder to the correct location and verified with Test-Path before and after.

## Risks Found
1. Documentation written from memory instead of the actual code can drift from reality, verifying against the real file before writing it down catches this early.
2. Two similarly structured files, like a backend and frontend README with matching section names, are easy to mix up mid edit, checking the full absolute path before editing avoided further mistakes.
3. Terminal output can be misleading when scrolled, a full git status can hide a section that a more targeted command like git diff --cached would show clearly.

## Final Explanation in My Own Words
The Support Agent MVP is now fully documented end to end, three prompts cover the entire AI service, a bare pass-through prompt for basic testing, a formatting instruction wrapped around the streaming chat prompt, and a fully structured JSON schema prompt for the support agent that defines its own valid categories and priorities inline. Today's work was mostly verification rather than new building, confirming the code matched its own documentation, that no debug artifacts or secrets were left behind, and that both READMEs accurately described what each project actually does. The most useful habit from today was checking things directly, the real file content, the real staged git diff, rather than trusting a summary or an assumption that an earlier step had worked. 