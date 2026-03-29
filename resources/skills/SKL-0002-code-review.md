---
id: SKL-0002
name: Code Review
category: skills
tags: [code-review, quality, bugs, maintainability, best-practices]
capabilities: [code-review, bug-detection, pattern-analysis, refactoring-suggestions]
useWhen:
  - reviewing a pull request or code diff
  - checking code quality before merging
  - finding bugs or security issues in code
  - improving code maintainability
estimatedTokens: 700
relatedFragments: [SKL-0003, AGT-0002]
dependencies: []
---

# Code Review

Structured two-pass code review for correctness, security, and maintainability.

## Procedure

### Pass 1: Critical (must fix before merge)

Look for these issues:

- **Bugs** — logic errors, off-by-one, null/undefined access, race conditions
- **Security** — injection (SQL, XSS, command), auth bypass, secrets exposure, OWASP top 10
- **Data loss** — missing error handling on writes, no rollback on failure
- **Breaking changes** — API contract violations, removed public methods

For each finding:
```
[CRITICAL] file.ts:42 — Description of the issue
Fix: Specific code change to make
```

### Pass 2: Informational (nice to fix, won't block)

- **Style** — naming conventions, formatting consistency
- **Performance** — unnecessary loops, missing indexes, N+1 queries
- **Maintainability** — dead code, unclear variable names, missing types
- **Patterns** — reinventing what the framework provides

For each finding:
```
[INFO] file.ts:78 — Description
Suggestion: How to improve it
```

### Verdict

- **APPROVE** — no critical findings (informational OK)
- **REQUEST CHANGES** — 1+ critical findings that must be fixed
- **NEEDS DISCUSSION** — architectural concern that needs team input

## Output

Structured review with findings grouped by severity, plus a one-line verdict.
