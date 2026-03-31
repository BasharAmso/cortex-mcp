---
id: PAT-0106
name: Lead Qualification Framework
category: patterns
tags: [lead-qualification, BANT, MEDDIC, scoring-algorithms, sales-methodology, qualification-criteria]
capabilities: [qualification-framework-design, scoring-algorithm-implementation, lead-routing, qualification-automation]
useWhen:
  - implementing a lead qualification system
  - choosing between BANT and MEDDIC frameworks
  - building scoring algorithms for lead quality
  - automating lead routing based on qualification
  - training sales teams on qualification criteria
estimatedTokens: 650
relatedFragments: [SKL-0198, SKL-0197, PAT-0104]
dependencies: []
synonyms: ["how to qualify sales leads", "what is BANT", "what is MEDDIC", "how to build a qualification framework", "how to score lead quality", "lead qualification best practices"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/erxes/erxes"
difficulty: beginner
owner: "cortex"
pillar: "sales"
---

# Lead Qualification Framework

Lead qualification determines whether a prospect is worth pursuing before investing significant sales effort. Two dominant frameworks exist: BANT (simple, fast) and MEDDIC (thorough, complex-sale). Choose based on your sales cycle length and deal complexity.

## BANT Framework

BANT qualifies on four dimensions. A lead must meet at least 3 of 4 to be considered qualified.

| Dimension | Question to Answer | Qualified Signal |
|-----------|-------------------|-----------------|
| **Budget** | Can they afford the solution? | Stated budget range matches your pricing |
| **Authority** | Are you talking to the decision maker? | Contact is VP+ or confirmed economic buyer |
| **Need** | Do they have the problem you solve? | Described specific pain points matching your solution |
| **Timeline** | When do they need a solution? | Active buying window (next 1-3 months) |

**Best for:** Transactional sales, SMB deals, shorter sales cycles (< 30 days).

## MEDDIC Framework

MEDDIC is designed for enterprise, complex sales where multiple stakeholders and long evaluation cycles are the norm.

| Dimension | Definition | Evidence Required |
|-----------|-----------|-------------------|
| **Metrics** | Quantifiable impact of solving the problem | "We lose $200K/year to manual processes" |
| **Economic Buyer** | Person with budget authority | Identified by name and confirmed |
| **Decision Criteria** | How they will evaluate solutions | Written list of requirements |
| **Decision Process** | Steps and timeline to purchase | Mapped buying process with dates |
| **Identify Pain** | The specific problem driving urgency | Stated pain tied to business impact |
| **Champion** | Internal advocate pushing for your solution | Named contact who is actively selling internally |

**Best for:** Enterprise sales, deals > $50K, sales cycles > 60 days.

## Scoring Algorithm

Translate qualification frameworks into numerical scores for automation. In erxes-style platforms, this maps to contact properties and automated segments:

```typescript
interface QualificationScore {
  framework: 'BANT' | 'MEDDIC';
  dimensions: Record<string, {
    score: number;      // 0-25 per dimension (BANT) or 0-16 (MEDDIC)
    evidence: string;   // What confirmed this score
    confirmedAt: Date;
  }>;
  totalScore: number;
  qualificationLevel: 'unqualified' | 'partially' | 'qualified' | 'highly-qualified';
}

function calculateBANTScore(lead: Lead): QualificationScore {
  const dimensions = {
    budget: scoreBudget(lead),       // 0-25
    authority: scoreAuthority(lead), // 0-25
    need: scoreNeed(lead),           // 0-25
    timeline: scoreTimeline(lead),   // 0-25
  };

  const total = Object.values(dimensions)
    .reduce((sum, d) => sum + d.score, 0);

  return {
    framework: 'BANT',
    dimensions,
    totalScore: total,
    qualificationLevel:
      total >= 80 ? 'highly-qualified' :
      total >= 60 ? 'qualified' :
      total >= 40 ? 'partially' : 'unqualified'
  };
}
```

## Qualification-Based Routing

Qualification scores drive automated lead routing:

| Score Range | Level | Action |
|------------|-------|--------|
| 0-39 | Unqualified | Stay in marketing nurture sequence |
| 40-59 | Partially Qualified | SDR follow-up to complete qualification |
| 60-79 | Qualified | Route to account executive |
| 80-100 | Highly Qualified | Priority assignment + manager notification |

## Discovery Questions by Framework

**BANT discovery call (15 minutes):**
1. "What budget have you allocated for solving this?" (Budget)
2. "Who else is involved in this decision?" (Authority)
3. "Walk me through the problem you are trying to solve." (Need)
4. "When do you need this in place?" (Timeline)

**MEDDIC discovery call (30-45 minutes):**
1. "What would solving this problem mean in dollars or time saved?" (Metrics)
2. "Who signs off on purchases of this size?" (Economic Buyer)
3. "What criteria will you use to compare solutions?" (Decision Criteria)
4. "Walk me through your typical buying process." (Decision Process)
5. "What happens if this problem is not solved this quarter?" (Identify Pain)
6. "Who on your team is championing this initiative?" (Champion)

## Key Takeaways

- Use BANT for SMB/transactional sales and MEDDIC for enterprise/complex deals.
- A lead should meet at least 3 of 4 BANT dimensions or 5 of 6 MEDDIC dimensions to be considered qualified.
- Translate qualitative frameworks into numerical scores for automation and routing.
- Qualification is not a one-time event; re-evaluate as new information surfaces during the sales cycle.
- Every qualification dimension needs evidence, not assumptions; "I think they have budget" is not qualified.
