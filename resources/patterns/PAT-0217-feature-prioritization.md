---
id: PAT-0217
name: Feature Prioritization Pattern
category: patterns
tags: [prioritization, rice, moscow, impact-effort, user-voting, backlog-management]
capabilities: [feature-scoring, priority-ranking, stakeholder-alignment, backlog-triage]
useWhen:
  - deciding what to build next from a long backlog
  - resolving disagreements about feature priority
  - scoring features objectively for roadmap planning
  - triaging feature requests from multiple sources
  - aligning product and engineering on next priorities
estimatedTokens: 650
relatedFragments: [SKL-0432, SKL-0428, SKL-0423, PAT-0216]
dependencies: []
synonyms: ["how to prioritize features", "what should I build next", "RICE scoring explained", "MoSCoW prioritization method", "how to rank feature requests", "impact effort matrix for product"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/makeplane/plane"
difficulty: beginner
owner: "cortex"
pillar: "product-business"
---

# Feature Prioritization Pattern

Frameworks for objectively ranking what to build next, replacing gut feelings with structured evaluation.

## Framework Comparison

| Framework | Complexity | Best For | Weakness |
|-----------|-----------|----------|----------|
| **RICE** | Medium | Data-driven teams, SaaS | Requires estimation of reach/impact |
| **MoSCoW** | Low | Sprint planning, deadline-driven | Binary categories, no ranking within |
| **Impact/Effort Matrix** | Low | Quick triage, small teams | Subjective without data |
| **Kano Model** | High | Understanding user delight | Requires customer research |
| **Weighted Scoring** | Medium | Custom criteria needed | Can be gamed by weight tuning |

## RICE Scoring (Recommended Default)

| Factor | Definition | How to Estimate |
|--------|-----------|----------------|
| **Reach** | Users affected per quarter | Analytics data, segment sizes |
| **Impact** | Effect per user (0.25 to 3) | 3=massive, 2=high, 1=medium, 0.5=low, 0.25=minimal |
| **Confidence** | Certainty of estimates (%) | 100%=data-backed, 80%=strong hunch, 50%=guess |
| **Effort** | Person-months to build | Engineering estimate |

**Score = (Reach x Impact x Confidence) / Effort**

Example: Feature reaches 2,000 users (R), high impact (I=2), medium confidence (C=80%), 2 person-months (E=2). Score = (2000 x 2 x 0.8) / 2 = 1,600.

## MoSCoW for Sprint Planning

| Category | Meaning | Rule |
|----------|---------|------|
| **Must** | Non-negotiable for this release | Max 60% of capacity |
| **Should** | Important but not blocking | Next 20% |
| **Could** | Nice to have if time allows | Next 15% |
| **Won't** | Explicitly out of scope this cycle | Acknowledged and deferred |

The power of MoSCoW is the "Won't" category. Explicitly saying what you will NOT build prevents scope creep and sets expectations.

## Impact/Effort Matrix

```
          High Impact
              |
  Quick Wins  |  Big Bets
  (Do first)  |  (Plan carefully)
--------------+---------------
  Fill-ins    |  Money Pits
  (Do if idle)|  (Avoid)
              |
          Low Impact
   Low Effort    High Effort
```

## User Voting Considerations

Public feature voting (Canny, Plane's issue upvotes) has benefits and traps:

**Benefits:** Surfaces demand, makes users feel heard, provides quantitative signal.

**Traps:** Favors power users over new users, biased toward vocal minority, most impactful features are ones users do not know to ask for (they cannot vote for what they cannot imagine).

**Rule:** Use voting as one input among many, never as the sole prioritization mechanism.

## Practical Process

1. Collect all feature requests into a single backlog (not scattered across Slack, email, and meetings)
2. Score each item using RICE (or your chosen framework)
3. Sort by score, then apply judgment (strategic alignment, dependencies, team capacity)
4. Present the top 10 to stakeholders for discussion, not the full list
5. Re-score quarterly as data changes

## Key Takeaways
- RICE scoring is the best general-purpose prioritization framework
- MoSCoW's power is the "Won't" category that prevents scope creep
- User voting is one signal, not a prioritization strategy
- Quick wins (high impact, low effort) should always go first
- Re-score regularly as user data and business context evolve
