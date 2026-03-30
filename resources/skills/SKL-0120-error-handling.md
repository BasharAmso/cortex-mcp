---
id: SKL-0120
name: Error Handling & Resilience
category: skills
tags: [error-handling, resilience, retry, circuit-breaker, fallback, graceful-degradation, error-boundary]
capabilities: [error-strategy, retry-patterns, circuit-breakers, fallback-design, error-boundaries]
useWhen:
  - designing an error handling strategy for a production application
  - implementing retry logic for unreliable external services
  - building resilient API calls that degrade gracefully on failure
  - handling failures without crashing the entire application
  - adding error boundaries to a React component tree
estimatedTokens: 650
relatedFragments: [SKL-0006, SKL-0010, SKL-0017, PAT-0001, PAT-0002]
dependencies: []
synonyms: ["how to handle errors properly", "my app crashes when the API is down", "add retry logic", "error boundary in React", "graceful error handling"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/goldbergyoni/nodebestpractices"
difficulty: advanced
---

# Error Handling & Resilience

Production apps fail. Networks drop, services go down, databases timeout. Per nodebestpractices (Section 2), the question is not whether errors happen but whether your app recovers gracefully or crashes visibly.

## Error Classification (Practice 2.3)

Distinguish operational errors from programmer errors. The category determines the strategy.

| Category | Retryable? | Examples | Strategy |
|----------|-----------|----------|----------|
| **Operational** (known) | Sometimes | Network timeout, 503, rate limit, invalid input | Handle gracefully, log, respond |
| **Programmer** (unknown) | No | TypeError, null reference, memory leak | Crash and restart immediately |

Per Joyent (cited in nodebestpractices): "The best way to recover from programmer errors is to crash immediately." Operational errors are understood situations; programmer errors leave the app in an unknown state.

## Centralized Error Handling (Practice 2.4)

Encapsulate all error handling in a single dedicated handler object. Per nodebestpractices: "HTTP errors have no place in your database code." The central handler:

- Writes formatted, structured logs
- Fires monitoring metrics (Sentry, Datadog, Prometheus)
- Decides whether to crash the process
- Sends appropriate responses to clients

This works across web requests, cron jobs, message queues, and background tasks. Middleware-only approaches leave non-request errors unmanaged.

## Async Error Handling (Practice 2.1)

Use async-await with try/catch, never callbacks. Unhandled promise rejections crash Node.js by default (Practice 2.10). Subscribe to `process.unhandledRejection` as a safety net, but fix the root cause.

## Extend the Built-in Error Object (Practice 2.2)

Create application-specific error classes with useful properties: error name/code, HTTP status, severity flag, and whether the error is operational. This enables the central handler to make informed decisions.

## Retry with Exponential Backoff

For transient operational failures, retry with increasing delays. Never retry permanent errors (400, 404, validation).

```
Attempt 1: immediate
Attempt 2: wait 1s
Attempt 3: wait 2s
Attempt 4: wait 4s
(cap at 30s, add jitter to prevent thundering herd)
```

Set a maximum retry count (3-5). After exhausting retries, fall through to the fallback strategy.

## Circuit Breaker Pattern

Prevents cascading failures when a downstream service is consistently failing:

1. **Closed (normal):** Requests pass through. Track failure rate.
2. **Open (tripped):** All requests fail immediately without calling the service.
3. **Half-Open (probing):** After cooldown, allow one request. Success closes; failure reopens.

## React Error Boundaries

Error boundaries catch JavaScript errors in the component tree and render fallback UI instead of crashing the whole app.

**Placement strategy:**
- One at the app root (catches everything)
- One per major feature section (sidebar, main content, modal)
- One around each independently-loadable route

Error boundaries do NOT catch: event handler errors, async errors, or SSR errors. For those, use try/catch and state-based error UI.

## Fallback Strategies

| Strategy | When to Use | Example |
|----------|-------------|---------|
| Cached data | API down, data was fetched before | Show stale feed with "last updated" |
| Default value | Optional enhancement unavailable | Hide personalization, show generic |
| Degraded mode | Partial system failure | Disable search, keep browsing |
| Queued action | Write operation fails | Save locally, retry on reconnect |
| User prompt | Cannot auto-recover | "Unable to save. Retry or download?" |

## Logging Strategy (Practice 2.7)

Use mature loggers (Pino, Winston) with structured output, severity levels, and correlation IDs. Use a dedicated error service (Sentry, Bugsnag) rather than `console.error` in production. Alert on error rate spikes, not individual errors.
