---
id: SKL-0427
name: A/B Testing
category: skills
tags: [ab-testing, experimentation, statistical-significance, feature-flags, conversion-optimization, data-driven]
capabilities: [experiment-design, variant-testing, statistical-analysis, feature-flag-management]
useWhen:
  - deciding between two design or feature approaches
  - validating whether a change improves a key metric
  - setting up feature flags for gradual rollouts
  - designing experiments with proper statistical rigor
  - optimizing conversion rates on landing pages or funnels
estimatedTokens: 700
relatedFragments: [SKL-0428, SKL-0012, PAT-0218, SKL-0424]
dependencies: []
synonyms: ["how to run an A/B test", "how to know if a change is statistically significant", "how to set up feature flags", "how to test which version performs better", "experiment design for product changes", "how to validate product changes with data"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/PostHog/posthog"
difficulty: intermediate
owner: "cortex"
pillar: "product-business"
---

# Skill: A/B Testing

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0427 |
| **Name** | A/B Testing |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

A/B testing replaces opinions with evidence. Instead of debating whether a change will help, you show version A to half your users and version B to the other half, then measure which performs better.

### Anatomy of an Experiment

| Component | Description |
|-----------|-------------|
| **Hypothesis** | "Changing X will improve Y by Z%" |
| **Variants** | Control (current) vs. Treatment (change) |
| **Primary metric** | The one number you are trying to move |
| **Guardrail metrics** | Metrics that must not degrade (e.g., error rate, load time) |
| **Sample size** | Users needed for statistical significance |
| **Duration** | How long to run (minimum 1-2 business cycles) |

### Designing a Valid Experiment

1. **One change per test.** If you change the headline AND the button color, you cannot attribute the result.
2. **Define success criteria before launching.** "We will ship if conversion improves by 5% with p < 0.05."
3. **Calculate sample size upfront.** Use a power calculator. Most tests need 1,000-10,000 users per variant depending on baseline conversion and minimum detectable effect.
4. **Run for full weeks.** User behavior varies by day. A test that runs Monday-Thursday misses weekend patterns.
5. **Do not peek and stop early.** Checking results daily and stopping when they "look good" inflates false positives. Commit to the planned duration.

### Statistical Significance Quick Reference

| Concept | Meaning |
|---------|---------|
| **p-value < 0.05** | Less than 5% chance the result is random |
| **Confidence interval** | Range where the true effect likely falls |
| **Power (80%+)** | Probability of detecting a real effect |
| **MDE** | Minimum Detectable Effect: smallest improvement worth detecting |

### Feature Flags as Infrastructure

PostHog and similar tools use feature flags as the foundation for A/B tests. Feature flags enable:

- **Gradual rollouts** — Ship to 5% of users, then 25%, then 100%
- **User targeting** — Show new features only to specific segments
- **Kill switches** — Instantly disable a broken feature without deploying
- **Multivariate tests** — Test more than two variants simultaneously

### Common Mistakes

- Running tests without enough traffic (results are noise, not signal)
- Testing trivial changes (button color rarely moves the needle; test value propositions)
- Ignoring guardrail metrics (conversion went up but error rate doubled)
- Not accounting for novelty effect (new things get clicks that fade after a week)
- Running too many simultaneous tests on the same users (interaction effects)

## Key Takeaways
- Define your hypothesis and success criteria before launching any test
- Calculate required sample size upfront to avoid inconclusive results
- Never peek at results early and stop; commit to the planned duration
- Feature flags are the infrastructure layer that enables experimentation
- Test meaningful changes (pricing, flows, value props) not cosmetic ones
