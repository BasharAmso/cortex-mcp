---
id: SKL-0272
name: B2B Commerce
category: skills
tags: [b2b-ecommerce, bulk-pricing, purchase-orders, custom-catalogs, quote-management, wholesale]
capabilities: [b2b-storefront-design, bulk-order-management, quote-workflow, custom-pricing]
useWhen:
  - building a B2B ecommerce storefront or wholesale portal
  - implementing bulk pricing tiers or volume discounts
  - adding quote request and approval workflows
  - creating custom catalogs for different buyer organizations
  - supporting purchase orders and net payment terms
estimatedTokens: 650
relatedFragments: [SKL-0269, PAT-0141, SKL-0273]
dependencies: []
synonyms: ["how to build a B2B online store", "wholesale pricing implementation", "purchase order workflow ecommerce", "custom catalog per customer", "quote request feature", "how to handle net-30 payment terms"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/medusajs/medusa"
difficulty: advanced
owner: "cortex"
pillar: "ecommerce"
---

# Skill: B2B Commerce

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0272 |
| **Name** | B2B Commerce |
| **Category** | Skills |
| **Complexity** | Advanced |

## Core Concepts

B2B commerce differs from B2C in every dimension: buyers represent organizations (not individuals), orders are large and recurring, pricing is negotiated (not fixed), and payment happens on terms (not at checkout). Platforms like Medusa provide the commerce primitives (customer groups, draft orders, multi-channel pricing) that serve as building blocks for B2B workflows.

### Company and Buyer Management

Model the hierarchy: Company > Departments > Buyers. Each buyer has a role (admin, purchaser, viewer) controlling what they can do. Use customer groups to associate buyers with their company. Company admins manage their own user list, spending limits, and approval chains without merchant intervention.

### Custom Catalogs and Pricing

B2B buyers expect pricing specific to their contract. Implement this through price lists tied to customer groups:

| Pricing Model | Implementation |
|---------------|---------------|
| **Contract pricing** | Per-company price list overriding base prices |
| **Volume tiers** | Quantity breakpoints (1-99: $10, 100-499: $8, 500+: $6) |
| **Negotiated discounts** | Percentage off catalog for the entire company |
| **Custom catalogs** | Restrict product visibility per customer group or sales channel |

Medusa's multi-channel architecture supports assigning different product sets, prices, and currencies per sales channel, which maps naturally to B2B segments.

### Quote Request Workflow

For high-value or custom orders, buyers need to request quotes rather than checking out directly. The workflow:

1. Buyer builds a cart and submits as "Request for Quote" (RFQ)
2. Sales rep reviews, adjusts pricing, adds notes
3. Quote is sent to buyer with expiration date (typically 30 days)
4. Buyer accepts, converting the quote into a draft order
5. Draft order becomes a confirmed order upon approval

Implement this using Medusa's draft order system combined with custom workflow steps for the approval chain.

### Purchase Orders and Payment Terms

B2B buyers pay via purchase orders (POs) rather than credit cards. Support this by: accepting a PO number at checkout instead of payment, generating an invoice upon fulfillment, and tracking payment against net-30, net-60, or net-90 terms. Set credit limits per company and block new orders when the outstanding balance exceeds the limit.

### Reordering and Recurring Orders

B2B buyers reorder frequently. Provide a "reorder" button on past orders that pre-fills the cart. For subscription-like purchasing, offer scheduled recurring orders with editable quantities and delivery dates.

## Key Takeaways

- Model company hierarchies with roles and approval chains, not just individual customer accounts
- Use customer groups and price lists to deliver contract-specific pricing without duplicating products
- Build quote request workflows on top of draft orders with expiration and approval steps
- Support purchase orders with invoicing and net payment terms instead of card-only checkout
- Provide one-click reordering to reduce friction for repeat B2B purchases
