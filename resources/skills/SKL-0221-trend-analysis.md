---
id: SKL-0221
name: Trend Analysis
category: skills
tags: [trend-analysis, market-research, data-analysis, leading-indicators, market-trends, forecasting]
capabilities: [trend-identification, leading-indicator-tracking, pattern-recognition, market-forecasting]
useWhen:
  - identifying emerging market trends before competitors
  - analyzing whether a product category is growing or declining
  - tracking leading indicators for strategic planning
  - building a data-backed narrative for market timing
  - deciding when to enter or exit a market
estimatedTokens: 650
relatedFragments: [SKL-0222, SKL-0218, PAT-0116]
dependencies: []
synonyms: ["how to spot market trends", "is this market growing", "what are the leading indicators", "market trend analysis methods", "how to track industry trends", "emerging technology trends"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/plausible/analytics"
difficulty: intermediate
owner: "cortex"
pillar: "market-research"
---

# Skill: Trend Analysis

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0221 |
| **Name** | Trend Analysis |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Trend analysis identifies directional patterns in market data to inform strategic timing decisions. Plausible Analytics demonstrates a key trend in action: the shift toward privacy-first tools driven by GDPR/CCPA regulation, growing from a niche concern to a mainstream requirement that reshaped the web analytics category.

### Types of Trends

| Type | Timeframe | Example |
|------|-----------|---------|
| **Mega-trends** | 10+ years | Cloud computing, AI adoption, privacy regulation |
| **Macro-trends** | 3-5 years | Usage-based pricing, developer-first GTM, open-source SaaS |
| **Micro-trends** | 6-18 months | Specific framework adoption, feature expectations |
| **Fads** | Weeks to months | Hype cycles, viral features (often not sustainable) |

Focus strategy on macro-trends. Mega-trends are too slow to act on directly. Micro-trends inform tactics. Fads are noise.

### Leading Indicators for Software Markets

Leading indicators signal trend direction before revenue data confirms it:

- **Search volume**: Google Trends for category terms, rising queries signal emerging demand.
- **Developer activity**: GitHub star velocity, npm/PyPI download growth, new repos in a category.
- **Community signals**: Hacker News/Reddit discussion frequency, Stack Overflow question volume.
- **Funding patterns**: VC investment in a category (Crunchbase data) precedes market maturation.
- **Job postings**: Hiring for specific skills signals company investment in a trend.
- **Regulatory activity**: New regulations create or destroy markets (GDPR created the privacy-analytics category Plausible serves).
- **Conference talks**: Topic frequency at industry events signals practitioner interest.

### Analysis Framework

**Step 1: Collect baseline data.** Gather 12-24 months of historical data for your indicators. Use consistent sources: Google Trends, npm download stats, GitHub API, job board APIs.

**Step 2: Calculate trajectory.** Look at month-over-month growth rates, not absolute numbers. A category growing at 15% MoM is more interesting than one with high absolute numbers but flat growth.

**Step 3: Identify inflection points.** Where did growth accelerate or decelerate? What external event caused the shift? Plausible's growth inflected when Apple's iOS privacy changes and GDPR enforcement made privacy analytics mainstream.

**Step 4: Separate signal from noise.** A real trend shows sustained directional movement across multiple indicators. If GitHub stars are up but downloads are flat, it is curiosity, not adoption. Require at least 3 correlated indicators before calling something a trend.

**Step 5: Assess timing.** Being too early is functionally the same as being wrong. Map where the trend sits on the adoption curve: innovators (risky), early adopters (opportunity window), early majority (proven demand, increasing competition).

### Trend Documentation Template

For each identified trend, document:
- **Trend name and one-sentence description**
- **Evidence**: 3+ data points with sources
- **Trajectory**: Accelerating, steady, or decelerating
- **Adoption stage**: Innovator, early adopter, early majority, late majority
- **Strategic implication**: What this means for your product or market

## Key Takeaways

- Focus on macro-trends (3-5 year horizon) for strategic decisions
- Require 3+ correlated leading indicators before declaring a trend
- Growth rate matters more than absolute size: track month-over-month trajectories
- Regulatory changes are among the strongest market-creating forces
- Being too early to a trend is functionally the same as being wrong: map the adoption curve
