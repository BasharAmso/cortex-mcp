---
id: SKL-0235
name: Market Validation
category: skills
tags: [market-validation, mvp-testing, demand-signals, assumption-testing, product-market-fit, lean-startup]
capabilities: [assumption-testing, demand-signal-detection, mvp-design, validation-experiment-design]
useWhen:
  - testing whether real demand exists before building a full product
  - designing a minimum viable experiment to validate a market assumption
  - interpreting early user signals to decide build vs pivot vs kill
  - creating a landing page or waitlist to gauge interest
  - planning a smoke test or concierge MVP
estimatedTokens: 650
relatedFragments: [SKL-0236, SKL-0233, PAT-0121, PAT-0123]
dependencies: []
synonyms: ["how do I validate my market", "does anyone actually want this", "how to test demand before building", "market validation techniques", "how to know if my idea has a market", "testing product-market fit"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/formbricks/formbricks"
difficulty: beginner
owner: "cortex"
pillar: "market-research"
---

# Skill: Market Validation

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0235 |
| **Name** | Market Validation |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Market validation tests whether real people will pay for your solution before you invest significant time building it. The core principle: search for reasons to stop, not reasons to continue. Confirmation bias kills startups.

### The Validation Ladder

Progress through increasing levels of commitment. Each rung filters out weaker ideas:

| Level | Signal | Method | Strength |
|-------|--------|--------|----------|
| 1. **Interest** | "That sounds cool" | Landing page visits, social engagement | Weak |
| 2. **Intent** | "I would use that" | Email signups, waitlist joins, survey responses | Moderate |
| 3. **Commitment** | "I will pay for that" | Pre-orders, deposits, letter of intent | Strong |
| 4. **Payment** | "Here is my money" | Actual transactions, paid pilots | Definitive |

Do not skip levels, but do not linger on Level 1. Move to commitment signals as quickly as possible.

### Validation Experiments

**Smoke Test (Landing Page):** Build a single page describing the value proposition. Drive targeted traffic. Measure signup rate. A conversion rate above 5% on cold traffic suggests genuine interest. Tools like Formbricks enable in-page surveys to capture why visitors do or do not sign up.

**Concierge MVP:** Deliver the service manually to 5-10 customers. No code, no automation. You learn whether the problem is real and whether your solution approach works. If customers tolerate the rough edges and ask for more, you have a signal.

**Wizard of Oz:** Present an automated-looking experience but perform the work manually behind the scenes. Tests whether the user experience resonates before investing in technical infrastructure.

**Pre-sale:** Offer the product for sale before it exists. A "buy now" button that leads to a "coming soon" page with a deposit option. Measures willingness to pay, not just willingness to click.

**Survey Validation:** Target potential users with specific questions about their current pain, existing solutions, and willingness to switch. Use tools like Formbricks for in-app or link-based surveys with targeting to reach the right audience segments. Focus on behavioral questions ("When did you last experience this problem?") over hypothetical ones ("Would you use X?").

### Reading the Signals

**Positive signals:** Users describe the problem unprompted, ask when they can buy, offer to pay for early access, share with colleagues, follow up without being prompted.

**Negative signals:** Polite enthusiasm without action, "I know someone who would want this" (but not them), no follow-up after initial interest, willingness to use for free but not to pay.

**Kill criteria (define before testing):** Set specific thresholds before running experiments. Example: "If fewer than 50 out of 500 targeted users sign up for the waitlist, we pivot." Without pre-set criteria, you will rationalize weak results.

### Common Pitfalls

- Asking friends and family (they will be encouraging regardless).
- Treating survey responses as equivalent to purchase intent.
- Running validation experiments on the wrong audience segment.
- Celebrating vanity metrics (page views, likes) instead of commitment signals.

## Key Takeaways

- Climb the validation ladder: interest, intent, commitment, payment; skip nothing but move fast
- Design experiments that measure behavior (signups, payments, time spent) not opinions
- Set kill criteria before running experiments to prevent rationalization of weak results
- Negative signals (politeness without action, "someone else would want this") are more informative than positive ones
- A concierge MVP with 5-10 real customers teaches more than 1,000 survey responses
