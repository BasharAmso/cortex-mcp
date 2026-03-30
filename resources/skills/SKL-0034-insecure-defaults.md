---
id: SKL-0034
name: Insecure Defaults Detection
category: skills
tags: [security, configuration, audit, credentials, hardcoded-secrets, OWASP, fail-open, CORS, CSP]
capabilities: [hardcoded-secret-detection, fail-open-pattern-detection, dangerous-default-detection, config-security-scan, cookie-security-check]
useWhen:
  - scanning for hardcoded credentials or API keys in code
  - detecting fail-open security patterns in authentication logic
  - checking configuration files for insecure default values
  - auditing .env files and config for production readiness
  - reviewing cookie, CORS, and CSP settings for security
estimatedTokens: 600
relatedFragments: [SKL-0033, SKL-0035, SKL-0003]
dependencies: []
synonyms: ["did I leave any passwords in my code", "check for hardcoded secrets", "are my config defaults safe", "scan for API keys in source", "find insecure settings"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/OWASP/CheatSheetSeries"
difficulty: intermediate
---

# Insecure Defaults Detection

Scan application code and configuration for insecure defaults, hardcoded credentials, and fail-open security patterns that would survive into production. Informed by OWASP Cheat Sheet Series guidance on secure configuration, credential management, and defense-in-depth.

## OWASP Context

This skill addresses OWASP Top 10 risks A05:2021 (Security Misconfiguration) and A07:2021 (Identification and Authentication Failures). The OWASP Cheat Sheet Series provides specific guidance on: Password Storage, Secrets Management, HTTP Security Headers, Session Management, Cross-Site Request Forgery Prevention, and Content Security Policy.

## Procedure

### 1. Identify Configuration Surface

Scan for all configuration entry points:

| File Type | What to Check |
|-----------|--------------|
| `.env`, `.env.*` | Secrets, database URLs, API keys |
| `config/`, `settings.*` | Feature flags, debug modes, default accounts |
| `Dockerfile`, `docker-compose.*` | Exposed ports, env vars, build args |
| CI/CD configs (`.github/workflows/`) | Secrets in plain text, overly broad permissions |
| Database connection strings | Hardcoded credentials, unencrypted connections |
| Auth configuration | JWT secrets, session settings, OAuth config |
| CORS/CSP headers | Overly permissive origins or directives |

### 2. Check for Hardcoded Secrets

| Pattern | Severity | OWASP Reference |
|---------|----------|----------------|
| Hardcoded API keys (`apiKey = "sk-..."`) | CRITICAL | Secrets Management CS |
| Hardcoded passwords (`password = "admin123"`) | CRITICAL | Password Storage CS |
| Default JWT secrets (`JWT_SECRET = "secret"`) | CRITICAL | JSON Web Token CS |
| Hardcoded database credentials | HIGH | Database Security CS |
| Commented-out credentials | MEDIUM | Secrets Management CS |
| Placeholder secrets in non-example files | HIGH | Secrets Management CS |

### 3. Check for Fail-Open Patterns

| Pattern | Severity | OWASP Reference |
|---------|----------|----------------|
| Auth bypass on error (`catch { return true }`) | CRITICAL | Authentication CS |
| CORS wildcard in production (`Access-Control-Allow-Origin: *`) | HIGH | CORS CS |
| Debug mode defaulting to true | HIGH | Error Handling CS |
| Disabled CSRF protection | HIGH | CSRF Prevention CS |
| Permissive CSP (`default-src *` or `unsafe-inline`) | MEDIUM | Content Security Policy CS |
| Missing rate limiting on auth endpoints | MEDIUM | Credential Stuffing CS |
| Insecure cookie defaults (missing Secure, HttpOnly, SameSite) | MEDIUM | Session Management CS |

### 4. Check for Dangerous Defaults

| Pattern | Severity | Attack Scenario |
|---------|----------|----------------|
| Default admin accounts (admin/admin) | CRITICAL | Automated credential stuffing |
| Open registration with no verification | HIGH | Bot spam, resource abuse |
| Stack traces exposed to client | MEDIUM | Information disclosure for attackers |
| Missing HTTPS redirect | MEDIUM | Man-in-the-middle credential theft |
| Auto-approve patterns without validation | HIGH | Privilege escalation |
| Overly broad file upload (no type/size limits) | HIGH | Malicious file upload |

### 5. Generate Report

For each finding: file and line number, severity, what was found, OWASP cheat sheet reference, attack scenario (how an attacker would exploit this), and a concrete recommended fix with code snippet.

## Key Rules

- Read-only analysis. Does not modify source files.
- Never prints actual secret values in reports. Redact to first/last 2 characters.
- References specific OWASP Cheat Sheets for remediation guidance.
- Complements full security audit with a configuration-level focus.
- Does not scan dependencies (that is Supply Chain Audit's job).
