---
id: SKL-0325
name: User Flow Design
category: skills
tags: [user-flows, task-flows, happy-path, error-paths, decision-points, journey-mapping]
capabilities: [flow-diagramming, happy-path-design, error-path-design, decision-point-mapping, flow-optimization]
useWhen:
  - mapping the steps a user takes to complete a task
  - designing happy paths and error recovery flows
  - identifying decision points and branching logic in a user journey
  - optimizing a flow to reduce steps and friction
  - communicating interaction logic to developers
estimatedTokens: 650
relatedFragments: [SKL-0321, SKL-0324, PAT-0169, PAT-0166]
dependencies: []
synonyms: ["how to map a user flow", "what is a task flow diagram", "how to design the happy path", "how to handle error flows in UX", "best way to diagram user steps", "how to reduce steps in a user flow"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "ux-design"
---

# Skill: User Flow Design

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0325 |
| **Name** | User Flow Design |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

A user flow diagrams the sequence of steps a user takes to accomplish a goal. Flows expose friction, dead ends, and unnecessary complexity before any code is written. They are the cheapest way to find structural problems in an experience.

### Flow Types

| Type | Scope | Shows |
|------|-------|-------|
| **Task flow** | Single task, single path | The linear steps for one goal (e.g., "reset password") |
| **User flow** | Single task, multiple paths | All paths through a task, including branches and errors |
| **Wireflow** | Multiple tasks, visual | User flows overlaid on wireframe screens |
| **Journey map** | End-to-end experience | Emotional arc, touchpoints, pain points across time |

Start with task flows for individual features, then combine them into user flows when you need to map decision points.

### Flow Notation

Use standard shapes for clarity:

```
[Rectangle]     = Screen or page the user sees
<Diamond>       = Decision point (yes/no, conditional)
(Rounded rect)  = Action the user takes
((Circle))      = Start or end point
-->             = Direction of flow
```

Example: Sign-up flow
```
((Start)) --> [Landing Page] --> (Click Sign Up) --> [Sign Up Form]
  --> (Submit Form) --> <Valid?>
    -- Yes --> [Email Verification] --> (Click Link) --> [Dashboard] --> ((End))
    -- No --> [Form with Errors] --> (Fix and Resubmit) --> <Valid?>
```

### Designing the Happy Path

The happy path is the ideal flow where everything goes right. Design it first:

1. **Define the entry point**: Where does the user start? (link, button, notification, direct URL)
2. **List minimum steps**: What is the fewest number of actions to reach the goal?
3. **Eliminate unnecessary screens**: Every additional screen is a drop-off opportunity
4. **End with confirmation**: The user should always know they succeeded (success screen, toast, redirect)

Rule of thumb: every step in a flow loses 10-20% of users. A 7-step flow may retain only 25% of starters. Ruthlessly reduce steps.

### Designing Error Paths

Error paths are where most UX problems hide. For each step in the happy path, ask:

- **What can go wrong?** (validation failure, timeout, permission denied, empty state)
- **How does the user know?** (inline error, toast, redirect, modal)
- **How do they recover?** (retry, edit, go back, contact support)
- **Where do they land?** (same screen with errors highlighted, a fallback screen)

Best practices for error recovery:
- Keep the user on the same screen when possible; do not redirect to a generic error page
- Preserve all user input on validation failure; never clear the form
- Provide specific, actionable error messages ("Password must be 8+ characters" not "Invalid input")
- Offer an escape hatch (skip, cancel, save draft) for non-critical flows

### Flow Optimization Checklist

- Can any two consecutive screens be merged into one?
- Can any decision point be eliminated with smart defaults?
- Is there a shortcut for returning users (pre-fill, remember choice)?
- Does every dead end have a clear path forward?
- Is the success state obvious and satisfying?

## Key Takeaways

- Design the happy path first with the minimum steps, then map every error path
- Every additional step loses 10-20% of users; reduce steps ruthlessly
- Use standard flow notation so developers and designers share the same vocabulary
- Error paths are where the real UX problems live; design them deliberately, not as afterthoughts
- End every flow with clear confirmation so the user knows they succeeded
