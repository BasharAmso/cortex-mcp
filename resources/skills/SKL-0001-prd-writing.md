---
id: SKL-0001
name: PRD Writing
category: skills
tags: [prd, product, requirements, planning, specification]
capabilities: [requirements-gathering, user-stories, scope-definition, success-metrics]
useWhen:
  - writing a product requirements document
  - defining what to build and for whom
  - creating user stories and acceptance criteria
  - establishing success metrics and kill rules
estimatedTokens: 800
relatedFragments: [SKL-0002, AGT-0003]
dependencies: []
---

# PRD Writing

Write a Product Requirements Document through structured interview and analysis.

## Procedure

### 1. Gather Requirements

Interview the stakeholder (or extract from existing notes):

- **What are you building?** (one sentence)
- **Who is it for?** (target users)
- **What problem does it solve?**
- **What does success look like?** (measurable outcomes)
- **What are the key features?** (MVP scope)
- **What should it NOT do?** (non-goals)
- **What are the constraints?** (time, budget, technical)

### 2. Structure the PRD

Write these sections:

1. **Overview** — 2-3 sentence summary
2. **Problem Statement** — the pain point with evidence
3. **Target Users** — who benefits and how
4. **Goals** — metrics with baseline, target, and stretch
5. **MVP Scope** — numbered feature list
6. **Non-Goals** — explicit exclusions
7. **User Stories** — "As a [user], I want [action] so that [benefit]"
8. **Risks & Assumptions** — what could go wrong
9. **Kill Rule** — when to stop if it's not working
10. **Open Questions** — unresolved decisions

### 3. Review Checklist

- [ ] Every feature maps to a user need
- [ ] Success metrics are measurable
- [ ] Non-goals prevent scope creep
- [ ] Kill rule is specific and time-bound
- [ ] No jargon without explanation

## Output

Save to `docs/PRD.md`.
