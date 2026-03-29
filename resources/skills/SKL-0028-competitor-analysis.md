---
id: SKL-0028
name: Competitor Analysis
category: skills
tags: [product, marketing, research, competitive-landscape]
capabilities: [competitor-research, feature-comparison, gap-analysis, differentiation-strategy]
useWhen:
  - researching the competitive landscape before building
  - comparing features, pricing, and positioning across competitors
  - identifying market gaps and differentiation opportunities
  - informing PRD or pitch deck with competitive intelligence
estimatedTokens: 600
relatedFragments: [SKL-0001, SKL-0025, SKL-0032]
dependencies: []
---

# Competitor Analysis

Understand the competitive landscape before committing to a product direction. Produces structured analysis that feeds into PRD Writing and Problem Stress Test.

## Procedure

### 1. Identify Competitors

- **Direct competitors:** Same problem, same audience, same approach
- **Indirect competitors:** Same problem, different approach (workarounds, manual processes)
- **Aspirational references:** Products whose quality or UX you want to match

Aim for 3-5 direct + 2-3 indirect.

### 2. Research Each Competitor

For each, gather:

| Dimension | What to Find |
|-----------|-------------|
| Product | Core features, unique capabilities, platform |
| Pricing | Free tier, price points, per-seat vs flat |
| Positioning | How they describe themselves, what problem they claim to solve |
| Audience | Who are their customers (check testimonials, case studies) |
| Strengths | What users praise (reviews, social media, Product Hunt) |
| Weaknesses | What users complain about (1-star reviews, forum posts) |
| Traction | App store ratings, social followers, funding signals |

### 3. Build Comparison Matrix

Create a table comparing your product against each competitor across: core value prop, key differentiator, price point, target audience, biggest strength, biggest weakness.

### 4. Identify Gaps and Opportunities

Look for underserved segments, feature gaps, price gaps, UX gaps, and unclaimed positioning narratives.

### 5. Define Differentiation Strategy

- **Primary differentiator:** The one defensible reason to choose your product
- **Supporting differentiators:** 2-3 secondary advantages
- **Parity features:** Table stakes you must match
- **Deliberate omissions:** What competitors do that you intentionally will not

## Output

Save to `docs/COMPETITOR_ANALYSIS.md`. Log key findings in research notes.

## Key Rules

- Never fabricate competitor data. Mark unverifiable information clearly.
- Never disparage competitors. Focus on factual observations.
- Differentiation must be based on real gaps, not wishful thinking.
