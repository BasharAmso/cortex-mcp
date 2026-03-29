---
id: PAT-0003
name: Authentication Patterns
category: patterns
tags: [authentication, jwt, session, oauth, security, auth]
capabilities: [auth-design, token-management, session-handling, oauth-integration]
useWhen:
  - adding authentication to a new application
  - choosing between JWT, session, or OAuth strategies
  - implementing login, signup, or password reset flows
  - securing API endpoints with auth middleware
estimatedTokens: 650
relatedFragments: [PAT-0001, PAT-0002, EX-0004]
dependencies: []
---

# Authentication Patterns

How to choose and implement authentication for web applications.

## Strategy Comparison

| Strategy | Best For | Trade-offs |
|----------|----------|------------|
| **Session-based** | Server-rendered apps, simple setups | Requires server-side storage; sticky sessions for scaling |
| **JWT** | SPAs, microservices, stateless APIs | No server storage needed; harder to revoke; token size grows with claims |
| **OAuth 2.0** | "Login with Google/GitHub" | Delegates auth to provider; more complex flow; dependency on third party |

## Guidelines

1. **Never store passwords in plain text.** Use bcrypt or argon2 with a cost factor of 10+.
2. **JWTs should be short-lived** (15 minutes). Use refresh tokens for long sessions.
3. **Store tokens securely.** HttpOnly cookies for web apps. Never localStorage for sensitive tokens.
4. **Always validate on the server.** Client-side auth checks are UX, not security.
5. **Implement rate limiting** on login endpoints to prevent brute force.

## JWT Flow

```
Client -> POST /login (credentials)
Server -> Validate credentials -> Issue JWT + refresh token
Client -> Authorization: Bearer <jwt> on subsequent requests
Server -> Verify JWT signature + expiry -> Allow or reject
Client -> POST /refresh (refresh token) when JWT expires
```

## Session Flow

```
Client -> POST /login (credentials)
Server -> Create session in store -> Set session cookie (HttpOnly, Secure, SameSite)
Client -> Cookie sent automatically on subsequent requests
Server -> Look up session -> Allow or reject
```

## Anti-Patterns

- Rolling your own crypto or token format
- Storing JWTs in localStorage (XSS vulnerable)
- Never expiring tokens or sessions
- Skipping CSRF protection with cookie-based auth
- Hardcoding secrets in source code
