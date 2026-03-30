---
id: SKL-0024
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
relatedFragments: [SKL-0001, SKL-0023, SKL-0025]
dependencies: []
synonyms: ["I have an idea for an app", "turn my idea into a plan", "where do I start with this project", "help me go from idea to building", "kick off a new project"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/deanpeters/Product-Manager-Skills"
difficulty: beginner
---

# Plan From Idea

Transform a rough idea into a structured plan with a PRD stub and initial task queue. Applies professional PM framing: problem-first thinking, opportunity assessment, and scope discipline.

## Procedure

### 1. Frame the Opportunity

Before writing anything, extract and validate these elements:

| Element | Question | Why It Matters |
|---------|----------|---------------|
| Problem | What pain does this solve? | Ideas without pain are features, not products |
| Audience | Who has this problem? | "Everyone" means no one. Be specific. |
| Evidence | How do you know this is real? | Conversations, data, personal experience |
| Existing solutions | How do people solve this today? | If the answer is "they don't", validate harder |
| Unfair advantage | Why you, why now? | Founder-problem fit, timing, unique insight |

If the user cannot articulate the problem, suggest running the Problem Stress Test (SKL-0025) first.

### 2. Create a PRD Stub

Write a lightweight PRD with:

- **Project name**
- **One-sentence summary** (what it does + for whom + key benefit)
- **Target audience** (specific persona, not "everyone")
- **Core features** (3-5 bullet points, MoSCoW-tagged: Must/Should/Could)
- **Out of scope** (2-3 items to prevent scope creep)
- **Success criteria** (measurable outcomes, not vanity metrics)

Save to `docs/PRD.md` or the project's preferred location.

### 3. Generate Initial Tasks

Create 3-5 starter tasks based on the PRD stub:

- Use plain-language titles
- Assign priority (High/Medium/Low)
- Map to relevant skills where possible
- Follow the canonical task format
- First task should always be the thing that proves the core assumption fastest

### 4. Log the Decision

Record the project direction chosen as an architectural decision with rationale.

## What This Is Not

This skill produces a starting point, not a complete plan. The user reviews the PRD and task queue, then refines through PRD Writing (SKL-0001) and PRD to Tasks (SKL-0023) for deeper planning.

## Key Rules

- Keep the PRD stub concise. Details come later through PRD Writing.
- Always generate at least 3 tasks to give the project momentum.
- Lead with problem, not solution. Reframe feature-first ideas as problem statements.
- The user reviews all output before proceeding. Never auto-commit to a direction.
