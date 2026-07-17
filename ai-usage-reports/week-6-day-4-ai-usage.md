# Week 6 Day 4 AI Usage Report

## Feature or Task
AI code review workflow, generate a review of the codebase, verify each finding, classify by severity, and produce a 20-issue code review report, fixing the most straightforward wins.

## AI Tool Used
Claude

## Prompt Given
I asked Claude to review the backend and frontend systematically, using targeted searches for common issue patterns rather than a generic prompt asking for a list of problems, and to verify every finding against the real code before including it. I then asked for the two safest, most mechanical fixes to be applied immediately, and for a full report documenting all 20 issues with severity and status.

## AI Output Summary
Claude searched for specific patterns, loose any typing, duplicated literals, missing React hook dependencies, hardcoded URLs, missing key stability, missing form fields, and confirmed each hit by viewing the actual surrounding code before treating it as a real issue. It classified severity based on actual impact, for example rating the token refresh race condition as High since it could unexpectedly log users out, while rating index based React keys as Low since the current usage pattern doesn't actually trigger the bug. It then applied the two safest fixes, extracting duplicated literals into named constants, and re-ran the test suite to confirm nothing changed behaviorally.

## What I Accepted
1. All 20 documented findings, each verified against real code.
2. The severity classifications assigned to each.
3. The two fixes applied today, the model name and salt rounds constants.
4. The decision to acknowledge rather than fix the remaining 13 new findings today.

## What I Rejected
One potential finding, a naming pattern using access_token in some places and accessToken in others, was investigated and found to be a correct and expected boundary between API field naming and JavaScript variable naming, not a real inconsistency, so it was left out of the report.

## Manual Changes Made
1. Ran every search command myself and read the actual results before accepting any finding as real.
2. Applied the two fixes using Find and Replace across the correct number of occurrences, verified by re-searching afterward that exactly one reference to each original literal remained, the constant declaration itself.
3. Ran the full test suite after the fixes to confirm no behavior changed.

## Risks Found
1. An AI generated code review is only as good as its verification step, a list of plausible sounding issues without checking the real code risks including false positives, like the access_token naming pattern that turned out to be correct.
2. Fixing everything found in a single day risks rushing changes that need more thought, like the token refresh race condition, which needs a proper request lock rather than a quick patch, better to document it clearly and fix it deliberately later.
3. Severity classification needs to be based on actual impact, not surface appearance, an index based React key looks similar in code to other list rendering patterns but only becomes a real bug under specific conditions that don't currently apply.

## Final Explanation in My Own Words
Twenty issues does not mean twenty different kinds of problems, several are the same root issue appearing in multiple places, three hardcoded model names, two hardcoded salt rounds, four inconsistent API URL constants, which is realistic for how code review tools actually report findings, one per occurrence rather than one per root cause. The two fixes applied today were chosen specifically because they were safe, mechanical, and immediately verifiable, pull a literal out into a named constant and confirm the tests still pass, versus something like the token refresh race condition which needs an actual design decision about how to lock concurrent requests, not something to rush through in the same session it was found. 