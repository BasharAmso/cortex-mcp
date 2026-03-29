---
id: SKL-0035
name: Differential Security Review
category: skills
tags: [security, review, diff, code-changes, attack-surface]
capabilities: [diff-security-analysis, attack-surface-detection, removed-protection-detection, auth-change-review]
useWhen:
  - reviewing code changes through a security lens before merging
  - checking if a diff introduces new attack surfaces
  - verifying that security protections were not accidentally removed
  - analyzing auth logic changes for security implications
estimatedTokens: 550
relatedFragments: [SKL-0034, SKL-0033, SKL-0002]
dependencies: []
---

# Differential Security Review

Review code changes (not the full codebase) through a security lens. Every diff is a potential new attack surface.

## Procedure

### 1. Collect the Diff

Determine scope: branch comparison (`git diff main...HEAD`), staged changes, or unstaged changes. If no changes found, report clean and stop.

### 2. Categorize Changed Files by Risk

| Category | Risk | Examples |
|----------|------|---------|
| Auth/session handling | HIGH | auth/, middleware/, session/ |
| API endpoints | HIGH | routes/, api/, controllers/ |
| Database queries | HIGH | models, queries, migrations |
| Configuration | MEDIUM | config/, .env, docker-compose |
| Input handling | MEDIUM | forms, validation, inputs |
| UI rendering | MEDIUM | templates, components (XSS risk) |
| Tests | LOW | test/, spec/ |
| Documentation | LOW | docs/, *.md |

### 3. Analyze Security-Sensitive Changes

For HIGH and MEDIUM risk files, examine:

**Added code:**
- New API endpoints without authentication
- New database queries (SQL injection surface)
- New user input handling without validation
- New file upload/download functionality
- New external service calls without error handling

**Removed code:**
- Removed auth or authorization checks
- Removed input validation or sanitization
- Removed rate limiting, encryption, or CSRF/XSS protections
- Removed error handling around security operations

**Changed code:**
- Modified auth logic (who can access what)
- Changed encryption algorithms or key handling
- Weakened validation rules
- Modified CORS or CSP policies

### 4. Cross-Reference Decisions

Check if security-relevant changes were intentional and documented. If a change looks risky but has a documented decision, note as "Acknowledged risk."

### 5. Generate Report

For each finding: file and diff context, risk category (new surface / removed protection / weakened control), severity, before vs. after, and recommendation (keep, revert, or mitigate).

## Key Rules

- Read-only analysis. Does not modify source files.
- Reviews diffs only, not the entire codebase.
- A clean diff review is a valid result. Say so explicitly if no issues found.
