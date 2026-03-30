---
id: SKL-0015
name: Quality Review
category: skills
tags: [quality, review, documentation, architecture, content, checklist, node-best-practices, artifact-review]
capabilities: [artifact-review, quality-assessment, checklist-driven-review, verdict-issuing, cross-artifact-validation]
useWhen:
  - reviewing documentation, PRDs, or architecture docs for quality
  - checking deliverables for completeness and correctness
  - validating non-code artifacts before shipping
  - ensuring project documentation meets Node.js best practices standards
  - running a quality gate before milestone delivery
estimatedTokens: 700
relatedFragments: [SKL-0002, SKL-0003, AGT-0002]
dependencies: []
synonyms: ["check if my document is good", "review my PRD", "is this architecture doc complete", "quality check my deliverable", "proofread my spec"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/goldbergyoni/nodebestpractices"
difficulty: intermediate
---

# Quality Review

Review non-code artifacts for quality, clarity, and correctness using artifact-specific checklists. Grounded in the Node.js Best Practices approach of systematic, checklist-driven quality enforcement across 102 items -- applied here to documentation, architecture, and product artifacts.

## Quality Philosophy

From the Node.js Best Practices methodology:
- **Checklists prevent drift** -- human memory is unreliable; systematic checks catch what intuition misses
- **Categorize by severity** -- not all issues are equal; separate blockers from polish
- **Modernize continuously** -- review checklists against current best practices (tag items as `#new` or `#updated`)
- **Default to rejection** -- artifacts must earn approval, not receive it by default

## When to Use

Use this for documentation, PRDs, GDDs, architecture docs, config files, or content. For code, use Code Review (SKL-0002). For security, use Security Audit (SKL-0004).

## Procedure

### 1. Identify Artifact Type

| Type | Examples |
|------|---------|
| Documentation | README, API docs, guides, changelogs |
| Product Documents | PRD, GDD |
| Architecture | ARCHITECTURE.md, ADRs, system diagrams |
| Design | UX flows, wireframes |
| Configuration | .env.example, CI/CD configs, Docker files |
| Content | Landing page copy, emails, blog posts |

### 2. Apply the Right Checklist

| Artifact | Key Checks |
|----------|-----------|
| Documentation | Logical heading hierarchy, no TODOs/TBDs, claims match code, audience-appropriate language, examples for complex concepts |
| Product Docs | Clear problem statement, specific target user, explicit scope boundaries, measurable success metrics, kill rule defined, competitive context |
| Architecture | Justified tech stack with trade-offs noted, clear component boundaries, data flow documented, scalability and failure modes considered |
| Design | Happy path + error paths documented, all states covered (empty/loading/error/success), accessibility noted, responsive breakpoints specified |
| Configuration | No hardcoded secrets, documented settings, sensible defaults, explicit env differences, validated at startup |
| Content | Plain language (8th-grade reading level), no unsupported claims, consistent voice, clear CTAs, SEO metadata present |

### 3. Cross-Reference Checks

- [ ] Artifact is consistent with DECISIONS.md
- [ ] Referenced files and paths actually exist
- [ ] Version numbers and dates are current
- [ ] No contradictions with other project artifacts

### 4. Categorize Findings

| Tier | Meaning | Action |
|------|---------|--------|
| **Must Fix** | Incorrect, incomplete, or contradictory | Blocks approval |
| **Should Fix** | Unclear or below quality bar | Fix before next milestone |
| **Nice to Have** | Polish and style improvements | Optional |

For each finding: state the location, what is wrong, and a specific fix.

### 5. Issue Verdict

- **APPROVED** -- Zero Must Fix items
- **NEEDS WORK** -- Any Must Fix items, or 3+ Should Fix items

Default is NEEDS WORK. The artifact must earn approval.
