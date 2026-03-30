---
id: SKL-0035
name: Differential Security Review
category: skills
tags: [security, review, diff, code-changes, attack-surface, OWASP, pull-request, pre-merge]
capabilities: [diff-security-analysis, attack-surface-detection, removed-protection-detection, auth-change-review, injection-detection]
useWhen:
  - reviewing code changes through a security lens before merging
  - checking if a diff introduces new attack surfaces
  - verifying that security protections were not accidentally removed
  - analyzing auth logic changes for security implications
  - performing a pre-merge security gate on pull requests
estimatedTokens: 550
relatedFragments: [SKL-0034, SKL-0033, SKL-0002]
dependencies: []
synonyms: ["is my code change safe to merge", "security check my pull request", "did I break any security stuff", "review my diff for vulnerabilities", "check if my changes open any holes"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/OWASP/CheatSheetSeries"
difficulty: advanced
---

# Differential Security Review

Review code changes (not the full codebase) through a security lens. Every diff is a potential new attack surface. Informed by OWASP Cheat Sheet Series guidance on secure coding practices, input validation, output encoding, and access control.

## OWASP Threat Categories for Diff Review

When reviewing changes, map findings to these OWASP Top 10 categories:

| Category | What to Look For in Diffs |
|----------|--------------------------|
| A01: Broken Access Control | New endpoints missing auth, changed permission logic |
| A02: Cryptographic Failures | Weakened encryption, exposed secrets, removed HTTPS |
| A03: Injection | New SQL queries, command execution, template rendering with user input |
| A04: Insecure Design | New features missing threat modeling, abuse case blindness |
| A05: Security Misconfiguration | Changed CORS, CSP, debug flags, error verbosity |
| A06: Vulnerable Components | New dependencies without health check |
| A07: Auth Failures | Changed login logic, session handling, password rules |
| A08: Data Integrity Failures | Removed validation, unsigned data, deserialization changes |
| A09: Logging Failures | Removed audit logging, added PII to logs |
| A10: SSRF | New URL fetching from user input, webhook handlers |

## Procedure

### 1. Collect the Diff

Determine scope: branch comparison (`git diff main...HEAD`), staged changes, or unstaged changes. If no changes found, report clean and stop.

### 2. Categorize Changed Files by Risk

| Category | Risk | Examples |
|----------|------|---------|
| Auth/session handling | HIGH | auth/, middleware/, session/, JWT config |
| API endpoints | HIGH | routes/, api/, controllers/, GraphQL resolvers |
| Database queries | HIGH | models/, queries/, migrations/, ORM calls |
| Configuration | MEDIUM | config/, .env, docker-compose, CI/CD |
| Input handling | MEDIUM | forms/, validation/, parsers/, file upload |
| UI rendering | MEDIUM | templates/, components (XSS via dangerouslySetInnerHTML) |
| Tests | LOW | test/, spec/, __tests__/ |
| Documentation | LOW | docs/, *.md |

### 3. Analyze Security-Sensitive Changes

For HIGH and MEDIUM risk files, examine three dimensions:

**Added code (new attack surface):**
- New API endpoints: Is authentication required? Is authorization checked?
- New database queries: Parameterized? Or string concatenation with user input?
- New user input handling: Validated and sanitized before use?
- New file upload/download: Type-checked, size-limited, stored safely?
- New external service calls: Error handling present? SSRF protection?

**Removed code (lost protections):**
- Removed auth or authorization checks (OWASP A01)
- Removed input validation or output encoding (OWASP A03)
- Removed rate limiting, CSRF tokens, or CSP headers (OWASP A05)
- Removed error handling around security-critical operations
- Removed audit logging for sensitive actions (OWASP A09)

**Changed code (shifted boundaries):**
- Modified auth logic: Who can access what? Broader or narrower?
- Changed encryption or hashing algorithms: Stronger or weaker?
- Weakened validation rules: Accepting more input types?
- Modified CORS or CSP policies: More permissive?
- Changed session configuration: Longer timeouts, removed secure flags?

### 4. Cross-Reference Decisions

Check if security-relevant changes were intentional and documented. If a change looks risky but has a documented decision with rationale, note as "Acknowledged risk" and verify the mitigation is implemented.

### 5. Generate Report

For each finding: file path and diff context, OWASP category, risk classification (new surface / removed protection / weakened control), severity (CRITICAL/HIGH/MEDIUM/LOW), before vs. after comparison, and recommendation (keep, revert, or mitigate with specific action).

## Key Rules

- Read-only analysis. Does not modify source files.
- Reviews diffs only, not the entire codebase. Scope discipline.
- A clean diff review is a valid and positive result. Say so explicitly.
- Map every finding to an OWASP category for actionable remediation guidance.
- When in doubt about intent, flag it. False positives are cheaper than breaches.
