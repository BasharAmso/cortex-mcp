---
id: SKL-0174
name: Pair Programming
category: skills
tags: [pair-programming, collaboration, driver-navigator, remote-pairing, communication, teamwork]
capabilities: [pair-session-facilitation, role-switching, remote-collaboration, knowledge-sharing]
useWhen:
  - setting up a pair programming session with a colleague
  - learning the driver and navigator roles
  - choosing tools for remote pair programming
  - improving communication during collaborative coding
  - onboarding a new team member through pairing
estimatedTokens: 600
relatedFragments: [SKL-0175, SKL-0172, PAT-0091]
dependencies: []
synonyms: ["how does pair programming work", "what are driver and navigator roles in pairing", "what tools do I use for remote pair programming", "how to pair program effectively", "what is the etiquette for pair programming"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/TheOdinProject/curriculum"
difficulty: beginner
owner: "cortex"
pillar: "coding-literacy"
---

# Skill: Pair Programming

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0174 |
| **Name** | Pair Programming |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Pair programming is two people working together on the same code at the same time. One person writes code while the other thinks strategically about direction and catches mistakes. It is one of the most effective ways to learn, share knowledge, and produce higher-quality code.

### The Two Roles

**Driver**: The person with their hands on the keyboard. The driver writes code, types commands, and navigates files. Their focus is on the tactical "how" of implementation. The driver should think out loud, explaining what they are typing and why.

**Navigator**: The person watching, thinking, and guiding. The navigator focuses on the bigger picture: is this the right approach? Are we missing an edge case? What should we tackle next? The navigator reviews each line as it is written and catches typos, logic errors, and design issues in real time.

**Switching roles regularly** is essential. A common cadence is every 15-25 minutes or after completing a logical unit of work. Both participants should spend equal time in each role.

### Communication Practices

- **Think out loud**: Both the driver and navigator should vocalize their thought process. Silence is the enemy of effective pairing.
- **Ask, do not grab**: The navigator should suggest direction ("Try extracting that into a function") rather than dictating keystrokes ("Type const, space, extract...")
- **Be patient**: If your partner is slower than you, resist the urge to take over. The learning value of pairing comes from both people engaging.
- **Celebrate small wins**: Acknowledge when something works. Pairing is more productive when the energy is positive.

### Remote Pairing Tools

Remote pair programming requires a shared coding environment:

- **VS Code Live Share**: Real-time collaborative editing with shared terminals and debugging. The most popular choice for remote pairing.
- **Screen sharing** (Zoom, Google Meet, Discord): Simple but only one person can type. Works for driver/navigator but not simultaneous editing.
- **CodeSandbox / Replit**: Browser-based environments where both participants can edit. Good for quick sessions without setup.
- **tmux/SSH sharing**: Terminal-based sharing for backend or CLI work. Lightweight but requires comfort with terminal workflows.

### When Pairing Works Best

- **Onboarding new team members**: The fastest way to transfer codebase knowledge
- **Solving complex problems**: Two perspectives catch more edge cases and find better solutions
- **Learning new technologies**: Pairing with someone experienced accelerates learning dramatically
- **Code that needs to be right**: Critical paths, security-sensitive logic, and tricky algorithms benefit from real-time review

### When to Work Solo

Pairing is not always the right choice. Routine tasks, well-understood changes, and work requiring deep individual focus are often better done alone. Use pairing strategically, not as a blanket policy.

## Key Takeaways

- The driver writes code and thinks tactically; the navigator watches and thinks strategically
- Switch roles every 15-25 minutes so both people stay engaged
- Thinking out loud is the single most important communication practice during pairing
- VS Code Live Share is the most versatile tool for remote pair programming
- Pairing is most valuable for onboarding, complex problems, and learning new technologies
