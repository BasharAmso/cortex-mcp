---
id: SKL-0002
name: Code Review
category: skills
tags: [code-review, quality, bugs, maintainability, best-practices, security, node, pull-request, patterns]
capabilities: [code-review, bug-detection, pattern-analysis, refactoring-suggestions, security-scanning]
useWhen:
  - reviewing a pull request or code diff
  - checking code quality before merging
  - finding bugs or security issues in code
  - improving code maintainability
  - enforcing project conventions and Node.js best practices
estimatedTokens: 700
relatedFragments: [SKL-0003, AGT-0002]
dependencies: []
synonyms: ["check my code for mistakes", "review my pull request", "is my code any good", "find bugs in my code", "look over my changes"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/goldbergyoni/nodebestpractices"
difficulty: intermediate
---

# Code Review

Structured two-pass code review for correctness, security, and maintainability. Grounded in the Node.js Best Practices checklist (102 items covering structure, error handling, testing, security, and performance).

## Procedure

### Pass 1: Critical (must fix before merge)

Scan for these categories, drawn from production incident patterns:

| Category | What to find |
|----------|-------------|
| **Bugs** | Logic errors, off-by-one, null/undefined access, race conditions, unhandled promise rejections |
| **Security** | Injection (SQL, XSS, command), auth bypass, secrets in code, OWASP top 10, unsafe regex (ReDoS) |
| **Data loss** | Missing error handling on writes, no rollback on failure, silent catch blocks |
| **Breaking changes** | API contract violations, removed public methods, changed response shapes |
| **Error handling** | Async errors not caught, generic catch-all without logging, errors swallowed silently |

For each finding:
```
[CRITICAL] file.ts:42 -- Description of the issue
Fix: Specific code change to make
```

### Pass 2: Informational (nice to fix, won't block)

| Category | What to find |
|----------|-------------|
| **Structure** | Fat controllers (business logic in route handlers), missing separation of concerns |
| **Performance** | Unnecessary loops, missing indexes, N+1 queries, blocking the event loop |
| **Maintainability** | Dead code, unclear naming, missing TypeScript types, magic numbers |
| **Patterns** | Reinventing what the framework provides, not using established project patterns |
| **Configuration** | Hardcoded values that should be env vars, missing validation of config at startup |

For each finding:
```
[INFO] file.ts:78 -- Description
Suggestion: How to improve it
```

### Pass 3: Scope Challenge

Before issuing a verdict, check:
- Does this PR do more than one thing? If so, suggest splitting.
- Are there changes to files outside the stated scope?
- Does the PR description match the actual changes?

### Verdict

- **APPROVE** -- no critical findings (informational OK)
- **REQUEST CHANGES** -- 1+ critical findings that must be fixed
- **NEEDS DISCUSSION** -- architectural concern that needs team input

## Output

Structured review with findings grouped by severity, plus a one-line verdict.
