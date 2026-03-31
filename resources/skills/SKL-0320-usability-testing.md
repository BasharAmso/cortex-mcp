---
id: SKL-0320
name: Usability Testing
category: skills
tags: [usability-testing, think-aloud, task-scenarios, user-testing, ux-research, moderated-testing]
capabilities: [test-planning, task-scenario-writing, think-aloud-facilitation, usability-analysis, report-generation]
useWhen:
  - validating whether users can complete key tasks in your interface
  - planning a moderated or unmoderated usability test
  - writing task scenarios for usability sessions
  - analyzing usability test results and prioritizing fixes
  - reporting usability findings to stakeholders
estimatedTokens: 650
relatedFragments: [SKL-0103, SKL-0023, SKL-0326, PAT-0169]
dependencies: []
synonyms: ["how to run a usability test", "what is think-aloud testing", "how to write usability task scenarios", "how many users do I need for usability testing", "how to report usability findings", "best way to test my UI with real users"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/formbricks/formbricks"
difficulty: beginner
owner: "cortex"
pillar: "ux-design"
---

# Skill: Usability Testing

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0320 |
| **Name** | Usability Testing |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Usability testing reveals whether real people can accomplish tasks in your product. It is the single most effective method for finding interface problems before they reach production. Five participants typically uncover 85% of usability issues (Nielsen's heuristic). Start testing early with rough prototypes, not only with polished builds.

### Test Formats

| Format | Best For | Participants | Cost |
|--------|----------|-------------|------|
| **Moderated in-person** | Complex flows, emotional reactions | 5-8 | High |
| **Moderated remote** | Geographically distributed users | 5-8 | Medium |
| **Unmoderated remote** | Large-scale validation, A/B comparison | 20-50+ | Low per session |
| **Guerrilla** | Quick gut checks on specific screens | 3-5 | Minimal |

### Writing Task Scenarios

Good scenarios describe a realistic goal without hinting at the UI path:

- **Bad**: "Click the hamburger menu and select Account Settings to update your email."
- **Good**: "Your email address recently changed. Update your account to use your new email."

Each scenario should include: context (why the user is doing this), the goal (what they need to accomplish), and success criteria (how you know they finished).

### Think-Aloud Protocol

Ask participants to verbalize their thoughts while completing tasks. The moderator's role is to listen and probe, not guide:

1. **Before**: Explain that you are testing the product, not the person
2. **During**: Use neutral prompts ("What are you thinking?", "What do you expect to happen?")
3. **Never**: Lead with "Did you see the button?" or "Try clicking over there"
4. **Note**: Silence often signals confusion; gently prompt "What's going through your mind?"

### Analysis Framework

After sessions, organize findings by severity:

| Severity | Definition | Action |
|----------|-----------|--------|
| **Critical** | User cannot complete the task at all | Fix before launch |
| **Major** | User completes the task but with significant difficulty or errors | Fix in current cycle |
| **Minor** | User notices the issue but works around it easily | Schedule for next cycle |
| **Cosmetic** | Preference or polish issue, no functional impact | Backlog |

Count how many participants hit each issue. Problems observed in 3+ out of 5 participants are systemic, not individual quirks.

### Reporting Usability Findings

A usability report should be actionable, not academic:

- **Executive summary**: Top 3 findings with severity and recommended fixes
- **Task success table**: Pass/fail/assist per task per participant
- **Issue list**: Each issue with screenshot, severity, frequency, and fix recommendation
- **Positive findings**: What worked well (builds stakeholder trust in the process)

Keep the report under 10 pages. Stakeholders read the executive summary; developers read the issue list.

## Key Takeaways

- Five participants uncover most usability problems; test early and often rather than once with many users
- Write task scenarios that describe goals, not UI instructions
- The think-aloud protocol surfaces confusion in real time; the moderator listens, never leads
- Classify findings by severity and frequency to prioritize fixes objectively
- Include positive findings in reports to maintain organizational support for testing
