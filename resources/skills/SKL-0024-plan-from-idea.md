---
id: SKL-0024
name: Plan From Idea
category: skills
tags: [planning, ideation, prd, kickoff]
capabilities: [idea-to-plan, prd-stub-creation, initial-task-generation, project-kickoff]
useWhen:
  - turning a rough idea into a structured project plan
  - creating an initial PRD from a freeform description
  - bootstrapping a task queue for a new project
estimatedTokens: 400
relatedFragments: [SKL-0001, SKL-0023, SKL-0025]
dependencies: []
synonyms: ["I have an idea for an app", "turn my idea into a plan", "where do I start with this project", "help me go from idea to building", "kick off a new project"]
lastUpdated: "2026-03-29"
difficulty: beginner
---

# Plan From Idea

Transform a rough idea into a structured plan with a PRD stub and initial task queue.

## Procedure

### 1. Read the Idea

Gather the idea description from the user input or captured event. Understand the core intent.

### 2. Create a PRD Stub

Write a lightweight PRD with:

- **Project name**
- **One-sentence summary**
- **Target audience**
- **Core features** (3-5 bullet points)
- **Out of scope** (2-3 items)
- **Success criteria**

Save to `docs/PRD.md` or the project's preferred location.

### 3. Generate Initial Tasks

Create 3-5 starter tasks based on the PRD stub:

- Use plain-language titles
- Assign priority (High/Medium/Low)
- Map to relevant skills where possible
- Follow the canonical task format

### 4. Log the Decision

Record the project direction chosen as an architectural decision.

## What This Is Not

This skill produces a starting point, not a complete plan. The user reviews the PRD and task queue, then refines through PRD Writing and PRD to Tasks skills for deeper planning.

## Key Rules

- Keep the PRD stub concise. Details come later through PRD Writing.
- Always generate at least 3 tasks to give the project momentum.
- The user reviews all output before proceeding.
