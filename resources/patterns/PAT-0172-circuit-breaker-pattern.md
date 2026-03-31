---
id: PAT-0172
name: Circuit Breaker Pattern
category: patterns
tags: [circuit-breaker, fault-tolerance, resilience, fallback, monitoring, distributed-systems]
capabilities: [failure-detection, graceful-degradation, fallback-design, recovery-management]
useWhen:
  - a downstream service is failing and you need to stop cascading failures
  - implementing graceful degradation when dependencies are unavailable
  - designing fallback behavior for unreliable external APIs
  - protecting system resources from being exhausted by failing calls
  - building resilience into synchronous service-to-service communication
estimatedTokens: 650
relatedFragments: [PAT-0177, SKL-0126, SKL-0336, PAT-0059]
dependencies: []
synonyms: ["how does a circuit breaker work", "circuit breaker pattern explained", "how to handle failing services", "cascading failure prevention", "service resilience patterns", "fallback pattern for microservices"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/donnemartin/system-design-primer"
difficulty: intermediate
owner: "cortex"
pillar: "architecture"
---

# Circuit Breaker Pattern

The circuit breaker pattern prevents an application from repeatedly calling a failing service, giving the service time to recover while providing immediate fallback responses to callers. It is named after electrical circuit breakers that stop current flow to prevent damage.

## States

The circuit breaker has three states:

**Closed (normal operation):** Requests flow through to the downstream service. The breaker monitors failure rates. When failures exceed a threshold (e.g., 50% failure rate over 10 requests), the breaker trips to Open.

**Open (failing fast):** All requests are immediately rejected or routed to a fallback without calling the downstream service. This prevents wasting resources on calls that will likely fail and gives the downstream service time to recover. After a configurable timeout (e.g., 30 seconds), the breaker moves to Half-Open.

**Half-Open (testing recovery):** A limited number of probe requests are sent to the downstream service. If they succeed, the breaker resets to Closed. If they fail, the breaker returns to Open and resets the timeout.

## Implementation

```
function callService(request):
  if circuit is OPEN:
    if timeout has elapsed:
      set circuit to HALF_OPEN
    else:
      return fallback(request)

  try:
    response = downstream.call(request)
    record_success()
    if circuit is HALF_OPEN:
      set circuit to CLOSED
    return response
  catch error:
    record_failure()
    if failure_threshold_exceeded():
      set circuit to OPEN
      start timeout
    return fallback(request)
```

## Configuration

| Parameter | Purpose | Typical Value |
|-----------|---------|---------------|
| **Failure threshold** | Percentage of failures that trips the breaker | 50% |
| **Request volume** | Minimum requests before evaluating failure rate | 10-20 requests |
| **Timeout** | How long the breaker stays open before testing | 15-60 seconds |
| **Half-open probes** | Number of test requests in half-open state | 1-5 requests |
| **Monitoring window** | Time window for calculating failure rate | 10-60 seconds |

Tune these parameters based on your traffic volume and downstream recovery time. Too sensitive and the breaker trips on transient errors. Too lenient and it does not protect fast enough.

## Fallback Strategies

The fallback is what happens when the circuit is open:

- **Cached response:** Return the last known good response from cache
- **Default value:** Return a safe default (empty list, default configuration)
- **Degraded functionality:** Disable the feature that depends on the failing service
- **Alternative service:** Route to a backup service or different provider
- **Queue for retry:** Accept the request and process it later when the service recovers

Choose the fallback based on the business impact. A product recommendation that returns empty is acceptable. A payment that silently fails is not.

## Monitoring

Circuit breaker state changes are critical operational signals. Log and alert on:
- Transitions from Closed to Open (a dependency is failing)
- Transitions from Open to Closed (a dependency has recovered)
- Prolonged Open state (a dependency is down for an extended period)
- Fallback invocation rate (how often users experience degraded service)

Expose circuit breaker state in your health check endpoints and dashboards. A circuit that is constantly tripping indicates a systemic problem that needs architectural attention, not just operational response.

## Per-Service Breakers

Use a separate circuit breaker for each downstream dependency. A failing payment service should not trip the breaker for the notification service. This provides fine-grained fault isolation and prevents one bad dependency from taking down unrelated functionality.
