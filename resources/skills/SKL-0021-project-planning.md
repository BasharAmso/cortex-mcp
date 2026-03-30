---
id: SKL-0021
name: Project Planning
category: skills
tags: [planning, sprint, status, estimation, risk]
capabilities: [sprint-planning, status-tracking, task-estimation, risk-assessment, stakeholder-updates]
useWhen:
  - planning a new project or sprint
  - checking project status or identifying blockers
  - writing a stakeholder status update
  - re-prioritizing tasks after scope changes
estimatedTokens: 650
relatedFragments: [SKL-0001, SKL-0023, AGT-0003]
dependencies: []
synonyms: ["plan my project", "what should I work on next", "organize my tasks into a sprint", "give me a status update", "help me prioritize"]
lastUpdated: "2026-03-29"
difficulty: beginner
---

# Project Planning

Turn a pile of tasks into an ordered, trackable plan and keep it honest as work progresses.

## Planning Modes

| Mode | Trigger | Output |
|------|---------|--------|
| New project plan | PRD just created | Full sprint plan from scratch |
| Sprint planning | New cycle start | Next sprint tasks + estimates |
| Status check | "Are we on track?" | Progress summary + risk update |
| Stakeholder update | "Write a status update" | Plain-language summary |
| Re-prioritization | Scope change or falling behind | Revised task order + impact assessment |

## Procedure

### 1. Read Existing State

Before planning anything, read what exists: active tasks, completed work, blockers, decisions, and any existing plan.

### 2. Build or Update the Plan

- **New project:** Define goal, milestones, current sprint tasks with owner/estimate/status, backlog, risks, and assumptions
- **Status check:** Overall status (on track/at risk/behind), completed items, blockers, updated risks, next actions
- **Stakeholder update:** Plain language. What is done, what is next, what decisions are needed.

### 3. Estimate Tasks

- Break tasks longer than 2 days into subtasks
- Express as ranges: "1-2 days" not "1.5 days"
- Flag high uncertainty (greater than 3x range) as a risk

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
- Never commit to exact dates. Always ranges with assumptions.
- Never bury risks. Surface early and explicitly.
