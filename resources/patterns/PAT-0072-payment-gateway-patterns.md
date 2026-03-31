---
id: PAT-0072
name: Payment Gateway Patterns
category: patterns
tags: [payments, gateway-routing, pci-compliance, reconciliation, webhooks, retry-logic, multi-gateway]
capabilities: [payment-routing-design, gateway-abstraction, payment-reconciliation]
useWhen:
  - integrating with one or more payment processors
  - designing a payment routing or orchestration layer
  - implementing retry logic for failed payment attempts
  - building webhook verification for payment events
  - ensuring PCI compliance in a payment system
estimatedTokens: 700
relatedFragments: [PAT-0071, SKL-0146, PAT-0002]
dependencies: []
synonyms: ["how to integrate multiple payment gateways", "payment retry logic best practices", "how to handle failed payments", "PCI compliance basics for developers", "how to verify payment webhooks", "payment reconciliation pattern"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/juspay/hyperswitch"
difficulty: intermediate
owner: "cortex"
pillar: "finance"
---

# Payment Gateway Patterns

Abstract the payment gateway behind a unified interface. Route each transaction to the best processor based on cost, success rate, and availability. Never hard-code a single provider.

## Multi-Gateway Abstraction

```typescript
interface PaymentGateway {
  charge(request: ChargeRequest): Promise<ChargeResult>;
  refund(transactionId: string, amount: number): Promise<RefundResult>;
  verifyWebhook(payload: Buffer, signature: string): boolean;
}
```

Every gateway implements the same interface. Your application code calls the abstraction, never a specific provider. Adding a new gateway means implementing the interface and registering it in the router.

## Intelligent Routing

| Strategy | When to Use |
|----------|------------|
| **Cost-based** | Route to the cheapest processor for the payment method and region |
| **Success-rate** | Track auth rates per gateway and shift traffic toward higher performers |
| **Failover** | If the primary gateway is down, automatically try the secondary |
| **Rule-based** | Route by card BIN, currency, country, or transaction amount |

Routing decisions should be configurable, not hard-coded. Store routing rules in a database or config service so they can be updated without deployment.

## Retry Logic

1. **Distinguish retryable from terminal failures.** Timeouts and 5xx errors are retryable. Declined cards and insufficient funds are not.
2. **Use exponential backoff.** First retry at 1s, second at 4s, third at 16s. Cap at 3 attempts for synchronous flows.
3. **Try a different gateway on retry.** If Gateway A times out, route the retry to Gateway B. This is "smart retries" and significantly improves overall success rates.
4. **Idempotency keys are mandatory.** Every payment request must carry an idempotency key so retries do not create duplicate charges. The gateway uses this key to deduplicate.

## Reconciliation

Payment reconciliation matches three records: your system's transaction, the gateway's settlement report, and the bank statement.

- **Two-way reconciliation**: Match your records against the gateway's records. Flag mismatches.
- **Three-way reconciliation**: Add the bank statement as a third source. This catches gateway errors.
- **Run daily.** Automate the comparison. Alert on discrepancies above a threshold. Stale unreconciled transactions indicate a systemic problem.

## Webhook Verification

```typescript
function verifyWebhook(payload: Buffer, signature: string, secret: string): boolean {
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}
```

Always verify webhook signatures using timing-safe comparison. Never trust the payload without verification. Store the webhook and process it asynchronously to avoid timeout issues.

## PCI Compliance Essentials

| Level | Requirement |
|-------|------------|
| **Never store raw card numbers** | Use tokenization. The gateway returns a token; store that instead. |
| **Use hosted payment fields** | Embed the gateway's iframe or SDK so card data never touches your server. |
| **Encrypt in transit** | TLS everywhere. No exceptions. |
| **Log carefully** | Never log full card numbers, CVVs, or sensitive auth data. Mask to last 4 digits. |
| **SAQ-A compliance** | If card data never hits your server (hosted fields), you qualify for the simplest PCI self-assessment. |

## Anti-Patterns

- Hard-coding a single payment provider with no abstraction layer
- Retrying declined transactions (wastes money and annoys the customer)
- Processing webhooks synchronously and blocking on downstream calls
- Storing raw card numbers anywhere in your system
- Skipping idempotency keys on payment requests (leads to double charges)
