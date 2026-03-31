---
id: PAT-0122
name: Research Repository Pattern
category: patterns
tags: [research-repository, knowledge-management, research-ops, institutional-memory, findability, research-storage]
capabilities: [research-organization, finding-retrieval, knowledge-sharing, research-deduplication]
useWhen:
  - setting up a system to store and retrieve past research findings
  - preventing duplicate research across teams or projects
  - onboarding new team members who need historical research context
  - building institutional memory for product and market decisions
  - organizing research artifacts (transcripts, surveys, reports) for reuse
estimatedTokens: 650
relatedFragments: [PAT-0121, PAT-0120, SKL-0234]
dependencies: []
synonyms: ["how to organize research findings", "research knowledge management", "where to store user research", "how to avoid repeating research", "research ops setup", "building a research library"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/outline/outline"
difficulty: beginner
owner: "cortex"
pillar: "market-research"
---

# Pattern: Research Repository Pattern

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0122 |
| **Name** | Research Repository Pattern |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

Research that cannot be found is research that will be repeated. A research repository is a structured store of past findings, organized for retrieval by anyone on the team. Without one, every new project starts from zero and teams unknowingly duplicate work.

### Repository Structure

Organize research into three layers, inspired by knowledge management tools like Outline that use collections, documents, and semantic search:

**Layer 1: Studies** (the research event)
Each study is a single research effort: an interview batch, a survey, a competitive analysis. Store the metadata:

| Field | Example |
|-------|---------|
| Study ID | RS-2026-014 |
| Title | Q1 Developer Survey on API Documentation Preferences |
| Date | 2026-01-15 |
| Method | Online survey (n=342) |
| Researcher | Sarah K. |
| Segments | Mid-level developers, enterprise teams |
| Status | Complete |

**Layer 2: Findings** (the insights extracted)
Each finding is a discrete, reusable insight extracted from one or more studies. This is the atomic unit of research knowledge:

| Field | Example |
|-------|---------|
| Finding ID | FN-2026-041 |
| Statement | Developers prefer interactive API examples over static documentation by a 4:1 ratio |
| Evidence | RS-2026-014 (survey Q7, n=342), RS-2025-089 (interviews, 8/12 participants) |
| Confidence | High (triangulated across methods) |
| Tags | api-docs, developer-experience, content-format |
| Expiry | 2027-01 (refresh if not re-validated) |

**Layer 3: Artifacts** (the raw materials)
Transcripts, survey exports, screenshots, recordings, analysis spreadsheets. Link from studies but store separately. Most people need findings, not artifacts.

### Findability Principles

1. **Tag consistently.** Define a controlled vocabulary for tags (audience segments, product areas, research methods, topics). Free-form tagging devolves into chaos within months.
2. **Search over browse.** Invest in full-text search across findings. Outline-style semantic search (understanding meaning, not just keywords) dramatically improves retrieval. If your tool does not support semantic search, good tagging compensates.
3. **Cross-link findings to decisions.** When a product decision references research, link back to the specific finding IDs. When someone later questions the decision, the evidence is one click away.
4. **Surface related findings.** When adding a new finding, search for existing findings on the same topic. Link them as "related" or update the existing finding with new evidence.

### Maintenance Cadence

| Activity | Frequency | Owner |
|----------|-----------|-------|
| Add new studies and findings | After each research effort | Researcher |
| Tag audit (fix inconsistencies) | Quarterly | Research ops lead |
| Expiry review (flag stale findings) | Quarterly | Research ops lead |
| Usage review (what gets retrieved) | Semi-annually | Research ops lead |
| Archive completed/superseded studies | Annually | Research ops lead |

### Scaling from Solo to Team

**Solo researcher:** A folder structure with markdown files works. Studies in `/research/studies/`, findings in `/research/findings/`, artifacts in `/research/artifacts/`. Use file naming conventions: `RS-YYYY-NNN-title.md`.

**Small team (2-5):** Move to a shared knowledge base (Outline, Notion, Confluence). Enforce the study/finding/artifact structure. Assign a quarterly tag audit owner.

**Research ops (5+):** Dedicated research repository tooling. Automated tagging suggestions, finding deduplication alerts, stakeholder notification when new research on their domain is published.

### Common Pitfalls

- Storing only reports, not atomic findings (reports are hard to search and extract from).
- No expiry dates on findings (market research from 2 years ago may be dangerously outdated).
- Tagging without a controlled vocabulary (free-form tags create silos within months).
- Building the repository but not promoting its use (adoption requires showing value, not just announcing existence).

## Key Takeaways

- Structure research into studies (events), findings (atomic insights), and artifacts (raw materials)
- Findings are the atomic unit: tagged, evidence-linked, and searchable
- Invest in findability through consistent tagging, full-text search, and cross-linking to decisions
- Set expiry dates on findings; stale research is worse than no research
- Start simple (markdown files in folders) and scale tooling as the team grows
