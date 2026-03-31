---
id: SKL-0424
name: User Onboarding Strategy
category: skills
tags: [onboarding, activation, first-run, time-to-value, user-experience, product-led-growth]
capabilities: [onboarding-design, activation-optimization, first-run-experience, time-to-value-reduction]
useWhen:
  - designing the first-run experience for a new product
  - improving activation rates for existing users
  - reducing time-to-value for new signups
  - building product tours or setup wizards
  - diagnosing why users drop off after signup
estimatedTokens: 650
relatedFragments: [SKL-0423, SKL-0426, PAT-0218, SKL-0014]
dependencies: []
synonyms: ["how to onboard new users", "how to improve activation rate", "first-run experience design", "why do users drop off after signup", "how to reduce time to value", "how to build a product tour"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/PostHog/posthog"
difficulty: beginner
owner: "cortex"
pillar: "product-business"
---

# Skill: User Onboarding Strategy

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0424 |
| **Name** | User Onboarding Strategy |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Onboarding is the bridge between signup and value. Most products lose 40-60% of users before they experience the core value proposition. The goal is to get users to their "aha moment" as fast as possible.

### Define Your Activation Moment

The activation moment is the action that correlates most strongly with long-term retention. Examples:

| Product Type | Activation Moment |
|-------------|-------------------|
| Analytics tool | First dashboard created with real data |
| Project management | First task completed with a teammate |
| Email marketing | First campaign sent |
| Developer tool | First successful API call |

### Onboarding Patterns

**Progressive Disclosure:** Show only what the user needs right now. Hide advanced features until the basics are mastered. Each step should feel like progress, not a lecture.

**Setup Checklist:** Give users a visible checklist of 3-5 setup steps. Completion psychology drives action. Show progress (e.g., "3 of 5 complete"). PostHog uses this pattern to guide users through SDK installation, first event, and first insight.

**Empty State Design:** Never show a blank screen. Use empty states to educate and prompt the next action. "You have no dashboards yet. Create your first one" with a clear CTA.

**Contextual Tooltips:** Trigger help where the user needs it, not in a front-loaded tutorial. Show tooltips on first interaction with a feature, not all at once.

### Metrics to Track

| Metric | Formula | Target |
|--------|---------|--------|
| **Activation rate** | Users who hit activation / Total signups | 25-40% |
| **Time to value** | Median time from signup to activation | < 5 minutes |
| **Setup completion** | Users who finish onboarding / Total signups | > 60% |
| **Day 1 retention** | Users who return day after signup / Signups | > 30% |

### Anti-Patterns

- Forcing users to watch a video before they can use the product
- Asking for unnecessary information during signup (minimize form fields)
- Front-loading a 10-step tutorial before any value is delivered
- No guidance at all ("figure it out yourself")

## Key Takeaways
- Define one clear activation moment and optimize everything toward it
- Use progressive disclosure instead of front-loaded tutorials
- Visible checklists drive completion through progress psychology
- Empty states are onboarding real estate, not dead space
- Measure time-to-value and activation rate, not just signups
