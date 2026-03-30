---
id: PAT-0019
name: Webhook Design
category: patterns
tags: [webhooks, event-driven, callback, notification, retry, idempotency, signature-verification, security, hmac]
capabilities: [webhook-design, webhook-security, retry-logic, event-notification]
useWhen:
  - implementing webhook endpoints to receive events from Stripe, GitHub, etc.
  - designing outgoing webhooks for your own API consumers
  - handling webhook retries and duplicate delivery
  - verifying webhook signatures for security
  - building event notification systems over HTTP
estimatedTokens: 600
relatedFragments: [PAT-0002, PAT-0012, PAT-0014, PAT-0003]
dependencies: []
synonyms: ["set up webhooks in my app", "receive Stripe webhooks", "how webhooks work", "webhook retry logic", "verify webhook signature"]
lastUpdated: "2026-03-29"
difficulty: intermediate
sourceUrl: "https://github.com/goldbergyoni/nodebestpractices"
---

# Webhook Design

Event notifications over HTTP. Both sending and receiving require careful handling of security, idempotency, and failure recovery.

## Receiving Webhooks (e.g., Stripe, GitHub)

### Verification Flow

Always verify the signature before processing. Every reputable provider signs their payloads with HMAC-SHA256.

```typescript
import { createHmac } from "crypto";

function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  const expected = createHmac("sha256", secret).update(payload, "utf8").digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

app.post("/webhooks/stripe", express.raw({ type: "application/json" }), (req, res) => {
  const sig = req.headers["stripe-signature"] as string;
  if (!verifyWebhookSignature(req.body.toString(), sig, process.env.WEBHOOK_SECRET!)) {
    return res.status(401).send("Invalid signature");
  }
  res.status(200).send("OK"); // Respond immediately
  processWebhookAsync(JSON.parse(req.body.toString())); // Process in background
});
```

### Idempotency

Webhooks may be delivered more than once. Always deduplicate by event ID.

```typescript
async function processWebhook(event: WebhookEvent) {
  const existing = await db.webhookEvents.findUnique({ where: { eventId: event.id } });
  if (existing) return; // Already handled
  await db.$transaction([
    db.webhookEvents.create({ data: { eventId: event.id, type: event.type } }),
    handleEvent(event),
  ]);
}
```

## Sending Webhooks (Your API to Consumers)

### Delivery Rules

| Rule | Value |
|------|-------|
| Timeout | 5-10 seconds per attempt |
| Retries | 5 attempts with exponential backoff |
| Backoff schedule | 1min, 5min, 30min, 2hr, 24hr |
| Success criteria | 2xx response code |
| Failure handling | Disable endpoint after N consecutive failures |

## Endpoint Checklist

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
