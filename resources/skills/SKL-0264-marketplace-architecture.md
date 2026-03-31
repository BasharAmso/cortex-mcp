---
id: SKL-0264
name: Marketplace Architecture
category: skills
tags: [marketplace, multi-vendor, commission, vendor-onboarding, payouts, ecommerce]
capabilities: [multi-vendor-platform-design, commission-modeling, vendor-lifecycle-management, payout-orchestration]
useWhen:
  - building a multi-vendor marketplace from scratch
  - designing commission and fee structures for sellers
  - implementing vendor onboarding and approval workflows
  - setting up split payments and vendor payouts
  - choosing between marketplace models (product, service, rental)
estimatedTokens: 650
relatedFragments: [SKL-0263, SKL-0265, PAT-0138]
dependencies: []
synonyms: ["how to build a marketplace platform", "multi-vendor ecommerce architecture", "how to handle marketplace commissions", "vendor payout system design", "how to onboard sellers to a marketplace", "marketplace transaction flow"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/sharetribe/sharetribe"
difficulty: advanced
owner: "cortex"
pillar: "ecommerce"
---

# Skill: Marketplace Architecture

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0264 |
| **Name** | Marketplace Architecture |
| **Category** | Skills |
| **Complexity** | Advanced |

## Core Concepts

Sharetribe's architecture demonstrates the core marketplace challenge: you are building a platform that serves two distinct user types (buyers and sellers) with a transaction process sitting between them. The platform operator earns by taking a commission on each transaction. Sharetribe implements this through a TransactionService API that provisions payment settings and manages the preauthorize-capture flow per marketplace community.

### Marketplace Transaction Flow

Every marketplace transaction follows this sequence:

1. **Listing** — Seller creates a listing with price, description, and availability
2. **Request** — Buyer initiates a transaction (booking, purchase, or inquiry)
3. **Preauthorization** — Payment provider holds the buyer's funds without capturing
4. **Acceptance** — Seller accepts the request (or auto-accept for instant purchase)
5. **Capture** — Platform captures payment, splits funds: seller payout minus commission
6. **Fulfillment** — Physical delivery, service rendered, or access granted
7. **Completion** — Review window opens, then payout is released to seller

### Commission Models

| Model | How It Works | Best For |
|-------|-------------|----------|
| **Percentage commission** | Platform takes X% of each transaction | Most marketplaces (10-20% typical) |
| **Fixed fee** | Flat fee per transaction | Low-value, high-volume transactions |
| **Hybrid** | Percentage + fixed minimum | Protecting revenue on small orders |
| **Subscription** | Sellers pay monthly for listing access | B2B marketplaces, premium vendor tiers |
| **Buyer fee** | Service fee added on top of listing price | Service marketplaces (Airbnb model) |

### Vendor Onboarding Pipeline

A vendor onboarding workflow needs these gates:

1. **Application** — Collect business details, product category, tax ID
2. **Verification** — Identity verification, business license check (manual or automated via Stripe Connect)
3. **Payment setup** — Connect seller's bank account for payouts (Stripe Connect onboarding or equivalent)
4. **Listing training** — Guide sellers through creating their first listing with quality standards
5. **Approval** — Manual review or auto-approve based on verification status
6. **Go-live** — Seller listings become visible to buyers

### Split Payment Architecture

The hardest technical problem in marketplaces is money flow. Stripe Connect provides three models:

- **Standard** — Seller has their own Stripe account. Simplest, least platform control.
- **Express** — Seller uses a simplified onboarding flow. Platform controls payouts.
- **Custom** — Platform fully controls the payment experience. Most flexible, most compliance burden.

For most marketplaces, Express Connect balances control with onboarding friction. The platform charges the buyer, holds funds, deducts commission, and pays out to the seller on a configurable schedule (daily, weekly, manual).

### Data Model Essentials

Beyond standard ecommerce entities, a marketplace needs:

- **Vendor** — Business profile, verification status, commission tier, payout schedule
- **Listing** — Extends product with vendor_id, approval_status, featured flag
- **Transaction** — Links buyer, seller, listing with state machine (requested → accepted → paid → completed → reviewed)
- **Payout** — Tracks amounts owed to vendors, payout status, settlement dates
- **Review** — Bidirectional (buyer reviews seller AND seller reviews buyer)

### Feature Flags for Marketplace Growth

Sharetribe uses feature flags per community to control marketplace behavior. Apply the same pattern:

- `auto_accept_listings` — Skip manual review once vendor is trusted
- `instant_purchase` — Skip the request/accept step for physical products
- `require_identity_verification` — Gate for regulated categories
- `enable_negotiations` — Allow price negotiation between buyer and seller

## Key Takeaways

- Design around the transaction process: preauthorize, accept, capture, fulfill, review
- Use Stripe Connect Express for the best balance of control and vendor onboarding friction
- Implement bidirectional reviews to build trust on both sides of the marketplace
- Start with percentage commission (10-20%) and adjust based on category margins
- Gate vendor onboarding with verification, payment setup, and listing quality checks
