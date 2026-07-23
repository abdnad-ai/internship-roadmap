# Week 7 Day 3 Daily Report

Date: 2026-07-24

## Tasks Completed
1. Wrote a GitHub Actions workflow for the backend running lint, test, and build, with a real PostgreSQL service container available for tests.
2. Wrote a GitHub Actions workflow for the frontend running lint, test, and build.
3. Scoped both workflows to trigger on pull requests and pushes to main, limited to changes in their own project or their own workflow file.
4. Added JWT_SECRET, JWT_REFRESH_SECRET, and GEMINI_API_KEY as GitHub repo secrets for the backend workflow.
5. Opened a PR to trigger both workflows for real, rather than assuming the YAML was correct.
6. Found and fixed a YAML indentation error in the backend workflow file that had been silently preventing it from running at all.
7. Found that Next.js 16 removed the next lint command entirely, replaced the frontend's lint script with a direct eslint call.
8. Fixed every real lint error the frontend and backend had been silently carrying, unescaped JSX apostrophes, a function referenced before its declaration, a set-state-in-effect pattern, unused catch bindings, and a large set of unsafe any typing issues across the backend.
9. Added proper TypeScript types for the JWT payload (shared across the strategy, decorator, and guard), the parsed Gemini structured response, and Prisma's dynamic query object, replacing every any with a real type.
10. Confirmed both workflows pass fully green on the same PR after all fixes.
11. Documented the CI setup in the root README.

## Links and PRs
Branch: week-7-day-3-github-actions
Pull request: https://github.com/abdnad-ai/internship-roadmap/pull/39  

## AI Tools Used
Claude

## Prompts Used
1. Asked Claude to confirm the Day 3 tasks against the internship roadmap.
2. Asked for GitHub Actions workflows for both projects, then for help diagnosing why neither triggered on the first PR.
3. Asked for help fixing a YAML syntax error, a removed Next.js CLI command, and a large batch of pre-existing lint errors surfaced by finally running lint in CI.
4. Asked whether properly typing the unsafe any errors would take long before deciding to do it properly rather than downgrading the rules.

## Manual Changes Made
1. Diagnosed that neither workflow triggered on the first PR because both had a paths filter that didn't include changes to the workflows folder itself, and fixed it.
2. Diagnosed a YAML indentation error directly from GitHub's own error annotation rather than guessing at the workflow file's structure.
3. Verified locally with npm run lint, npm test, and npm run build after every batch of fixes, rather than pushing blind and waiting on CI each time.
4. Caught that several Notepad find-and-replace edits silently failed to save partway through the session, verified with targeted searches after each one, and switched to a PowerShell text replacement for a stubborn case rather than repeating a method that kept failing.
5. Reviewed each of the 32 initial lint problems individually and decided, with the time estimate in hand, to fix them properly rather than suppress the underlying rules.

## Bugs and Blockers
1. Both CI workflows failed to trigger at all on the first PR because their paths filters excluded changes to the workflows folder itself.
2. A stray leading space before the on: key caused a YAML syntax error in the backend workflow, invisible without reading GitHub's own annotation pointing at the exact line.
3. Next.js 16 removed the next lint command entirely, which had been silently broken in this project the whole time, meaning lint had likely never actually run successfully before this week.
4. Running lint for the real first time surfaced 32 pre-existing problems across both projects, none of which were new bugs from this week's work, all pre-existing debt finally caught by wiring up CI properly.
5. Several manual file edits in Notepad appeared to complete but didn't actually save, caught only by re-checking the file afterward rather than assuming success.

## What I Learned
Setting up CI often reveals more about a codebase's actual health than about the CI configuration itself, the real work this week wasn't the YAML, it was discovering that lint had effectively never run successfully in either project and fixing dozens of accumulated issues that had been invisible until something finally checked. I also learned that a path filter meant to keep a workflow scoped and efficient can just as easily prevent it from ever validating changes to itself, worth explicitly including a workflow's own file in its own trigger conditions. Properly typing away unsafe any usage, rather than suppressing the rule, was worth the extra time, since it replaced guesswork with real interfaces for the JWT payload, the AI response shape, and the database query object, work that will make future changes to those areas safer by default.

## Tomorrow Plan
Start Week 7 Day 4, deployment to a VPS or platform with environment variables and logs.

## Deadline Status
All Day 3 tasks completed and submitted through the pull request. 