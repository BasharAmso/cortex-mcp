---
id: PAT-0008
name: Logging and Monitoring
category: patterns
tags: [logging, monitoring, observability, error-tracking, structured-logging]
capabilities: [structured-logging, error-tracking, observability-design]
useWhen:
  - adding logging to a new application
  - setting up error tracking or monitoring
  - debugging production issues with insufficient logs
  - designing an observability strategy
estimatedTokens: 600
relatedFragments: [PAT-0001, PAT-0010]
dependencies: []
synonyms: ["how to add logging to my app", "how to track errors in production", "I cant figure out whats happening in my server", "how to monitor my app", "how to debug issues in production"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Logging and Monitoring

Structured logging, error tracking, and observability patterns.

## Structured Logging

Always log as structured data (JSON), not free-form strings.

```typescript
// Bad
console.log("User login failed for user@example.com");

// Good
logger.warn("login_failed", {
  email: "user@example.com",
  reason: "invalid_password",
  ip: req.ip,
  attempt: 3,
});
```

## Log Levels

| Level | Use For | Example |
|-------|---------|---------|
| **error** | Something broke and needs attention | Database connection lost |
| **warn** | Something unexpected but handled | Rate limit approaching |
| **info** | Normal operations worth recording | User signed up, payment processed |
| **debug** | Detailed info for development | Query took 45ms, cache hit |

## What to Log

- **Always:** Errors with context, auth events, business transactions, external API calls
- **Never:** Passwords, tokens, full credit card numbers, PII in plaintext

## Error Tracking

1. Use a service (Sentry, Bugsnag) rather than grepping logs.
2. Group errors by root cause, not by message string.
3. Include context: user ID, request path, relevant state.
4. Set up alerts for new error types and error rate spikes.

## Health Checks

Every service should expose a health endpoint:

```
GET /health -> 200 { "status": "ok", "version": "1.2.3", "uptime": 3600 }
```

Monitor it externally. If it stops responding, alert.

## Anti-Patterns

- Logging everything at INFO level (noise drowns signal)
- No correlation ID across services (impossible to trace requests)
- Logging sensitive data (credentials, tokens, PII)
- No alerting on errors (logs nobody reads are useless)
- Console.log in production instead of a proper logger
