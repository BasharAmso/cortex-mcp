---
id: PAT-0032
name: CSRF & XSS Prevention
category: patterns
tags: [csrf, xss, security, csp, sanitization, cookies, headers, content-security-policy]
capabilities: [csrf-protection, xss-prevention, csp-configuration, input-sanitization, security-headers]
useWhen:
  - protecting forms and state-changing endpoints from CSRF attacks
  - preventing cross-site scripting in user-generated content
  - setting up Content Security Policy headers
  - hardening an application with security headers
estimatedTokens: 650
relatedFragments: [PAT-0003, PAT-0029, PAT-0028, SKL-0004, SKL-0034]
dependencies: []
synonyms: ["how to prevent csrf attacks on my forms", "how to stop xss in user input", "what security headers should I add", "someone could inject scripts into my site", "how to set up content security policy"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# CSRF & XSS Prevention

How to protect your application from the two most common web security vulnerabilities.

## CSRF (Cross-Site Request Forgery)

An attacker tricks a logged-in user's browser into making unwanted requests to your server.

### Defense Layers

**Layer 1: SameSite Cookies (primary)**
```
Set-Cookie: session=abc; SameSite=Lax; Secure; HttpOnly
```
`SameSite=Lax` blocks cross-site POST requests. This alone stops most CSRF attacks.

**Layer 2: CSRF Tokens (defense in depth)**
```
// Server generates token per session
const csrfToken = crypto.randomBytes(32).toString("hex");
// Store in session, send to client via meta tag or cookie

// Client includes token in requests
fetch("/api/transfer", {
  method: "POST",
  headers: { "X-CSRF-Token": csrfToken },
  body: JSON.stringify(data),
});

// Server validates token matches session
if (req.headers["x-csrf-token"] !== req.session.csrfToken) {
  return res.status(403).json({ error: "Invalid CSRF token" });
}
```

**Layer 3: Origin/Referer Validation**
```typescript
function validateOrigin(req: Request): boolean {
  const origin = req.headers.origin || req.headers.referer;
  const allowed = ["https://myapp.com", "https://www.myapp.com"];
  return allowed.some(a => origin?.startsWith(a));
}
```

## XSS (Cross-Site Scripting)

An attacker injects malicious scripts that execute in other users' browsers.

### Input Sanitization

**Rule: Sanitize on output, not just input.** Store raw data, encode when rendering.

```typescript
// HTML context — encode entities
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// For rich text, use a sanitization library
import DOMPurify from "dompurify";
const clean = DOMPurify.sanitize(userHtml, {
  ALLOWED_TAGS: ["b", "i", "a", "p", "br", "ul", "li"],
  ALLOWED_ATTR: ["href"],
});
```

### Framework Protections

| Framework | Default XSS Protection |
|-----------|----------------------|
| **React** | Auto-escapes JSX expressions `{variable}`. Danger: `dangerouslySetInnerHTML` |
| **Vue** | Auto-escapes `{{ }}`. Danger: `v-html` directive |
| **Angular** | Auto-sanitizes bindings. Danger: `bypassSecurityTrustHtml()` |

**Rule:** Never use the framework's "bypass" or "dangerous" APIs with user input.

## Content Security Policy (CSP)

CSP tells the browser which resources are allowed to load. This is the strongest XSS mitigation.

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-{random}';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://api.myapp.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
```

**Start strict, loosen as needed.** Use `Content-Security-Policy-Report-Only` first to test without breaking anything.

## Security Headers Checklist

Add these to every response:

```
Content-Security-Policy: [see above]
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-XSS-Protection: 0  // Disable (legacy, can cause issues; CSP is the replacement)
```

## Quick Decision Guide

| Situation | Protection |
|-----------|-----------|
| Forms that change data | CSRF token + SameSite cookies |
| Displaying user text | Output encoding (auto in React/Vue/Angular) |
| Rendering user HTML | DOMPurify sanitization |
| Any page | CSP + security headers |
| File uploads | Validate MIME type, serve from separate domain |
| URL parameters in links | Validate URL scheme (block `javascript:`) |

## Common Mistakes

- Relying only on `SameSite=Lax` without CSRF tokens (incomplete defense)
- Sanitizing input on entry but not encoding on output
- Using `dangerouslySetInnerHTML` or `v-html` with user content
- Setting CSP to `unsafe-inline unsafe-eval` (defeats the purpose)
- Forgetting to protect JSON APIs (CSRF applies to any state-changing request)
- Not setting `X-Content-Type-Options: nosniff` (MIME sniffing attacks)
