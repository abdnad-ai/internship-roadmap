# Week 5 Day 3 AI Usage Report

## Feature or Task
Build an AI Support Agent MVP, a support query input that returns a helpful response with an automatic category and priority tag, then redesign the page around a reference landing page aesthetic.

## AI Tool Used
Claude

## Prompt Given
I asked Claude to help decide between a Resume Analyzer and a Support Agent, then design a structured prompt that gets Gemini to return a response, category, and priority as JSON. I also asked for the frontend UI, first a simple version, then a full redesign based on a reference screenshot with an animated background and smoother loading states.

## AI Output Summary
Claude gave a structured prompt template with an explicit JSON shape, a service method that parses and validates that output, and a controller endpoint. On the frontend, it gave an input and results UI, then rebuilt it with an animated multicolor wave background, a spinner and rotating status text for loading, and a smooth transition between results using framer motion. It also helped diagnose a missing constant bug and Gemini rate limit and quota errors by reading actual error output.

## What I Accepted
1. The structured JSON prompt design and parsing logic.
2. The support endpoint and validation.
3. The redesigned page layout, animated background, and loading states.
4. The debugging steps for the missing constant and the Gemini errors.
5. The switch to a different Gemini model after hitting a daily quota.

## What I Rejected
Nothing major. Visual details like the input field type and button styling were iterated on based on direct feedback rather than accepted as first given.

## Manual Changes Made
1. Tested the endpoint directly with PowerShell before connecting the frontend.
2. Diagnosed the missing priorityColors constant by reading the browser's runtime error overlay.
3. Read the actual Gemini error responses in the backend terminal to distinguish a rate limit from a daily quota from a temporary server overload, since all three can look similar at first.
4. Manually tested with several realistic support queries and judged whether the category and priority tagging made sense.

## Risks Found
1. LLM free tier quotas are easy to exhaust during active development and testing, worth knowing the daily limit before relying on a single model for a whole session.
2. A shared constant lost during an editing pass can silently break a page with a generic runtime error, worth double checking file contents after edits rather than assuming a paste succeeded.
3. Generic error messages on the frontend hide meaningfully different backend causes, checking the actual HTTP status and backend log is faster than guessing.

## Final Explanation in My Own Words
The support agent works by wrapping the user's query in a prompt that explicitly tells Gemini to respond with only a JSON object in a fixed shape, response, category, and priority. The backend strips any stray markdown fencing and parses that JSON before returning it, so the frontend always gets a predictable structure to render as badges and text. The redesign layered an animated background behind a centered hero style input, with a spinner and rotating status messages during the wait and a smooth fade transition when a new result replaces the old one, all built with plain CSS animations and framer motion rather than anything backend related. 