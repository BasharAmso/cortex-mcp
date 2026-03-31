---
id: SKL-0403
name: Mentoring Other Developers
category: skills
tags: [mentoring, pair-programming, feedback, knowledge-transfer, growth-plans, coaching]
capabilities: [effective-pairing, constructive-feedback, growth-plan-creation, knowledge-transfer]
useWhen:
  - mentoring a junior developer on your team
  - running effective pair programming sessions
  - giving constructive code review feedback that teaches
  - creating a growth plan for a direct report or mentee
  - transferring domain knowledge to new team members
estimatedTokens: 650
relatedFragments: [SKL-0399, PAT-0206, SKL-0397, SKL-0402]
dependencies: []
synonyms: ["how to mentor junior developers", "pair programming best practices", "give better code review feedback", "create a developer growth plan", "knowledge transfer techniques", "coaching new engineers"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: "cortex"
pillar: "developer-growth"
---

# Skill: Mentoring Other Developers

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0403 |
| **Name** | Mentoring Other Developers |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Effective mentoring is the highest-leverage activity a senior developer can do. One hour of good mentoring can save a junior developer days of frustration and permanently level up their thinking.

### The Mentoring Mindset

The goal is not to make someone code like you. It is to help them develop their own problem-solving ability. This means:

- **Ask before telling.** "What approaches have you considered?" teaches more than "Here is how I would do it."
- **Let them struggle productively.** There is a zone between "too easy" and "stuck." Stay in that zone. Intervene when frustration becomes unproductive (20-30 minutes on the same problem with no new ideas).
- **Explain the why, not just the what.** "We use dependency injection here because it makes testing easier" is mentoring. "Just use dependency injection" is instruction.
- **Normalize not knowing.** Share your own process for learning new things. Show how you search for answers, read documentation, and experiment.

### Effective Pair Programming

Pair programming is the most powerful mentoring tool when done well, and the most wasteful when done poorly.

**Navigator-Driver Model:**
- **Driver**: Types code, focuses on syntax and implementation
- **Navigator**: Thinks ahead, spots issues, suggests direction

**For mentoring sessions**, the junior should drive most of the time. If the senior drives, the junior watches passively and retains little. When the junior drives:
- They encounter problems firsthand
- The senior can ask guiding questions ("What type does this function return?")
- Mistakes become learning moments, not just corrections

**Session length**: 45-60 minutes maximum. Pairing is cognitively intense. Schedule breaks.

**Anti-patterns to avoid:**
- Senior taking the keyboard to "quickly fix" something (disempowering)
- Watching in silence for long periods (unhelpful)
- Criticizing every line in real-time (demoralizing)

### Giving Feedback That Teaches

The best code review feedback creates understanding, not just compliance:

| Feedback Type | Example | Learning Value |
|--------------|---------|---------------|
| **Just a correction** | "Change this to `const`" | Zero. They will comply but not understand. |
| **Correction + reason** | "Use `const` because this value never changes. `const` signals intent to future readers." | Medium. They learn the principle. |
| **Question that leads to discovery** | "What happens if another developer mutates this variable later? How could you prevent that?" | High. They discover the principle themselves. |

Reserve the question approach for important concepts. Minor style issues just need a quick correction.

### Creating Growth Plans

A growth plan gives structure to mentoring. Review and update monthly.

Template:
1. **Current strengths** (3 items): What they already do well. Start here to build confidence.
2. **Growth areas** (2-3 items): Specific skills to develop. Not vague ("get better at coding") but concrete ("write SQL queries for reporting features independently").
3. **Learning activities**: For each growth area, define 1-2 activities (read X, build Y, pair on Z).
4. **Milestones**: Observable indicators of progress. "Can design a database schema for a new feature and explain trade-offs without assistance."
5. **Check-in cadence**: Weekly 30-minute 1:1s plus monthly growth plan review.

### Knowledge Transfer Techniques

When onboarding someone to a codebase or domain:

1. **Architecture walkthrough**: 30-minute whiteboard session covering the system at a high level. Record it for future hires.
2. **Guided code reading**: Walk through one request from API entry point to database and back. This teaches the codebase structure faster than reading files randomly.
3. **Shadowing**: Have them watch you debug a real production issue, narrating your thought process aloud.
4. **Graduated ownership**: Assign progressively larger tasks: bug fix, small feature, feature with design decisions, feature with cross-team coordination.

## Key Takeaways

- Ask before telling: guiding questions build problem-solving ability that lasts
- In pair programming, the junior should drive; the senior navigates with questions
- Feedback that explains "why" or asks leading questions teaches far more than corrections alone
- Growth plans need concrete skills and observable milestones, not vague goals
- Transfer knowledge through architecture walkthroughs, guided code reading, and graduated ownership
