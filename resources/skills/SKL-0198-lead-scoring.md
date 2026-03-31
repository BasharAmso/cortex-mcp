---
id: SKL-0198
name: Lead Scoring
category: skills
tags: [lead-scoring, lead-qualification, sales-automation, scoring-models, lead-prioritization, conversion-optimization]
capabilities: [lead-score-design, qualification-automation, scoring-model-implementation, lead-prioritization]
useWhen:
  - building a lead scoring system for a sales team
  - prioritizing leads based on engagement and fit
  - automating lead qualification in a CRM or marketing platform
  - designing scoring rules for inbound or outbound leads
  - integrating behavioral and demographic scoring
estimatedTokens: 650
relatedFragments: [PAT-0106, SKL-0197, SKL-0199]
dependencies: []
synonyms: ["how to score leads", "how to prioritize sales leads", "what is lead scoring", "how to qualify leads automatically", "best way to rank prospects", "building a lead scoring model"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/erxes/erxes"
difficulty: intermediate
owner: "cortex"
pillar: "sales"
---

# Skill: Lead Scoring

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0198 |
| **Name** | Lead Scoring |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Lead scoring assigns numerical values to prospects based on how likely they are to buy. Platforms like erxes implement this through a combination of **demographic fit** (who they are) and **behavioral signals** (what they do). The goal is to surface the hottest leads so sales reps spend time on prospects most likely to convert.

### Two Dimensions of Scoring

1. **Fit Score (Demographic/Firmographic):** How well the lead matches your ideal customer profile (ICP). Factors include job title, company size, industry, geography, and budget authority.
2. **Engagement Score (Behavioral):** How actively the lead interacts with your product or content. Factors include email opens, website visits, content downloads, demo requests, and form submissions.

The total lead score is typically a weighted combination of both dimensions.

### Scoring Model Design

```
Lead Score = (Fit Weight x Fit Score) + (Engagement Weight x Engagement Score)
```

**Fit scoring rules (examples):**
| Attribute | Condition | Points |
|-----------|-----------|--------|
| Job title | VP or C-level | +25 |
| Company size | 50-500 employees | +20 |
| Industry | Target vertical | +15 |
| Geography | Serviceable region | +10 |

**Engagement scoring rules (examples):**
| Action | Points | Decay |
|--------|--------|-------|
| Visited pricing page | +20 | 30 days |
| Opened email | +5 | 14 days |
| Downloaded whitepaper | +15 | 30 days |
| Attended webinar | +25 | 60 days |
| No activity 30 days | -10 | -- |

### Score Decay

Engagement scores should decay over time. A lead who visited your pricing page 6 months ago is not as hot as one who visited yesterday. Implement time-based decay that reduces behavioral points after a set window.

### Threshold-Based Actions

Define score thresholds that trigger workflow actions:

- **0-30 (Cold):** Nurture via automated email sequences.
- **31-60 (Warm):** Alert sales for manual review.
- **61-80 (Hot):** Auto-assign to sales rep, create opportunity.
- **81-100 (Sales-Ready):** Priority notification, schedule demo.

### Implementation Pattern

In erxes and similar platforms, scoring is implemented as a plugin that:
1. Listens to contact and activity events via message queue.
2. Evaluates rules against the event payload.
3. Updates the contact's score field.
4. Triggers segment membership changes when thresholds are crossed.

## Key Takeaways

- Score on two axes: demographic fit (who) and behavioral engagement (what they do).
- Apply score decay so stale engagement does not inflate lead quality.
- Define clear thresholds that trigger specific sales actions (nurture, review, assign, prioritize).
- Recalibrate scoring weights quarterly by comparing scores against actual conversion data.
- Start simple with 5-10 rules; complexity should grow from observed patterns, not assumptions.
