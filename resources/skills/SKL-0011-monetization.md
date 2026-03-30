---
id: SKL-0011
name: Monetization
category: skills
tags: [billing, payments, stripe, subscriptions, pricing, webhooks, saas, indie, bootstrapping, revenue]
capabilities: [payment-processing, subscription-management, paywall-enforcement, webhook-handling, billing-portal]
useWhen:
  - implementing billing or payment processing
  - setting up subscriptions, pricing tiers, or paywalls
  - integrating Stripe checkout and webhook handlers
  - building a customer billing portal
  - choosing a monetization model for an indie or bootstrapped product
estimatedTokens: 700
relatedFragments: [SKL-0006, SKL-0010, SKL-0012]
dependencies: []
synonyms: ["how do I charge users", "add payments to my app", "set up subscriptions", "build a paywall", "I need Stripe billing"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/mezod/awesome-indie"
difficulty: advanced
---

# Monetization

Implement payment processing, subscriptions, paywalls, and billing. Grounded in the awesome-indie ecosystem of bootstrapped and self-funded businesses. Start with the simplest billing model that works, validate demand before optimizing pricing, and make it easy to change pricing later.

## Indie Monetization Principles

From bootstrapped founders (Rob Walling, Amy Hoy, Pieter Levels, Tyler Tringas):

1. **Start with a tiny product** -- validate willingness to pay before building complex billing
2. **Charge from day one** -- free users give different feedback than paying users
3. **MicroSaaS is viable** -- small, focused products can sustain a solo founder
4. **Pricing is a feature** -- experiment with pricing as aggressively as with product features
5. **Subscriptions beat one-time** -- recurring revenue compounds and is more predictable

## Provider Detection

| Platform | Provider | Notes |
|----------|----------|-------|
| Web app (default) | Stripe | Full procedure below |
| iOS app | Apple In-App Purchase | StoreKit 2, required for digital goods |
| Android app | Google Play Billing | Required for digital goods on Play Store |
| Shopify app | Shopify Billing API | Use AppSubscription, not Stripe |
| Physical goods | Stripe | Platform billing rules do not apply |

## Billing Model to Stripe Mapping

| Model | Stripe Primitives | Best for |
|-------|-------------------|----------|
| Flat subscription | Product + Price (recurring) + Subscription | SaaS with predictable usage |
| Usage-based | Product + Price (metered) + UsageRecord | API products, variable consumption |
| One-time | Product + Price (one-time) + PaymentIntent | Digital downloads, lifetime deals |
| Freemium | Free tier in app logic + Subscription for paid | User acquisition, network effects |
| Per-seat | Subscription with quantity parameter | Team/enterprise products |

## Procedure (Stripe)

### 1. Confirm Billing Model

Extract from the PRD. If unspecified, default to flat monthly subscription (simplest to implement and test).

### 2. Set Up Stripe

- Env vars: `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`
- Always pin Stripe API version

### 3. Database Schema

Add billing fields via migration: `stripe_customer_id`, `subscription_status`, `subscription_id`, `current_period_end`, `plan_id`.

### 4. Checkout Flow

Create Stripe checkout session server-side. Get-or-create Stripe customer. Support trial periods and promo codes.

### 5. Webhook Handler (Critical)

- Always verify signatures -- never skip
- Handle idempotently (same event may arrive twice)
- Minimum events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`, `invoice.payment_succeeded`
- Return 200 even on handler errors to prevent retry loops

### 6. Access Control

Paywall middleware checks subscription status from DB (not JWT). Stripe is the source of truth; DB is a cache synced via webhooks.

### 7. Customer Portal

Use Stripe's hosted billing portal for self-serve management.

## Key Constraints

- Never hardcode Stripe keys or price IDs
- Never trust client-side subscription state
- Never skip webhook signature verification
- Never modify subscription status directly -- only via webhook handlers
