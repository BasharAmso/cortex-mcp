---
id: SKL-0034
name: Insecure Defaults Detection
category: skills
tags: [security, configuration, audit, credentials, hardcoded-secrets]
capabilities: [hardcoded-secret-detection, fail-open-pattern-detection, dangerous-default-detection, config-security-scan]
useWhen:
  - scanning for hardcoded credentials or API keys in code
  - detecting fail-open security patterns in authentication logic
  - checking configuration files for insecure default values
  - auditing .env files and config for production readiness
estimatedTokens: 600
relatedFragments: [SKL-0033, SKL-0035, SKL-0003]
dependencies: []
---

# Insecure Defaults Detection

Scan application code and configuration for insecure defaults, hardcoded credentials, and fail-open security patterns that would survive into production.

## Procedure

### 1. Identify Configuration Surface

Scan for all configuration files: .env variants, config directories, Docker files, CI/CD configs, database connection strings, API endpoint configs, auth settings, CORS/CSP headers.

### 2. Check for Hardcoded Secrets

| Pattern | Severity |
|---------|----------|
| Hardcoded API keys (`apiKey = "sk-..."`) | CRITICAL |
| Hardcoded passwords (`password = "admin123"`) | CRITICAL |
| Default JWT secrets (`JWT_SECRET = "secret"`) | CRITICAL |
| Hardcoded database credentials | HIGH |
| Commented-out credentials | MEDIUM |
| Placeholder secrets in non-example files | HIGH |

### 3. Check for Fail-Open Patterns

| Pattern | Severity |
|---------|----------|
| Auth bypass on error (`catch { return true }`) | CRITICAL |
| CORS wildcard in production | HIGH |
| Debug mode defaulting to true | HIGH |
| Disabled CSRF protection | HIGH |
| Permissive CSP (`default-src *`) | MEDIUM |
| Missing rate limiting on auth endpoints | MEDIUM |
| Insecure cookie defaults (missing Secure, HttpOnly, SameSite) | MEDIUM |

### 4. Check for Dangerous Defaults

| Pattern | Severity |
|---------|----------|
| Default admin accounts (admin/admin) | CRITICAL |
| Open registration with no verification | HIGH |
| Stack traces exposed to client | MEDIUM |
| Missing HTTPS redirect | MEDIUM |
| Auto-approve patterns without validation | HIGH |

### 5. Generate Report

For each finding: file and line number, severity, what was found, why it is dangerous (attack scenario), and a concrete recommended fix.

## Key Rules

- Read-only analysis. Does not modify source files.
- Never prints actual secret values in reports. Redact to first/last 2 characters.
- Complements full security audit with a configuration-level focus.
- Does not scan dependencies (that is Security Audit's job).
