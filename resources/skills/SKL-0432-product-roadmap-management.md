---
id: SKL-0432
name: Product Roadmap Management
category: skills
tags: [roadmap, prioritization, stakeholder-communication, product-planning, backlog, feature-requests]
capabilities: [roadmap-creation, feature-prioritization, stakeholder-alignment, release-planning]
useWhen:
  - creating or updating a product roadmap
  - prioritizing features from a large backlog
  - communicating product direction to stakeholders
  - deciding what to build next based on competing requests
  - aligning engineering and business on priorities
estimatedTokens: 700
relatedFragments: [PAT-0217, SKL-0428, SKL-0423, SKL-0426]
dependencies: []
synonyms: ["how to create a product roadmap", "how to prioritize features", "what should I build next", "how to manage a product backlog", "how to communicate roadmap to stakeholders", "how to say no to feature requests"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/makeplane/plane"
difficulty: intermediate
owner: "cortex"
pillar: "product-business"
---

# Skill: Product Roadmap Management

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0432 |
| **Name** | Product Roadmap Management |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

A roadmap is a communication tool, not a Gantt chart. It aligns your team and stakeholders on direction without committing to exact dates. The best roadmaps show themes and outcomes, not feature lists.

### Roadmap Formats

| Format | Shows | Best For | Avoid When |
|--------|-------|----------|------------|
| **Now / Next / Later** | Priorities by time horizon | Startups, agile teams | Stakeholders demand dates |
| **Outcome-based** | Problems to solve, not features | Product-led orgs | Team needs specific tasks |
| **Timeline** | Features on a calendar | Enterprise, sales-driven | Early-stage uncertainty |
| **Kanban board** | Work in progress and backlog | Engineering teams | Executive communication |

### The Now / Next / Later Framework

This is the most practical roadmap for early-stage and growing products:

- **Now (this sprint/month):** Committed work. High confidence, specific tasks.
- **Next (1-3 months):** Planned work. Problem defined, solution being shaped.
- **Later (3-6 months):** Directional. Themes and opportunities, not commitments.

Never put dates on "Later" items. When "Next" items are ready, they move to "Now."

### Prioritization with RICE

Plane and other modern project tools support RICE scoring:

| Factor | Definition | Scale |
|--------|-----------|-------|
| **Reach** | How many users affected per quarter | Actual number |
| **Impact** | How much it moves the needle per user | 3 = massive, 2 = high, 1 = medium, 0.5 = low, 0.25 = minimal |
| **Confidence** | How sure you are about estimates | 100% = high, 80% = medium, 50% = low |
| **Effort** | Person-months to build | Actual estimate |

**RICE Score = (Reach x Impact x Confidence) / Effort**

Higher score = higher priority. This removes gut-feeling bias and makes trade-offs transparent.

### Saying No to Feature Requests

Most feature requests are valid problems disguised as proposed solutions. When you receive a request:

1. **Acknowledge** the problem behind the request
2. **Record** it in your feedback system with context (who, why, how often)
3. **Evaluate** against current priorities using your prioritization framework
4. **Respond** with honesty: "This is important and we have noted it. Right now we are focused on X because it affects more users."

### Roadmap Communication

| Audience | What They Need | Cadence |
|----------|---------------|---------|
| Engineering | Specific tasks, dependencies, acceptance criteria | Weekly |
| Leadership | Progress toward business outcomes, blockers | Bi-weekly |
| Customers | Upcoming improvements, no firm dates | Monthly or quarterly |
| Sales | What is coming that helps close deals | Monthly |

### Anti-Patterns

- Building what the loudest customer demands (feature factory)
- Roadmaps with exact dates more than 1 month out (false precision)
- No public roadmap at all (users feel ignored)
- Treating the roadmap as a promise (it is a plan, plans change)

## Key Takeaways
- Use Now/Next/Later for flexibility; reserve dates only for "Now" items
- RICE scoring removes gut-feeling bias from prioritization
- Feature requests are problems in disguise; record the problem, not the proposed solution
- Different audiences need different roadmap views and cadences
- A roadmap is a communication tool, not a contract
