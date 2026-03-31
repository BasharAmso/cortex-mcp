---
id: SKL-0231
name: PEST Analysis
category: skills
tags: [pest-analysis, macro-environment, market-scanning, strategic-planning, external-factors, environmental-analysis]
capabilities: [environmental-scanning, trend-identification, risk-assessment, strategic-context]
useWhen:
  - evaluating macro-environmental factors before entering a new market
  - assessing external risks and opportunities for a product strategy
  - building context for a business case or investment decision
  - scanning political, economic, social, and technological trends
  - preparing a strategic planning session with leadership
estimatedTokens: 650
relatedFragments: [SKL-0235, SKL-0234, PAT-0120]
dependencies: []
synonyms: ["how do I analyze the market environment", "what external factors affect my product", "how to do a PEST analysis", "macro environment scan", "what trends should I watch", "strategic environment assessment"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/metabase/metabase"
difficulty: intermediate
owner: "cortex"
pillar: "market-research"
---

# Skill: PEST Analysis

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0231 |
| **Name** | PEST Analysis |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

PEST analysis examines four macro-environmental categories that shape market conditions: Political, Economic, Social, and Technological. Each dimension captures forces outside your direct control that determine whether your product can succeed.

### The Four Dimensions

**Political:** Government policy, regulation, trade restrictions, tax policy, political stability. Ask: what laws or regulations could help or hinder adoption? Are there upcoming elections or policy shifts that change the landscape?

**Economic:** GDP growth, inflation, interest rates, unemployment, consumer spending power, exchange rates. Ask: can your target customers afford this? Is the economy trending toward or away from your price point?

**Social:** Demographics, cultural trends, lifestyle changes, education levels, population growth, health consciousness. Ask: is the social trend moving toward or away from what you offer? What generational shifts matter?

**Technological:** Innovation pace, R&D activity, automation, technology adoption rates, digital infrastructure. Ask: does emerging tech enable or threaten your approach? What platform shifts are underway?

### Running the Analysis

1. **Scope the timeframe.** PEST is most useful at 2-5 year horizons. Near-term analysis blends into competitive analysis; longer horizons become speculation.
2. **Gather signals per dimension.** Use business intelligence tools (Metabase-style dashboards connecting to public datasets, government statistics, industry reports) to surface quantitative signals. Supplement with qualitative reading of policy announcements, trend reports, and expert commentary.
3. **Rate impact and probability.** For each factor, score impact (high/medium/low) and likelihood. Focus attention on high-impact, high-probability items.
4. **Identify cross-dimensional interactions.** A new regulation (Political) may drive technology adoption (Technological) which shifts consumer behavior (Social). These intersections often reveal the most actionable insights.
5. **Synthesize into implications.** Translate each significant factor into a concrete product or strategy implication: "Rising data privacy regulation means we must design for consent-first data collection."

### PEST Output Template

| Dimension | Factor | Impact | Probability | Implication |
|-----------|--------|--------|-------------|-------------|
| Political | GDPR-style laws expanding globally | High | High | Build privacy-by-default architecture |
| Economic | Rising SaaS fatigue, tighter budgets | Medium | High | Offer usage-based pricing |
| Social | Remote work normalization | High | High | Design for async collaboration |
| Technological | LLM commoditization | High | Medium | Integrate AI as expected feature, not differentiator |

### Common Pitfalls

- Listing factors without rating or prioritizing them (produces a wall of text, not insight).
- Treating PEST as a one-time exercise instead of a recurring scan (quarterly refresh recommended).
- Ignoring cross-dimensional effects where the real strategic insight lives.

## Key Takeaways

- PEST maps the macro forces outside your control that determine market viability
- Score each factor by impact and probability to focus on what actually matters
- Cross-dimensional interactions (regulation driving tech adoption, economy shifting social behavior) produce the most actionable insights
- Refresh quarterly; a stale PEST analysis is worse than none
- Connect every factor to a concrete product or strategy implication
