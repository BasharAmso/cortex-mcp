---
id: EX-0022
name: Circuit Breaker Pattern
category: examples
tags: [circuit-breaker, resilience, fault-tolerance, microservices, architecture, typescript]
capabilities: [fault-tolerance, service-resilience, failure-handling]
useWhen:
  - protecting a service from cascading failures
  - implementing fault tolerance for external API calls
  - building resilience into microservice communication
estimatedTokens: 550
relatedFragments: [PAT-0172, SKL-0126, PAT-0177, EX-0021]
dependencies: []
synonyms: ["circuit breaker example", "fault tolerance pattern", "resilience pattern", "service failure handling", "cascading failure prevention"]
sourceUrl: "https://github.com/nodeshift/opossum"
lastUpdated: "2026-04-01"
difficulty: advanced
owner: builder
pillar: "architecture"
---

# Circuit Breaker Pattern

A circuit breaker that prevents cascading failures across services.

## Implementation

```typescript
type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN';

interface CircuitBreakerOptions {
  failureThreshold: number;  // failures before opening
  resetTimeout: number;      // ms before trying half-open
  halfOpenMax: number;       // test requests in half-open
}

class CircuitBreaker {
  private state: CircuitState = 'CLOSED';
  private failures = 0;
  private successes = 0;
  private lastFailureTime = 0;
  private halfOpenAttempts = 0;

  constructor(private opts: CircuitBreakerOptions) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.opts.resetTimeout) {
        this.state = 'HALF_OPEN';
        this.halfOpenAttempts = 0;
      } else {
        throw new Error('Circuit is OPEN — request rejected');
      }
    }

    if (this.state === 'HALF_OPEN' && this.halfOpenAttempts >= this.opts.halfOpenMax) {
      throw new Error('Circuit is HALF_OPEN — max test requests reached');
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    if (this.state === 'HALF_OPEN') {
      this.successes++;
      if (this.successes >= this.opts.halfOpenMax) {
        this.state = 'CLOSED';
        this.failures = 0;
        this.successes = 0;
      }
    } else {
      this.failures = 0;
    }
  }

  private onFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();

    if (this.state === 'HALF_OPEN') {
      this.state = 'OPEN';
      this.successes = 0;
    } else if (this.failures >= this.opts.failureThreshold) {
      this.state = 'OPEN';
    }

    if (this.state === 'HALF_OPEN') {
      this.halfOpenAttempts++;
    }
  }

  getState(): CircuitState { return this.state; }
}

// --- Usage ---
const breaker = new CircuitBreaker({
  failureThreshold: 5,
  resetTimeout: 30_000,
  halfOpenMax: 3,
});

async function callPaymentService(orderId: string) {
  return breaker.execute(async () => {
    const res = await fetch(`https://payments.internal/charge/${orderId}`);
    if (!res.ok) throw new Error(`Payment failed: ${res.status}`);
    return res.json();
  });
}
```

## Key Patterns

- **Three states**: CLOSED (normal), OPEN (reject all), HALF_OPEN (test requests)
- **Failure counting**: consecutive failures trip the breaker, success resets the counter
- **Reset timeout**: after cooling off, a few test requests probe if the service recovered
- **Fail fast**: OPEN state rejects immediately instead of waiting for a timeout
