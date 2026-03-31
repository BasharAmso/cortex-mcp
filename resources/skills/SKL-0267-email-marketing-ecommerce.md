---
id: SKL-0267
name: Email Marketing for Ecommerce
category: skills
tags: [email-marketing, abandoned-cart, post-purchase, product-launch, ecommerce, campaigns]
capabilities: [abandoned-cart-recovery, post-purchase-sequence-design, product-launch-campaigns, subscriber-segmentation]
useWhen:
  - setting up abandoned cart recovery emails
  - designing post-purchase email sequences
  - planning a product launch email campaign
  - segmenting customers for targeted email campaigns
  - improving email deliverability and open rates
estimatedTokens: 650
relatedFragments: [SKL-0268, PAT-0138, SKL-0263]
dependencies: []
synonyms: ["how to recover abandoned carts with email", "post-purchase email sequence for ecommerce", "how to launch a product with email marketing", "ecommerce email automation setup", "how to segment ecommerce email lists", "best email flows for online stores"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/knadh/listmonk"
difficulty: beginner
owner: "cortex"
pillar: "ecommerce"
---

# Skill: Email Marketing for Ecommerce

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0267 |
| **Name** | Email Marketing for Ecommerce |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Listmonk is a self-hosted newsletter and mailing list manager backed by PostgreSQL. Its architecture separates subscriber management, list segmentation, campaign creation, and delivery into distinct concerns connected through a REST API. For ecommerce, this translates to event-driven email flows triggered by customer actions (cart abandonment, purchase, delivery) rather than manual campaign sends.

### The 5 Essential Ecommerce Email Flows

These automated sequences drive the majority of email revenue:

**1. Abandoned Cart Recovery** (3-email sequence)
| Email | Timing | Content |
|-------|--------|---------|
| Reminder | 1 hour after abandonment | "You left something behind" + cart contents with images |
| Incentive | 24 hours | Social proof ("X people bought this today") or free shipping |
| Urgency | 48 hours | "Your cart expires soon" or small discount (5-10%) |

Expected recovery rate: 5-15% of abandoned carts.

**2. Welcome Series** (3 emails over 7 days)
- Email 1: Brand story + what to expect (Day 0)
- Email 2: Best-sellers or category guide (Day 2)
- Email 3: First-purchase incentive if they haven't bought yet (Day 5)

**3. Post-Purchase Sequence**
- Order confirmation (immediate, transactional)
- Shipping notification with tracking (on shipment)
- Delivery follow-up + usage tips (2 days after delivery)
- Review request (7 days after delivery)
- Cross-sell related products (14 days after delivery)

**4. Win-Back Campaign** (for lapsed customers)
- Trigger: No purchase in 60-90 days
- "We miss you" + new products since last visit
- Escalating discount if no response (10% → 15% → 20%)
- Final email: "Should we remove you from our list?" (re-engages or cleans list)

**5. Product Launch**
- Teaser: "Something new is coming" (7 days before)
- Early access: Offer to existing customers first (1 day before)
- Launch day: Full announcement with hero imagery
- Follow-up: Social proof and remaining stock urgency (3 days after)

### Segmentation for Ecommerce

Listmonk manages subscribers across multiple lists with attributes. Map these to ecommerce segments:

| Segment | Criteria | Use For |
|---------|----------|---------|
| **First-time buyers** | Order count = 1 | Nurture to second purchase |
| **Repeat customers** | Order count > 2 | Loyalty rewards, early access |
| **High-value** | Lifetime spend > threshold | VIP offers, exclusive products |
| **Category interest** | Browsed or purchased from category X | Category-specific launches |
| **At-risk** | No purchase in 60+ days | Win-back campaigns |

### Deliverability Essentials

- **SPF, DKIM, DMARC** — Configure all three DNS records before sending. Non-negotiable.
- **Warm-up** — Start with small batches (100/day) and increase gradually over 2-4 weeks for new domains.
- **List hygiene** — Remove hard bounces immediately. Remove soft bounces after 3 consecutive failures. Purge unengaged subscribers (no opens in 90 days) quarterly.
- **Unsubscribe** — One-click unsubscribe in every email. Listmonk handles this natively with subscriber preference management.

### Key Metrics

| Metric | Healthy Range | Action If Low |
|--------|--------------|---------------|
| **Open rate** | 20-30% | Improve subject lines, check deliverability |
| **Click rate** | 2-5% | Better CTAs, more relevant content |
| **Cart recovery rate** | 5-15% | Adjust timing, test incentives |
| **Unsubscribe rate** | < 0.5% | Reduce frequency, improve segmentation |

## Key Takeaways

- Set up 5 automated flows (abandoned cart, welcome, post-purchase, win-back, launch) before any manual campaigns
- Trigger emails from customer events, not calendar dates
- Segment by purchase behavior (recency, frequency, value) for targeted messaging
- Configure SPF, DKIM, and DMARC before sending a single email
- Track cart recovery rate and post-purchase review conversion as primary ecommerce email metrics
