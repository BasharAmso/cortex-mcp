---
id: SKL-0199
name: Sales Pipeline Management
category: skills
tags: [sales-pipeline, deal-tracking, forecasting, pipeline-stages, revenue-management, sales-process]
capabilities: [pipeline-design, deal-tracking, sales-forecasting, stage-management]
useWhen:
  - building or configuring a sales pipeline
  - designing deal tracking features in a CRM
  - setting up pipeline stages and win probabilities
  - creating sales forecasting dashboards
  - improving pipeline visibility for a sales team
estimatedTokens: 650
relatedFragments: [PAT-0105, SKL-0197, SKL-0203, EX-0025]
dependencies: []
synonyms: ["how to manage a sales pipeline", "how to track deals", "what are pipeline stages", "how to forecast sales", "best way to organize sales deals", "how to build a deal tracker"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/twentyhq/twenty"
difficulty: beginner
owner: "cortex"
pillar: "sales"
---

# Skill: Sales Pipeline Management

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0199 |
| **Name** | Sales Pipeline Management |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

A sales pipeline is a visual representation of where every deal sits in your sales process. CRMs like Twenty use kanban boards where deals move through columns representing stages. The pipeline gives sales leaders two things: **visibility** (where is every deal right now?) and **predictability** (how much revenue will close this quarter?).

### Standard Pipeline Stages

Most B2B pipelines follow a variation of these stages:

| Stage | Purpose | Typical Probability |
|-------|---------|-------------------|
| **Prospecting** | Initial outreach, no response yet | 10% |
| **Qualification** | Confirmed fit and interest | 20% |
| **Discovery** | Needs analysis, stakeholder mapping | 40% |
| **Proposal** | Pricing/solution presented | 60% |
| **Negotiation** | Terms being finalized | 80% |
| **Closed Won** | Deal signed | 100% |
| **Closed Lost** | Deal dead | 0% |

### Pipeline Metrics That Matter

Track these to measure pipeline health:

- **Pipeline Value:** Total dollar value of all open deals. Should be 3-4x your quota target.
- **Stage Conversion Rate:** Percentage of deals that advance from one stage to the next. Identifies where deals get stuck.
- **Average Deal Size:** Helps with resource allocation and forecasting accuracy.
- **Sales Velocity:** `(Number of Deals x Avg Deal Size x Win Rate) / Avg Sales Cycle Length`. The single best measure of pipeline efficiency.
- **Pipeline Coverage Ratio:** Total pipeline value divided by quota. Below 3x signals trouble.

### Deal Record Essentials

Every deal in the pipeline should track:

1. **Amount:** Expected revenue.
2. **Close Date:** When the deal is expected to close.
3. **Stage:** Current pipeline position.
4. **Owner:** Assigned sales rep.
5. **Next Action:** The specific next step (call, send proposal, schedule demo).
6. **Contacts:** Key stakeholders involved in the decision.

### Pipeline Hygiene

Stale pipelines produce bad forecasts. Enforce these rules:

- Deals with no activity for 30+ days get flagged for review.
- Close dates in the past must be updated or the deal moved to Closed Lost.
- Require a "next action" on every open deal.
- Weekly pipeline review meetings where reps justify stage placement.

### Implementation in CRM

In Twenty, pipeline management is implemented through:
- **Kanban view** on the Opportunity object, grouped by stage.
- **Custom fields** for amount, close date, and probability.
- **Filters** for "My deals," "Closing this month," "Stale deals."
- **Workflow triggers** for stage-change notifications and automated reminders.

## Key Takeaways

- A pipeline is only useful if it reflects reality; enforce regular hygiene reviews.
- Track sales velocity as your north-star pipeline metric.
- Maintain 3-4x pipeline coverage ratio relative to quota.
- Every deal needs an owner, a next action, and an up-to-date close date.
- Kanban views make pipeline stages intuitive; table views help with bulk data operations.
