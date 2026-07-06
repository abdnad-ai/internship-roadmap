# Week 5 Day 1 AI Usage Report

## Feature or Task
Scaffold an AI service module in the backend: choose an LLM provider, set up environment variables, build a Gemini powered service with a prompt template builder, validation, error handling, and a test endpoint.

## AI Tool Used
Claude

## Prompt Given
I asked Claude to walk me through scaffolding the AI service step by step, using Google Gemini as the provider. This included the service structure, a prompt template builder, input validation, error handling, and a test endpoint, plus debugging help when the Gemini API returned a 404 and when a validation error rejected a valid request.

## AI Output Summary
Claude gave the AI module, service, and controller structure, a Gemini powered service with a prompt template builder using variable substitution, input validation for empty and oversized prompts, and error handling around the API call. It also gave the class-validator decorators needed to fix the DTO validation issue, and traced the Gemini 404 to a deprecated model name, recommending a currently supported one.

## What I Accepted
1. The AI module, service, and controller structure.
2. The prompt template builder method.
3. The input validation and error handling in the service.
4. The class-validator decorators on the DTO.
5. The updated model name after the deprecated one failed.

## What I Rejected
Nothing major. The debug logging added to trace the Gemini error was temporary and removed once the fix was confirmed.

## Manual Changes Made
1. Generated and regenerated the Gemini API key myself after accidental exposure.
2. Caught that CLI and npm commands were run from the wrong directory, cleaned up the stray files, and redid the scaffolding in the correct backend folder.
3. Tested the endpoint manually with multiple prompts and the empty prompt case using PowerShell.
4. Reverted an unrelated stray change in the frontend README before committing.

## Risks Found
1. Running scaffolding commands from the wrong directory can silently create files and install dependencies in the wrong place, with no error to flag it.
2. LLM provider model names change over time, hardcoding a model name without checking current availability can break the integration later.
3. Pasting API keys directly into chat or terminal output exposes them, keys should be regenerated immediately if this happens.
4. A global validation pipe with whitelist and forbidNonWhitelisted enabled will silently reject valid fields that lack proper validation decorators, this can look like a bug in the request when it is actually a missing decorator.

## Final Explanation in My Own Words
The AI service wraps calls to the Gemini API behind a clean NestJS service, so the rest of the app never talks to the provider directly. The prompt template builder lets me define a prompt with placeholders and fill them in with real values, which keeps prompts consistent and reusable instead of building strings inline everywhere. Validation happens before any API call is made, rejecting empty or oversized prompts early, and errors from the API itself are caught and turned into a generic 500 instead of leaking internal details. The test endpoint exists purely to confirm the whole chain works, provider connection, prompt handling, and response return, before building any real feature on top of it in the coming days.