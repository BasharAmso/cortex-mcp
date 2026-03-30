---
id: SKL-0017
name: Bug Investigation
category: skills
tags: [debugging, bugfix, maintenance, root-cause-analysis, error-handling, async, observability]
capabilities: [bug-reproduction, root-cause-analysis, minimal-fix, fix-verification, error-flow-tracing]
useWhen:
  - a bug has been reported and needs investigation
  - tracking down the root cause of unexpected behavior
  - applying a targeted fix without introducing regressions
  - debugging async timing issues, null reference errors, or data shape mismatches
estimatedTokens: 500
relatedFragments: [SKL-0016, SKL-0003]
dependencies: []
synonyms: ["something is broken", "why is this not working", "find the bug in my code", "my app crashes when I do this", "help me debug this issue"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/goldbergyoni/nodebestpractices"
difficulty: intermediate
---

# Bug Investigation

Systematically isolate and fix bugs. Hypothesis first, evidence second, fix third. Never guess. Grounded in Node.js best practices for error handling and operational reliability.

## Common Bug Categories

| Category | Typical Cause | Investigation Approach |
|----------|--------------|----------------------|
| Null/undefined crash | Missing null check, optional chain | Trace data flow from source to crash point |
| Async timing | Race condition, unhandled rejection, missing await | Check Promise chains, add unhandledRejection handler |
| Data shape mismatch | API contract changed, missing field | Compare expected vs actual payload at boundary |
| Off-by-one | Loop bounds, array indexing, pagination | Check boundary conditions with edge values |
| Silent failure | Swallowed error in catch block | Search for empty catch blocks, add operational error classes |
| Environment-specific | Works locally, fails in prod | Compare env vars, Node version, dependency versions |

## Procedure

### 1. Reproduce the Bug

Before touching any code:

- Can it be reproduced consistently? Document exact steps.
- If intermittent, identify conditions that increase frequency (load, timing, specific data).
- Check error logs and monitoring first. The stack trace is your fastest lead.

### 2. Form a Hypothesis

State explicitly: "I believe the bug is caused by X because Y."

Check recent changes (git log, deploys) that correlate with when the bug appeared.

### 3. Gather Evidence

- Read relevant code paths carefully
- Trace execution from input to failure point
- Distinguish operational errors (expected failures like bad input, network timeout) from programmer errors (actual bugs)
- Confirm or reject the hypothesis with evidence, not assumptions

### 4. Confirm Root Cause

If the fix is not obvious, the root cause has not been found. Keep investigating. Follow the error propagation chain:

1. Where was the error thrown?
2. Where should it have been caught?
3. Why was it not caught or handled correctly?

### 5. Apply Minimal Fix

- Fix only what is broken. Do not refactor surrounding code.
- Use typed/classified errors (distinguish 4xx from 5xx scenarios)
- If a larger change is needed, note it and create a separate refactor task.

### 6. Verify the Fix

- Does it resolve the original bug?
- Does it break anything else? Run the full test suite.
- Add a regression test that reproduces the original bug and confirms the fix.

### 7. Document

Record: **Root cause** (what caused it), **Fix applied** (what changed and why), **Prevention** (how to avoid recurrence).

## Key Rules

- Never refactor while fixing a bug. Separate tasks.
- Never apply a fix without confirming root cause.
- Never silently swallow errors. Catch blocks must log or rethrow.
- Always add a regression test for the fixed bug.
