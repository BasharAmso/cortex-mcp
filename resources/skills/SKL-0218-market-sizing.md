---
id: SKL-0218
name: Market Sizing (TAM/SAM/SOM)
category: skills
tags: [market-sizing, tam-sam-som, market-research, business-planning, revenue-estimation, opportunity-assessment]
capabilities: [top-down-estimation, bottom-up-estimation, market-size-validation, revenue-modeling]
useWhen:
  - estimating the revenue potential of a new product or feature
  - preparing market size slides for a pitch deck
  - validating whether a market is large enough to pursue
  - comparing market opportunities across product ideas
  - building a business case for stakeholders
estimatedTokens: 650
relatedFragments: [PAT-0116, SKL-0217, SKL-0222, EX-0032]
dependencies: []
synonyms: ["how big is my market", "how to calculate TAM SAM SOM", "market size estimation", "is this market big enough", "revenue potential analysis", "total addressable market"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/metabase/metabase"
difficulty: intermediate
owner: "cortex"
pillar: "market-research"
---

# Skill: Market Sizing (TAM/SAM/SOM)

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0218 |
| **Name** | Market Sizing (TAM/SAM/SOM) |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Market sizing answers "how big is the opportunity?" using three concentric circles: TAM (Total Addressable Market), SAM (Serviceable Addressable Market), and SOM (Serviceable Obtainable Market).

### The Three Layers

- **TAM**: Total global demand for your category if you had 100% market share and zero constraints. For business intelligence tools like Metabase, TAM includes every organization that analyzes data.
- **SAM**: The slice of TAM your product can realistically serve given your distribution model, geography, and positioning. Metabase's SAM narrows to teams wanting self-serve analytics without dedicated data engineers.
- **SOM**: The portion of SAM you can capture in 2-3 years given your current resources, brand, and go-to-market motion. This is your realistic revenue target.

### Top-Down Estimation

Start with industry reports (Gartner, IDC, Statista) and narrow:
1. Find total market revenue for the category.
2. Apply filters: geography, company size, willingness to pay.
3. Result: TAM and SAM from macro data.

**Strengths**: Fast, citable numbers. **Weaknesses**: Often inflated, hard to validate assumptions.

### Bottom-Up Estimation

Build from unit economics upward:
1. Count the number of potential customers you can reach (e.g., companies with 10-500 employees using SQL databases).
2. Multiply by realistic average revenue per customer (ARPC).
3. Apply expected conversion rates from your funnel.
4. Result: SOM grounded in operational reality.

**Strengths**: Defensible, tied to your actual business model. **Weaknesses**: Requires good assumptions about customer count and pricing.

### Triangulation

Use both methods and compare. If top-down gives $5B TAM and bottom-up gives $50M SOM, you need to explain the 100x gap with clear logic about why your SAM narrows and what share you can capture. Investors expect both approaches to tell a coherent story.

### Data Sources for Software Markets

| Source | Best For |
|--------|----------|
| Gartner, IDC, Forrester | Enterprise category sizing |
| Statista, IBISWorld | Broad industry statistics |
| BuiltWith, SimilarTech | Technology adoption counts |
| Crunchbase, PitchBook | Funding activity as demand signal |
| GitHub stars, npm downloads | Developer tool adoption proxy |
| Census/BLS data | SMB counts by industry and size |

### Common Pitfalls

- Confusing TAM with SAM (claiming "it's a $50B market" when your SAM is $200M).
- Using only top-down data without grounding in bottom-up reality.
- Ignoring substitute products and non-consumption as competition.
- Static snapshots without growth rate projections.

## Key Takeaways

- Always present all three layers: TAM, SAM, and SOM
- Bottom-up estimation is more credible than top-down for early-stage products
- Triangulate: if top-down and bottom-up tell different stories, investigate why
- Growth rate matters as much as current size: a small but fast-growing market can be more attractive
- Update market sizing annually as the category evolves
