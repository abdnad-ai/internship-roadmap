
# AI Usage Report - Week 2 Day 3

## Feature/Task
Login and register UI with validation, and a validated NestJS create user endpoint.

## AI Tool Used
Claude 

## Prompt Given
* Build a combined login and register page using React Hook Form and Zod
* Create a NestJS CreateUserDto with class validator decorators and a global ValidationPipe

## AI Output Summary
Provided the combined auth page with a mode toggle, Zod schemas, zodResolver wiring, inline error messages, submit states, the DTO with class validator decorators, the global ValidationPipe setup, the create user endpoint, and PowerShell test commands.

## What I Accepted
I accepted the combined auth page with the toggle, the Zod schemas, the zodResolver wiring, and the NestJS DTO with the global ValidationPipe, since they matched the day's requirements.

## What I Rejected
I changed the sample placeholder text from a default name to my own wording, and I chose to combine login and register into one page with a toggle instead of keeping two separate pages.

## Manual Changes Made
I created the routes in the correct folders, updated the placeholder text, removed the separate login and register pages after combining them, fixed a missing schemas file, removed a nested git repo, and ran the PowerShell tests.

## Risks Found
* Relative path commands created folders in the wrong directory until the working folder was corrected.
* The generated NestJS project created a nested git repo that had to be removed before committing.

## Final Explanation in My Own Words
A DTO is the shape of the data the API expects, with validation rules attached to each field. The global ValidationPipe checks every incoming request against the DTO before it reaches my code, and rejects bad data automatically with a 400 error. On the frontend, Zod defines the same kind of rules for the form, and React Hook Form uses them through zodResolver to show error messages when the input is wrong.
'@ | Set-Content -Path "C:\Users\abdullah\Desktop\internship-roadmap\ai-usage-reports\week-2-day-3-ai-usage.md" -Encoding utf8