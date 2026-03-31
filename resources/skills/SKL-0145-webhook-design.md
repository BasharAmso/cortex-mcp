---
id: SKL-0145
name: Webhook Design
category: skills
tags: [webhooks, event-types, payload, hmac, signatures, retries, idempotency, delivery-guarantees, security]
capabilities: [webhook-endpoint-design, payload-structure, signature-verification, retry-policy-configuration, idempotency-handling]
useWhen:
  - designing a webhook system for your API or platform
  - receiving webhooks from third-party services
  - implementing signature verification for incoming webhooks
  - handling duplicate webhook deliveries safely
  - setting up retry policies for failed webhook deliveries
estimatedTokens: 650
relatedFragments: [SKL-0144, PAT-0059, PAT-0070, SKL-0010, PAT-0002]
dependencies: []
synonyms: ["how to set up webhooks", "verify webhook is real and not fake", "handle duplicate webhook events", "webhook keeps failing what do I do", "send notifications when something happens", "how to receive events from another service"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/n8n-io/n8n"
difficulty: intermediate
owner: cortex
pillar: "automation"
---

# Skill: Webhook Design

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0145 |
| **Version** | 1.0 |
| **Owner** | cortex |
| **Inputs** | Event catalog, payload requirements, security requirements, SLA expectations |
| **Outputs** | Webhook endpoint spec, payload schema, signature verification logic, retry policy |
| **Triggers** | `WEBHOOK_DESIGN_REQUESTED` |

---

## Purpose

Design webhook systems that deliver events reliably, verify authenticity, handle failures gracefully, and guarantee at-least-once delivery. Applies whether you are sending or receiving webhooks.

---

## Webhook Anatomy

Every webhook delivery has four parts:

1. **Event type** — A dot-namespaced string describing what happened: `order.completed`, `user.created`, `payment.failed`. Consumers subscribe to specific event types.
2. **Payload** — JSON body containing the event data. Include the event type, a unique event ID, a timestamp, and the relevant resource data.
3. **Signature** — An HMAC hash proving the payload was sent by you, not a third party.
4. **Delivery metadata** — Headers containing the event ID, timestamp, and signature for verification.

## Payload Structure

```json
{
  "id": "evt_a1b2c3d4",
  "type": "order.completed",
  "timestamp": "2026-03-30T12:00:00Z",
  "data": {
    "orderId": "ord_x7y8z9",
    "total": 4999,
    "currency": "usd"
  }
}
```

**Rules:**
- Always include an event `id` (UUID). Consumers use this for deduplication.
- Always include a `timestamp`. Consumers use this to reject stale events.
- Keep payloads small. Include IDs and key fields; let consumers fetch full details via API if needed.
- Version your payload schema. Breaking changes need a new event type (`order.completed.v2`) or API version header.

## Signature Verification (HMAC)

The sender computes an HMAC-SHA256 of the raw request body using a shared secret, and sends it in a header.

**Sending side:**
```
signature = HMAC-SHA256(webhook_secret, raw_body)
Header: X-Webhook-Signature: sha256={signature}
```

**Receiving side:**
1. Read the raw request body (before JSON parsing)
2. Compute HMAC-SHA256 with your copy of the secret
3. Compare using a timing-safe equality function (prevents timing attacks)
4. Reject if signatures do not match (return 401)

**Never skip signature verification.** Unsigned webhooks can be spoofed by anyone who knows your endpoint URL.

## Retry Policy

Webhook deliveries fail. The consumer's server is down, returns a 500, or times out. Implement retries with exponential backoff:

| Attempt | Delay | Cumulative Wait |
|---------|-------|-----------------|
| 1 | Immediate | 0 |
| 2 | 1 minute | 1 min |
| 3 | 5 minutes | 6 min |
| 4 | 30 minutes | 36 min |
| 5 | 2 hours | ~2.5 hours |

**Success criteria:** HTTP 2xx response within 30 seconds. Anything else is a failure.

After all retries are exhausted, mark the delivery as failed and notify the consumer (email, dashboard alert). Provide a manual retry button.

## Idempotency

At-least-once delivery means consumers may receive the same event twice. Consumers must handle this:

1. Store processed event IDs in a database or cache
2. Before processing, check if the event ID has been seen
3. If seen, return 200 immediately without reprocessing
4. If new, process the event and store the ID

**Idempotency window:** Keep event IDs for at least 72 hours. Events older than that will not be retried.

## Design Checklist

- [ ] Every event type is documented with a payload schema
- [ ] HMAC signature verification is implemented on all endpoints
- [ ] Retry policy uses exponential backoff with a maximum attempt count
- [ ] Consumers deduplicate using event IDs
- [ ] Failed deliveries are surfaced in a dashboard or alert
- [ ] Webhook endpoint responds within 5 seconds (offload heavy processing to a queue)
- [ ] Webhook secrets can be rotated without downtime
