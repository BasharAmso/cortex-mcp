---
id: PAT-0212
name: Idempotency Pattern
category: patterns
tags: [idempotency, deduplication, safe-retries, idempotency-keys, exactly-once, at-least-once]
capabilities: [idempotent-api-design, deduplication-strategy, idempotency-key-management, safe-retry-implementation]
useWhen:
  - designing APIs that are safe to retry
  - preventing duplicate processing of payments or orders
  - implementing exactly-once semantics in distributed systems
  - handling webhook deduplication
  - building reliable message processing pipelines
estimatedTokens: 650
relatedFragments: [PAT-0210, PAT-0211, SKL-0414, SKL-0411]
dependencies: []
synonyms: ["how to make an API idempotent", "idempotency key explained", "prevent duplicate payments", "exactly once processing", "safe retry pattern", "webhook deduplication"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/n8n-io/n8n"
difficulty: intermediate
owner: "cortex"
pillar: "automation"
---

# Idempotency Pattern

Ensuring that repeating the same operation produces the same result, making retries safe and preventing duplicate side effects.

## Why Idempotency Matters

Network failures happen. Clients retry. Webhooks fire twice. Without idempotency, a retried payment creates a double charge. A retried order creates duplicate shipments. Idempotency guarantees that performing an operation multiple times has the same effect as performing it once.

## Naturally Idempotent Operations

Some operations are inherently idempotent:

| Method | Idempotent? | Example |
|--------|-------------|---------|
| **GET** | Yes | Fetching a resource |
| **PUT** | Yes | Setting a resource to a specific state |
| **DELETE** | Yes | Deleting a resource (already gone = same result) |
| **POST** | No | Creating a resource (each call creates a new one) |
| **PATCH** | Depends | Relative changes (increment) are not idempotent |

POST and relative PATCH operations need explicit idempotency handling.

## Idempotency Keys

The client generates a unique key (UUID) per logical operation and sends it in a header (`Idempotency-Key`). The server checks if this key has been seen before. If yes, return the cached response. If no, process the request and store the result keyed by the idempotency key.

```
Client → POST /payments { amount: 50 }
         Idempotency-Key: abc-123
Server → Process payment, store result under abc-123
Client → (retry) POST /payments { amount: 50 }
         Idempotency-Key: abc-123
Server → Find cached result for abc-123, return it (no double charge)
```

## Implementation Pattern

```javascript
async function handleIdempotent(key, processFn) {
  // Check for existing result
  const cached = await redis.get(`idempotency:${key}`);
  if (cached) return JSON.parse(cached);

  // Acquire lock to prevent concurrent processing
  const lock = await redis.set(`lock:${key}`, '1', 'NX', 'EX', 30);
  if (!lock) throw new ConflictError('Request in progress');

  try {
    const result = await processFn();
    await redis.set(`idempotency:${key}`, JSON.stringify(result), 'EX', 86400);
    return result;
  } finally {
    await redis.del(`lock:${key}`);
  }
}
```

## Deduplication for Webhooks and Messages

For inbound webhooks, use the event ID as the deduplication key. Store processed event IDs with a TTL. Check before processing. For message queues, use message IDs. Track in a set or database table. Clean up old entries periodically.

## Guidelines

1. **Client generates the key.** The server stores it. UUIDs are ideal.
2. **Cache responses, not just status.** Return the exact same response on retry, including status code and body.
3. **Set TTL on stored keys.** 24-48 hours is typical. After that, the same key can create a new operation.
4. **Lock during processing.** Prevent concurrent requests with the same key from both being processed.
5. **Log duplicates.** Track how often duplicates occur to monitor system health.
