---
id: SKL-0136
name: Reading Code & Stack Traces
category: skills
tags: [reading-code, stack-traces, debugging, codebase-navigation, error-messages, code-comprehension]
capabilities: [navigate-unfamiliar-codebases, read-stack-traces, trace-execution-flow, understand-error-messages, search-codebases-effectively]
useWhen:
  - opening a codebase you have never seen before
  - trying to understand what a function or module does
  - reading a stack trace or error message you do not recognize
  - tracing how data flows through an application
  - reviewing someone else's pull request
estimatedTokens: 650
relatedFragments: [SKL-0137, SKL-0138, SKL-0002, SKL-0017]
dependencies: []
synonyms: ["how do I understand this code", "I can't read this codebase", "what does this error mean", "how to navigate a new project", "understanding someone else's code", "making sense of stack traces"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/aredridel/how-to-read-code"
difficulty: beginner
owner: cortex
pillar: "developer-growth"
---

# Skill: Reading Code & Stack Traces

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0136 |
| **Version** | 1.0 |
| **Owner** | Cortex |
| **Inputs** | A codebase, error message, or stack trace to understand |
| **Outputs** | Mental model of the code's purpose, data flow, and failure points |
| **Triggers** | Manual |

---

## Purpose

Build the skill of reading unfamiliar code confidently. Most development time is spent reading, not writing. This fragment covers how to orient yourself in a new codebase, extract meaning from error output, and read code like a contract.

---

## Orienting in an Unfamiliar Codebase

1. **Start at the entry point.** Find `main`, `index`, `app`, or the startup file. Every codebase has a front door.
2. **Read the directory structure first.** Folder names reveal architecture. Scan for `src/`, `lib/`, `routes/`, `models/`, `tests/` before reading any code.
3. **Follow the data, not the files.** Pick one user action (e.g., "user clicks submit") and trace it from the UI layer through to the database and back.
4. **Read tests before implementation.** Tests describe what the code is supposed to do, in plain assertions. They are the unofficial specification.
5. **Use search aggressively.** Grep for function names, error strings, and constants. Search is faster than reading linearly.

---

## Reading Code Like a Contract

For every function or module, identify three things:

- **Inputs** -- what does it accept? (parameters, config, environment)
- **Outputs** -- what does it return or produce? (return values, side effects, mutations)
- **Side effects** -- what else does it change? (database writes, API calls, global state)

If you can answer those three questions, you understand the function well enough to use it or modify it safely.

---

## Reading Stack Traces

1. **Read from the bottom up.** The bottom frame is where the error was thrown. The top frames show what called it.
2. **Find YOUR code first.** Skip framework and library frames. Look for file paths that match your project's source directory.
3. **Read the error message literally.** "Cannot read property 'name' of undefined" means exactly what it says: something is undefined when you expected an object.
4. **Note the line number, then look at context.** The error line matters, but the bug is often a few lines above where a variable was set incorrectly.

---

## Practical Search Techniques

| Goal | Search For |
|------|-----------|
| Find where something is defined | Function or class name |
| Find where something is used | Import statements or call sites |
| Find error origins | The exact error message string |
| Understand config | Environment variable names or config keys |
| Find related logic | Unique domain terms (e.g., "invoice", "subscription") |

---

## Common Mistakes

- Reading every file linearly instead of following execution flow
- Ignoring tests, README, and comments that explain intent
- Trying to understand the whole codebase before doing anything (you only need the slice relevant to your task)
- Skipping error messages because they look intimidating (they are usually very literal)
