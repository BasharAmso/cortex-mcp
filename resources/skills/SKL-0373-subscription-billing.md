---
id: SKL-0373
name: Subscription Billing
category: skills
tags: [subscription, billing, usage-based, invoicing, dunning, recurring-payments, saas, plans]
capabilities: [subscription-management, usage-billing, invoice-generation, dunning-automation]
useWhen:
  - building subscription or recurring billing features
  - implementing usage-based billing with metering
  - designing plan management with upgrades and downgrades
  - creating invoice generation and payment collection
  - implementing dunning (failed payment recovery) workflows
estimatedTokens: 650
relatedFragments: [SKL-0372, SKL-0370, PAT-0189, PAT-0190]
dependencies: []
synonyms: ["how to build subscription billing", "usage-based billing implementation", "SaaS pricing plan management", "recurring payment system design", "invoice generation for subscriptions", "dunning failed payment recovery"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/getlago/lago"
difficulty: intermediate
owner: "cortex"
pillar: "finance"
---

# Subscription Billing

Subscription billing handles recurring charges, plan management, usage metering, and payment collection. Lago's open-source billing engine demonstrates clean patterns for event-based usage billing that go beyond simple recurring charges.

## Billing Models

| Model | How It Works | Example |
|-------|-------------|---------|
| **Flat-rate** | Fixed monthly/annual charge | $29/month for Pro plan |
| **Per-seat** | Price per user per period | $10/user/month |
| **Usage-based** | Metered usage, billed in arrears | $0.01 per API call |
| **Tiered** | Price changes at volume thresholds | First 1000 calls free, then $0.005/call |
| **Hybrid** | Base fee + usage overage | $49/month + $0.01/call over 10,000 |

## Data Model

```typescript
interface Plan {
  id: string;
  name: string;                    // 'Pro'
  code: string;                    // 'pro_monthly'
  interval: 'monthly' | 'yearly' | 'weekly';
  baseAmount: number;              // Fixed recurring charge
  currency: string;
  charges: Charge[];
  trialDays?: number;
}

interface Charge {
  id: string;
  billableMetric: string;          // 'api_calls', 'storage_gb', 'active_users'
  model: 'standard' | 'graduated' | 'package' | 'percentage';
  tiers?: { upTo: number | null; unitAmount: number; flatAmount?: number }[];
}

interface Subscription {
  id: string;
  customerId: string;
  planId: string;
  status: 'active' | 'past_due' | 'canceled' | 'trialing' | 'paused';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAt?: Date;                 // Scheduled cancellation
  trialEnd?: Date;
}

interface UsageEvent {
  transactionId: string;           // Idempotency key
  customerId: string;
  metric: string;                  // 'api_calls'
  value: number;                   // 1 (single event) or batch amount
  timestamp: Date;
  properties?: Record<string, string>;  // For grouping/filtering
}
```

## Usage Metering

Ingest usage events in real-time and aggregate for billing:

```typescript
// Ingest usage events (high-volume endpoint)
app.post('/events', async (req, res) => {
  const event: UsageEvent = req.body;

  // Idempotency: reject duplicate transactionIds
  if (await isDuplicate(event.transactionId)) {
    return res.status(200).json({ status: 'duplicate' });
  }

  // Store event for aggregation
  await usageStore.insert(event);
  res.status(200).json({ status: 'received' });
});

// Aggregate usage for a billing period
async function getUsage(customerId: string, metric: string, period: BillingPeriod): Promise<number> {
  return await usageStore.aggregate({
    customerId,
    metric,
    from: period.start,
    to: period.end,
    aggregation: 'sum'  // or 'max', 'count_unique', 'last'
  });
}
```

## Invoice Generation

At period end, generate an invoice combining base charges and usage:

```typescript
async function generateInvoice(subscription: Subscription): Promise<Invoice> {
  const plan = await getPlan(subscription.planId);
  const lines: InvoiceLine[] = [];

  // Base charge
  if (plan.baseAmount > 0) {
    lines.push({ description: `${plan.name} - ${plan.interval}`, amount: plan.baseAmount });
  }

  // Usage charges
  for (const charge of plan.charges) {
    const usage = await getUsage(subscription.customerId, charge.billableMetric, {
      start: subscription.currentPeriodStart,
      end: subscription.currentPeriodEnd
    });
    const amount = calculateChargeAmount(charge, usage);
    lines.push({ description: `${charge.billableMetric}: ${usage} units`, amount });
  }

  // Tax
  const subtotal = lines.reduce((sum, l) => sum + l.amount, 0);
  const tax = await calculateTax(subscription.customerId, subtotal);

  return {
    subscriptionId: subscription.id,
    customerId: subscription.customerId,
    lines, subtotal, tax, total: subtotal + tax,
    issuedAt: new Date(),
    dueAt: addDays(new Date(), 30),
    status: 'pending'
  };
}
```

## Dunning (Failed Payment Recovery)

When a payment fails, automated dunning recovers revenue:

1. **Immediate**: retry payment (transient failures often succeed)
2. **Day 3**: retry + email "Payment failed, please update card"
3. **Day 7**: retry + email "Action required to keep your account active"
4. **Day 14**: final retry + email "Account will be suspended in 48 hours"
5. **Day 16**: suspend account (downgrade to free tier, not full deletion)

Keep data intact even after suspension. Users who update their payment method should reactivate instantly.

## Plan Changes

| Change | Billing Behavior |
|--------|-----------------|
| **Upgrade** | Prorate remaining days, charge difference immediately |
| **Downgrade** | Apply at end of current period (no refund for unused time) |
| **Cancel** | Access continues until period end, then stop billing |
| **Pause** | Stop billing, preserve account state, resume later |

## Key Takeaways

- Use idempotency keys for usage events to prevent double-counting at high volume
- Aggregate usage at billing time, not at ingestion time, for flexibility in billing model changes
- Dunning should be gradual (retry, email, warn, suspend) with data preservation throughout
- Prorate upgrades immediately but apply downgrades at period end
- Hybrid pricing (base fee + usage) captures both predictable and variable revenue
