---
id: SKL-0017
name: Bug Investigation
category: skills
tags: [debugging, bugfix, maintenance, root-cause-analysis]
capabilities: [bug-reproduction, root-cause-analysis, minimal-fix, fix-verification]
useWhen:
  - a bug has been reported and needs investigation
  - tracking down the root cause of unexpected behavior
  - applying a targeted fix without introducing regressions
estimatedTokens: 500
relatedFragments: [SKL-0016, SKL-0003]
dependencies: []
synonyms: ["something is broken", "why is this not working", "find the bug in my code", "my app crashes when I do this", "help me debug this issue"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Bug Investigation

Systematically isolate and fix bugs. Hypothesis first, evidence second, fix third. Never guess.

## Procedure

### 1. Reproduce the Bug

Before touching any code:

- Can it be reproduced consistently? What are the exact steps?
- If not reproducible, log as intermittent and request more information.

### 2. Form a Hypothesis

State explicitly: "I believe the bug is caused by X because Y."

Check recent changes that may have introduced it. Common culprits:
- Off-by-one errors
- Null/undefined handling
- Async timing issues
- Data shape assumptions

### 3. Gather Evidence

- Read relevant code carefully
- Trace execution path from input to failure
- Confirm or reject the hypothesis with evidence

### 4. Confirm Root Cause

If the fix is not obvious, the root cause has not been found. Keep investigating.

### 5. Apply Minimal Fix

- Fix only what is broken. Do not refactor surrounding code.
- If a larger change is needed, note it and create a separate refactor task.

### 6. Verify the Fix

- Does it resolve the original bug?
- Does it break anything else?
- Do existing tests still pass?

### 7. Document

Record in your project state:
- **Root cause:** what caused it
- **Fix applied:** what changed and why

## Key Rules

- Never refactor while fixing a bug. Separate tasks.
- Never apply a fix without confirming root cause.
- Never silently swallow errors.
