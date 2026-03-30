---
id: SKL-0004
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
relatedFragments: [SKL-0002, AGT-0002]
dependencies: []
synonyms: ["is my app secure", "check for security holes", "find vulnerabilities in my code", "am I exposing any secrets", "scan my dependencies for risks"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/OWASP/CheatSheetSeries"
difficulty: advanced
---

# Security Audit

Audit code and dependencies for security vulnerabilities. Grounded in the OWASP Cheat Sheet Series, the official OWASP flagship project providing actionable security guidance for builders.

## Procedure

### 1. Secrets Scan

Check for hardcoded secrets in the codebase:

| Target | Where to look |
|--------|--------------|
| API keys, tokens, passwords | Source files, config files |
| `.env` files | Git history (`git log --all -p`) |
| Private keys / certificates | Project root, config directories |
| Connection strings | ORM config, database setup files |

Tools: `git log --all -p | grep -i "password\|secret\|api_key\|token"`

### 2. OWASP Top 10 Check (With Cheat Sheet References)

| Risk | What to look for | OWASP Cheat Sheet |
|------|-----------------|-------------------|
| Injection | Unsanitized user input in SQL, shell, HTML | Injection Prevention, Query Parameterization |
| Broken Auth | Weak passwords, missing MFA, session fixation | Authentication, Session Management |
| Sensitive Data | Unencrypted PII, missing HTTPS, verbose errors | Cryptographic Storage, Transport Layer Security |
| XXE | XML parsing without disabling external entities | XML Security |
| Broken Access | Missing authorization checks, IDOR | Authorization, Access Control |
| Misconfig | Default credentials, debug mode in prod, open CORS | Security Headers, Error Handling |
| XSS | User input rendered without escaping | Cross-Site Scripting Prevention |
| Deserialization | Untrusted data deserialized without validation | Deserialization |
| Components | Known vulnerabilities in dependencies | Third-Party JavaScript, Dependency Check |
| Logging | Insufficient logging, or logging sensitive data | Logging, Application Logging Vocabulary |

### 3. Dependency Audit

```bash
npm audit          # Node.js
pip-audit          # Python
cargo audit        # Rust
```

Prioritization:
1. **Critical/High** with available patches -- fix immediately
2. **Critical/High** without patches -- assess workaround or replace
3. **Medium/Low** -- track, fix in next maintenance cycle

### 4. Configuration Security

Check for insecure defaults per the OWASP configuration cheat sheet:
- CORS set to `*` (should be specific origins)
- Debug mode enabled in production
- Default admin credentials still active
- Rate limiting absent on auth endpoints
- HTTPS not enforced

### 5. Report Format

For each finding:
```
[SEVERITY] Category -- Description
Location: file:line
Impact: What could happen
Fix: Specific remediation (reference OWASP cheat sheet)
```

Severities: CRITICAL > HIGH > MEDIUM > LOW > INFO
