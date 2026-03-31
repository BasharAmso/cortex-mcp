---
id: SKL-0316
name: Frontend Security
category: skills
tags: [security, xss, csp, cors, sanitization, auth-tokens]
capabilities: [xss-prevention, csp-configuration, cors-understanding, token-management, input-sanitization]
useWhen:
  - preventing cross-site scripting (XSS) vulnerabilities
  - configuring Content Security Policy headers
  - handling authentication tokens securely in the browser
  - sanitizing user input before rendering
  - understanding CORS errors and configuration
estimatedTokens: 650
relatedFragments: [SKL-0005, PAT-0165, PAT-0160]
dependencies: []
synonyms: ["how to prevent XSS attacks", "how to set up Content Security Policy", "how to store auth tokens securely", "how to fix CORS errors", "how to sanitize user input in the frontend", "how to secure a web application"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: "cortex"
pillar: "frontend"
---

# Skill: Frontend Security

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0316 |
| **Name** | Frontend Security |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Frontend security prevents attackers from exploiting the browser environment to steal data, hijack sessions, or execute malicious code. The browser is a hostile execution environment; every input is untrusted.

### XSS (Cross-Site Scripting) Prevention

XSS is the most common frontend vulnerability. An attacker injects malicious JavaScript that runs in another user's browser.

**Three types:**

| Type | Vector | Defense |
|------|--------|---------|
| **Stored XSS** | Malicious script saved in database, rendered to other users | Server-side sanitization + output encoding |
| **Reflected XSS** | Malicious script in URL parameters, reflected in page | Never render URL params as raw HTML |
| **DOM XSS** | Client-side JS inserts untrusted data into the DOM | Avoid `innerHTML`, `document.write`, `eval()` |

**React is safe by default:** JSX escapes all values before rendering. The danger points are:
- `dangerouslySetInnerHTML` — only use with sanitized HTML (DOMPurify)
- `href={userInput}` — can execute `javascript:alert(1)` URLs
- `eval()` or `new Function()` with user data — never do this

```typescript
// Dangerous
<div dangerouslySetInnerHTML={{ __html: userComment }} />

// Safe
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userComment) }} />
```

### Content Security Policy (CSP)

CSP is an HTTP header that tells the browser which sources of content are allowed:

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://cdn.example.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://api.example.com;
```

Start with a strict policy and loosen as needed. The `script-src 'self'` directive blocks inline scripts and scripts from unknown domains, which stops most XSS attacks.

Use `Content-Security-Policy-Report-Only` to test a policy without enforcing it.

### Authentication Token Storage

| Storage | XSS Risk | CSRF Risk | Best For |
|---------|----------|-----------|----------|
| **HttpOnly Cookie** | Safe (JS cannot read) | Vulnerable (needs CSRF token) | Session-based auth |
| **localStorage** | Vulnerable (JS can read) | Safe (not sent automatically) | Never for sensitive tokens |
| **In-memory variable** | Safe-ish (cleared on refresh) | Safe | Short-lived SPAs |

**Recommended approach:** Store refresh tokens in HttpOnly, Secure, SameSite=Strict cookies. Keep access tokens in memory (JavaScript variable). Access tokens are short-lived (5-15 minutes) and refreshed silently via the cookie.

### CORS (Cross-Origin Resource Sharing)

CORS errors mean the browser is blocking a request because the server did not explicitly allow your origin.

**CORS is a server-side configuration**, not a frontend fix. The server must respond with:

```
Access-Control-Allow-Origin: https://yourapp.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

Never set `Access-Control-Allow-Origin: *` with credentials. It is both insecure and rejected by browsers.

### Input Sanitization Checklist

- **URLs:** Validate protocol is `http:` or `https:` before using in `href` or `src`. Block `javascript:` and `data:` URLs.
- **HTML content:** Run through DOMPurify before rendering with `dangerouslySetInnerHTML`.
- **File uploads:** Validate MIME type and file extension on both client and server. Never trust the client alone.
- **Redirects:** Validate redirect URLs against an allowlist of domains. Open redirects enable phishing.

### Security Headers

Beyond CSP, set these headers on your server:

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Content-Type-Options` | `nosniff` | Prevent MIME type sniffing |
| `X-Frame-Options` | `DENY` | Prevent clickjacking |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | Force HTTPS |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Control referrer leakage |

## Anti-Patterns

- Using `dangerouslySetInnerHTML` without DOMPurify sanitization
- Storing sensitive tokens in localStorage
- Setting `Access-Control-Allow-Origin: *` in production
- Disabling CORS or CSP to "make things work" during development and forgetting to re-enable
- Trusting client-side validation as the only security layer

## Key Takeaways

- React escapes by default, but `dangerouslySetInnerHTML` and `href` are XSS vectors
- Use HttpOnly cookies for refresh tokens and in-memory storage for access tokens
- CSP headers are the strongest defense against XSS after framework escaping
- CORS is a server configuration issue, not a frontend bug
- Never trust client-side validation alone; always validate on the server too
