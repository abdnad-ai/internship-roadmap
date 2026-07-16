# AI Service Prompt Documentation

Overview of every prompt used in the AI service ("nestjs-projects/week-3-task-manager-api/src/ai/ai.service.ts"), what it's for, and why it's structured the way it is.

## 1. Test prompt (generateResponse) 

Used by "POST /ai/test", the simplest method, sends the user's prompt to Gemini as-is with no modification. Used to verify the AI service connection works end to end during Week 5 Day 1.

No template, the raw user input is passed directly to "generateContent".

## 2. Streaming prompt (generateStreamingResponse)

Used by "POST /ai/stream", the chat interface's streaming endpoint. Wraps the user's prompt with a formatting instruction before sending: