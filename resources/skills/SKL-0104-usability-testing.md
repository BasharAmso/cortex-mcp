---
id: SKL-0104
name: Usability Testing
category: skills
tags: [usability-testing, test-scripts, think-aloud, heuristic-evaluation, remote-testing, task-based-testing, moderated, unmoderated]
capabilities: [test-script-writing, task-design, facilitation-guidance, findings-analysis, heuristic-review]
useWhen:
  - validating whether users can complete key tasks in a prototype or live product
  - writing test scripts and task scenarios for usability sessions
  - planning remote or in-person moderated testing
  - running a heuristic evaluation before user testing
estimatedTokens: 700
relatedFragments: [SKL-0023, SKL-0103, SKL-0107, SKL-0003]
dependencies: []
synonyms: ["how do I test my app with real users", "write a usability test script", "can users figure out my interface", "think aloud testing", "how to run a user test", "heuristic evaluation checklist"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/18F/ux-guide"
difficulty: intermediate
owner: reviewer
---

# Usability Testing

Test whether real users can accomplish real tasks. Usability testing reveals what works and what confuses, using direct observation rather than opinion.

## Testing Formats

| Format | When to Use | Participants | Cost |
|--------|------------|--------------|------|
| **Moderated remote** | Most common; flexible scheduling | 5-8 per round | Low |
| **Moderated in-person** | Physical products, complex workflows | 5-8 per round | Medium |
| **Unmoderated remote** | Large-scale validation, simple tasks | 20-50+ | Low per session |
| **Guerrilla** | Quick validation, early concepts | 3-5 informal | Minimal |

## Writing a Test Script

Structure every test session document with these sections:

1. **Introduction**: Explain the session purpose, get consent, emphasize there are no wrong answers
2. **Warm-up questions**: 2-3 background questions to understand context and put participants at ease
3. **Task scenarios**: 3-5 realistic tasks written as user goals, not instructions
4. **Follow-up probes**: Questions for after each task ("What did you expect to happen?")
5. **Wrap-up**: Open-ended closing ("Anything else you want to share?")

### Task Design Rules

- Frame tasks as goals: "You want to update your shipping address" not "Click Settings, then Profile"
- Use realistic scenarios with context: "Your friend recommended this app for tracking expenses"
- Order tasks from simple to complex to build participant confidence
- Include one task you expect to fail to identify breaking points

## Think-Aloud Protocol

Ask participants to verbalize their thoughts while completing tasks. Two variants:

- **Concurrent**: Narrate while doing. Reveals real-time decision-making but may slow participants down.
- **Retrospective**: Complete the task first, then walk through decisions on replay. Less disruptive but relies on memory.

Facilitator prompts: "What are you looking at?" / "What do you expect that to do?" / "Tell me what you're thinking."

## Heuristic Evaluation

Expert review against established criteria. Run before user testing to catch obvious issues:

| Heuristic | Check |
|-----------|-------|
| Visibility of system status | Does the user know what is happening at all times? |
| Match with real world | Does the language match user expectations, not internal jargon? |
| User control and freedom | Can users undo, go back, and exit easily? |
| Consistency | Do similar elements behave the same way throughout? |
| Error prevention | Does the design prevent mistakes before they happen? |
| Recognition over recall | Are options visible rather than requiring memorization? |
| Flexibility | Are there shortcuts for experienced users? |
| Error recovery | Do error messages explain what happened and what to do next? |

## Note-Taking During Sessions

- **Verbatim notes**: Capture exact quotes to reduce interpreter bias
- **Interaction notes**: Record actions and reactions ("scrolled past the CTA, paused on pricing")
- Separate observations (what happened) from interpretations (why you think it happened)
- Debrief as a team within 30 minutes of each session while memory is fresh

## Analyzing Results

Track task completion rate, time on task, error count, and satisfaction rating per task. Look for patterns across participants, not individual opinions. Three participants struggling with the same task is a signal; one participant's preference is an anecdote.
