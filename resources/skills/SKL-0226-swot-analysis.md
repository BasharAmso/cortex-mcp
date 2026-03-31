---
id: SKL-0226
name: SWOT Analysis
category: skills
tags: [swot, strategic-analysis, strengths, weaknesses, opportunities, threats]
capabilities: [swot-matrix-creation, cross-analysis, strategic-implication-mapping, action-prioritization]
useWhen:
  - evaluating a product or business opportunity systematically
  - preparing for a strategic planning session
  - assessing whether to enter a new market or launch a feature
  - comparing your position against competitors
  - identifying strategic actions from internal and external factors
estimatedTokens: 650
relatedFragments: [SKL-0225, SKL-0227, PAT-0119]
dependencies: []
synonyms: ["how to do a SWOT analysis", "strengths weaknesses opportunities threats", "strategic analysis framework", "how to evaluate my business position", "SWOT template", "competitive assessment framework"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/metabase/metabase"
difficulty: beginner
owner: "cortex"
pillar: "market-research"
---

# Skill: SWOT Analysis

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0226 |
| **Name** | SWOT Analysis |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

SWOT analysis maps internal capabilities (Strengths, Weaknesses) against external conditions (Opportunities, Threats) to produce strategic actions. Most SWOT analyses fail because they stop at listing items. The real value comes from the cross-analysis step, where you combine quadrants to generate specific strategies.

### Building the SWOT Matrix

Use Metabase's competitive position as a worked example:

| | **Helpful** | **Harmful** |
|---|---|---|
| **Internal** | **Strengths**: Open-source with 40k+ GitHub stars; no-code query builder lowers adoption barrier; AI-powered Metabot for natural language queries; embeddable analytics | **Weaknesses**: Clojure backend limits contributor pool; competes with free tools (Google Sheets) for simple use cases; enterprise features gated behind paid tier |
| **External** | **Opportunities**: Growing demand for embedded analytics; AI/LLM trend makes Metabot a differentiator; data-driven culture expanding to non-technical teams | **Threats**: Cloud-native competitors (Looker, Mode) with deeper integrations; commoditization of basic dashboarding; open-source sustainability funding risk |

### The Cross-Analysis (Where the Value Lives)

Map each quadrant pair to a strategic action type:

**S-O (Strength + Opportunity) = Offensive strategies.** Use strengths to capture opportunities. Metabase example: leverage the no-code builder and Metabot to target non-technical teams entering the data space.

**W-O (Weakness + Opportunity) = Investment strategies.** Shore up weaknesses to avoid missing opportunities. Example: expand language support or contributor tooling to grow the open-source community.

**S-T (Strength + Threat) = Defensive strategies.** Use strengths to mitigate threats. Example: deepen the embedding API to create switching costs that commoditized dashboards cannot match.

**W-T (Weakness + Threat) = Survival strategies.** Weaknesses that amplify threats require urgent attention. Example: if open-source funding dries up while enterprise conversion stays low, the business model is at risk.

### Running the Analysis

1. **Brainstorm broadly** — Generate 5-8 items per quadrant. Include both obvious and non-obvious factors.
2. **Prioritize ruthlessly** — Rank each item by impact (high/medium/low). A SWOT with 30 items in each quadrant is unusable.
3. **Cross-analyze** — For each high-impact item, ask: "Which item in the opposite quadrant does this interact with?" Generate one strategic action per pairing.
4. **Time-bound the output** — Every strategic action needs a timeframe (this quarter, this year, 2+ years) and an owner.

### Common Mistakes

- Listing features as strengths instead of competitive advantages (a feature is only a strength if competitors lack it).
- Confusing internal weaknesses with external threats (high pricing is internal; price war from competitors is external).
- Stopping at the matrix without cross-analysis.

## Key Takeaways

- The SWOT matrix is the input, not the output. The cross-analysis (S-O, W-O, S-T, W-T) produces actual strategic actions.
- Prioritize each quadrant to 3-5 high-impact items. An unprioritized list is noise.
- Every strategic action from cross-analysis needs a timeframe and an owner.
- Validate internal items with data (usage metrics, churn reasons) rather than team opinions.
- Revisit quarterly. External conditions shift faster than internal capabilities.
