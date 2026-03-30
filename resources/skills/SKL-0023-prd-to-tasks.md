---
id: SKL-0023
name: PRD to Tasks
category: skills
tags: [planning, tasks, prd, breakdown, prioritization, MoSCoW, dependency-mapping, sprint]
capabilities: [task-decomposition, priority-assignment, skill-mapping, phase-grouping, dependency-ordering]
useWhen:
  - converting a PRD or GDD into an executable task queue
  - breaking down requirements into buildable work items
  - creating a phased task plan from an architecture document
  - mapping dependencies between tasks to find the critical path
estimatedTokens: 600
relatedFragments: [SKL-0001, SKL-0021, SKL-0024]
dependencies: []
synonyms: ["break my PRD into tasks", "turn requirements into work items", "what do I build first", "create a task list from my spec", "split this plan into steps"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/deanpeters/Product-Manager-Skills"
difficulty: beginner
---

# PRD to Tasks

Convert a completed PRD (or GDD) into a concrete, ordered, beginner-friendly task queue. Grounded in professional PM breakdown patterns: epic decomposition, MoSCoW prioritization, and dependency-aware ordering.

## Procedure

### 1. Extract Key Information

From the PRD (or GDD for game projects), extract:

- **Core goal** from Overview or Goals
- **Target user** from Target Users section
- **MVP scope** as individual features (apply MoSCoW: Must/Should/Could/Won't)
- **Non-goals** to avoid generating tasks for excluded items
- **Risks and assumptions** for awareness
- **Acceptance criteria** to define "done" for each feature

### 2. Generate 8-15 Tasks

Follow these decomposition rules:

| Rule | Rationale |
|------|-----------|
| Beginner-friendly titles | "Build login screen" not "Implement auth UI component with OAuth flow" |
| Name the target file or folder | Makes task scope unambiguous |
| One deliverable per task | If it has "and" in the title, split it |
| 2-hour to 2-day size | Smaller = better feedback loops |
| Priority tag (High/Med/Low) | High = MVP-blocking, Medium = important, Low = nice-to-have |
| Dependency notation | Mark which tasks must complete before others can start |

### 3. Phase Grouping (If Architecture Exists)

When an architecture document exists, group tasks into phases:

| Phase | Contains | Typical % |
|-------|----------|-----------|
| Foundation | Project setup, config, tooling | 10-15% |
| Core | Data model, auth, core APIs | 25-30% |
| Features | User-facing functionality, UI | 30-35% |
| Integration | Third-party APIs, webhooks | 10-15% |
| Quality | Testing, code review, polish | 10-15% |
| Ship | Deployment, documentation, launch | 5-10% |

Tasks are numbered sequentially across phases. Empty phases are omitted.

### 4. Dependency Mapping

For each task, identify:
- **Blocked by:** Which tasks must complete first?
- **Unblocks:** Which tasks can start after this completes?
- **Parallel:** Which tasks can run concurrently?

Highlight the critical path: the longest chain of dependent tasks that determines minimum timeline.

### 5. Handle Open Questions

If any requirements are ambiguous or underspecified, log them as open questions rather than guessing. Tag affected tasks as "blocked by clarification."

### 6. Write to Project State

- If task queue is empty, populate it with the generated tasks
- If tasks already exist, append as a "Proposed Task Queue" for manual review

## Key Rules

- Never generate tasks for items listed in Non-Goals
- Always assign skill IDs when a matching skill exists
- Each task must have: plain-language title, target location, priority, skill ID, and dependencies
- The user reviews and approves the task queue before execution begins
