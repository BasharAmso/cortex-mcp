---
id: EX-0025
name: CRM Lead Pipeline
category: examples
tags: [crm, lead, pipeline, sales, deal, stage, typescript, database]
capabilities: [lead-management, pipeline-tracking, deal-progression]
useWhen:
  - building a CRM with lead tracking and pipeline stages
  - implementing deal progression with stage transitions
  - designing a sales pipeline data model
estimatedTokens: 600
relatedFragments: [SKL-0197, SKL-0199, PAT-0104, PAT-0105, SKL-0198]
dependencies: []
synonyms: ["crm example", "sales pipeline", "lead tracking system", "deal management", "sales funnel implementation"]
sourceUrl: "https://github.com/twentyhq/twenty"
lastUpdated: "2026-04-01"
difficulty: intermediate
owner: builder
pillar: "sales"
---

# CRM Lead Pipeline

A lead pipeline with stage transitions, activity logging, and conversion tracking.

## Implementation

```typescript
// --- Data Model ---
type LeadStage = 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  stage: LeadStage;
  value: number;          // deal value in cents
  score: number;          // 0-100 lead score
  assignedTo: string;
  source: string;         // 'website' | 'referral' | 'cold-outreach' | etc.
  activities: Activity[];
  createdAt: Date;
  updatedAt: Date;
  stageHistory: StageChange[];
}

interface Activity {
  id: string;
  type: 'email' | 'call' | 'meeting' | 'note';
  description: string;
  createdAt: Date;
  createdBy: string;
}

interface StageChange {
  from: LeadStage;
  to: LeadStage;
  changedAt: Date;
  changedBy: string;
  reason?: string;
}

// --- Valid Transitions (enforce pipeline rules) ---
const VALID_TRANSITIONS: Record<LeadStage, LeadStage[]> = {
  new: ['contacted', 'lost'],
  contacted: ['qualified', 'lost'],
  qualified: ['proposal', 'lost'],
  proposal: ['negotiation', 'lost'],
  negotiation: ['won', 'lost', 'proposal'], // can go back to proposal
  won: [],
  lost: ['new'], // can reopen
};

function advanceStage(lead: Lead, newStage: LeadStage, userId: string, reason?: string): Lead {
  const allowed = VALID_TRANSITIONS[lead.stage];
  if (!allowed.includes(newStage)) {
    throw new Error(`Cannot move from ${lead.stage} to ${newStage}`);
  }

  return {
    ...lead,
    stage: newStage,
    updatedAt: new Date(),
    stageHistory: [
      ...lead.stageHistory,
      { from: lead.stage, to: newStage, changedAt: new Date(), changedBy: userId, reason },
    ],
  };
}

// --- Pipeline Analytics ---
interface PipelineMetrics {
  byStage: Record<LeadStage, { count: number; totalValue: number }>;
  conversionRate: number;    // won / (won + lost)
  avgDaysToClose: number;
  totalPipelineValue: number;
}

function computeMetrics(leads: Lead[]): PipelineMetrics {
  const byStage = {} as PipelineMetrics['byStage'];
  let won = 0, lost = 0, totalDays = 0;

  for (const lead of leads) {
    if (!byStage[lead.stage]) byStage[lead.stage] = { count: 0, totalValue: 0 };
    byStage[lead.stage].count++;
    byStage[lead.stage].totalValue += lead.value;

    if (lead.stage === 'won') {
      won++;
      totalDays += (lead.updatedAt.getTime() - lead.createdAt.getTime()) / 86_400_000;
    }
    if (lead.stage === 'lost') lost++;
  }

  return {
    byStage,
    conversionRate: won + lost > 0 ? won / (won + lost) : 0,
    avgDaysToClose: won > 0 ? totalDays / won : 0,
    totalPipelineValue: leads
      .filter(l => !['won', 'lost'].includes(l.stage))
      .reduce((sum, l) => sum + l.value, 0),
  };
}
```

## Key Patterns

- **Enforced stage transitions**: `VALID_TRANSITIONS` prevents skipping stages or invalid moves
- **Stage history**: every transition is logged with who, when, and why for audit trails
- **Activity log**: all touchpoints (calls, emails, meetings) attached to the lead
- **Pipeline metrics**: conversion rate uses only closed deals (won + lost) as denominator
