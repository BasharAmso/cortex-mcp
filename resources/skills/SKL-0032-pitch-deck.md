---
id: SKL-0032
name: Pitch Deck
category: skills
tags: [product, fundraising, pitch, investor, stakeholder, TAM-SAM-SOM, go-to-market, storytelling]
capabilities: [pitch-outline, market-sizing, competitive-positioning, investor-narrative, financial-modeling]
useWhen:
  - creating a pitch deck for investors or stakeholders
  - structuring a product pitch after validation and PRD
  - outlining go-to-market strategy and financial projections
  - preparing for a demo day or accelerator application
  - communicating product vision to internal leadership
estimatedTokens: 600
relatedFragments: [SKL-0025, SKL-0028, SKL-0001]
dependencies: []
synonyms: ["make a pitch deck", "I need to present to investors", "create slides for my startup", "help me pitch my product", "build an investor presentation"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/deanpeters/Product-Manager-Skills"
difficulty: intermediate
---

# Pitch Deck

Create a structured pitch deck outline for investors, stakeholders, or partners. Natural output after PRD and Problem Stress Test. Applies PM storytelling frameworks: lead with the problem, prove the market, show traction, make the ask clear.

## 12-Slide Structure

| Slide | Content | Key Principle |
|-------|---------|--------------|
| 1. Title | Product name, tagline, founder name | First impression. Tagline = problem solved in 6 words. |
| 2. Problem | Problem in user language, scale, painful workarounds | Investors must feel the pain. Use a specific story. |
| 3. Solution | One-sentence solution, 3 key features, demo screenshot | Show, don't tell. Screenshot > bullet points. |
| 4. Market Size | TAM, SAM, SOM with cited data sources | Bottom-up sizing > top-down. Show your math. |
| 5. Business Model | Revenue model, pricing, unit economics (LTV, CAC) | Prove you know how money works. |
| 6. Traction | What you have built, users/revenue, validation signals | Even pre-launch traction counts (waitlist, LOIs, pilots). |
| 7. Competition | Landscape matrix, primary differentiator | 2x2 positioning map. Never say "no competitors." |
| 8. Go-to-Market | First 100 users strategy, growth approach | Specific channels, not "social media marketing." |
| 9. Team | Founder background, key hires needed, advisors | Why this team for this problem? |
| 10. Financials | Revenue projections (3yr), key assumptions, burn rate | Label assumptions explicitly. Investors check the math. |
| 11. The Ask | Raise amount, use of funds breakdown, milestones funded | Specific allocation: "40% eng, 30% GTM, 20% ops, 10% buffer" |
| 12. Closing | Strong closing statement, contact info | Not "thank you." Restate the vision or the problem magnitude. |

## Market Sizing Framework

| Level | Definition | How to Calculate |
|-------|-----------|-----------------|
| TAM | Total addressable market | Everyone who has this problem globally |
| SAM | Serviceable addressable market | Segment you can realistically reach with current approach |
| SOM | Serviceable obtainable market | What you can capture in 1-3 years with current resources |

Always show bottom-up calculation: `number of target users x price per user x purchase frequency`

## Procedure

### 1. Gather Context

Read available documents: PRD or GDD, Problem Stress Test, Competitor Analysis, and key decisions. If minimal context exists, interview the user with targeted questions.

### 2. Build Each Slide

Write content for all 12 slides. Pull from validated sources where possible. Flag any number that is estimated vs. confirmed.

### 3. Apply Pitch Principles

- Problem and closing slides get the most screen time. Make them count.
- Lead with the problem narrative, not the solution description.
- Every claim needs evidence: data, testimonials, or demo.
- The deck must survive brutal Q&A. Anticipate the top 5 investor questions.
- One message per slide. If it needs two slides, split it.

## Output

Save to `docs/PITCH_DECK.md` as a content outline (not actual slides). Each section maps to one slide for the user's presentation tool.

## Key Rules

- Produces an outline document, not actual slide files
- Financial projections are frameworks with clearly labeled assumptions
- Never fabricate traction or metrics. If pre-launch, say so honestly.
- Market size estimates must show methodology. Flag rough numbers explicitly.
- Bottom-up sizing is required alongside any top-down estimates.
