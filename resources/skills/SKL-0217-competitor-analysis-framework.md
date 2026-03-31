---
id: SKL-0217
name: Competitor Analysis Framework
category: skills
tags: [competitor-analysis, market-research, competitive-intelligence, feature-comparison, positioning, benchmarking]
capabilities: [competitor-identification, feature-matrix-creation, positioning-analysis, competitive-gap-detection]
useWhen:
  - evaluating the competitive landscape before building a product
  - creating a feature comparison matrix against competitors
  - identifying gaps and opportunities in an existing market
  - preparing competitive positioning for a pitch deck
  - deciding how to differentiate your product
estimatedTokens: 650
relatedFragments: [SKL-0218, PAT-0115, SKL-0222]
dependencies: []
synonyms: ["how do I analyze competitors", "what are my competitors doing", "competitive analysis template", "how to compare features against competitors", "who are my competitors", "competitive landscape overview"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/PostHog/posthog"
difficulty: beginner
owner: "cortex"
pillar: "market-research"
---

# Skill: Competitor Analysis Framework

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0217 |
| **Name** | Competitor Analysis Framework |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

A systematic competitor analysis follows four phases: identify, categorize, compare, and position.

### 1. Identify Competitors

Map three tiers of competition:
- **Direct competitors**: Products solving the same problem for the same audience (e.g., PostHog vs Mixpanel for product analytics).
- **Indirect competitors**: Different approach to the same underlying need (e.g., PostHog vs custom-built analytics on Metabase).
- **Potential entrants**: Adjacent products that could expand into your space (e.g., a CRM adding analytics features).

Source competitor lists from: app stores, G2/Capterra, Product Hunt, GitHub trending, industry reports, and customer interviews ("what else did you consider?").

### 2. Build a Feature Comparison Matrix

Create a structured table comparing capabilities across competitors. PostHog's approach of offering an "all-in-one platform" (analytics, session replay, feature flags, surveys, data warehouse) illustrates how breadth becomes a differentiator. Your matrix should cover:

| Dimension | What to Compare |
|-----------|----------------|
| **Core features** | Must-have capabilities for the category |
| **Pricing model** | Free tier, per-seat, usage-based, flat rate |
| **Target audience** | SMB, mid-market, enterprise, developer-first |
| **Distribution** | Self-serve signup, sales-led, open source, marketplace |
| **Integration depth** | API quality, SDK coverage, ecosystem connectors |
| **Deployment** | Cloud-only, self-hosted, hybrid |

### 3. Analyze Positioning

For each competitor, document their stated positioning (tagline, homepage hero), actual positioning (what customers say on review sites), and pricing anchors. Look for patterns: if every competitor positions on "ease of use," that is table stakes, not a differentiator.

### 4. Identify Strategic Gaps

Cross-reference your matrix against customer pain points to find underserved needs. Common gap types:
- **Feature gaps**: Capabilities no competitor offers well.
- **Audience gaps**: Segments competitors ignore (e.g., open-source self-hosters).
- **Pricing gaps**: Price points with no credible option.
- **Experience gaps**: Poor onboarding, documentation, or support across the category.

### Output Template

Deliver findings as a structured document with: executive summary, competitor profiles (one page each), feature matrix, positioning map (2x2), identified gaps, and recommended differentiation strategy.

## Key Takeaways

- Map three tiers of competition: direct, indirect, and potential entrants
- Build feature matrices that go beyond features to include pricing, distribution, and deployment models
- Source positioning from both marketing claims and actual customer reviews
- The most valuable output is identifying gaps, not just cataloging competitors
- Revisit quarterly, as competitive landscapes shift rapidly in software
