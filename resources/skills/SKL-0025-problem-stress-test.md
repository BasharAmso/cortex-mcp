---
id: SKL-0025
name: Problem Stress Test
category: skills
tags: [validation, planning, product, startup, problem-discovery, customer-discovery, market-fit]
capabilities: [idea-validation, problem-assessment, ten-lens-analysis, founder-coaching, opportunity-scoring]
useWhen:
  - validating whether a product idea solves a real problem
  - stress-testing a startup concept before committing resources
  - evaluating problem-market fit using structured frameworks
  - deciding between multiple ideas based on problem strength
  - coaching a founder through customer discovery thinking
estimatedTokens: 800
relatedFragments: [SKL-0001, SKL-0024, SKL-0028]
dependencies: []
synonyms: ["is my idea any good", "validate my startup idea", "will anyone actually use this", "stress test my product concept", "should I build this or not"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/deanpeters/Product-Manager-Skills"
difficulty: beginner
---

# Problem Stress Test

Challenge a product or startup idea through ten structured lenses based on Uri Levine's "Fall in Love with the Problem, Not the Solution." Combines problem validation with PM discovery frameworks. Advisory only. The user always decides whether to proceed.

## The Ten Lenses

| Lens | Core Question | Strong Signal |
|------|--------------|---------------|
| 1. Problem Love Test | Does the description lead with user pain or product features? | Pain-first language, specific user stories |
| 2. 100 Conversations Rule | Is there evidence of real-world validation? | Interviews, surveys, observed behavior data |
| 3. Problem Scale & Frequency | How many people have this problem and how often? | Large audience + daily/weekly frequency |
| 4. Value Creation Test | Does solving this create clear, measurable value? | Time saved, money saved, risk reduced |
| 5. Disruption Framework | How are people solving this today, and why is that unacceptable? | Current solutions have clear, named pain points |
| 6. Founder-Problem Fit | Is this the founder's problem, and does it extend beyond them? | Personal experience + evidence of broader need |
| 7. Retention Signal Test | Would users return repeatedly, or is this one-time use? | Recurring need, habit-forming potential |
| 8. Entrepreneurial Zone Check | Does commitment match the likely multi-year timeline? | Passion for the problem space, not just the solution |
| 9. Narrative Test | Is the problem story more compelling than the solution description? | Others retell the problem unprompted |
| 10. Phase Discipline | Is the idea focused on one core problem? | Single problem, clear scope boundaries |

## Procedure

### 1. Determine Input Richness

| Level | Available Info | Approach |
|-------|---------------|----------|
| Rich | Problem + user + external validation | All lenses scored fully |
| Moderate | Problem + user, no validation data | Some lenses marked "Needs More Data" |
| Lean | Minimal description only | Core lenses only, total normalized |

### 2. Score Each Lens (0-2 Points)

- **Pass (2):** Strong evidence supporting this dimension
- **Partial (1):** Present but incomplete or unvalidated
- **Fail (0):** Missing, vague, or contradicted by evidence

For every non-Pass lens, provide a specific strengthening question the founder should answer through customer discovery.

### 3. Determine Verdict

| Score (out of 20) | Verdict | Recommended Action |
|-------------------|---------|--------------------|
| 16-20 | **Strong** | Proceed to PRD with confidence |
| 10-15 | **Needs Work** | Address gaps through customer discovery before committing |
| 0-9 | **Weak** | Invest in problem discovery; do not build yet |

### 4. Write Report

Save to `docs/PROBLEM_STRESS_TEST.md` with: lens results table, top strengths, critical gaps, strengthening questions, and recommended next steps.

## Key Rules

- Never blocks idea progression. Advisory only.
- Never fabricates evidence of validation.
- Never penalizes lean input as if it were rich input.
- Always constructive: strengthen the idea, do not reject it.
- ABC: Always Be Coaching. Explain the reasoning behind each score.
