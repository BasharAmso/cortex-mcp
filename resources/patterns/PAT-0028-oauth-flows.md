---
id: PAT-0028
name: OAuth Flows
category: patterns
tags: [oauth, pkce, social-login, authorization, tokens, security, authentication, openid-connect, refresh-tokens]
capabilities: [oauth-implementation, social-auth-setup, token-refresh-logic, logout-flow-design]
useWhen:
  - adding social login with Google, GitHub, or Apple
  - implementing OAuth 2.0 Authorization Code flow with PKCE
  - handling token refresh and silent re-authentication
  - building a secure logout flow that revokes tokens
  - choosing between OAuth flows for SPAs vs server-rendered apps
estimatedTokens: 700
relatedFragments: [PAT-0003, PAT-0029, SKL-0015, SKL-0029]
dependencies: []
synonyms: ["how do I add Google login to my app", "sign in with GitHub button", "what is PKCE and do I need it", "how to handle oauth tokens and refresh", "add Apple sign in to my website"]
lastUpdated: "2026-03-29"
difficulty: intermediate
owner: builder
sourceUrl: "https://github.com/OWASP/CheatSheetSeries"
---

# OAuth Flows

How to implement OAuth 2.0 securely for web and mobile applications. Following OWASP guidance, always use Authorization Code + PKCE for public clients.

## Authorization Code Flow with PKCE

PKCE (Proof Key for Code Exchange) is required for SPAs and mobile apps. It prevents authorization code interception attacks.

```
1. Client generates random code_verifier (43-128 chars)
2. Client hashes it: code_challenge = SHA256(code_verifier)
3. Client redirects to provider with code_challenge
4. User authenticates with provider
5. Provider redirects back with AUTH_CODE + state
6. Client sends AUTH_CODE + code_verifier to YOUR backend
7. Backend exchanges code + verifier for tokens with provider
8. Backend issues your own session/JWT to the client
```

## Social Login Setup

| Provider | Key Steps |
|----------|-----------|
| **Google** | Cloud Console > OAuth consent screen > Create credentials. Scopes: `openid email profile` |
| **GitHub** | Settings > Developer Settings > OAuth Apps. Scopes: `read:user user:email` |
| **Apple** | Developer portal > Services IDs > Sign In with Apple. Requires domain verification |

## Token Refresh Pattern

```
Client -> API request with access token
Server -> 401 (token expired)
Client -> POST /auth/refresh { refresh_token }
Server -> Validate -> Issue new access + refresh tokens
Client -> Retry original request
```

**Rules:**
- Refresh tokens are single-use. Rotate on every refresh.
- Store refresh tokens server-side or in HttpOnly cookies. Never in localStorage.
- Set absolute expiry (7-30 days), not sliding.

## Logout Flow

1. Revoke refresh token on your server (delete from DB/store)
2. Clear client-side session (cookies, in-memory tokens)
3. Optionally redirect to provider's logout endpoint for SSO logout
4. Invalidate any server-side sessions for the user

## Security Checklist

- [ ] Always use PKCE for public clients (SPAs, mobile)
- [ ] Validate the `state` parameter to prevent CSRF
- [ ] Exchange auth codes on the backend, never client-side
- [ ] Never expose `client_secret` in frontend code
- [ ] Validate `id_token` signature and claims (issuer, audience, expiry)
- [ ] Restrict redirect URIs to exact matches (no wildcards)
- [ ] Use HTTPS for all redirect URIs

## Common Mistakes

- Exchanging the auth code on the frontend, exposing the client secret
- Not validating the `state` parameter (CSRF vulnerability)
- Storing tokens in localStorage where XSS can steal them
- Using the deprecated implicit flow instead of Authorization Code + PKCE
- Accepting tokens without verifying issuer and audience claims
