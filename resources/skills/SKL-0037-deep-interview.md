---
id: SKL-0037
name: Deep Interview
category: skills
tags: [prompt-engineering, chain-of-thought, interview, requirements-gathering, clarification, elicitation, few-shot]
capabilities: [requirements-elicitation, stakeholder-interviewing, structured-questioning]
useWhen:
  - gathering detailed requirements from a stakeholder before building
  - clarifying ambiguous feature requests through structured questions
  - conducting a discovery interview for a new product or project
  - extracting tacit knowledge from domain experts
  - validating assumptions before writing a PRD or spec
estimatedTokens: 600
relatedFragments: [SKL-0038, SKL-0039, PAT-0002]
dependencies: []
synonyms: ["how to ask better questions about requirements", "how to figure out what the client really wants", "how to interview someone about their idea", "getting requirements from stakeholders", "how to do a discovery call"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
difficulty: intermediate
owner: product-manager
---

# Deep Interview

A structured questioning technique to extract clear, actionable requirements from stakeholders. Uses prompt engineering principles (chain-of-thought, few-shot prompting) to guide the conversation from vague ideas to concrete specifications.

## When to Use

Use Deep Interview before any build phase when requirements are unclear, the stakeholder has a vision but not a spec, or you suspect unstated assumptions. The goal is to surface constraints, priorities, and edge cases that would otherwise emerge mid-development.

## Interview Structure (5 Phases)

| Phase | Duration | Goal | Key Questions |
|-------|----------|------|--------------|
| **1. Context** | 5 min | Understand the problem space | "Who experiences this problem? How often? What happens today?" |
| **2. Vision** | 5 min | Clarify the desired outcome | "What does success look like? How would you measure it?" |
| **3. Constraints** | 5 min | Surface hard limits | "What is the deadline? Budget? Tech stack constraints? Regulatory requirements?" |
| **4. Edge Cases** | 10 min | Find the hidden complexity | "What happens when X fails? What about users who do Y? What is the worst case?" |
| **5. Priorities** | 5 min | Force-rank requirements | "If you could only ship one feature, which one? What can wait for v2?" |

## Chain-of-Thought Questioning

Apply chain-of-thought reasoning from the Prompt Engineering Guide: break complex topics into sequential sub-questions rather than asking one big question.

1. **Start broad:** "Tell me about the problem you are solving."
2. **Narrow progressively:** "You mentioned onboarding is painful. Which specific step causes the most drop-off?"
3. **Confirm understanding:** "So if I understand correctly, the main issue is [X]. Is that right?"
4. **Probe assumptions:** "You said users need real-time updates. What latency is acceptable? 1 second? 30 seconds?"

## Few-Shot Prompting for Requirements

When the stakeholder struggles to articulate requirements, provide examples:

- "Other teams have handled this by [A] or [B]. Does either of those match what you are thinking?"
- "Here is an example user story: 'As a [role], I want [action] so that [benefit].' Can you fill in the blanks for your feature?"

## Output Format

After the interview, produce a structured summary:

```markdown
## Interview Summary
- **Problem:** [One sentence]
- **Users:** [Who is affected]
- **Success Metric:** [How we know it worked]
- **Must-Have Requirements:** [Numbered list]
- **Nice-to-Have:** [Numbered list]
- **Constraints:** [Technical, timeline, regulatory]
- **Open Questions:** [What still needs answers]
- **Risks:** [What could go wrong]
```

## Anti-Patterns

- Asking leading questions that confirm your own assumptions
- Skipping the priorities phase (everything becomes "must-have")
- Interviewing only one stakeholder when multiple are affected
- Writing code before the open questions are resolved
- Treating the interview as a one-time event instead of iterating
