---
id: SKL-0001
name: PRD Writing
category: skills
tags: [prd, product, requirements, planning, specification, user-stories, acceptance-criteria, scope, stakeholder-interview]
capabilities: [requirements-gathering, user-stories, scope-definition, success-metrics, vision-challenge]
useWhen:
  - writing a product requirements document
  - defining what to build and for whom
  - creating user stories and acceptance criteria
  - establishing success metrics and kill rules
  - scoping MVP features for a new product idea
estimatedTokens: 800
relatedFragments: [SKL-0002, AGT-0003]
dependencies: []
synonyms: ["how do I write a product spec", "what should I build", "help me define requirements", "I need to plan my app features", "write a PRD for me"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/deanpeters/Product-Manager-Skills"
difficulty: intermediate
---

# PRD Writing

Write a Product Requirements Document through structured stakeholder interview, competitive framing, and disciplined scoping. Grounded in product management best practices from the PM Skills framework (46 battle-tested skills covering discovery, strategy, and delivery).

## Procedure

### 1. Gather Requirements via Interview

Use the CIRCLES method to extract structured requirements:

| Question | Purpose |
|----------|---------|
| What are you building? (one sentence) | Forces clarity |
| Who is it for? (persona, not demographic) | Targets real users |
| What problem does it solve? (with evidence) | Validates need |
| What does success look like? (measurable) | Sets acceptance bar |
| What are the key features? (MVP only) | Prevents scope creep |
| What should it NOT do? (explicit non-goals) | Draws boundaries |
| What are the constraints? (time, budget, tech) | Grounds the plan |

### 2. Structure the PRD

Write these sections in order:

1. **Overview** -- 2-3 sentence elevator pitch
2. **Problem Statement** -- pain point with evidence (support tickets, interviews, analytics)
3. **Target Users** -- primary persona with goals, frustrations, and context of use
4. **Goals** -- metrics table with baseline, target, and stretch values
5. **MVP Scope** -- numbered feature list, each tied to a user need
6. **Non-Goals** -- explicit exclusions that prevent scope drift
7. **User Stories** -- "As a [user], I want [action] so that [benefit]" with acceptance criteria per story
8. **Competitive Landscape** -- 2-3 alternatives and your differentiation (drawn from market awareness skills)
9. **Risks & Assumptions** -- what could go wrong, ranked by likelihood and impact
10. **Kill Rule** -- specific, time-bound condition to stop if not working
11. **Open Questions** -- unresolved decisions with owners and deadlines

### 3. Vision Challenge (CEO Review)

Before finalizing, stress-test the PRD:

- Is this the right problem to solve at the right scope?
- Does the MVP deliver value without the full roadmap?
- Can you explain the product to a non-technical person in 30 seconds?
- Would you use this yourself? If not, who specifically would and why?

### 4. Review Checklist

- [ ] Every feature maps to a user need
- [ ] Success metrics are measurable with current tooling
- [ ] Non-goals prevent scope creep
- [ ] Kill rule is specific and time-bound
- [ ] No jargon without explanation
- [ ] Acceptance criteria are testable (not vague)
- [ ] Competitive landscape section present

## Output

Save to `docs/PRD.md`.
