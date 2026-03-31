---
id: SKL-0266
name: Return & Refund Management
category: skills
tags: [returns, refunds, rma, exchange, claims, ecommerce]
capabilities: [return-policy-design, rma-workflow-implementation, refund-processing, exchange-handling]
useWhen:
  - designing a return and refund policy for an online store
  - implementing an RMA (Return Merchandise Authorization) workflow
  - building a self-service return portal for customers
  - handling exchanges, partial refunds, and store credit
  - reducing return rates through better product information
estimatedTokens: 650
relatedFragments: [SKL-0265, PAT-0138, PAT-0139]
dependencies: []
synonyms: ["how to handle ecommerce returns", "how to build a return portal", "RMA workflow for online store", "how to process refunds automatically", "return policy best practices", "how to manage exchanges and store credit"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/medusajs/medusa"
difficulty: beginner
owner: "cortex"
pillar: "ecommerce"
---

# Skill: Return & Refund Management

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0266 |
| **Name** | Return & Refund Management |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Medusa's order module supports returns, exchanges, and claims as first-class order modifications with version-based control over the order timeline. Each modification creates a new order version, preserving the full history of changes. This approach ensures auditability and enables rollback if a return is disputed.

### Return Types

| Type | Customer Gets | Business Impact |
|------|--------------|-----------------|
| **Full refund** | Original payment reversed | Highest cost, simplest to process |
| **Partial refund** | Portion of payment reversed | Used for damaged items, missing components |
| **Exchange** | Replacement item shipped | Retains revenue, customer stays satisfied |
| **Store credit** | Credit balance for future purchase | Retains revenue within the business |
| **Claim** | Replacement or refund for defective item | Vendor/manufacturer may absorb cost |

### RMA Workflow

The Return Merchandise Authorization process ensures returns are tracked and validated:

1. **Request** — Customer initiates return through self-service portal or support. Capture: order ID, item(s), reason code, photos (if damaged)
2. **Authorization** — System checks return eligibility (within return window, item category allows returns, not final sale). Auto-approve or route to manual review.
3. **Label generation** — Generate prepaid return shipping label or provide drop-off instructions. Deduct shipping cost from refund if policy requires.
4. **Shipment tracking** — Customer ships item back. Track the inbound shipment to update status automatically.
5. **Inspection** — Warehouse receives and inspects the item. Grade condition: resellable, refurbishable, or damaged beyond recovery.
6. **Resolution** — Based on inspection, process the refund, ship the exchange, or issue store credit. Update inventory accordingly.

### Return Reason Codes

Standardize return reasons for analytics:

| Code | Reason | Actionable Insight |
|------|--------|-------------------|
| `SIZE` | Wrong size/fit | Improve size guide, add fit predictor |
| `QUALITY` | Quality not as expected | Review supplier quality, update product photos |
| `DAMAGED` | Arrived damaged | Improve packaging, flag carrier issues |
| `WRONG_ITEM` | Received wrong item | Audit pick-and-pack process |
| `NOT_AS_DESCRIBED` | Doesn't match listing | Update product descriptions and images |
| `CHANGED_MIND` | No longer wanted | Consider stricter return window |

### Refund Processing Rules

- **Refund to original payment method** — Default for card payments. Most payment processors support partial refunds on the original charge.
- **Processing timeline** — Initiate refund immediately on inspection approval. Card refunds take 5-10 business days to appear.
- **Restocking fees** — Optional deduction (typically 10-20%) for non-defective returns. Must be clearly stated in the return policy.
- **Non-refundable items** — Define categories excluded from returns (personalized items, perishables, hygiene products). Enforce at the authorization step.

### Self-Service Return Portal

Reduce support tickets by giving customers a return portal:

- Customer enters order number + email to authenticate
- System displays eligible items with remaining return window
- Customer selects items, reason, and preferred resolution (refund/exchange/credit)
- Auto-generate return label and provide tracking
- Real-time status updates via email notifications

### Reducing Return Rates

Prevention is cheaper than processing:

- Detailed product photos from multiple angles
- Accurate size charts with measurement guides
- Customer reviews mentioning fit and quality
- Video demonstrations for complex products
- Clear "what's in the box" descriptions

## Key Takeaways

- Implement version-based order modifications so every return is auditable
- Standardize return reason codes to surface actionable product and process insights
- Auto-approve returns that meet policy rules; route edge cases to manual review
- Build a self-service return portal to reduce support load
- Track return rates by reason code to fix root causes, not just process returns
