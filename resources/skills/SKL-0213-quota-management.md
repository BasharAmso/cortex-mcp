---
id: SKL-0213
name: Quota Management
category: skills
tags: [sales, quota, attainment, forecasting, compensation, ramp]
capabilities: [quota-setting, attainment-tracking, rep-ramping, performance-analysis]
useWhen:
  - setting sales quotas for a new quarter or fiscal year
  - tracking quota attainment across the sales team
  - designing ramp schedules for newly hired reps
  - analyzing whether quotas are realistic based on historical data
  - building dashboards to visualize quota progress
estimatedTokens: 650
relatedFragments: [PAT-0111, PAT-0113, SKL-0212]
dependencies: []
synonyms: ["how do I set sales quotas", "what is the best way to track quota attainment", "ramp new sales reps", "quota planning spreadsheet", "sales target management", "fair quota distribution"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/metabase/metabase"
difficulty: intermediate
owner: "cortex"
pillar: "sales"
---

# Skill: Quota Management

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0213 |
| **Name** | Quota Management |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Quota management is the process of setting, distributing, and tracking revenue targets across a sales organization. Done well, quotas motivate reps and produce accurate forecasts. Done poorly, they cause sandbagging, attrition, and missed plans.

### Setting Quotas with Data

Metabase and similar BI tools make quota-setting data-driven rather than gut-driven. The foundational approach:

1. **Start with the company target** - Work backward from the board-level revenue plan.
2. **Apply historical conversion rates** - Use pipeline-to-close ratios, average deal sizes, and sales cycle lengths from your CRM data.
3. **Segment by territory and rep tenure** - A ramping rep in a new territory cannot carry the same number as a tenured rep in a mature market.
4. **Build in a coverage ratio** - Total assigned quota should exceed the company target by 10-20% to absorb attrition and underperformance. This is the "quota-to-plan ratio."

Query your closed-won data by rep, segment, and quarter to establish baselines. Metabase's question builder lets non-technical sales ops teams run these analyses without SQL.

### Ramp Schedules

New reps need reduced quotas during their ramp period. A common model:

| Month | Quota % | Expectation |
|-------|---------|-------------|
| 1-2 | 0% | Training, shadowing, learning product |
| 3 | 25% | First pipeline generation |
| 4 | 50% | Closing assisted deals |
| 5 | 75% | Independent selling |
| 6+ | 100% | Fully ramped |

Adjust timelines based on your sales cycle length. Enterprise reps with 6-month cycles need longer ramps than SMB reps closing in 2 weeks.

### Attainment Tracking

Build dashboards that show attainment in real time, not just at month-end. Key views:

- **Individual attainment** - Each rep's closed revenue vs. quota, with a pacing indicator (on-track, at-risk, behind).
- **Team roll-up** - Manager-level view of team attainment distribution. Healthy teams show a bell curve; unhealthy ones show bimodal (a few stars, many zeros).
- **Trending** - Week-over-week pipeline movement to catch problems early. If pipeline is flat in week 2 of the month, attainment will suffer in week 4.

### Quota Hygiene

Review quotas quarterly. Adjust for territory changes, product launches, and market shifts. Never change quotas mid-quarter without transparent communication. Track the percentage of reps hitting quota each period; if fewer than 60% hit target, quotas are likely set too high.

## Key Takeaways

- Set quotas top-down from the revenue plan but validate bottom-up against historical rep performance data.
- Ramp new reps gradually; expecting full quota from day one causes early attrition.
- Build real-time attainment dashboards with pacing indicators so problems surface early.
- Maintain a 10-20% coverage ratio so the company plan survives individual misses.
- If fewer than 60% of reps hit quota consistently, the quotas need recalibration, not the reps.
