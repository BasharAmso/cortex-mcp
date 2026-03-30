---
id: PAT-0029
name: Session Management
category: patterns
tags: [sessions, jwt, cookies, security, authentication, httponly, samesite]
capabilities: [session-design, cookie-configuration, jwt-vs-sessions, concurrent-session-handling]
useWhen:
  - choosing between JWT and server-side sessions
  - configuring secure cookies for authentication
  - implementing remember-me functionality
  - handling concurrent sessions and forced logout
estimatedTokens: 600
relatedFragments: [PAT-0003, PAT-0028, PAT-0032, SKL-0004]
dependencies: []
synonyms: ["should I use jwt or cookies for login", "how to keep users logged in", "how does remember me work", "my sessions keep expiring too fast", "how to kick a user out of all devices"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Session Management

How to design secure, user-friendly session handling for web applications.

## JWT vs Server-Side Sessions

| Aspect | JWT | Server-Side Sessions |
|--------|-----|---------------------|
| **Storage** | Token on client, no server state | Session ID on client, data on server |
| **Scalability** | Stateless, scales horizontally | Requires shared session store (Redis) |
| **Revocation** | Hard (need blocklist or short expiry) | Easy (delete from store) |
| **Size** | Grows with claims | Fixed (just a session ID) |
| **Best for** | APIs, microservices, mobile | Server-rendered apps, simple setups |

**Decision rule:** If you need instant revocation (ban user, force logout), use server-side sessions. If you need stateless horizontal scaling, use short-lived JWTs with refresh tokens.

## Cookie Configuration

Every auth cookie must set all four security attributes:

```
Set-Cookie: session=abc123;
  HttpOnly;        // JS cannot read it (XSS protection)
  Secure;          // HTTPS only
  SameSite=Lax;    // CSRF protection (Strict if no cross-site navigation needed)
  Path=/;          // Available on all routes
  Max-Age=86400;   // 24 hours (or omit for session cookie)
  Domain=.app.com; // Include subdomains if needed
```

| Attribute | Why It Matters |
|-----------|---------------|
| `HttpOnly` | Prevents JavaScript from stealing the cookie via XSS |
| `Secure` | Prevents cookie from being sent over unencrypted HTTP |
| `SameSite=Lax` | Blocks cross-site POST requests (CSRF). Use `Strict` for sensitive apps |
| `Max-Age` | Controls cookie lifetime. Omit to make it a session cookie (cleared on browser close) |

## Session Expiry Strategy

| Type | Duration | Use Case |
|------|----------|----------|
| **Absolute expiry** | 24h-7d | Maximum session lifetime regardless of activity |
| **Idle timeout** | 15-30min | Expire if no activity (financial/medical apps) |
| **Sliding window** | Reset on activity | Keep active users logged in, expire inactive ones |
| **Remember me** | 30-90 days | Long-lived token for returning users |

**Remember me implementation:**
1. Issue a separate long-lived token (not the session token).
2. Store it hashed in the database, linked to the user.
3. On return visit, validate the remember-me token and create a new session.
4. Regenerate the remember-me token after each use (rotation).

## Concurrent Session Handling

```
// Track active sessions per user
sessions_table: { id, user_id, device_info, ip, created_at, last_active }

// Options:
1. Allow unlimited sessions (show in security settings)
2. Limit to N sessions (evict oldest when exceeded)
3. Notify on new login from unknown device
4. Allow user to revoke individual sessions
```

## Security Checklist

- [ ] Regenerate session ID after login (prevents session fixation)
- [ ] Invalidate session on password change
- [ ] Set all four cookie security attributes (HttpOnly, Secure, SameSite, Path)
- [ ] Implement absolute session expiry (not just idle timeout)
- [ ] Log session creation with IP and device for audit trail
- [ ] Provide "log out of all devices" functionality

## Common Mistakes

- Using localStorage for session tokens (vulnerable to XSS)
- Not regenerating session ID after authentication
- Setting `SameSite=None` without understanding the CSRF implications
- Forgetting to invalidate sessions on password change or account compromise
- Making sessions last forever with no absolute expiry
