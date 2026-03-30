---
id: SKL-0079
name: Error Tracking
category: skills
tags: [error-tracking, sentry, source-maps, breadcrumbs, alerting, triage, debugging, observability]
capabilities: [sentry-integration, source-map-upload, error-grouping-config, release-tracking, triage-workflow]
useWhen:
  - setting up Sentry or similar error tracking for the first time
  - debugging production errors that are hard to reproduce
  - configuring error alerts and grouping rules
  - connecting deploys to error tracking for release-based triage
estimatedTokens: 700
relatedFragments: [SKL-0078, PAT-0008, PAT-0001, SKL-0018]
dependencies: []
synonyms: ["set up sentry", "track errors in production", "why is my app crashing", "production debugging", "connect sentry to my app"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Error Tracking

Capture every production error with context. Know what the user did, what code ran, and what broke. Sentry is the default choice for solo devs.

## Sentry Setup

### JavaScript/Node.js

```javascript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  release: process.env.APP_VERSION,
  tracesSampleRate: 0.1,  // 10% of transactions for performance
});
```

### React/Next.js

Use `@sentry/nextjs` which instruments both client and server automatically. Follow the setup wizard: `npx @sentry/wizard@latest -i nextjs`.

## Source Maps

Without source maps, you see minified garbage. With them, you see the exact line that broke.

**Upload during build:**
```bash
# In your CI/CD pipeline
npx sentry-cli releases new $VERSION
npx sentry-cli releases files $VERSION upload-sourcemaps ./dist
npx sentry-cli releases finalize $VERSION
```

**Keep source maps private.** Upload to Sentry but don't serve them publicly. Most bundlers can generate source maps without including them in the build output.

## Breadcrumbs

Breadcrumbs show what happened before the error. Sentry auto-captures console logs, network requests, and DOM events. Add custom breadcrumbs for business logic:

```javascript
Sentry.addBreadcrumb({
  category: 'checkout',
  message: 'User added item to cart',
  data: { productId, quantity },
  level: 'info',
});
```

This turns "TypeError on line 42" into a story: user logged in, browsed products, added to cart, clicked checkout, error.

## User Context

Attach user identity so you can answer "who is affected?"

```javascript
Sentry.setUser({ id: user.id, email: user.email, plan: user.plan });
```

This lets you filter errors by user, prioritize paying customers, and reach out proactively.

## Error Grouping

Sentry groups similar errors automatically. When grouping is wrong:

- **Too many groups** (same error, different messages): Use fingerprinting to merge them
- **Too few groups** (different errors lumped together): Add custom fingerprints to split them

```javascript
Sentry.withScope((scope) => {
  scope.setFingerprint(['checkout-failure', paymentProvider]);
  Sentry.captureException(error);
});
```

## Release Tracking

Tag each deploy as a release. This gives you:

- "This error started in release v1.2.3"
- "This release introduced 4 new issues"
- Commit-level blame for each error

Wire this into your CI/CD. Most deploy platforms (Vercel, Netlify) can set the release automatically.

## Alert Rules

| Rule | Threshold | Channel |
|------|-----------|---------|
| New issue in production | First occurrence | Slack |
| Error spike | 10x baseline in 5 min | Slack + email |
| Critical path error | Any (checkout, auth, payment) | SMS |
| Regression | Previously resolved issue returns | Slack |

## Triage Workflow

When errors come in:

1. **Is it new?** Check if it appeared after a recent deploy
2. **Who's affected?** One user or many? Free or paying?
3. **Is it critical?** Does it block a core user flow?
4. **Can you reproduce?** Use breadcrumbs and user context to recreate
5. **Fix or defer?** Critical = fix now. Edge case = create a task for later

## Key Rules

- Never ignore unhandled exceptions. Capture everything, triage later.
- Always upload source maps. Minified stack traces are useless.
- Set user context early in the request lifecycle.
- Review new errors within 24 hours. Stale error inboxes become ignored.
- Mark resolved errors as resolved. Sentry will alert you if they regress.
