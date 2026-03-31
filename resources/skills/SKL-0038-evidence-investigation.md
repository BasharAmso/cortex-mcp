---
id: SKL-0038
name: Evidence Investigation
category: skills
tags: [prompt-engineering, investigation, debugging, root-cause-analysis, evidence-gathering, retrieval-augmented, hypothesis-testing]
capabilities: [root-cause-analysis, evidence-collection, structured-investigation]
useWhen:
  - debugging a production incident with unclear cause
  - investigating why a feature is not working as expected
  - gathering evidence before making architectural decisions
  - validating claims about performance, cost, or user behavior
  - conducting a post-mortem after an outage or failure
estimatedTokens: 600
relatedFragments: [SKL-0037, SKL-0040, PAT-0001, PAT-0008]
dependencies: []
synonyms: ["how to debug a production issue", "how to find out why something broke", "how to investigate a bug systematically", "root cause analysis process", "how to gather evidence before deciding"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
difficulty: intermediate
owner: explorer
pillar: "product-business"
---

# Evidence Investigation

A systematic process for investigating technical problems using evidence rather than intuition. Applies prompt engineering principles (ReAct, chain-of-thought, self-consistency) to structure the investigation loop.

## When to Use

Use Evidence Investigation when the root cause is not obvious, when multiple hypotheses compete, or when a decision requires data rather than opinions. This skill replaces "I think the problem is..." with "The evidence shows..."

## Investigation Loop (ReAct Pattern)

Adapted from the ReAct prompting framework (Reason + Act): alternate between forming hypotheses and gathering evidence until the root cause is confirmed.

```
1. OBSERVE  ->  What are the symptoms? Collect logs, metrics, user reports.
2. HYPOTHESIZE  ->  What could cause these symptoms? List 2-3 candidates.
3. TEST  ->  What evidence would confirm or eliminate each hypothesis?
4. GATHER  ->  Run the specific query, check the log, reproduce the issue.
5. EVALUATE  ->  Does the evidence support or refute the hypothesis?
6. REPEAT  ->  Narrow down and iterate until one hypothesis survives.
```

## Evidence Types (Ranked by Reliability)

| Evidence Type | Reliability | Example |
|--------------|-------------|---------|
| **Reproduction** | Highest | "I triggered the bug by doing X, Y, Z" |
| **Logs/Metrics** | High | "Error rate spiked at 14:32 UTC, correlating with deploy #47" |
| **Code Reading** | Medium | "This function does not handle the null case" |
| **User Reports** | Medium-Low | "Users say it happens on mobile" (may be incomplete) |
| **Intuition** | Lowest | "I think it might be a race condition" (must be tested) |

## Hypothesis Testing Checklist

For each hypothesis, answer these before declaring it the cause:

1. **Reproducible?** Can you make the problem happen on demand?
2. **Timing match?** Does the evidence timeline align with when the issue started?
3. **Scope match?** Does it explain ALL the symptoms, or only some?
4. **Alternatives eliminated?** Have you ruled out other plausible causes?
5. **Fix verifiable?** If you apply a fix, can you confirm the symptoms stop?

## Self-Consistency Check

Apply the self-consistency technique from prompt engineering: generate multiple independent reasoning paths to the same conclusion. If your investigation and a colleague's independent investigation point to the same root cause, confidence increases significantly.

## Investigation Report Template

```markdown
## Investigation: [Issue Title]
- **Reported:** [Date, by whom]
- **Symptoms:** [Bullet list of observable problems]
- **Timeline:** [When it started, key events]
- **Hypotheses Tested:**
  1. [Hypothesis A] -- [Evidence] -- [Confirmed/Refuted]
  2. [Hypothesis B] -- [Evidence] -- [Confirmed/Refuted]
- **Root Cause:** [One sentence]
- **Fix Applied:** [What was changed]
- **Verification:** [How we confirmed the fix works]
- **Prevention:** [What we will do to prevent recurrence]
```

## Anti-Patterns

- Jumping to a fix without confirming the root cause
- Investigating only one hypothesis (confirmation bias)
- Relying on intuition when logs and metrics are available
- Declaring "fixed" without verifying the symptoms are gone
- Skipping the prevention step (same bug will recur)
