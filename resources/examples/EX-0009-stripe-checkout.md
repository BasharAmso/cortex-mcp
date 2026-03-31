---
id: EX-0009
name: Stripe Checkout Integration
category: examples
tags: [stripe, payments, checkout, billing, subscription, webhook, e-commerce]
capabilities: [payment-integration, checkout-flow, webhook-handling, subscription-management]
useWhen:
  - integrating Stripe payments
  - building a checkout flow
  - handling Stripe webhooks
  - setting up subscriptions
estimatedTokens: 650
relatedFragments: [SKL-0011, SKL-0006, PAT-0019]
dependencies: []
synonyms: ["add payments to my app", "Stripe checkout setup", "how to accept credit cards", "subscription billing with Stripe", "handle Stripe webhooks"]
sourceUrl: "https://github.com/stripe/stripe-node"
lastUpdated: "2026-03-30"
difficulty: intermediate
owner: builder
pillar: "software-dev"
---

# Stripe Checkout Integration

Stripe integration using the official stripe-node SDK patterns: typed client initialization, checkout sessions, webhook signature verification, and auto-pagination.

## 1. Checkout Session Creation

```typescript
// app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// stripe-node: initialize with API version and retry config
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
  maxNetworkRetries: 2,
});

export async function POST(req: NextRequest) {
  const { priceId, userId, mode = "subscription" } = await req.json();

  const session = await stripe.checkout.sessions.create({
    mode: mode as Stripe.Checkout.SessionCreateParams.Mode,
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?canceled=true`,
    client_reference_id: userId,
    metadata: { userId },
  });

  return NextResponse.json({ url: session.url });
}
```

## 2. Webhook Handler

```typescript
// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  // stripe-node: "pass the raw request body exactly as received"
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      await activateSubscription(session.client_reference_id!, session.subscription as string);
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      await deactivateSubscription(sub.metadata.userId);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
```

## 3. Subscription Helpers

```typescript
// lib/stripe.ts
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

// Graceful cancellation: access continues until period ends
export async function cancelSubscription(subscriptionId: string) {
  await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });
}

// stripe-node: auto-pagination with async iterators
export async function listAllInvoices(customerId: string) {
  const invoices: Stripe.Invoice[] = [];
  for await (const invoice of stripe.invoices.list({ customer: customerId })) {
    invoices.push(invoice);
  }
  return invoices;
}

// Billing portal for self-service plan changes
export async function createBillingPortalSession(customerId: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
  });
  return session.url;
}
```

## Key Points

- **Always verify webhook signatures** before processing events using `constructEvent()`
- **Raw body required**: parse as text, not JSON, before passing to signature verification
- **`cancel_at_period_end: true`** for graceful cancellation (access until period ends)
- **Auto-pagination** with `for await` iterates all results without manual cursor handling
- **`maxNetworkRetries`** enables automatic retry on transient network failures
- Use `stripe listen --forward-to localhost:3000/api/webhooks/stripe` for local testing
