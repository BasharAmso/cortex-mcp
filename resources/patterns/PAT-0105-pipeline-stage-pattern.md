---
id: PAT-0105
name: Pipeline Stage Pattern
category: patterns
tags: [pipeline-stages, deal-progression, stage-gates, probability-weights, sales-process, workflow-automation]
capabilities: [stage-design, probability-modeling, stage-gate-enforcement, pipeline-workflow]
useWhen:
  - designing pipeline stages for a CRM or project tracker
  - configuring stage probabilities and win rates
  - implementing stage gate validation rules
  - building kanban-style pipeline views
  - enforcing data quality at stage transitions
estimatedTokens: 650
relatedFragments: [SKL-0199, PAT-0104, SKL-0203]
dependencies: []
synonyms: ["how to design pipeline stages", "what stages should my pipeline have", "how to set stage probabilities", "how to enforce stage requirements", "how to build a kanban pipeline", "pipeline stage best practices"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/twentyhq/twenty"
difficulty: beginner
owner: "cortex"
pillar: "sales"
---

# Pipeline Stage Pattern

Pipeline stages model the progression of a deal from first touch to closed revenue. Each stage represents a discrete milestone in the buyer's journey with defined entry criteria, probability weight, and required data. This pattern prevents the "optimism pipeline" where deals sit in advanced stages without evidence.

## Stage Definition Schema

```typescript
interface PipelineStage {
  id: string;
  name: string;
  order: number;           // Position in the pipeline (1-based)
  probability: number;     // 0-100, default win likelihood
  color: string;           // Kanban column color
  requiredFields: string[];// Fields that must be filled to enter this stage
  maxAge: number;          // Days before deal is flagged as stale
  isTerminal: boolean;     // true for Closed Won / Closed Lost
}
```

## Standard B2B Pipeline

| Order | Stage | Probability | Required Fields | Max Age |
|-------|-------|------------|-----------------|---------|
| 1 | Prospecting | 10% | contact, company | 14 days |
| 2 | Qualification | 20% | budget_confirmed, decision_maker | 21 days |
| 3 | Discovery | 40% | needs_documented, stakeholder_map | 30 days |
| 4 | Proposal | 60% | proposal_sent_date, amount | 21 days |
| 5 | Negotiation | 80% | terms_discussed, legal_review | 30 days |
| 6 | Closed Won | 100% | signed_date, contract_value | -- |
| 7 | Closed Lost | 0% | loss_reason | -- |

## Stage Gate Enforcement

When a rep drags a deal to a new stage, validate that required fields are populated before allowing the transition:

```typescript
function validateStageTransition(
  deal: Deal,
  targetStage: PipelineStage
): ValidationResult {
  const missingFields = targetStage.requiredFields.filter(
    field => !deal[field] || deal[field] === ''
  );

  if (missingFields.length > 0) {
    return {
      allowed: false,
      message: `Cannot move to ${targetStage.name}. Missing: ${missingFields.join(', ')}`
    };
  }

  // Prevent skipping stages (optional)
  if (targetStage.order > deal.currentStage.order + 1) {
    return {
      allowed: false,
      message: `Cannot skip stages. Next stage is ${getNextStage(deal).name}`
    };
  }

  return { allowed: true };
}
```

## Probability Calibration

Default probabilities should be calibrated against historical data quarterly:

```sql
-- Calculate actual conversion rate per stage
SELECT
  stage_name,
  COUNT(*) as deals_entered,
  SUM(CASE WHEN final_status = 'won' THEN 1 ELSE 0 END) as deals_won,
  ROUND(100.0 * SUM(CASE WHEN final_status = 'won' THEN 1 ELSE 0 END) / COUNT(*), 1) as actual_probability
FROM deal_stage_history
WHERE entered_at > NOW() - INTERVAL '6 months'
GROUP BY stage_name
ORDER BY stage_order;
```

Update stage probabilities with actual data. If your Proposal stage shows 45% historical conversion but is set to 60%, your forecasts are systematically optimistic.

## Backward Movement Rules

Deals sometimes regress. Handle this explicitly:

- **Allow backward movement** but require a reason (stored as an activity note).
- **Reset stage timer** when a deal moves backward so stale-deal alerts recalculate.
- **Log stage changes** in a history table for velocity analysis.

```sql
CREATE TABLE deal_stage_history (
  id UUID PRIMARY KEY,
  deal_id UUID REFERENCES opportunities(id),
  from_stage_id UUID,
  to_stage_id UUID,
  changed_by UUID REFERENCES users(id),
  reason TEXT,
  changed_at TIMESTAMP DEFAULT NOW()
);
```

## Kanban Implementation

In Twenty's UI, pipeline stages render as kanban columns:

- Each column header shows stage name + total deal value.
- Cards display deal name, amount, close date, and owner avatar.
- Drag-and-drop triggers stage gate validation before committing the move.
- Column ordering matches the `order` field in the stage definition.

## Key Takeaways

- Every stage needs defined entry criteria (required fields) to prevent optimistic staging.
- Calibrate probability weights quarterly using actual conversion data, not assumptions.
- Log all stage transitions in a history table for velocity and regression analysis.
- Support backward movement with mandatory reason capture.
- Enforce stage gates at the UI level so reps cannot skip required data collection.
