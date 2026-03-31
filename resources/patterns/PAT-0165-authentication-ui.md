---
id: PAT-0165
name: Authentication UI Pattern
category: patterns
tags: [authentication, login, oauth, mfa, password-reset, signup]
capabilities: [login-form-design, oauth-integration, mfa-flow, password-reset-flow]
useWhen:
  - building login and signup pages
  - implementing OAuth social login buttons
  - designing multi-factor authentication flows
  - creating password reset and recovery flows
  - handling authentication state in the UI
estimatedTokens: 650
relatedFragments: [SKL-0005, SKL-0316, PAT-0160]
dependencies: []
synonyms: ["how to build a login page", "how to add Google sign in", "how to implement OAuth buttons", "how to design a signup flow", "how to build a password reset page", "how to handle MFA in the frontend"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "frontend"
---

# Pattern: Authentication UI

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0165 |
| **Name** | Authentication UI Pattern |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

Authentication UI is the first interaction many users have with your app. It must be simple, trustworthy, and handle every error state gracefully. The goal is minimum friction to get users in.

### Login Page Structure

A login page should contain exactly these elements:

```
┌─────────────────────────────┐
│         App Logo            │
│                             │
│  [Sign in with Google]      │
│  [Sign in with GitHub]      │
│                             │
│  ──── or continue with ──── │
│                             │
│  Email: [_______________]   │
│  Password: [____________]   │
│            [Forgot password?]│
│                             │
│  [       Sign in        ]   │
│                             │
│  Don't have an account?     │
│  Sign up                    │
└─────────────────────────────┘
```

**Key decisions:**
- Put OAuth buttons above email/password. Most users prefer social login when available.
- The "Forgot password?" link sits below the password field, not above.
- The "Sign up" link is at the bottom, not competing with the primary action.

### OAuth Button Design

Follow provider brand guidelines:

| Provider | Button Text | Brand Color |
|----------|-------------|-------------|
| Google | "Sign in with Google" | White background, Google logo |
| GitHub | "Sign in with GitHub" | Black background, white text |
| Apple | "Sign in with Apple" | Black or white, Apple logo |
| Microsoft | "Sign in with Microsoft" | White background, Microsoft logo |

**Rules:**
- Use the provider's official logo and approved button text.
- OAuth buttons should be full-width and the same height as each other.
- Never modify the provider's logo colors or proportions.

### Signup Flow

Keep signup fields to the absolute minimum:

| Approach | Fields | Conversion |
|----------|--------|------------|
| **OAuth only** | Zero | Highest |
| **Email + password** | 2 | High |
| **Email + password + name** | 3 | Good |
| **Email + password + name + company** | 4+ | Declining fast |

Every additional field reduces signup conversion by roughly 10%. Collect extra information after the user is in, not during signup.

**Password requirements:**
- Show requirements as a checklist that updates in real time.
- Show a strength indicator (weak/fair/strong) with color.
- Never enforce obscure rules like "must include a symbol." Enforce minimum length (8-12 characters) and check against breach databases.

### Password Reset Flow

```
1. User clicks "Forgot password?"
2. Enter email → [Send reset link]
3. Success message: "If an account exists, we sent a reset link"
   (never reveal whether the email exists)
4. User clicks link in email → new password form
5. Password updated → redirect to login with success message
```

**Security notes:**
- Reset tokens expire after 1 hour.
- Tokens are single-use; invalidate after first use.
- Never send the new password via email. Always use a reset link.
- The success message after step 2 must be identical whether the email exists or not (prevents enumeration).

### Multi-Factor Authentication (MFA)

After password verification, present the MFA step:

```
┌─────────────────────────────┐
│     Two-factor verification │
│                             │
│  Enter the 6-digit code     │
│  from your authenticator    │
│                             │
│  [_] [_] [_] [_] [_] [_]   │
│                             │
│  [       Verify         ]   │
│                             │
│  Can't access your code?    │
│  Use a recovery code        │
└─────────────────────────────┘
```

**UX details:**
- Auto-advance focus between digit inputs.
- Auto-submit when all 6 digits are entered.
- Allow paste of the full code into any input.
- Show a "Use a recovery code" fallback for users who lost access to their authenticator.

### Auth State in the UI

| State | What the User Sees |
|-------|--------------------|
| **Loading** | Skeleton or spinner (checking auth status) |
| **Unauthenticated** | Redirect to login page |
| **Authenticated** | App content renders |
| **Session expiring** | Warning banner: "Session expires in 5 minutes" with refresh button |
| **Session expired** | Modal: "Session expired. Sign in again." (preserve current URL for redirect) |

### Protected Route Pattern

```typescript
function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <LoadingScreen />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}
```

After login, redirect the user back to the page they were trying to access, not always to the dashboard.

### Error Messages

- "Incorrect email or password" (never reveal which one is wrong)
- "Too many attempts. Try again in 5 minutes." (rate limiting feedback)
- "This email is already registered. Try signing in." (only on signup, not login)
- "Your reset link has expired. Request a new one."

## Anti-Patterns

- Revealing whether an email exists in the system ("No account found for this email")
- Requiring email verification before letting the user see the app (let them in, verify later)
- Complex password rules that frustrate users without improving security
- No rate limiting on login attempts (brute force risk)
- Forcing MFA setup during the first signup (let users opt in later)

## Key Takeaways

- Put OAuth above email/password; minimize signup fields to maximize conversion
- Never reveal whether an email exists in error messages or password reset flows
- Show password requirements as a live-updating checklist, not a static rule list
- After login, redirect to the page the user was trying to access
- Handle every auth state in the UI: loading, unauthenticated, authenticated, session expiring
