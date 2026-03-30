---
id: SKL-0001
name: Plan From Idea
category: skills
tags: [planning, ideation, prd, kickoff, discovery, opportunity-assessment, validation]
capabilities: [idea-to-plan, prd-stub-creation, initial-task-generation, project-kickoff, opportunity-framing]
useWhen:
  - turning a rough idea into a structured project plan
  - creating an initial PRD from a freeform description
  - bootstrapping a task queue for a new project
  - deciding whether an idea is worth pursuing before committing
estimatedTokens: 400
relatedFragments: [SKL-0004, SKL-0003, SKL-0027]
dependencies: []
synonyms: ["I have an idea for an app", "turn my idea into a plan", "where do I start with this project", "help me go from idea to building", "kick off a new project"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/deanpeters/Product-Manager-Skills"
difficulty: beginner
owner: orchestrator
---

# Skill: Plan From Idea

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0001 |
| **Version** | 1.0 |
| **Owner** | Orchestrator |
| **Inputs** | Idea description (from event or user input) |
| **Outputs** | PRD stub (`docs/PRD.md` or equivalent), initial task queue items |
| **Triggers** | `IDEA_CAPTURED` |

---

## Purpose

Turn a rough idea into a structured plan. This skill takes a freeform idea description and produces:
1. A short PRD (Product Requirements Document) stub.
2. An initial set of tasks added to the Next Task Queue in STATE.md.

---

## Procedure

1. **Read the idea** from the event description or user input.
2. **Create a PRD stub** at `docs/PRD.md` (or the project's preferred location) with:
   - Project name
   - One-sentence summary
   - Target audience
   - Core features (3-5 bullet points)
   - Out of scope (2-3 items)
   - Success criteria
3. **Generate 3-5 initial tasks** based on the PRD and add them to the Next Task Queue in `STATE.md`. Use the canonical task format from `.claude/project/knowledge/TASK-FORMAT.md`: `| # | Task | Priority | Skill |`. Assign Skill IDs by cross-referencing `REGISTRY.md` (use `—` if no skill clearly applies).
4. **Log a decision** in `DECISIONS.md` noting the project direction chosen.
5. **Update STATE.md** with outputs produced and files modified.

---

## Primary Agent

Orchestrator (dispatches to product-manager for PRD work via SKL-0004)

## Review

None required for v1. The user reviews the PRD and task queue after execution.

---

## Definition of Done

- [ ] PRD stub exists at `docs/PRD.md` (or equivalent project brief)
- [ ] At least 3 tasks are added to the Next Task Queue
- [ ] STATE.md is updated with outputs and files modified
- [ ] Decision logged in DECISIONS.md
