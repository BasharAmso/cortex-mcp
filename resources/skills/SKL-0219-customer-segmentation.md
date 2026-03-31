---
id: SKL-0219
name: Customer Segmentation
category: skills
tags: [customer-segmentation, cohort-analysis, market-research, user-personas, behavioral-analysis, targeting]
capabilities: [behavioral-segmentation, demographic-segmentation, cohort-creation, segment-prioritization]
useWhen:
  - defining target customer segments for a new product
  - analyzing which user groups get the most value from your product
  - building cohorts for marketing campaigns or feature rollouts
  - prioritizing which customer segment to serve first
  - creating data-driven personas from actual user behavior
estimatedTokens: 650
relatedFragments: [SKL-0220, SKL-0217, PAT-0115]
dependencies: []
synonyms: ["who are my best customers", "how to segment users", "customer cohort analysis", "which users should I target", "how to define target audience", "user segmentation strategy"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/PostHog/posthog"
difficulty: intermediate
owner: "cortex"
pillar: "market-research"
---

# Skill: Customer Segmentation

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0219 |
| **Name** | Customer Segmentation |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Customer segmentation divides your market into distinct groups that share common characteristics, enabling targeted product decisions, messaging, and resource allocation. PostHog's approach to cohort analysis and user properties demonstrates how product analytics tools operationalize segmentation.

### Segmentation Dimensions

| Dimension | Examples | Best For |
|-----------|----------|----------|
| **Demographic** | Company size, industry, role, geography | B2B targeting, sales-led GTM |
| **Behavioral** | Feature usage, session frequency, conversion actions | Product-led growth, retention analysis |
| **Psychographic** | Goals, pain points, risk tolerance, tech-savviness | Messaging and positioning |
| **Value-based** | Revenue contribution, LTV, expansion potential | Resource allocation, pricing tiers |
| **Needs-based** | Primary job-to-be-done, underserved needs | Product roadmap prioritization |

### Behavioral Segmentation Process

The most actionable approach for software products follows PostHog's model of event-based cohorts:

1. **Instrument key events**: Track meaningful actions (not just page views) such as feature activation, content creation, invites sent, and export actions.
2. **Define activation criteria**: Identify the actions that correlate with long-term retention. PostHog tracks "aha moments" like creating a first insight or watching a first session replay.
3. **Build cohorts**: Group users who share behavioral patterns. Common cohorts: power users (daily, multiple features), casual users (weekly, single feature), dormant users (no activity in 14+ days).
4. **Analyze retention by cohort**: Compare retention curves across segments to find which groups get lasting value and which churn.
5. **Profile the winners**: Look at the demographic and acquisition characteristics of your best-retaining cohort. This becomes your ideal customer profile (ICP).

### Prioritization Framework

Once you have segments, score each on three criteria:
- **Attractiveness**: Segment size, willingness to pay, growth rate.
- **Fit**: How well your product serves their needs today.
- **Accessibility**: Can you reach them through your current channels?

A segment that scores high on all three is your beachhead market. Resist the urge to serve every segment simultaneously.

### From Segments to Personas

Translate data-driven segments into actionable personas:
- Name the segment with a descriptive label (e.g., "Data-Curious PM" vs "SQL-Native Analyst").
- Document their primary job-to-be-done and key frustrations.
- Map their decision-making process and buying criteria.
- Keep it to 2-3 primary personas, not more.

### Anti-Patterns

- Segmenting by demographics alone without behavioral validation.
- Creating too many segments (if you have 12 segments, you have zero strategy).
- Using segments for analytics but not for product decisions.
- Static segmentation that never updates as your product evolves.

## Key Takeaways

- Behavioral segmentation based on product usage data is more actionable than demographics alone
- Build cohorts around activation events that correlate with retention
- Score segments on attractiveness, fit, and accessibility to find your beachhead
- Limit to 2-3 primary personas; more than that dilutes focus
- Revisit segments as your product and market evolve
