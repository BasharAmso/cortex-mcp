---
id: SKL-0011
name: Monetization
category: skills
tags: [billing, payments, stripe, subscriptions, pricing, webhooks, saas]
capabilities: [payment-processing, subscription-management, paywall-enforcement, webhook-handling, billing-portal]
useWhen:
  - implementing billing or payment processing
  - setting up subscriptions, pricing tiers, or paywalls
  - integrating Stripe checkout and webhook handlers
  - building a customer billing portal
estimatedTokens: 650
relatedFragments: [SKL-0006, SKL-0010, SKL-0012]
dependencies: []
---

# Monetization

Implement payment processing, subscriptions, paywalls, and billing. Start with the simplest billing model that works and make it easy to change pricing later.

## Provider Detection

| Platform | Provider | Notes |
|----------|----------|-------|
| Web app (default) | Stripe | Full procedure below |
| iOS app | Apple In-App Purchase | StoreKit 2, required for digital goods |
| Android app | Google Play Billing | Required for digital goods on Play Store |
| Shopify app | Shopify Billing API | Use AppSubscription, not Stripe |
| Physical goods | Stripe | Platform billing rules do not apply |

If the provider is not Stripe, route to the appropriate integration skill instead.

## Billing Model to Stripe Mapping

| Model | Stripe Primitives |
|-------|------------------|
| Flat subscription | Product + Price (recurring) + Subscription |
| Usage-based | Product + Price (metered) + UsageRecord |
| One-time | Product + Price (one-time) + PaymentIntent |
| Freemium | Free tier in app logic + Subscription for paid |
| Per-seat | Subscription with quantity parameter |

## Procedure (Stripe)

### 1. Confirm Billing Model

Extract from the PRD. If unspecified, ask the user. Log the decision.

### 2. Set Up Stripe

- Env vars: `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`
- Always pin Stripe API version

### 3. Database Schema

Add billing fields via migration: `stripe_customer_id`, `subscription_status`, `subscription_id`, `current_period_end`, `plan_id`.

### 4. Checkout Flow

Create Stripe checkout session server-side. Get-or-create Stripe customer. Support trial periods and promo codes.

### 5. Webhook Handler (Critical)

- Always verify signatures — never skip
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
- Never modify subscription status directly — only via webhook handlers
