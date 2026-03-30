---
id: SKL-0040
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
lastUpdated: "2026-03-29"
sourceUrl: ""
difficulty: advanced
---

# Error Handling & Resilience

Production apps fail. Networks drop, services go down, databases timeout. The question is not whether errors happen, but whether your app recovers gracefully or crashes visibly.

## Error Classification

Classify errors before handling them. The category determines the strategy.

| Category | Retryable? | Examples | Strategy |
|----------|-----------|----------|----------|
| Transient | Yes | Network timeout, 503, rate limit | Retry with backoff |
| Permanent | No | 404, validation error, bad input | Fail fast, show user message |
| Bug | No | TypeError, null reference | Log, alert, show fallback UI |
| Degraded | Partial | Slow response, partial data | Serve cached/partial, alert ops |

## Retry with Exponential Backoff

For transient failures, retry with increasing delays. Never retry permanent errors.

```
Attempt 1: immediate
Attempt 2: wait 1s
Attempt 3: wait 2s
Attempt 4: wait 4s
(cap at max delay, e.g., 30s)
```

Add jitter (random offset) to prevent thundering herd when many clients retry simultaneously. Set a maximum retry count (typically 3-5). After exhausting retries, fall through to the fallback strategy.

## Circuit Breaker Pattern

Prevents cascading failures when a downstream service is consistently failing.

**States:**
1. **Closed (normal):** Requests pass through. Track failure rate.
2. **Open (tripped):** All requests fail immediately without calling the service. Saves resources and prevents overloading a struggling service.
3. **Half-Open (probing):** After a cooldown period, allow one request through. If it succeeds, close the circuit. If it fails, reopen.

Use a circuit breaker when calling external APIs, databases, or any service that can go down independently.

## React Error Boundaries

Error boundaries catch JavaScript errors in the component tree below them and render a fallback UI instead of crashing the whole app.

**Placement strategy:**
- One at the app root (catches everything, shows "something went wrong")
- One per major feature section (sidebar, main content, modal)
- One around each independently-loadable route

Error boundaries do NOT catch: event handler errors, async errors, or server-side rendering errors. For those, use try/catch and state-based error UI.

## Fallback Strategies

| Strategy | When to Use | Example |
|----------|-------------|---------|
| Cached data | API down but data was fetched before | Show stale feed with "last updated" timestamp |
| Default value | Optional enhancement unavailable | Hide personalization, show generic content |
| Degraded mode | Partial system failure | Disable search but keep browsing working |
| Queued action | Write operation fails | Save to local queue, retry when connection returns |
| User prompt | Cannot auto-recover | "Unable to save. Retry or download a copy?" |

## User-Facing Error Messages

**Rules:**
1. Say what happened in plain language. Not "Error 500" but "We could not save your changes."
2. Say what the user can do. "Try again" or "Check your connection" or "Contact support."
3. Never expose stack traces, internal error codes, or database details to users.
4. Log the full technical error server-side for debugging.

## Error Logging Strategy

| What to Log | Where | When |
|-------------|-------|------|
| Full stack trace + context | Server logs / error service | Every unhandled error |
| User action that caused error | Error service metadata | Every user-facing error |
| Request/response details | Server logs | API errors (sanitize PII) |
| Error rate + latency | Metrics/monitoring | Continuously |

Use a structured error service (Sentry, Datadog, Bugsnag) rather than `console.error` in production. Set up alerts on error rate spikes, not individual errors.

## Key Principle

Handle errors at the level that has enough context to recover. A network call does not know whether to retry or show a fallback. The component orchestrating the feature does.
