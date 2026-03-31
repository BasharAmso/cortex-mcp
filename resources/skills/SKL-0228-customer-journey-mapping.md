---
id: SKL-0228
name: Customer Journey Mapping
category: skills
tags: [customer-journey, touchpoints, pain-points, moments-of-truth, user-experience, service-design]
capabilities: [journey-map-creation, touchpoint-analysis, pain-point-identification, moment-of-truth-design]
useWhen:
  - mapping the end-to-end experience of a customer with your product
  - identifying where users drop off in your funnel
  - finding the highest-impact touchpoints to improve
  - aligning team members on the customer experience
  - designing onboarding or activation flows
estimatedTokens: 650
relatedFragments: [SKL-0224, SKL-0229, PAT-0117]
dependencies: []
synonyms: ["how to map the customer journey", "where are users dropping off", "touchpoint analysis template", "how to find pain points in user experience", "customer experience mapping", "journey map framework"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/PostHog/posthog"
difficulty: beginner
owner: "cortex"
pillar: "market-research"
---

# Skill: Customer Journey Mapping

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0228 |
| **Name** | Customer Journey Mapping |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

A customer journey map visualizes every interaction a user has with your product, from first awareness to ongoing retention. PostHog's product suite illustrates why this matters: they built product analytics, session replays, feature flags, and surveys because each tool addresses a different stage of the journey. Understanding the full journey tells you what to build and where to invest.

### Journey Map Structure

A journey map has five horizontal stages and four vertical layers:

**Stages (columns):**
1. **Awareness** — How do they discover you? (Search, referral, content, ads)
2. **Consideration** — How do they evaluate you? (Docs, demo, free tier, reviews)
3. **Activation** — What is their first value moment? (First dashboard, first insight, first query)
4. **Retention** — What keeps them coming back? (Daily workflow, team collaboration, integrations)
5. **Advocacy** — What makes them recommend you? (Results, community, identity)

**Layers (rows):**
- **Actions** — What the user does at each stage.
- **Touchpoints** — Where the interaction happens (website, app, email, support).
- **Emotions** — How the user feels (confident, confused, frustrated, delighted).
- **Pain Points** — What blocks progress or causes friction.

### Identifying Moments of Truth

Moments of truth are touchpoints where the experience either cements loyalty or triggers abandonment. PostHog tracks these through funnel analysis and session replays. Three types matter most:

- **First moment of truth** — First impression. For PostHog, it's the autocapture setup: if events appear within minutes, the user trusts the tool.
- **Second moment of truth** — Does the product deliver on its promise? For analytics, it's the first genuine insight that changes a decision.
- **Zero moment of truth** — The research phase before first contact. Reviews, GitHub stars, community posts.

### Building the Map

1. **Choose one persona.** A journey map for "all users" is useless. Pick your highest-value or highest-volume segment.
2. **Walk the journey yourself.** Sign up as a new user. Record every step, emotion, and friction point.
3. **Layer in data.** Use analytics (funnel drop-offs, time-to-activation) and qualitative data (support tickets, interview quotes) to validate your walkthrough.
4. **Mark pain points.** For each stage, identify the top 1-2 friction points. Rank by severity (blocks progress vs. annoys).
5. **Identify opportunities.** For each pain point, propose one intervention: fix the UX, add a tooltip, send a timely email, or remove the step entirely.

### Quantifying the Journey

Pair your qualitative map with PostHog-style metrics at each stage:
- **Awareness**: Traffic sources, impressions
- **Consideration**: Signup rate, docs page views
- **Activation**: Time-to-first-value, activation rate
- **Retention**: DAU/MAU ratio, feature adoption
- **Advocacy**: NPS score, referral rate

## Key Takeaways

- Map one persona per journey. A generic map produces generic insights.
- Moments of truth are the 2-3 touchpoints that determine whether users stay or leave. Find them and over-invest there.
- Combine qualitative (walkthrough, interviews) with quantitative (funnels, session replays) for a grounded map.
- Pain points ranked by "blocks progress" matter more than those ranked by "slightly annoying."
- Revisit the map quarterly. The journey changes as your product and market evolve.
