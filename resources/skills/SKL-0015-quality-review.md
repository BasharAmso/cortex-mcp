---
id: SKL-0015
name: Quality Review
category: skills
tags: [quality, review, documentation, architecture, content]
capabilities: [artifact-review, quality-assessment, checklist-driven-review, verdict-issuing]
useWhen:
  - reviewing documentation, PRDs, or architecture docs for quality
  - checking deliverables for completeness and correctness
  - validating non-code artifacts before shipping
estimatedTokens: 700
relatedFragments: [SKL-0002, SKL-0003, AGT-0002]
dependencies: []
---

# Quality Review

Review non-code artifacts for quality, clarity, and correctness using artifact-specific checklists.

## When to Use

Use this for documentation, PRDs, GDDs, architecture docs, config files, or content. For code, use Code Review. For security, use Security Audit.

## Procedure

### 1. Identify Artifact Type

Classify what you are reviewing:

- **Documentation** — README, API docs, guides, changelogs
- **Product Documents** — PRD, GDD
- **Architecture** — ARCHITECTURE.md, ADRs
- **Design** — UX flows, wireframes
- **Configuration** — .env.example, CI/CD configs
- **Content** — Landing page copy, emails, blog posts

### 2. Apply the Right Checklist

| Artifact | Key Checks |
|----------|-----------|
| Documentation | Logical heading hierarchy, no TODOs/TBDs, claims match code, audience-appropriate language |
| Product Docs | Clear problem statement, specific target user, explicit scope boundaries, measurable success metrics, kill rule defined |
| Architecture | Justified tech stack, clear component boundaries, trade-offs noted, scalability considered |
| Design | Happy path + error paths documented, all states covered (empty/loading/error/success), accessibility noted |
| Configuration | No hardcoded secrets, documented settings, sensible defaults, explicit env differences |
| Content | Plain language, no unsupported claims, consistent voice, clear CTAs |

### 3. Categorize Findings

| Tier | Meaning |
|------|---------|
| **Must Fix** | Incorrect, incomplete, or contradictory. Blocks approval. |
| **Should Fix** | Unclear or below quality bar. Fix before next milestone. |
| **Nice to Have** | Polish and style improvements. |

For each finding: state the location, what is wrong, and a specific fix.

### 4. Issue Verdict

- **APPROVED** — Zero Must Fix items
- **NEEDS WORK** — Any Must Fix items, or 3+ Should Fix items

Default is NEEDS WORK. The artifact must earn approval.
