# Week 6 Day 4 Daily Report

Date: 2026-07-17

## Tasks Completed
1. Reviewed the backend and frontend codebases systematically using targeted pattern searches rather than reading every file end to end.
2. Found and verified 20 real issues, ranging from loose typing and hardcoded literals to a token refresh race condition and a duplicated form logic pattern.
3. Classified every issue by severity, Critical, High, Medium, or Low, based on real impact rather than surface appearance.
4. Fixed the two easiest, safest wins immediately, extracting the hardcoded Gemini model name and bcrypt salt rounds into named constants, removing 5 duplicated literals total.
5. Documented the remaining 13 new findings as acknowledged but not fixed today, since they're maintainability concerns rather than active bugs, along with 2 items already fixed on Day 3 included for completeness of the full review.
6. Wrote the full code review report with issue, location, severity, and status for all 20 items.
7. Re-ran the full backend test suite after applying fixes and confirmed all 19 tests still pass.

## Links and PRs
Branch: week-6-day-4-ai-code-review
Pull request: https://github.com/abdnad-ai/internship-roadmap/pull/35 

## AI Tools Used
Claude

## Prompts Used
1. Asked Claude to confirm the Day 4 tasks against the internship roadmap.
2. Asked for a systematic code review using targeted searches across both codebases, verifying each finding against the real code rather than generating a generic list.
3. Asked for the two hardcoded-literal issues to be fixed immediately, and a code review report documenting all 20 findings with severity and status.

## Manual Changes Made
1. Verified every single issue against the actual file and line before it was added to the report, none were included based on assumption.
2. Manually applied the two fixes using Find and Replace to catch every occurrence of the duplicated literals.
3. Ran the full test suite after the fixes to confirm the refactor didn't change any behavior.

## Bugs and Blockers
None today, this was a review and light refactor day, the fixes applied were mechanical (extracting constants) rather than behavior changes, so nothing broke.

## What I Learned
A useful code review doesn't need to read every line of every file, targeted searches for known problem patterns, loose typing, duplicated literals, missing dependency arrays, hardcoded URLs, cover a lot of real ground quickly and each hit can be verified individually rather than trusted blindly. I also learned that not every finding deserves an immediate fix, the token refresh race condition and the duplicated login and register logic are real issues worth tracking, but fixing them properly needs more thought than a same day mechanical change, documenting them clearly as acknowledged is more honest than either ignoring them or rushing a fix that might introduce new bugs.

## Tomorrow Plan
Start Week 6 Day 5, the assessment, fixing remaining issues and improving the overall quality score.

## Deadline Status
All Day 4 tasks completed and submitted through the pull request. 