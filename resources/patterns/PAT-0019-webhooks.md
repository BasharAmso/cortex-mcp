---
id: PAT-0019
name: Webhook Design
category: patterns
tags: [webhooks, event-driven, callback, notification, retry, idempotency, signature-verification]
capabilities: [webhook-design, webhook-security, retry-logic, event-notification]
useWhen:
  - implementing webhooks
  - receiving webhooks from third parties
  - designing webhook payloads
  - handling webhook retries
  - verifying webhook signatures
estimatedTokens: 550
relatedFragments: [PAT-0002, PAT-0012, PAT-0014, PAT-0003]
dependencies: []
synonyms: ["set up webhooks", "receive Stripe webhooks", "how webhooks work", "webhook retry logic", "verify webhook is real"]
lastUpdated: "2026-03-29"
difficulty: intermediate
sourceUrl: ""
---

# Webhook Design

Event notifications over HTTP. Both sending and receiving require careful handling.

## Receiving Webhooks (e.g., Stripe, GitHub)

### Verification Pattern

Always verify the signature before processing. Every reputable provider signs their payloads.

```typescript
import { createHmac } from "crypto";

function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expected = createHmac("sha256", secret)
    .update(payload, "utf8")
    .digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}

app.post("/webhooks/stripe", express.raw({ type: "application/json" }), (req, res) => {
  const sig = req.headers["stripe-signature"] as string;
  if (!verifyWebhookSignature(req.body.toString(), sig, process.env.WEBHOOK_SECRET!)) {
    return res.status(401).send("Invalid signature");
  }
  // Respond 200 immediately, process async
  res.status(200).send("OK");
  processWebhookAsync(JSON.parse(req.body.toString()));
});
```

### Idempotency

Webhooks may be delivered more than once. Always handle duplicates.

```typescript
async function processWebhook(event: WebhookEvent) {
  // Check if already processed
  const existing = await db.webhookEvents.findUnique({ where: { eventId: event.id } });
  if (existing) return; // Already handled

  await db.$transaction([
    db.webhookEvents.create({ data: { eventId: event.id, type: event.type } }),
    handleEvent(event),
  ]);
}
```

## Sending Webhooks (Your API to Consumers)

### Payload Design

```json
{
  "id": "evt_abc123",
  "type": "order.completed",
  "timestamp": "2026-03-29T12:00:00Z",
  "data": {
    "orderId": "ord_xyz",
    "total": 4999,
    "currency": "usd"
  }
}
```

### Delivery Rules

| Rule | Value |
|------|-------|
| Timeout | 5-10 seconds per attempt |
| Retries | 5 attempts with exponential backoff |
| Backoff schedule | 1min, 5min, 30min, 2hr, 24hr |
| Success criteria | 2xx response code |
| Failure handling | Disable endpoint after N consecutive failures |

## Webhook Endpoint Checklist

1. **Respond fast** -- return 200 immediately, process in background
2. **Verify signatures** -- never skip, even in development
3. **Handle duplicates** -- store event IDs, check before processing
4. **Use raw body** for signature verification (not parsed JSON)
5. **Log everything** -- event ID, type, processing result, timestamp
6. **Set up alerts** for repeated processing failures

## Anti-Patterns

- Parsing the body before verifying the signature
- Doing heavy processing before responding (provider times out and retries)
- No idempotency check (processing the same event twice)
- Trusting webhook source by IP only (IPs change)
- No dead-letter mechanism for permanently failed webhooks
