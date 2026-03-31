---
id: SKL-0039
name: Consensus Planning
category: skills
tags: [prompt-engineering, planning, consensus, self-consistency, multi-perspective, decision-making, architecture, trade-offs]
capabilities: [decision-facilitation, multi-perspective-analysis, consensus-building]
useWhen:
  - making architectural decisions with multiple valid approaches
  - resolving disagreements about technical direction
  - evaluating trade-offs between competing solutions
  - planning a project where stakeholders have different priorities
  - choosing between build vs buy or framework A vs framework B
estimatedTokens: 600
relatedFragments: [SKL-0037, SKL-0038, PAT-0006]
dependencies: []
synonyms: ["how to decide between two technical approaches", "how to get team agreement on architecture", "how to evaluate trade-offs", "should we build or buy", "how to pick the right framework"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
difficulty: intermediate
owner: project-manager
pillar: "product-business"
---

# Consensus Planning

A structured technique for reaching informed technical decisions when multiple valid approaches exist. Applies the self-consistency prompting technique: generate multiple independent reasoning paths and find the convergent answer.

## When to Use

Use Consensus Planning when a decision has significant consequences (hard to reverse), when the team disagrees, or when you need to justify a choice to stakeholders. Skip it for trivial or easily reversible decisions.

## The Multi-Perspective Method

Inspired by the self-consistency technique from the Prompt Engineering Guide: instead of relying on a single chain of reasoning, generate multiple independent analyses and look for convergence.

### Step 1: Frame the Decision

Write a clear decision statement with constraints:

```markdown
**Decision:** Which database should we use for the user activity feed?
**Constraints:** <100ms read latency, 10K writes/sec, 6-month timeline, team knows SQL
**Options:** PostgreSQL, MongoDB, DynamoDB
```

### Step 2: Evaluate from 3+ Perspectives

| Perspective | Focus | Questions |
|------------|-------|-----------|
| **Engineer** | Implementation cost, maintenance, team skills | "How long to build? Who maintains it? What is the learning curve?" |
| **User** | Performance, reliability, experience | "What latency will users see? What happens during failure?" |
| **Business** | Cost, time-to-market, scalability | "What does it cost at 10x scale? Does it delay launch?" |
| **Operator** | Deployment, monitoring, disaster recovery | "How do we back it up? What is the failure mode? Can we migrate away?" |

### Step 3: Score and Compare

| Criteria | Weight | Option A | Option B | Option C |
|----------|--------|----------|----------|----------|
| Team familiarity | 30% | 9 | 5 | 4 |
| Read performance | 25% | 7 | 8 | 9 |
| Operational cost | 20% | 8 | 7 | 5 |
| Migration risk | 15% | 9 | 6 | 3 |
| Scalability ceiling | 10% | 6 | 8 | 9 |
| **Weighted total** | | **8.0** | **6.7** | **5.6** |

### Step 4: Document the Decision

Use the ADR (Architecture Decision Record) format:

```markdown
## ADR-NNN: [Decision Title]
- **Status:** Accepted
- **Context:** [Why this decision is needed]
- **Options Considered:** [List with pros/cons]
- **Decision:** [What we chose]
- **Rationale:** [Why, referencing the scoring]
- **Consequences:** [What changes as a result]
- **Review Date:** [When to revisit]
```

### Step 5: Check for Convergence

If all perspectives independently point to the same option, confidence is high. If perspectives diverge, the decision needs more investigation or a time-boxed prototype.

## Decision Rules

- **Reversible decisions:** Pick the fastest option, iterate. Don't over-analyze.
- **Irreversible decisions:** Invest in the full multi-perspective analysis.
- **Tie-breaker:** Default to the option with the lowest operational complexity.

## Anti-Patterns

- Analysis paralysis on low-stakes decisions
- Evaluating only from one perspective (usually the engineer's)
- Ignoring operational cost until production
- Making the decision but not documenting the rationale
- Revisiting settled decisions without new evidence
