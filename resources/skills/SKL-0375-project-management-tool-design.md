---
id: SKL-0375
name: Project Management Tool Design
category: skills
tags: [project-management, issues, sprints, roadmap, workflows, kanban, backlog, cycles]
capabilities: [issue-tracking, sprint-management, roadmap-planning, workflow-automation]
useWhen:
  - building a project management tool with issue tracking
  - designing sprint or cycle-based workflows
  - implementing roadmap and milestone visualization
  - creating custom workflow states and transitions
  - building a self-hosted alternative to Jira or Linear
estimatedTokens: 650
relatedFragments: [PAT-0078, PAT-0193, SKL-0152, EX-0039]
dependencies: []
synonyms: ["how to build a project tracker", "how to design an issue tracking system", "how to implement sprints and roadmaps", "how to build something like Jira", "how to create a kanban board with workflows", "how to manage project tasks programmatically"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/makeplane/plane"
difficulty: intermediate
owner: "cortex"
pillar: "collaboration"
---

# Skill: Project Management Tool Design

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0375 |
| **Name** | Project Management Tool Design |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Project management tools coordinate work across teams through issues, cycles, and roadmaps. Plane's architecture shows how to build this with a Django backend, React frontend, PostgreSQL persistence, and Redis for caching and real-time updates.

### Issue Model

The issue is the atomic unit. Each issue carries:

| Field | Type | Purpose |
|-------|------|---------|
| **Title/Description** | Rich text | What needs doing |
| **State** | Workflow enum | Backlog, Todo, In Progress, Done, Cancelled |
| **Priority** | Enum | Urgent, High, Medium, Low, None |
| **Assignees** | User[] | Who is responsible |
| **Labels** | Tag[] | Categorization |
| **Parent/Sub-issues** | Self-referential FK | Task decomposition |
| **Module/Cycle** | FK | Sprint or feature grouping |

### Workflow Engine

Define custom states with explicit transitions. Each state has a group (backlog, unstarted, started, completed, cancelled) that drives analytics regardless of custom naming. Transitions can trigger automations: auto-assign reviewer when moved to "In Review", notify channel when "Done".

### Cycles (Sprints)

Time-boxed iterations with a fixed start/end date. Issues are added to a cycle; burn-down charts track velocity. Plane calculates: scope changes, completion rate, and carry-over count per cycle. Keep cycles 1-2 weeks for predictable delivery.

### Modules (Epics)

Group related issues across cycles into modules representing features or initiatives. Modules track aggregate progress and help with roadmap visualization. Unlike cycles, modules are not time-boxed.

### Views and Filters

Saved views let team members create personalized dashboards. Filter by assignee, label, priority, state, cycle, or module. Support both list, board (kanban), spreadsheet, and Gantt chart layouts. Persist view configurations per user.

### Analytics Dashboard

Aggregate issue data into actionable metrics: cycle velocity, bug rate, scope creep percentage, and team workload distribution. Use PostgreSQL aggregation queries with Redis caching for dashboard performance.

## Key Takeaways

- Issues need a flexible state machine, not a fixed status field, to accommodate different team workflows
- Separate time-boxed cycles (sprints) from feature-scoped modules (epics) for clear planning
- Burn-down charts and velocity metrics require tracking scope changes, not just completions
- Saved views with persistent filters let each team member see what matters to them
- Rich sub-issue support enables natural task decomposition without losing the big picture
