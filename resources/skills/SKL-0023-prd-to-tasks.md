---
id: SKL-0023
name: PRD to Tasks
category: skills
tags: [planning, tasks, prd, breakdown, prioritization]
capabilities: [task-decomposition, priority-assignment, skill-mapping, phase-grouping]
useWhen:
  - converting a PRD or GDD into an executable task queue
  - breaking down requirements into buildable work items
  - creating a phased task plan from an architecture document
estimatedTokens: 600
relatedFragments: [SKL-0001, SKL-0021, SKL-0024]
dependencies: []
synonyms: ["break my PRD into tasks", "turn requirements into work items", "what do I build first", "create a task list from my spec", "split this plan into steps"]
lastUpdated: "2026-03-29"
difficulty: beginner
---

# PRD to Tasks

Convert a completed PRD (or GDD) into a concrete, ordered, beginner-friendly task queue.

## Procedure

### 1. Extract Key Information

From the PRD (or GDD for game projects), extract:

- **Core goal** from Overview or Goals
- **Target user** from Target Users section
- **MVP scope** as individual features
- **Non-goals** to avoid generating tasks for excluded items
- **Risks and assumptions** for awareness

### 2. Generate 8-15 Tasks

Follow these rules:

- **Beginner-friendly titles** using short, plain language ("Build login screen" not "Implement authentication UI component with OAuth flow")
- **Name the target file or folder** for each task
- **Priority tagging** as High, Medium, or Low
- **Logical order** following a natural build sequence: planning/design first, core features next, polish/testing last
- **No tasks for non-goals**
- **Skill assignment** by cross-referencing the skill registry

### 3. Phase Grouping (If Architecture Exists)

When an architecture document exists, group tasks into phases:

| Phase | Contains |
|-------|----------|
| Foundation | Project setup, config, tooling |
| Core | Data model, auth, core APIs |
| Features | User-facing functionality, UI |
| Integration | Third-party APIs, webhooks |
| Quality | Testing, code review, polish |
| Ship | Deployment, documentation, launch |

Tasks are numbered sequentially across phases. Empty phases are omitted.

### 4. Handle Open Questions

If any requirements are ambiguous or underspecified, log them as open questions rather than guessing.

### 5. Write to Project State

- If task queue is empty, populate it with the generated tasks
- If tasks already exist, append as a "Proposed Task Queue" for manual review

## Key Rules

- Never generate tasks for items listed in Non-Goals
- Always assign skill IDs when a matching skill exists
- Each task must have a plain-language title, target location, priority, and skill ID
