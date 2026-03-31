---
id: SKL-0227
name: Porter's Five Forces
category: skills
tags: [porters-five-forces, industry-analysis, competitive-dynamics, market-structure, barriers-to-entry, supplier-power]
capabilities: [industry-attractiveness-assessment, competitive-pressure-mapping, strategic-response-planning, market-entry-evaluation]
useWhen:
  - evaluating whether an industry is attractive enough to enter
  - understanding why margins are thin in your market
  - assessing competitive dynamics beyond direct rivals
  - preparing an investor pitch that addresses market structure
  - deciding whether to build, buy, or partner for a capability
estimatedTokens: 650
relatedFragments: [SKL-0226, SKL-0230, PAT-0117]
dependencies: []
synonyms: ["how to analyze an industry", "why is my market so competitive", "porter's five forces template", "how to assess competitive dynamics", "industry analysis framework", "barriers to entry analysis"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/metabase/metabase"
difficulty: intermediate
owner: "cortex"
pillar: "market-research"
---

# Skill: Porter's Five Forces

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0227 |
| **Name** | Porter's Five Forces |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Porter's Five Forces explains why some industries produce consistent profits and others don't. It shifts your attention from "who are my competitors?" to "what structural forces shape profitability in this market?" Use it before entering a market, not after you're already losing money.

### The Five Forces (Applied to Business Intelligence / Analytics)

Using the BI tools market (where Metabase competes) as a concrete example:

**1. Threat of New Entrants — MODERATE-HIGH**
Low barriers exist because open-source frameworks (Metabase itself is open-source) and cloud infrastructure let small teams ship analytics products quickly. However, data integrations create a moat: Metabase supports dozens of database drivers, which takes years to build. Key barrier factors: capital requirements, switching costs, network effects, regulatory requirements.

**2. Bargaining Power of Suppliers — LOW**
Suppliers in SaaS are cloud providers (AWS, GCP) and open-source dependencies. These are commoditized and substitutable. When your suppliers have low power, your input costs stay predictable. Assess: how many alternative suppliers exist? How costly is switching?

**3. Bargaining Power of Buyers — HIGH**
Enterprise buyers can evaluate 10+ BI tools in a quarter. Free tiers (Metabase open-source, Google Data Studio) give them strong alternatives. When buyers have high power, they push for lower prices and more features. Assess: buyer concentration, switching costs, price sensitivity, information availability.

**4. Threat of Substitutes — HIGH**
Spreadsheets, custom-built dashboards, and even AI-generated reports substitute for BI tools. Metabase counters this with Metabot (AI queries) and embeddable analytics, making the tool harder to replace with simpler alternatives. Assess: substitute performance-to-price ratio, switching costs, buyer propensity to switch.

**5. Competitive Rivalry — HIGH**
The BI space includes Tableau, Looker, Power BI, Mode, and dozens more. High rivalry compresses margins. Metabase differentiates through open-source, no-code access, and embedding. Assess: number of competitors, industry growth rate, product differentiation, exit barriers.

### Scoring the Analysis

Rate each force as Low, Moderate, or High pressure. Then:

| Force | Pressure | Strategic Implication |
|-------|----------|----------------------|
| New Entrants | High | Invest in moats (integrations, community, data network effects) |
| Supplier Power | Low | No action needed; costs are stable |
| Buyer Power | High | Increase switching costs (embedded workflows, team collaboration features) |
| Substitutes | High | Differentiate on capabilities substitutes can't match (AI, embedding) |
| Rivalry | High | Compete on category creation, not feature parity |

### When the Model Falls Short

Porter's Five Forces assumes relatively stable industry boundaries. In fast-moving tech markets, forces can shift quarterly. Complement it with SWOT (SKL-0226) for internal positioning and trend monitoring (PAT-0118) for detecting shifts in real time.

## Key Takeaways

- Analyze all five forces before entering a market. An attractive product in an unattractive industry still produces poor returns.
- Rate each force (Low/Moderate/High) and pair each rating with a specific strategic response.
- The most overlooked forces are substitutes and supplier power. Competitors are not the only threat to your margins.
- In tech markets, barriers to entry erode fast. Your moat must be continuously maintained (integrations, data, community).
- Combine Five Forces with SWOT for a complete picture: Five Forces tells you about the industry, SWOT tells you about your position in it.
