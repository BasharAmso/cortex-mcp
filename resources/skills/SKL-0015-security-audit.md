---
id: SKL-0015
name: Security Audit
category: skills
tags: [security, audit, owasp, vulnerabilities, secrets, dependencies, cheat-sheets, injection, authentication]
capabilities: [vulnerability-detection, secrets-scanning, dependency-audit, owasp-checks, cheat-sheet-reference]
useWhen:
  - auditing code for security vulnerabilities
  - checking for exposed secrets or credentials
  - reviewing dependency security
  - preparing for a security review
  - applying OWASP cheat sheet recommendations to code
estimatedTokens: 700
relatedFragments: [SKL-0016, AGT-0002]
dependencies: []
synonyms: ["is my app secure", "check for security holes", "find vulnerabilities in my code", "am I exposing any secrets", "scan my dependencies for risks"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/OWASP/CheatSheetSeries"
difficulty: advanced
owner: reviewer
---

# Skill: Security Audit

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0015 |
| **Version** | 1.0 |
| **Owner** | reviewer |
| **Inputs** | Target files, STATE.md, DECISIONS.md, dependency manifests |
| **Outputs** | Security report, STATE.md updated |
| **Triggers** | `SECURITY_REVIEW_REQUESTED` |

---

## Purpose

Find security vulnerabilities before they reach production. OWASP Top 10 scan, secrets detection, dependency audit, and auth review. Read-only analysis — never modifies source files.

> **See also:** For config-level defaults and hardcoded credentials, see SKL-0029 (Insecure Defaults). For security review of code diffs, see SKL-0030 (Differential Security Review). For dependency health and trust signals, see SKL-0031 (Supply Chain Audit).

---

## Procedure

1. **OWASP Top 10 scan** of target files:
   - Injection (SQL, command, template)
   - Broken auth (weak passwords, session issues, missing MFA)
   - Sensitive data exposure (unencrypted PII, logged secrets, verbose errors)
   - XSS/XXE (unsanitized input in HTML/XML/templates)
   - Broken access control (missing authz checks, privilege escalation)
   - Security misconfiguration (debug mode in prod, default credentials)
   - CSRF (missing tokens on state-changing operations)
2. **Secrets scan** across codebase:
   - API keys, passwords, tokens, private keys, connection strings
   - `.env` files committed to version control
   - Pattern matching for common secret formats (AWS keys, JWT secrets)
3. **Dependency audit** (if manifests exist):
   - Check for known CVEs
   - Flag outdated packages with vulnerabilities
   - Recommend patched versions
4. **Auth and authorization review:**
   - Tokens validated on every protected route?
   - Passwords hashed with strong algorithm (bcrypt, argon2)?
   - Session management secure (httpOnly, secure flags, expiry)?
   - Principle of least privilege followed?
5. **Produce security report** with severity ratings:
   - **CRITICAL:** Exploitable now, blocks deployment
   - **HIGH:** Serious risk, fix before merge
   - **MEDIUM:** Should fix, track in task queue
   - **LOW:** Best practice improvement
6. **Update STATE.md** with findings.

---

## Constraints

- Never modifies source files — read-only analysis
- Never logs, echoes, or exposes secrets — even in reports
- Never suggests disabling security features without justification
- Always recommends well-maintained libraries over custom crypto/auth

---

## Primary Agent

reviewer

---

## Definition of Done

- [ ] OWASP Top 10 scan completed
- [ ] Secrets scan completed
- [ ] Dependency audit completed (if manifests exist)
- [ ] Auth and authorization reviewed (if applicable)
- [ ] All findings rated by severity
- [ ] Security report written to STATE.md
