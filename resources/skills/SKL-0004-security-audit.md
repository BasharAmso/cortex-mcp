---
id: SKL-0004
name: Security Audit
category: skills
tags: [security, audit, owasp, vulnerabilities, secrets, dependencies]
capabilities: [vulnerability-detection, secrets-scanning, dependency-audit, owasp-checks]
useWhen:
  - auditing code for security vulnerabilities
  - checking for exposed secrets or credentials
  - reviewing dependency security
  - preparing for a security review
estimatedTokens: 650
relatedFragments: [SKL-0002, AGT-0002]
dependencies: []
synonyms: ["is my app secure", "check for security holes", "find vulnerabilities in my code", "am I exposing any secrets", "scan my dependencies for risks"]
lastUpdated: "2026-03-29"
difficulty: advanced
---

# Security Audit

Audit code and dependencies for security vulnerabilities.

## Procedure

### 1. Secrets Scan

Check for hardcoded secrets in the codebase:

- API keys, tokens, passwords in source files
- `.env` files committed to git
- Credentials in configuration files
- Private keys or certificates

Tools: `git log --all -p | grep -i "password\|secret\|api_key\|token"`

### 2. OWASP Top 10 Check

| Risk | What to look for |
|------|-----------------|
| Injection | Unsanitized user input in SQL, shell commands, HTML |
| Broken Auth | Weak passwords, missing MFA, session fixation |
| Sensitive Data | Unencrypted PII, missing HTTPS, verbose errors |
| XXE | XML parsing without disabling external entities |
| Broken Access | Missing authorization checks, IDOR vulnerabilities |
| Misconfig | Default credentials, debug mode in production, open CORS |
| XSS | User input rendered without escaping |
| Deserialization | Untrusted data deserialized without validation |
| Components | Known vulnerabilities in dependencies |
| Logging | Insufficient logging, or logging sensitive data |

### 3. Dependency Audit

```bash
npm audit          # Node.js
pip-audit          # Python
cargo audit        # Rust
```

Flag: critical/high severity vulnerabilities that have available patches.

### 4. Report Format

For each finding:
```
[SEVERITY] Category — Description
Location: file:line
Impact: What could happen
Fix: Specific remediation
```

Severities: CRITICAL > HIGH > MEDIUM > LOW > INFO
