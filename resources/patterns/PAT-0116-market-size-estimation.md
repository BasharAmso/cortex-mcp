---
id: PAT-0116
name: Market Size Estimation
category: patterns
tags: [market-sizing, tam-sam-som, market-research, estimation-methods, data-sources, business-planning]
capabilities: [tam-calculation, sam-calculation, som-calculation, estimation-validation, data-source-identification]
useWhen:
  - calculating TAM/SAM/SOM for a pitch deck or business plan
  - validating market size estimates with multiple data sources
  - choosing between top-down and bottom-up estimation approaches
  - building a defensible market sizing argument for investors
  - comparing market opportunities across product ideas
estimatedTokens: 650
relatedFragments: [SKL-0218, SKL-0217, SKL-0222]
dependencies: []
synonyms: ["how to calculate market size", "TAM SAM SOM template", "market sizing data sources", "bottom-up market estimation", "how to validate market size", "defensible market sizing"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/metabase/metabase"
difficulty: intermediate
owner: "cortex"
pillar: "market-research"
---

# Pattern: Market Size Estimation

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0116 |
| **Name** | Market Size Estimation |
| **Category** | Patterns |
| **Complexity** | Intermediate |

## Core Concepts

Market size estimation is the structured process of calculating how large a market opportunity is. This pattern provides the concrete calculation methods and data sources to make SKL-0218 (Market Sizing concepts) operational. Metabase illustrates the estimation challenge: the "business intelligence" market is massive ($25B+), but Metabase's actual addressable market is a fraction of that, limited to organizations wanting open-source, self-serve analytics.

### Step-by-Step Top-Down Calculation

**Input**: Industry report data for the category.

1. Start with the total category market size from a credible source (e.g., "Global BI market: $27B in 2025" from Gartner).
2. Apply geographic filter: if you only serve North America, multiply by the region's share (e.g., 40% = $10.8B).
3. Apply segment filter: if you target SMB/mid-market only, estimate their share (e.g., 30% = $3.24B).
4. Apply pricing model filter: if your price point serves a subset (open-source/self-serve vs. enterprise), estimate capture rate (e.g., 15% = $486M).
5. **Result**: TAM = $27B, SAM = $3.24B, SOM pursuit range = $486M.

Document every assumption and its source. Each filter should have a citation or clear rationale.

### Step-by-Step Bottom-Up Calculation

**Input**: Your product's unit economics and addressable customer count.

1. Count potential customers: "There are 6.2M companies with 10-500 employees in North America" (Census Bureau).
2. Filter for technology fit: "Approximately 35% use SQL databases we integrate with" = 2.17M.
3. Filter for awareness/reachability: "We can reach roughly 5% through our channels" = 108K.
4. Apply conversion rate: "2% trial-to-paid conversion" = 2,160 paying customers.
5. Multiply by ARPC: "Average $500/month = $6,000/year" = $12.96M annual revenue.
6. **Result**: SOM = $12.96M/year achievable revenue.

### Triangulation Method

Run both calculations and compare:

| Metric | Top-Down | Bottom-Up | Gap Analysis |
|--------|----------|-----------|-------------|
| TAM | $27B | N/A | Starting point |
| SAM | $3.24B | N/A | Filtered by segment |
| SOM | $486M | $12.96M | 37x gap |

A gap between top-down and bottom-up SOM is normal and expected. The gap tells you how much room there is between what the market could support and what you can realistically capture. Explain the gap:
- "Top-down SOM assumes perfect distribution; our bottom-up reflects current channel reach."
- "Closing the gap requires expanding to 3 new channels and doubling conversion rate."

### Data Sources Ranked by Reliability

| Source | Reliability | Cost | Best For |
|--------|-----------|------|----------|
| Government statistics (Census, BLS) | High | Free | Customer counts, industry sizes |
| Gartner, IDC reports | High | $$$$ | Enterprise market sizing, growth rates |
| Statista | Medium | $$ | Broad statistics, quick estimates |
| BuiltWith, SimilarTech | Medium | $-$$ | Technology adoption counts |
| Crunchbase, PitchBook | Medium | $$-$$$ | Funding data, company counts |
| GitHub/npm/PyPI stats | Medium | Free | Developer tool adoption |
| Google Trends | Low-Medium | Free | Relative demand over time |
| Competitor claimed metrics | Low | Free | Directional only, verify independently |

### Validation Checklist

Before presenting market sizing, verify:
- [ ] TAM is sourced from at least one credible industry report
- [ ] SAM filters are documented with clear rationale
- [ ] SOM is calculated using bottom-up unit economics
- [ ] Growth rate is included (CAGR for the category)
- [ ] At least two independent data sources support the core numbers
- [ ] Assumptions are listed separately and can be challenged
- [ ] Comparable company revenue validates the plausibility (if Company X does $100M in this market, your $13M SOM is believable)

### Common Mistakes

- Presenting TAM as your opportunity (investors see through this immediately).
- Using a single data source without cross-referencing.
- Forgetting to account for non-consumption (customers solving the problem with spreadsheets or manual processes).
- Static sizing without growth rate or trajectory.
- Mixing revenue and transaction volume metrics in the same estimate.

## Key Takeaways

- Always run both top-down and bottom-up calculations and explain the gap between them
- Document every assumption with its source for defensibility
- Government statistics and industry reports are the most reliable sizing sources
- The gap between top-down and bottom-up SOM reveals your growth opportunity
- Validate plausibility by comparing against known competitor revenue in the same market
