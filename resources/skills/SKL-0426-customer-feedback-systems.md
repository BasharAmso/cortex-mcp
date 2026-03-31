---
id: SKL-0426
name: Customer Feedback Systems
category: skills
tags: [feedback, nps, csat, surveys, user-research, customer-voice]
capabilities: [survey-design, feedback-collection, sentiment-analysis, feedback-loop-management]
useWhen:
  - setting up a customer feedback collection system
  - choosing between NPS, CSAT, or other survey types
  - designing in-app feedback mechanisms
  - building a feedback-to-feature pipeline
  - understanding why users are churning or dissatisfied
estimatedTokens: 650
relatedFragments: [PAT-0219, SKL-0433, SKL-0424, SKL-0428]
dependencies: []
synonyms: ["how to collect user feedback", "how to set up NPS surveys", "how to build a feedback system", "what is the best way to get customer feedback", "how to run in-app surveys", "how to close the feedback loop"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/formbricks/formbricks"
difficulty: beginner
owner: "cortex"
pillar: "product-business"
---

# Skill: Customer Feedback Systems

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0426 |
| **Name** | Customer Feedback Systems |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Feedback systems turn user opinions into product decisions. The key is not just collecting feedback but creating a closed loop: collect, analyze, act, and communicate back.

### Survey Types and When to Use Them

| Type | Question | Scale | When to Send | Measures |
|------|----------|-------|-------------|----------|
| **NPS** | "How likely to recommend?" | 0-10 | Monthly or quarterly | Loyalty / advocacy |
| **CSAT** | "How satisfied with X?" | 1-5 | After specific interaction | Satisfaction with feature/support |
| **CES** | "How easy was this?" | 1-7 | After task completion | Friction / effort |
| **PMF Survey** | "How disappointed if gone?" | Very/Somewhat/Not | After activation | Product-market fit |

### In-App Survey Best Practices (Formbricks Model)

Formbricks pioneered open-source in-app surveys with event-based targeting. Key principles:

1. **Trigger on behavior, not time.** Show a survey after the user completes a meaningful action (e.g., finishes a project, exports data), not after 30 seconds on the page.
2. **Keep it short.** 1-3 questions maximum. Every additional question drops completion by 15-20%.
3. **Segment your audience.** New users get different questions than power users. Use attributes (plan, signup date, usage) to target.
4. **Respect frequency.** Never show more than one survey per session. Set cool-down periods between surveys (7-14 days minimum).
5. **Follow up on open text.** The qualitative responses ("Why did you give that score?") are more valuable than the number itself.

### Building a Feedback Loop

```
Collect → Categorize → Prioritize → Act → Communicate
```

| Step | Action |
|------|--------|
| **Collect** | Surveys, support tickets, social mentions, user interviews |
| **Categorize** | Tag by theme (UX, performance, missing feature, bug) |
| **Prioritize** | Weight by frequency, user segment, and business impact |
| **Act** | Feed into roadmap, create tasks, fix quick wins immediately |
| **Communicate** | Tell users what changed because of their feedback ("You asked, we built") |

### Feedback Anti-Patterns

- Collecting feedback and never acting on it (erodes trust)
- Only listening to the loudest voices (power users or complainers)
- Surveying too frequently (survey fatigue kills response rates)
- Ignoring qualitative data in favor of scores alone

## Key Takeaways
- Trigger surveys on behavior, not arbitrary timing
- Keep surveys to 1-3 questions for completion rates above 50%
- The open-text follow-up question is the most valuable data
- Close the loop: tell users when their feedback drives a change
- Use different survey types for different measurement goals
