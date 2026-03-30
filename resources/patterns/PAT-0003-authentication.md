---
id: PAT-0003
name: Authentication Patterns
category: patterns
tags: [authentication, jwt, session, oauth, security, auth, owasp, credential-storage, csrf, mfa]
capabilities: [auth-design, token-management, session-handling, oauth-integration]
useWhen:
  - adding authentication to a new application
  - choosing between JWT, session, or OAuth strategies
  - implementing login, signup, or password reset flows
  - securing API endpoints with auth middleware
  - reviewing auth implementation for OWASP compliance
estimatedTokens: 650
relatedFragments: [PAT-0001, PAT-0002, EX-0004]
dependencies: []
synonyms: ["how do I add logins to my app", "how to make users sign up and log in", "should I use jwt or sessions", "how to add google login", "how to protect my api routes"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/OWASP/CheatSheetSeries"
difficulty: intermediate
owner: builder
---

# Authentication Patterns

How to choose and implement authentication, aligned with OWASP Cheat Sheet Series security practices.

## Strategy Comparison

| Strategy | Best For | Trade-offs |
|----------|----------|------------|
| **Session-based** | Server-rendered apps, simple setups | Requires server-side storage; needs sticky sessions or shared store for scaling |
| **JWT** | SPAs, microservices, stateless APIs | No server storage; harder to revoke; token size grows with claims |
| **OAuth 2.0 / OIDC** | "Login with Google/GitHub", delegated auth | Offloads auth complexity; dependency on third-party provider |

## OWASP-Aligned Guidelines

1. **Hash passwords with Argon2id or bcrypt** (cost factor 10+). Never MD5, SHA-1, or plain text. Reference: OWASP Password Storage Cheat Sheet.
2. **JWTs must be short-lived** (15 min access, 7-day refresh). Sign with RS256 for multi-service setups, HS256 for single-service.
3. **Store tokens in HttpOnly, Secure, SameSite=Strict cookies.** Never localStorage for auth tokens (XSS vulnerable). Reference: OWASP Session Management Cheat Sheet.
4. **Server-side validation is security; client-side is UX.** Always re-validate tokens and permissions on the server.
5. **Rate limit auth endpoints.** Max 5-10 attempts per minute per IP. Use progressive delays or CAPTCHA after threshold.
6. **Implement CSRF protection** for cookie-based auth. Use SameSite cookie attribute plus a synchronizer token or double-submit pattern.
7. **Add MFA for sensitive actions.** TOTP (Google Authenticator) is the minimum standard. WebAuthn/passkeys for stronger security.

## JWT Flow

```
Client -> POST /auth/login { email, password }
Server -> Verify credentials -> Issue access JWT (15m) + refresh token (7d, HttpOnly cookie)
Client -> Authorization: Bearer <jwt> on API requests
Server -> Verify JWT signature + expiry + claims -> Allow or 401
Client -> POST /auth/refresh (cookie) when access token expires
Server -> Validate refresh token -> Issue new access token
```

## Session Flow

```
Client -> POST /auth/login { email, password }
Server -> Create session in Redis/DB -> Set-Cookie: sid=<id>; HttpOnly; Secure; SameSite=Strict
Client -> Cookie auto-sent on requests
Server -> Look up session -> Verify not expired -> Allow or 401
```

## Anti-Patterns

- Rolling your own crypto or custom token formats
- Storing JWTs in localStorage (XSS attack vector)
- Never expiring tokens or sessions
- Skipping CSRF protection with cookie-based auth
- Hardcoding secrets or keys in source code
- Using GET requests for login (credentials in URL/logs)
