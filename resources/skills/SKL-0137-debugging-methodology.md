---
id: SKL-0137
name: Debugging Methodology
category: skills
tags: [debugging, troubleshooting, root-cause, error-handling, bug-fixing, problem-solving]
capabilities: [systematic-debugging, reproduce-bugs, binary-search-root-cause, choose-debugging-tools, identify-failure-patterns]
useWhen:
  - something is broken and you do not know why
  - an error keeps appearing and you cannot find the cause
  - you need a systematic process instead of guessing randomly
  - deciding between print statements, debugger, or logging
  - dealing with a bug that only happens sometimes
estimatedTokens: 700
relatedFragments: [SKL-0136, SKL-0138, SKL-0017, SKL-0002]
dependencies: []
synonyms: ["how to fix a bug", "my code is broken", "I don't know why this isn't working", "how to find what's wrong", "something crashed and I'm stuck", "systematic troubleshooting"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/uds-se/debuggingbook"
difficulty: beginner
owner: cortex
pillar: "developer-growth"
---

# Skill: Debugging Methodology

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0137 |
| **Version** | 1.0 |
| **Owner** | Cortex |
| **Inputs** | A bug, error, or unexpected behavior |
| **Outputs** | Root cause identified and fixed |
| **Triggers** | Manual |

---

## Purpose

Provide a repeatable, systematic process for finding and fixing bugs. Debugging is not guessing. It is a skill that improves with deliberate practice and structured technique.

---

## The 6-Step Debugging Process

### 1. Reproduce the Bug

Before anything else, make the bug happen on demand. If you cannot reproduce it, you cannot verify your fix. Write down the exact steps, inputs, and environment.

### 2. Read the Error Message

Error messages are not decoration. Read them word by word. They usually tell you exactly what went wrong and where. Check the stack trace for the first line that points to your own code.

### 3. Form a Hypothesis

Based on the error and your understanding of the code, propose a single specific explanation: "I think X is null because Y never runs when Z is true." Do not propose multiple theories at once.

### 4. Divide and Conquer

This is the most powerful debugging technique. Split the problem space in half and determine which half contains the bug.

- **In code:** Add a checkpoint at the midpoint of the suspected logic. Does the data look correct there? If yes, the bug is downstream. If no, the bug is upstream.
- **In time:** Use version control. The bug works in commit A but fails in commit B. Binary search (git bisect) between them.
- **In data:** Does the bug happen with all inputs or only specific ones? Reduce the input to the smallest case that still triggers the failure.

Each split eliminates half the problem. Even large codebases yield to 10-15 splits.

### 5. Test Your Fix

After applying your fix, verify that:
- The original reproduction steps no longer produce the error
- Related functionality still works (you did not break something adjacent)
- Edge cases around the fix behave correctly

### 6. Understand Why

Ask: why did this bug exist? Was it a bad assumption, a missing validation, an unclear interface? This prevents the same class of bug from recurring.

---

## Three Debugging Tools

| Tool | Best For | Trade-off |
|------|----------|-----------|
| **Print/console.log** | Quick visibility into values at specific points | Temporary, clutters code, must be removed |
| **Debugger (breakpoints)** | Stepping through execution line by line, inspecting state | Slower setup, can be hard with async code |
| **Logging** | Persistent visibility across runs, production debugging | Requires upfront investment in log placement and levels |

Start with print statements for quick checks. Graduate to a debugger for complex flow issues. Invest in logging for anything that runs in production.

---

## Common Failure Patterns

- **Off-by-one:** Loop runs one time too many or too few
- **Null/undefined access:** Using a value before checking if it exists
- **Stale state:** Working with outdated data that has changed elsewhere
- **Race condition:** Two operations that depend on order but do not enforce it
- **Wrong assumption:** Code assumes an input format, type, or range that is not guaranteed
- **Silent failure:** An error is caught and swallowed without logging

---

## The Rubber Duck Method

Explain the bug out loud, step by step, to anyone or anything (a rubber duck works). The act of articulating what the code should do versus what it actually does frequently reveals the gap. This works because your brain processes information differently when speaking versus scanning silently.
