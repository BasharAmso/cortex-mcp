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
lastUpdated: "2026-03-29"
sourceUrl: ""
difficulty: intermediate
---

# Stripe Checkout Integration

Complete Stripe integration with checkout session creation, client redirect, webhook handling, and subscription helpers in TypeScript.

## 1. Checkout Session Creation (API Route)

```typescript
// app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
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

## 2. Client-Side Redirect

```typescript
// components/checkout-button.tsx
"use client";

import { useState } from "react";

export function CheckoutButton({ priceId }: { priceId: string }) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, userId: "current-user-id" }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={handleCheckout} disabled={loading}>
      {loading ? "Redirecting..." : "Subscribe"}
    </button>
  );
}
```

## 3. Webhook Handler

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
    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      await recordPayment(invoice.subscription as string, invoice.amount_paid);
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

## 4. Subscription Management Helpers

```typescript
// lib/stripe.ts
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function activateSubscription(userId: string, subscriptionId: string) {
  await db.user.update({
    where: { id: userId },
    data: { stripeSubscriptionId: subscriptionId, plan: "pro", planActive: true },
  });
}

export async function deactivateSubscription(userId: string) {
  await db.user.update({
    where: { id: userId },
    data: { plan: "free", planActive: false, stripeSubscriptionId: null },
  });
}

export async function recordPayment(subscriptionId: string, amount: number) {
  await db.payment.create({
    data: { subscriptionId, amount, paidAt: new Date() },
  });
}

export async function cancelSubscription(subscriptionId: string) {
  await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });
}

export async function createBillingPortalSession(customerId: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
  });
  return session.url;
}
```

## Key Points

- Set `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `NEXT_PUBLIC_APP_URL` in `.env.local`
- Use `stripe listen --forward-to localhost:3000/api/webhooks/stripe` for local webhook testing
- Always verify webhook signatures before processing events
- Use `cancel_at_period_end: true` for graceful cancellation (access until period ends)
- Stripe Billing Portal handles plan changes and payment method updates
