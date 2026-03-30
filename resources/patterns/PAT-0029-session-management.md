---
id: PAT-0029
name: Session Management
category: patterns
tags: [sessions, jwt, cookies, security, authentication, httponly, samesite, session-fixation, remember-me]
capabilities: [session-design, cookie-configuration, jwt-vs-sessions, concurrent-session-handling]
useWhen:
  - choosing between JWT and server-side sessions for authentication
  - configuring secure cookies for a web application
  - implementing remember-me functionality
  - handling concurrent sessions and forced logout across devices
  - securing session handling against fixation and hijacking
estimatedTokens: 650
relatedFragments: [PAT-0003, PAT-0028, PAT-0032, SKL-0015]
dependencies: []
synonyms: ["should I use jwt or cookies for login", "how to keep users logged in safely", "how does remember me work", "my sessions keep expiring too fast", "how to kick a user out of all devices"]
lastUpdated: "2026-03-29"
difficulty: intermediate
owner: builder
sourceUrl: "https://github.com/OWASP/CheatSheetSeries"
---

# Session Management

How to design secure, user-friendly session handling for web applications. OWASP session management cheat sheet defines the security baselines applied here.

## JWT vs Server-Side Sessions

| Aspect | JWT | Server-Side Sessions |
|--------|-----|---------------------|
| **Storage** | Token on client, no server state | Session ID on client, data on server |
| **Scalability** | Stateless, scales horizontally | Requires shared store (Redis) |
| **Revocation** | Hard (need blocklist or short expiry) | Easy (delete from store) |
| **Size** | Grows with claims | Fixed (just a session ID) |
| **Best for** | APIs, microservices, mobile | Server-rendered apps, simple setups |

**Decision rule:** If you need instant revocation (ban user, force logout), use server-side sessions. If you need stateless horizontal scaling, use short-lived JWTs with refresh tokens.

## Cookie Security Configuration

Every auth cookie must set all four security attributes:

```
Set-Cookie: session=abc123;
  HttpOnly;        // JS cannot read it (XSS protection)
  Secure;          // HTTPS only
  SameSite=Lax;    // CSRF protection
  Path=/;
  Max-Age=86400;   // 24 hours
```

| Attribute | Why It Matters |
|-----------|---------------|
| `HttpOnly` | Prevents JavaScript from stealing the cookie via XSS |
| `Secure` | Prevents cookie from being sent over HTTP |
| `SameSite=Lax` | Blocks cross-site POST requests (CSRF) |
| `Max-Age` | Controls lifetime. Omit for session cookie (cleared on browser close) |

## Session Expiry Strategy

| Type | Duration | Use Case |
|------|----------|----------|
| **Absolute expiry** | 24h-7d | Maximum lifetime regardless of activity |
| **Idle timeout** | 15-30min | Expire if no activity (financial/medical apps) |
| **Sliding window** | Reset on activity | Keep active users logged in |
| **Remember me** | 30-90 days | Long-lived token for returning users |

## Remember Me Implementation

1. Issue a separate long-lived token (not the session token)
2. Store it hashed in the database, linked to the user
3. On return visit, validate the remember-me token and create a new session
4. Regenerate the token after each use (rotation)

## Security Checklist

- [ ] Regenerate session ID after login (prevents session fixation)
- [ ] Invalidate session on password change
- [ ] Set all four cookie security attributes
- [ ] Implement absolute session expiry (not just idle timeout)
- [ ] Log session creation with IP and device for audit trail
- [ ] Provide "log out of all devices" functionality

## Common Mistakes

- Using localStorage for session tokens (vulnerable to XSS)
- Not regenerating session ID after authentication
- Setting `SameSite=None` without understanding CSRF implications
- Forgetting to invalidate sessions on password change
- Making sessions last forever with no absolute expiry
