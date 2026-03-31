---
id: PAT-0218
name: User Retention Pattern
category: patterns
tags: [retention, engagement-loops, re-engagement, habit-formation, push-notifications, email-drip]
capabilities: [retention-loop-design, re-engagement-campaigns, habit-trigger-creation, engagement-optimization]
useWhen:
  - designing features that keep users coming back
  - building re-engagement email or notification campaigns
  - diagnosing why users drop off after initial activation
  - creating engagement loops that form habits
  - improving D7 and D30 retention metrics
estimatedTokens: 650
relatedFragments: [SKL-0433, SKL-0424, SKL-0428, PAT-0216]
dependencies: []
synonyms: ["how to keep users coming back", "how to improve retention", "how to build habit-forming features", "re-engagement email strategy", "why do users stop using my product", "how to create engagement loops"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/PostHog/posthog"
difficulty: intermediate
owner: "cortex"
pillar: "product-business"
---

# User Retention Pattern

Strategies for bringing users back repeatedly and building products that become part of their routine.

## The Hook Model (Nir Eyal)

Retention is built on habit loops, not reminders. Each cycle strengthens the habit:

```
Trigger → Action → Variable Reward → Investment
   ↑                                      |
   └──────────────────────────────────────┘
```

| Stage | Description | Example (Analytics Tool) |
|-------|-------------|------------------------|
| **Trigger** | External (notification) or internal (curiosity) | "Your weekly report is ready" |
| **Action** | Simplest behavior to get reward | Click to view dashboard |
| **Variable Reward** | Unpredictable value that satisfies | New insights, unexpected trends |
| **Investment** | User puts something in (data, config, content) | Customize dashboard, set alerts |

The investment stage is critical: it makes the product more valuable with use and increases switching costs.

## Engagement Loop Types

| Loop Type | Mechanism | Best For |
|-----------|-----------|----------|
| **Content loop** | New content appears regularly | Media, social, marketplaces |
| **Progress loop** | User sees advancement toward a goal | Learning, fitness, project tools |
| **Social loop** | Others' activity pulls the user back | Collaboration, communities |
| **Data loop** | Product gets smarter with more use | Analytics, AI-powered tools |
| **Notification loop** | External trigger about relevant events | Any product with time-sensitive info |

## Re-Engagement Campaign Sequence

When a user goes quiet, automated re-engagement should escalate gradually:

| Day Since Last Active | Channel | Message Type |
|----------------------|---------|-------------|
| 3 | In-app (next visit) | "Welcome back! Here is what is new" |
| 7 | Email | Value reminder: "Your data has X new insights" |
| 14 | Email | Social proof: "Teams like yours use X weekly" |
| 21 | Email + push | Offer: "Need help? Book a free walkthrough" |
| 30 | Email | Win-back: "We miss you. Here is what changed" |
| 60 | Email | Final: "Your data will be archived in 30 days" |

**Rules:** Unsubscribe link in every email. Stop the sequence if the user returns. Never send more than one re-engagement email per week.

## Retention by Product Type

| Product Type | Primary Retention Lever | Target Frequency |
|-------------|------------------------|-----------------|
| SaaS tool | Workflow integration (daily use) | Daily/Weekly |
| Marketplace | Inventory freshness, deals | Weekly |
| Content platform | New content, personalization | Daily |
| Developer tool | Data lock-in, API dependency | Ongoing |
| Communication | Network effects (team is there) | Daily |

## Measuring Retention Health

Track retention curves by cohort. A healthy product shows:
- **Flattening curve:** Retention stabilizes after initial drop (users who stay, stay)
- **Improving cohorts:** Newer cohorts retain better than older ones (product improving)
- **Smile curve:** Retention dips then rises as users rediscover value (rare but powerful)

Warning signs: every cohort looks the same (no improvement), curve never flattens (leaky bucket).

## Anti-Patterns

- Spamming notifications to force engagement (uninstall trigger)
- Artificial streaks that punish missing a day (guilt, not value)
- Dark patterns that make it hard to leave (erodes trust)
- Optimizing for session time instead of value delivered

## Key Takeaways
- Retention is built through habit loops, not reminders
- The investment stage (user puts data/config in) creates natural lock-in
- Re-engagement campaigns should escalate gradually over 60 days
- Track retention by cohort: improving cohorts mean the product is getting better
- Optimize for value delivered per session, not raw session frequency
