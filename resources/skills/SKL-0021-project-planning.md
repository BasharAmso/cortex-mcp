---
id: SKL-0021
name: Project Planning
category: skills
tags: [planning, sprint, status, estimation, risk, stakeholder-management, prioritization, roadmap]
capabilities: [sprint-planning, status-tracking, task-estimation, risk-assessment, stakeholder-updates]
useWhen:
  - planning a new project or sprint
  - checking project status or identifying blockers
  - writing a stakeholder status update
  - re-prioritizing tasks after scope changes
  - estimating effort for a set of tasks
estimatedTokens: 650
relatedFragments: [SKL-0001, SKL-0023, AGT-0003]
dependencies: []
synonyms: ["plan my project", "what should I work on next", "organize my tasks into a sprint", "give me a status update", "help me prioritize"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/deanpeters/Product-Manager-Skills"
difficulty: beginner
---

# Project Planning

Turn a pile of tasks into an ordered, trackable plan and keep it honest as work progresses. Grounded in professional PM frameworks for prioritization, estimation, and stakeholder communication.

## Planning Modes

| Mode | Trigger | Output |
|------|---------|--------|
| New project plan | PRD just created | Full sprint plan from scratch |
| Sprint planning | New cycle start | Next sprint tasks + estimates |
| Status check | "Are we on track?" | Progress summary + risk update |
| Stakeholder update | "Write a status update" | Plain-language summary for non-technical audience |
| Re-prioritization | Scope change or falling behind | Revised task order + impact assessment |

## Prioritization Frameworks

Choose the right framework for the situation:

| Framework | Best When | How It Works |
|-----------|-----------|-------------|
| MoSCoW | Scope negotiation | Must/Should/Could/Won't categories |
| RICE | Comparing many features | Reach x Impact x Confidence / Effort |
| Value vs. Effort | Quick triage | 2x2 matrix, do high-value/low-effort first |
| ICE | Early stage, limited data | Impact x Confidence x Ease, scored 1-10 |

## Procedure

### 1. Read Existing State

Before planning anything, read what exists: active tasks, completed work, blockers, decisions, and any existing plan. Never plan in a vacuum.

### 2. Build or Update the Plan

- **New project:** Define goal, milestones, current sprint tasks with owner/estimate/status, backlog, risks, and assumptions
- **Status check:** Overall status (on track/at risk/behind), completed items, blockers, updated risks, next actions
- **Stakeholder update:** Plain language. What is done, what is next, what decisions are needed. No jargon.

### 3. Estimate Tasks

- Break tasks longer than 2 days into subtasks
- Express as ranges: "1-2 days" not "1.5 days"
- Flag high uncertainty (greater than 3x range) as a risk
- Apply a confidence multiplier: Low confidence = 2x the high estimate

### Estimation Reference

| Task Type | Typical Range |
|-----------|--------------|
| Simple UI component | 2-4 hours |
| Complex UI with state | 0.5-1 day |
| New API integration | 1-3 days |
| Auth flow | 1-2 days |
| Database schema + migrations | 0.5-1 day |
| Deployment setup | 0.5-2 days |

### 4. Surface Risks and Blockers

- Name each blocker explicitly with what is needed and who acts
- Rate risks by likelihood and impact (Low/Medium/High)
- Never soften risks to sound reassuring
- Generate escalation message if a blocker is overdue

## Key Rules

- Never produce plans more complex than the project warrants
- Never commit to exact dates. Always ranges with assumptions stated.
- Never bury risks. Surface early and explicitly.
- Plans are living documents. Update on every status check.
