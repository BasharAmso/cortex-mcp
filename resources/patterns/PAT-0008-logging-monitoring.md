---
id: PAT-0008
name: Logging and Monitoring
category: patterns
tags: [logging, monitoring, observability, error-tracking, structured-logging, correlation-id, log-levels, health-checks, alerting]
capabilities: [structured-logging, error-tracking, observability-design]
useWhen:
  - adding logging to a new application or microservice
  - setting up error tracking or monitoring in production
  - debugging production issues with insufficient logs
  - designing an observability strategy across services
  - implementing health checks for uptime monitoring
estimatedTokens: 650
relatedFragments: [PAT-0001, PAT-0010]
dependencies: []
synonyms: ["how to add logging to my app", "how to track errors in production", "I cant figure out whats happening in my server", "how to monitor my app", "how to debug issues in production"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/goldbergyoni/nodebestpractices"
difficulty: intermediate
owner: builder
pillar: "software-dev"
---

# Logging and Monitoring

Structured logging, correlation IDs, and alerting. Based on Node.js Best Practices: "Use a mature logger to increase error visibility."

## Structured Logging (Always JSON)

Log as structured data, not free-form strings. Every log entry should be machine-parseable and human-scannable.

```typescript
// Bad: unstructured, unsearchable
console.log("User login failed for user@example.com");

// Good: structured, filterable, alertable
logger.warn({
  event: "login_failed",
  email: "user@example.com",
  reason: "invalid_password",
  ip: req.ip,
  attempt: 3,
  requestId: req.id,
});
```

Use a mature logger (pino, winston) instead of `console.log`. Pino is recommended for Node.js for its low overhead and JSON-native output.

## Log Levels

| Level | Use For | Example |
|-------|---------|---------|
| **fatal** | Process cannot continue | Out of memory, missing critical config |
| **error** | Something broke, needs human attention | Database connection lost, payment failed |
| **warn** | Unexpected but handled | Rate limit approaching, deprecated API call |
| **info** | Normal operations worth recording | User signed up, payment processed, deploy started |
| **debug** | Development-only detail | Query took 45ms, cache hit ratio, parsed config |

**Production default:** `info`. Enable `debug` per-request or per-service with a feature flag, never globally.

## Correlation IDs (Request Tracing)

Assign a unique `requestId` at the API gateway or first middleware. Propagate it through every log entry, database query, and downstream service call. Without this, debugging across services is impossible.

```typescript
app.use((req, res, next) => {
  req.id = req.headers["x-request-id"] || crypto.randomUUID();
  res.setHeader("x-request-id", req.id);
  next();
});
```

## What to Log vs. What to Never Log

| Always Log | Never Log |
|-----------|-----------|
| Errors with full context (stack, request, user) | Passwords, tokens, API keys |
| Authentication events (login, logout, failed) | Full credit card numbers |
| Business transactions (purchase, signup) | PII in plaintext (SSN, health data) |
| External API call results and latency | Session contents |

## Health Checks

Every service exposes a health endpoint:

```
GET /health -> 200 { "status": "ok", "version": "1.2.3", "uptime": 3600 }
GET /health/ready -> checks DB, cache, dependencies
```

Monitor externally (UptimeRobot, Pingdom, AWS health checks). Alert if it stops responding.

## Error Tracking

1. Use a dedicated service (Sentry, Bugsnag) rather than grepping logs
2. Group errors by root cause, not message string
3. Include context: user ID, request path, relevant state
4. Alert on new error types and error rate spikes (not every occurrence)

## Anti-Patterns

- Logging everything at INFO level (noise drowns signal)
- No correlation ID across services
- Logging sensitive data (credentials, tokens, PII)
- No alerting on errors (logs nobody reads are useless)
- `console.log` in production instead of a proper logger
