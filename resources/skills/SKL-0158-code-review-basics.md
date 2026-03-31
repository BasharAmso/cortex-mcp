---
id: SKL-0158
name: Code Review Basics
category: skills
tags: [code-review, pull-request, feedback, collaboration, quality, review-process]
capabilities: [review-execution, constructive-feedback, quality-assessment, design-evaluation]
useWhen:
  - reviewing a teammate's pull request or changelist
  - submitting code for review and wanting to make it easy to review
  - establishing code review practices for a team
  - learning what experienced reviewers look for
  - giving feedback that is constructive rather than confrontational
estimatedTokens: 680
relatedFragments: [SKL-0157, SKL-0159, PAT-0084]
dependencies: []
synonyms: ["how to do a code review", "what to look for in a pull request", "how to give good code review feedback", "how to review someone else's code", "code review checklist for beginners", "how to write helpful PR comments"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/google/eng-practices"
difficulty: beginner
owner: "cortex"
pillar: "coding-literacy"
---

# Skill: Code Review Basics

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0158 |
| **Name** | Code Review Basics |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Google's engineering practices documentation outlines a structured approach to code review that balances thoroughness with speed. The core standard: a change should improve the overall health of the codebase.

### What to Look For

Review across these dimensions, adapted from Google's reviewer guide:

1. **Design** - Does the code fit the system's architecture? Is the functionality in the right place? Does it belong in a library or in application code?
2. **Functionality** - Does the code do what the author intended? Think through edge cases, concurrency issues, and potential bugs.
3. **Complexity** - Can the code be understood quickly? Flag over-engineering, where developers build generic solutions for hypothetical future problems. Solve known issues now.
4. **Tests** - Are tests present, correct, and useful? Will they fail when the code breaks? Are assertions meaningful?
5. **Naming** - Do names communicate purpose without being excessively long?
6. **Comments** - Do comments explain why, not what? If code needs a comment to explain what it does, it should be simplified instead.
7. **Style** - Does it follow the project's conventions? Use "Nit:" to prefix non-blocking suggestions.
8. **Documentation** - Are READMEs and guides updated when behavior changes?

### How to Give Feedback

- Be specific: point to the exact line and explain what concerns you
- Explain why: "This could cause a race condition because..." is better than "This is wrong"
- Suggest alternatives: offer a concrete improvement, not just criticism
- Acknowledge good work: call out well-written code, not just problems
- Separate blocking from non-blocking: distinguish issues that must be fixed from suggestions

### Review Speed Matters

Slow reviews block progress and frustrate authors. Aim to respond within one business day. If a full review takes time, acknowledge receipt quickly and provide a timeline.

### Every Line Counts

Review every line of code assigned to you. If something is unclear, ask for clarification. Unclear code will confuse future maintainers too.

## Key Takeaways

- Review across eight dimensions: design, functionality, complexity, tests, naming, comments, style, documentation
- Explain why something is a problem, not just that it is one
- Respond to reviews quickly to keep the team moving
- Acknowledge good patterns, not just mistakes
- Prefix optional suggestions with "Nit:" to reduce friction
