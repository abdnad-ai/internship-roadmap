# Week 5 Day 2 Daily Report

Date: 2026-07-08
 
## Tasks Completed
1. Learned how streaming responses differ from a single blocking response, and how an async generator can yield chunks as they arrive from the Gemini API.
2. Added a streaming method to the backend AI service using Gemini's generateContentStream API.
3. Added a POST /ai/stream endpoint that sets chunked response headers and writes each chunk directly to the response as it streams in.
4. Built a new chat page in the SkillForge frontend with a scrollable message list, message bubbles, and an input field.
5. Added a 3D animated glass gem as a background accent on the chat page, reusing the design direction built separately in the next-gen-ui-template project.
6. Connected the frontend to the streaming endpoint using the fetch API and a ReadableStream reader, rendering each chunk into the AI message as it arrives.
7. Added a typing indicator that shows while the AI message is still empty and streaming.
8. Added error handling on the frontend for failed or interrupted streams, showing a clear message instead of the UI hanging.
9. Tested the chat interface with a factual question, a longer multi-paragraph request, and a numbered list request, all streamed correctly.
10. Noticed the AI responses used heavy markdown formatting like asterisks and em dashes, adjusted the prompt sent to Gemini to request plain conversational text instead.

## Links and PRs
Branch: week5-day2-streaming-chat-ui
Pull request: 

## AI Tools Used
Claude

## Prompts Used
1. Asked Claude to confirm the Day 2 tasks against the internship roadmap.
2. Asked for a NestJS streaming endpoint using Gemini's stream API with correct response headers.
3. Asked for a chat UI connected to that streaming endpoint using fetch and a stream reader.
4. Asked for help fixing missing project files after some were accidentally deleted mid session.
5. Asked for a fix to reduce heavy markdown formatting in the AI responses.

## Manual Changes Made
1. Tested the streaming endpoint directly with PowerShell before connecting the frontend, to confirm the backend worked in isolation.
2. Caught that this frontend project uses a root level app folder and plain JavaScript, not a src folder or TypeScript, and adjusted the new files to match instead of assuming the other project's structure.
3. Recovered project files for both next-gen-ui-template and this frontend after they were accidentally deleted, restoring them from already committed git history.
4. Manually tested the chat interface with multiple prompt types and confirmed streaming, the typing indicator, and error handling all worked as expected.
5. Adjusted text sizing and header styling in the chat UI for readability after an initial pass looked too small and plain.

## Bugs and Blockers
1. Files in both the priority task project and this frontend were accidentally deleted mid session, both were fully recoverable since everything had already been committed and pushed to their respective branches.
2. This frontend project turned out to use plain JavaScript with a root level app folder, not TypeScript with a src folder like the other project, so copied components needed adjusting to match.
3. AI responses were heavy on markdown formatting by default, fixed by adjusting the prompt sent to the model.

## What I Learned
Committing early and often paid off directly today, when files were accidentally deleted from disk, everything was recoverable in seconds because it had already been pushed to git, nothing had to be rebuilt from scratch. Also learned that copying code between two Next.js projects isn't a safe assumption, project structure, JavaScript versus TypeScript, and folder conventions can differ even within the same repo, so it's worth checking the target project's actual structure before pasting anything in. Finally, streaming an LLM response is mostly about plumbing, reading a ReadableStream chunk by chunk and appending to state, rather than anything complex on the AI side itself.

## Tomorrow Plan
Start Week 5 Day 3, building an AI Resume Analyzer or AI Support Agent MVP on top of this streaming AI service.

## Deadline Status
All Day 2 tasks completed and submitted through the pull request.