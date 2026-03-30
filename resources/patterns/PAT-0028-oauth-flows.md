---
id: PAT-0028
name: OAuth Flows
category: patterns
tags: [oauth, pkce, social-login, authorization, tokens, security, authentication]
capabilities: [oauth-implementation, social-auth-setup, token-refresh-logic, logout-flow-design]
useWhen:
  - adding social login with Google, GitHub, or Apple
  - implementing OAuth 2.0 Authorization Code flow with PKCE
  - handling token refresh and silent re-authentication
  - building a logout flow that revokes tokens properly
estimatedTokens: 650
relatedFragments: [PAT-0003, PAT-0029, SKL-0004, SKL-0034]
dependencies: []
synonyms: ["how do I add Google login to my app", "sign in with GitHub button", "what is PKCE and do I need it", "how to handle oauth tokens and refresh", "add Apple sign in to my website"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# OAuth Flows

How to implement OAuth 2.0 securely for web and mobile applications.

## Authorization Code Flow with PKCE

PKCE (Proof Key for Code Exchange) is required for SPAs and mobile apps. It prevents authorization code interception attacks.

```
1. Client generates random code_verifier (43-128 chars)
2. Client hashes it → code_challenge = SHA256(code_verifier)
3. Client redirects to provider:
   GET /authorize?response_type=code&client_id=X
     &redirect_uri=Y&code_challenge=Z&code_challenge_method=S256
     &scope=openid+email+profile&state=random_csrf_value
4. User authenticates with provider
5. Provider redirects back: /callback?code=AUTH_CODE&state=random_csrf_value
6. Client sends AUTH_CODE + code_verifier to YOUR backend
7. Backend exchanges code + code_verifier for tokens with provider
8. Backend issues your own session/JWT to the client
```

## Social Login Setup Checklist

| Provider | Key Steps |
|----------|-----------|
| **Google** | Google Cloud Console > OAuth consent screen > Create OAuth 2.0 credentials. Scopes: `openid email profile` |
| **GitHub** | Settings > Developer Settings > OAuth Apps. Scopes: `read:user user:email` |
| **Apple** | Developer portal > Services IDs > Sign In with Apple. Requires domain verification + key file |

## Token Refresh Pattern

```
Client -> API request with access token
Server -> 401 Unauthorized (token expired)
Client -> POST /auth/refresh { refresh_token }
Server -> Validate refresh token -> Issue new access + refresh tokens
Client -> Retry original request with new access token
```

**Rules:**
- Refresh tokens are single-use. Rotate on every refresh.
- Store refresh tokens server-side or in HttpOnly cookies. Never in localStorage.
- Set refresh token expiry (7-30 days). Absolute expiry, not sliding.

## Logout Flow

1. Revoke refresh token on your server (delete from DB/store).
2. Clear client-side session (cookies, in-memory tokens).
3. Optionally redirect to provider's logout endpoint for full SSO logout.
4. Invalidate any server-side sessions associated with the user.

## Security Checklist

- [ ] Always use PKCE for public clients (SPAs, mobile)
- [ ] Validate the `state` parameter to prevent CSRF
- [ ] Exchange auth codes on the backend, never client-side
- [ ] Never expose `client_secret` in frontend code
- [ ] Validate `id_token` signature and claims (issuer, audience, expiry)
- [ ] Restrict redirect URIs to exact matches (no wildcards)
- [ ] Use HTTPS for all redirect URIs

## Common Mistakes

- Exchanging the auth code on the frontend, exposing your client secret
- Not validating the `state` parameter, allowing CSRF attacks
- Storing tokens in localStorage where XSS can steal them
- Accepting tokens without verifying the issuer and audience claims
- Using the implicit flow (deprecated) instead of Authorization Code + PKCE
