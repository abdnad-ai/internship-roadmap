# Week 5 Day 2 AI Usage Report

## Feature or Task
Add streaming AI responses to the backend and build a real streaming chat interface in the SkillForge frontend, connected to the live Gemini service.

## AI Tool Used
Claude 

## Prompt Given
I asked Claude to explain streaming responses, then walk through adding a streaming method and endpoint to the existing AI service, followed by a chat UI on the frontend that consumes that stream and renders it progressively. I also asked for help recovering after files were accidentally deleted, and for a fix to reduce heavy markdown formatting in responses.

## AI Output Summary
Claude gave a streaming service method using Gemini's stream API, a controller endpoint that writes chunks directly to the response, and a frontend chat page that reads the stream with a ReadableStream reader and appends each chunk to the AI message in state. It also caught that this frontend project used a different structure (root level app folder, plain JavaScript) than assumed, and adjusted the approach accordingly. When files were accidentally deleted, it walked through restoring them from already committed git history rather than rebuilding from scratch.

## What I Accepted
1. The streaming service method and controller endpoint.
2. The chat UI structure, message bubbles, input, typing indicator.
3. The fetch and ReadableStream based frontend streaming logic.
4. The git restore approach after accidental file deletion.
5. The prompt adjustment to reduce markdown formatting in responses.

## What I Rejected
Nothing major. Text sizing and header styling were iterated on based on visual feedback rather than accepted as first given.

## Manual Changes Made
1. Tested the streaming endpoint directly with PowerShell before wiring up the frontend.
2. Verified this frontend's actual folder structure and JavaScript setup before adding new files, rather than assuming it matched the other project.
3. Manually tested the chat interface across multiple prompt types and confirmed streaming, the typing indicator, and error handling all worked.
4. Adjusted text sizing and header styling based on direct visual review of the running app.

## Risks Found
1. Assuming two Next.js projects share the same folder structure or language (TypeScript versus JavaScript) can lead to broken imports or misplaced files, worth checking the target project directly first.
2. Accidentally deleting files mid session is a real risk when working across multiple terminals and editors, frequent small commits are what made recovery possible here.
3. LLM responses default to heavy markdown formatting unless explicitly told otherwise, worth setting that expectation in the prompt for any plain text chat interface.

## Final Explanation in My Own Words
Streaming works by having the backend read the Gemini response as an async generator, yielding each chunk as it arrives instead of waiting for the full response, then writing each chunk straight to the HTTP response so the connection stays open and data flows continuously. On the frontend, fetch gives access to the response body as a ReadableStream, which I read chunk by chunk with a reader and decode into text, appending each piece to the last message in state so React re-renders progressively instead of waiting for one final update. The typing indicator shows whenever that last AI message is still empty, and error handling wraps the whole stream read in a try catch so a dropped connection shows a clear message instead of leaving the UI stuck.