---
id: PAT-0216
name: Freemium Conversion Pattern
category: patterns
tags: [freemium, conversion, paywall, upgrade-triggers, monetization, product-led-growth]
capabilities: [paywall-design, upgrade-trigger-placement, free-tier-optimization]
useWhen:
  - designing a freemium model with clear upgrade paths
  - deciding what to include in the free tier vs. paid
  - placing upgrade triggers that convert without annoying
  - optimizing free-to-paid conversion rates
  - balancing free tier generosity with revenue goals
estimatedTokens: 650
relatedFragments: [SKL-0425, SKL-0011, SKL-0428, PAT-0218]
dependencies: []
synonyms: ["how to convert free users to paid", "what to put behind a paywall", "how to design upgrade triggers", "freemium conversion best practices", "how generous should the free tier be", "how to increase free to paid conversion"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/PostHog/posthog"
difficulty: intermediate
owner: "cortex"
pillar: "product-business"
---

# Freemium Conversion Pattern

A structured approach to designing free tiers that drive upgrades without degrading the user experience.

## The Freemium Spectrum

| Strategy | Free Tier Gets | Paid Tier Gets | Example |
|----------|---------------|----------------|---------|
| **Feature-limited** | Core features only | Advanced features | Notion (no guests on free) |
| **Usage-limited** | Low volume cap | Higher or unlimited volume | PostHog (1M events free) |
| **Time-limited** | Full product for N days | Continued access | Trial model |
| **Capacity-limited** | Limited storage/seats | More storage/seats | Dropbox, Slack |
| **Support-limited** | Community support | Priority support | Many B2B tools |

## Free Tier Design Principles

1. **The free tier must deliver real value.** If free users get nothing useful, they leave before ever considering an upgrade. PostHog gives 1M events/month free, enough to run a real product.
2. **Limit by volume, not by capability.** Users need to experience the full product to understand its value. Crippling features on the free plan prevents the "aha moment."
3. **The limit should be hit naturally.** If the free tier cap is so high that nobody hits it, nobody upgrades. If it is so low that users feel tricked, they leave angry.

## Upgrade Trigger Placement

| Trigger Type | When It Fires | Tone |
|-------------|---------------|------|
| **Soft wall** | User approaches limit (80% usage) | Informational: "You have used 800 of 1,000 events" |
| **Hard wall** | User hits limit | Blocking but fair: "Upgrade to continue" |
| **Feature tease** | User tries a paid feature | Educational: "This is available on Pro" |
| **Value moment** | User achieves a milestone | Celebratory: "You analyzed 500 sessions! Unlock deeper insights" |
| **Social proof** | During engaged session | Subtle: "Teams like yours use Pro for X" |

## Conversion Rate Benchmarks

| Metric | Typical Range | Good |
|--------|-------------|------|
| Free to paid conversion | 2-5% | > 5% |
| Trial to paid conversion | 15-25% | > 25% |
| Time to first upgrade | 14-30 days | < 14 days |
| Expansion rate (post-upgrade) | 10-20% annual | > 20% |

## Anti-Patterns

- Hiding the pricing page (users cannot upgrade if they cannot find it)
- Dark patterns that trick users into upgrading (erodes trust, increases churn)
- Free tier so generous there is no reason to pay
- Requiring a credit card for free signup (reduces acquisition 50%+)
- Paywall on the first interaction before any value is delivered

## Key Takeaways
- Free users must experience real value to understand what they would pay for
- Limit by volume (not features) so users experience the full product
- Place upgrade triggers at value moments, not frustration moments
- A 2-5% free-to-paid conversion rate is normal; optimize from there
- Never require a credit card for the free tier
