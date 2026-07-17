# Week 6 Day 1 AI Usage Report

## Feature or Task
Write unit tests for the NestJS backend, covering the AI service, AI controller, and Tasks service, reaching a minimum of 10 tests with mocked dependencies.

## AI Tool Used
Claude

## Prompt Given
I asked Claude to check whether Jest was already configured, then write real tests to replace the boilerplate stub specs for the AI service and controller, including mocking the Gemini SDK and Prisma. I also asked for new tests covering the Tasks service, and for help after one test failed due to an internal method call I hadn't accounted for.

## AI Output Summary
Claude read the actual service and controller code first before writing any tests, so the tests matched the real method signatures and dependencies rather than assumptions. It mocked the Gemini SDK at the module level using jest.mock, mocked Prisma with plain jest.fn objects, and wrote tests covering both success and failure paths for each method. When a test failed, it read the actual stack trace to find that update internally calls findOne, rather than guessing at the cause.

## What I Accepted
1. The AI service tests, covering validation and the structured support response and history query.
2. The AI controller tests, mocking the service layer.
3. The Tasks service tests, covering CRUD and not-found cases.
4. The fix for the update test after diagnosing the internal findOne call.
5. The README testing section.

## What I Rejected
Nothing major, every test was run individually and confirmed passing before being treated as done.

## Manual Changes Made
1. Ran each new test file individually right after writing it, rather than waiting until the end to discover a batch of failures.
2. Ran the full test suite at the end to confirm all four spec files pass together with no conflicts.
3. Verified in the terminal that a VS Code editor type error did not reflect an actual test failure, rather than assuming the editor was correct.

## Risks Found
1. Testing only a method's public signature without reading its body can miss internal dependencies, like update silently depending on findOne, leading to tests that fail for reasons unrelated to the logic actually being tested.
2. Mocking an SDK incorrectly, for example mocking an instance instead of the module constructor, can make tests pass for the wrong reasons or fail unpredictably, mocking at the module level with jest.mock kept this reliable.
3. Editor level type errors are not the same as real test failures, trusting the terminal output over the Problems panel avoided chasing a non issue.

## Final Explanation in My Own Words
Each test file follows the same shape, build a TestingModule with the real class under test and fake versions of everything it depends on, then assert that calling a method produces the right result and calls its dependencies with the right arguments. For the AI service, that meant faking Prisma's create and findMany calls and faking the entire Gemini SDK so no real API request happens during a test run. For the Tasks service, the main lesson was that update and remove both check a task exists first by calling findOne internally, so testing them required mocking that lookup too, not just the final database call. Nineteen tests now run in under five seconds and never touch a real database or external API, which is the point of unit tests, fast, isolated, and repeatable regardless of what else is running. 