---
id: SKL-0433
name: Churn Analysis & Prevention
category: skills
tags: [churn, retention, win-back, customer-success, cohort-analysis, subscription-management]
capabilities: [churn-prediction, retention-strategy, win-back-campaigns, cohort-analysis]
useWhen:
  - investigating why users are leaving the product
  - building a churn prediction model or early warning system
  - designing win-back email campaigns
  - improving retention for a subscription product
  - analyzing cohort retention curves for problem diagnosis
estimatedTokens: 700
relatedFragments: [SKL-0428, PAT-0218, SKL-0426, SKL-0425]
dependencies: []
synonyms: ["why are users leaving my product", "how to reduce churn", "how to win back lost customers", "how to predict which users will churn", "how to improve retention rate", "what causes users to cancel"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/PostHog/posthog"
difficulty: intermediate
owner: "cortex"
pillar: "product-business"
---

# Skill: Churn Analysis & Prevention

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0433 |
| **Name** | Churn Analysis & Prevention |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Churn is the silent killer of SaaS businesses. A 5% monthly churn rate means you lose half your customers every year. Reducing churn by even 1% has a larger impact on revenue than acquiring new customers at the same rate.

### Types of Churn

| Type | Definition | Typical Cause |
|------|-----------|---------------|
| **Voluntary** | User actively cancels | Poor value, competitor, budget |
| **Involuntary** | Payment fails, card expires | Payment friction, not intent |
| **Logo churn** | Customer count decrease | Measured as % of accounts |
| **Revenue churn** | MRR decrease from cancellations and downgrades | Includes plan changes |
| **Net revenue churn** | Revenue churn minus expansion revenue | Can be negative (good) |

### Churn Signal Detection

Users rarely churn without warning. Track these leading indicators:

| Signal | What It Means | Urgency |
|--------|--------------|---------|
| Login frequency dropping | Disengagement starting | Medium |
| Core feature usage declining | Not getting value | High |
| Support tickets increasing | Frustration building | High |
| Billing page visits | Considering cancellation | Critical |
| Downgrade request | Testing the exit | Critical |
| No activity for 14+ days | Already mentally churned | Critical |

PostHog enables tracking these signals through event-based analytics and cohort breakdowns.

### Churn Prevention Strategies

**Before churn signals appear:**
- Nail onboarding (SKL-0424) to ensure users reach the activation moment
- Regular check-ins for high-value accounts (customer success)
- Product education through contextual tips and email drip campaigns
- Build switching costs through integrations, data, and workflows

**When churn signals appear:**
- Trigger automated re-engagement emails ("We noticed you have not used X in a while")
- Offer a free consultation or success call for high-value accounts
- Surface underused features that address their likely pain points
- Show ROI dashboards ("You saved 40 hours this month using our tool")

**At the cancellation moment:**
- Ask why (short survey, 1-2 questions maximum)
- Offer alternatives to cancellation: pause, downgrade, discount
- Make cancellation easy (dark patterns erode trust and invite chargebacks)
- Confirm and offer a clear path to return

### Win-Back Campaigns

| Timing | Message | Offer |
|--------|---------|-------|
| 1 day after cancel | "We are sorry to see you go. Here is what changed." | None (just acknowledge) |
| 14 days | "We shipped improvements based on feedback like yours" | Free month |
| 30 days | "Come back and try the new X feature" | 20% discount for 3 months |
| 90 days | Final attempt, low-key | Annual plan discount |

Win-back emails typically convert 5-15% of churned users if sent within 30 days.

### Involuntary Churn Prevention

Failed payments cause 20-40% of all churn in subscription businesses:
- Send pre-expiration reminders for cards expiring soon
- Retry failed charges on days 1, 3, 7, and 14 with increasing urgency in notifications
- Use Stripe's Smart Retries or equivalent
- Allow updating payment method without canceling the subscription
- Offer alternative payment methods (PayPal, bank transfer)

## Key Takeaways
- Track leading indicators (declining usage, support tickets) not just cancellation events
- Involuntary churn from failed payments is preventable with retry logic and card update reminders
- At cancellation, offer pause or downgrade before accepting the cancel
- Win-back campaigns work best within 30 days of churn
- Negative net revenue churn (expansion exceeds churn) is the ultimate SaaS health signal
