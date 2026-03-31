---
id: SKL-0273
name: Fraud Prevention
category: skills
tags: [fraud-prevention, payment-security, 3d-secure, risk-scoring, address-verification, ecommerce]
capabilities: [fraud-detection, risk-assessment, payment-authentication, velocity-analysis]
useWhen:
  - implementing fraud prevention for an ecommerce checkout
  - deciding when to trigger 3D Secure authentication
  - building risk scoring rules for online payments
  - reducing chargebacks without blocking legitimate customers
  - adding address verification and velocity checks
estimatedTokens: 650
relatedFragments: [SKL-0272, PAT-0142, PAT-0141]
dependencies: []
synonyms: ["how to prevent ecommerce fraud", "what is 3D Secure and when to use it", "how to reduce chargebacks", "address verification for online payments", "risk scoring for transactions", "how to detect fraudulent orders"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/juspay/hyperswitch"
difficulty: intermediate
owner: "cortex"
pillar: "ecommerce"
---

# Skill: Fraud Prevention

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0273 |
| **Name** | Fraud Prevention |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Ecommerce fraud prevention is a balancing act: block too little and you absorb chargebacks; block too much and you reject legitimate customers (false declines cost merchants more than actual fraud). Payment orchestrators like Hyperswitch route transactions through multiple processors with built-in PCI-compliant vault services, giving you the infrastructure to layer fraud rules on top.

### Risk Scoring

Assign a risk score (0-100) to every transaction by combining weighted signals:

| Signal | Weight | High-Risk Indicator |
|--------|--------|-------------------|
| **AVS mismatch** | 20 | Billing address does not match card issuer records |
| **CVV failure** | 25 | Incorrect security code |
| **IP geolocation** | 15 | IP country differs from billing/shipping country |
| **Email age** | 10 | Disposable or newly created email domain |
| **Order velocity** | 15 | Multiple orders from same device/IP in short window |
| **Order amount** | 15 | Significantly above average order value |

Route transactions based on score: 0-30 approve automatically, 31-60 trigger 3D Secure, 61-80 flag for manual review, 81+ decline.

### Address Verification System (AVS)

AVS compares the billing address provided at checkout with the address on file at the card issuer. Results return as codes (full match, partial match, no match, unavailable). Use AVS as one signal in your risk score, not as a sole gatekeeper, because legitimate mismatches are common (apartment numbers, PO boxes, recent moves).

### Velocity Checks

Track transaction frequency across dimensions: per card, per email, per IP address, per device fingerprint, and per shipping address. Flag when any dimension exceeds thresholds within a time window. Example rules:

- More than 3 orders from the same card in 1 hour
- More than 5 failed payment attempts from the same IP in 10 minutes
- Same shipping address used with 3+ different cards in 24 hours

### 3D Secure (3DS)

3DS shifts fraud liability from the merchant to the card issuer when authentication succeeds. Use 3DS selectively based on risk score rather than on every transaction. Applying 3DS universally increases checkout abandonment by 10-15%. Hyperswitch and similar orchestrators support routing 3DS decisions per-transaction, allowing you to challenge only risky payments.

### Manual Review Queue

For medium-risk transactions, build a review queue. Show the reviewer: order details, risk score breakdown, customer history (first order vs returning), IP geolocation on a map, and AVS/CVV results. Set an SLA (review within 2 hours during business hours) to avoid delaying legitimate orders.

## Key Takeaways

- Combine multiple signals into a weighted risk score rather than relying on any single fraud check
- Apply 3D Secure selectively to medium-risk transactions to balance security and conversion
- Use velocity checks across card, IP, email, and device dimensions with time-windowed thresholds
- Treat AVS as one input to risk scoring, not a binary accept/reject gate
- Build a manual review queue for medium-risk orders with a clear SLA to avoid blocking real customers
