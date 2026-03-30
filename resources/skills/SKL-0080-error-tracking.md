---
id: SKL-0080
name: Error Tracking
category: skills
tags: [error-tracking, sentry, source-maps, breadcrumbs, alerting, triage, debugging, observability, crash-reporting]
capabilities: [sentry-integration, source-map-upload, error-grouping-config, release-tracking, triage-workflow]
useWhen:
  - setting up Sentry or similar error tracking for the first time
  - debugging production errors that are hard to reproduce
  - configuring error alerts and grouping rules
  - connecting deploys to error tracking for release-based triage
estimatedTokens: 700
relatedFragments: [SKL-0079, PAT-0008, PAT-0001, SKL-0021]
dependencies: []
synonyms: ["set up sentry", "track errors in production", "why is my app crashing", "production debugging", "connect sentry to my app"]
sourceUrl: "https://github.com/goldbergyoni/nodebestpractices"
lastUpdated: "2026-03-29"
difficulty: intermediate
owner: deployer
---

# Error Tracking

Capture every production error with context. Distinguish between operational errors (known cases like invalid input) and catastrophic errors (programmer mistakes requiring restart). Sentry is the default choice for solo devs.

## Error Classification

| Type | Example | Action |
|------|---------|--------|
| Operational | Invalid input, network timeout, 404 | Handle gracefully, log, continue |
| Catastrophic | Unhandled exception, memory leak, null ref | Log, shut down gracefully, let orchestrator restart |

Create app-specific error classes extending the built-in Error with properties like error name, code, and whether it is catastrophic. Subscribe to `process.unhandledRejection` and `process.uncaughtException` and exit gracefully on catastrophic errors.

## Sentry Setup

```javascript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  release: process.env.APP_VERSION,
  tracesSampleRate: 0.1,
});
```

For React/Next.js, use `@sentry/nextjs` which instruments both client and server automatically.

## Source Maps

Without source maps, you see minified garbage. Upload during build:

```bash
npx sentry-cli releases new $VERSION
npx sentry-cli releases files $VERSION upload-sourcemaps ./dist
npx sentry-cli releases finalize $VERSION
```

Keep source maps private. Upload to Sentry but do not serve them publicly.

## Breadcrumbs and Context

Breadcrumbs show what happened before the error. Add custom breadcrumbs for business logic:

```javascript
Sentry.addBreadcrumb({
  category: 'checkout',
  message: 'User added item to cart',
  data: { productId, quantity },
  level: 'info',
});
```

Assign a transaction ID to each log entry within a single request using `AsyncLocalStorage` for correlation across async calls. Attach user identity so you can answer "who is affected?"

```javascript
Sentry.setUser({ id: user.id, email: user.email, plan: user.plan });
```

## Error Grouping

When grouping is wrong, use custom fingerprints:

```javascript
Sentry.withScope((scope) => {
  scope.setFingerprint(['checkout-failure', paymentProvider]);
  Sentry.captureException(error);
});
```

## Release Tracking

Tag each deploy as a release for "this error started in v1.2.3" and commit-level blame. Wire into CI/CD.

## Alert Rules

| Rule | Threshold | Channel |
|------|-----------|---------|
| New issue in production | First occurrence | Slack |
| Error spike | 10x baseline in 5 min | Slack + email |
| Critical path error | Any (checkout, auth, payment) | SMS |
| Regression | Previously resolved issue returns | Slack |

## Triage Workflow

1. **Is it new?** Check if it appeared after a recent deploy
2. **Who's affected?** One user or many? Free or paying?
3. **Is it critical?** Does it block a core user flow?
4. **Can you reproduce?** Use breadcrumbs and user context to recreate
5. **Fix or defer?** Critical = fix now. Edge case = create a task for later

## Key Constraints

- Never ignore unhandled exceptions. Capture everything, triage later.
- Always upload source maps. Minified stack traces are useless.
- Set user context early in the request lifecycle.
- Review new errors within 24 hours. Stale error inboxes become ignored.
- Test error flows including uncaught exceptions, not just happy paths.
