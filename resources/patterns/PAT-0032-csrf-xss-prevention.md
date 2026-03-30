---
id: PAT-0032
name: CSRF & XSS Prevention
category: patterns
tags: [csrf, xss, security, csp, sanitization, cookies, headers, content-security-policy, dompurify, owasp]
capabilities: [csrf-protection, xss-prevention, csp-configuration, input-sanitization, security-headers]
useWhen:
  - protecting forms and state-changing endpoints from CSRF attacks
  - preventing cross-site scripting in user-generated content
  - setting up Content Security Policy headers
  - hardening an application with security response headers
  - rendering user-submitted HTML safely
estimatedTokens: 700
relatedFragments: [PAT-0003, PAT-0029, PAT-0028, SKL-0004, SKL-0034]
dependencies: []
synonyms: ["how to prevent csrf attacks on my forms", "how to stop xss in user input", "what security headers should I add", "someone could inject scripts into my site", "how to set up content security policy"]
lastUpdated: "2026-03-29"
difficulty: intermediate
sourceUrl: "https://github.com/OWASP/CheatSheetSeries"
---

# CSRF & XSS Prevention

How to protect your application from the two most common web security vulnerabilities. OWASP Cheat Sheet Series provides detailed guidance on both attack vectors.

## CSRF (Cross-Site Request Forgery)

An attacker tricks a logged-in user's browser into making unwanted requests to your server.

### Defense Layers

**Layer 1: SameSite Cookies (primary)**
```
Set-Cookie: session=abc; SameSite=Lax; Secure; HttpOnly
```
`SameSite=Lax` blocks cross-site POST requests. This alone stops most CSRF.

**Layer 2: CSRF Tokens (defense in depth)**
```typescript
// Server generates token per session, client sends it in header
fetch("/api/transfer", {
  method: "POST",
  headers: { "X-CSRF-Token": csrfToken },
  body: JSON.stringify(data),
});
```

**Layer 3: Origin/Referer validation** as a secondary check.

## XSS (Cross-Site Scripting)

An attacker injects malicious scripts that execute in other users' browsers.

**Rule: Sanitize on output, not just input.** Store raw data, encode when rendering.

### Framework Protections

| Framework | Default Protection | Danger API |
|-----------|-------------------|------------|
| **React** | Auto-escapes `{variable}` | `dangerouslySetInnerHTML` |
| **Vue** | Auto-escapes `{{ }}` | `v-html` directive |
| **Angular** | Auto-sanitizes bindings | `bypassSecurityTrustHtml()` |

**Never use "bypass" or "dangerous" APIs with user input.**

For rich text, use DOMPurify:
```typescript
import DOMPurify from "dompurify";
const clean = DOMPurify.sanitize(userHtml, {
  ALLOWED_TAGS: ["b", "i", "a", "p", "br", "ul", "li"],
  ALLOWED_ATTR: ["href"],
});
```

## Content Security Policy

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-{random}';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  frame-ancestors 'none';
```

Start strict, use `Content-Security-Policy-Report-Only` first to test without breaking.

## Security Headers Checklist

```
Content-Security-Policy: [see above]
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

## Quick Decision Guide

| Situation | Protection |
|-----------|-----------|
| Forms that change data | CSRF token + SameSite cookies |
| Displaying user text | Output encoding (auto in React/Vue/Angular) |
| Rendering user HTML | DOMPurify sanitization |
| Any page | CSP + security headers |
| File uploads | Validate MIME, serve from separate domain |

## Common Mistakes

- Relying only on `SameSite=Lax` without CSRF tokens
- Sanitizing on input but not encoding on output
- Using `dangerouslySetInnerHTML` or `v-html` with user content
- Setting CSP to `unsafe-inline unsafe-eval` (defeats the purpose)
- Not setting `X-Content-Type-Options: nosniff`
