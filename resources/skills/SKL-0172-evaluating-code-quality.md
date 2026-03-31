---
id: SKL-0172
name: Evaluating Code Quality
category: skills
tags: [code-quality, readability, maintainability, clean-code, review, complexity]
capabilities: [quality-assessment, readability-evaluation, complexity-detection, maintainability-judgment]
useWhen:
  - reviewing code and judging whether it is well-written
  - deciding if code needs refactoring before adding features
  - understanding why certain code is harder to maintain than other code
  - evaluating pull requests for quality beyond correctness
  - learning what separates professional code from working-but-messy code
estimatedTokens: 650
relatedFragments: [SKL-0173, SKL-0175, PAT-0091]
dependencies: []
synonyms: ["how do I tell if code is good or bad", "what makes code readable", "how to evaluate code quality", "what does clean code look like", "how to judge maintainability of a codebase"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/ryanmcdermott/clean-code-javascript"
difficulty: intermediate
owner: "cortex"
pillar: "coding-literacy"
---

# Skill: Evaluating Code Quality

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0172 |
| **Name** | Evaluating Code Quality |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Code quality is not about cleverness. It is about how easily another developer (or your future self) can read, understand, and safely change the code. The clean-code-javascript guide distills these principles into concrete patterns.

### The Three Pillars of Quality

**Readability**: Can you understand what the code does without tracing every line? Good code reads like well-organized prose. Variable names reveal intent (`remainingTrialDays` vs `d`), functions describe their action (`getUserByEmail` vs `process`), and structure follows a logical flow from high-level to low-level.

**Maintainability**: Can you change one thing without breaking five others? Maintainable code has low coupling (modules do not depend on each other's internals), high cohesion (related logic lives together), and clear boundaries between responsibilities.

**Simplicity**: Is the solution as straightforward as possible? Every extra abstraction, indirection, or configuration option is a cost. The simplest code that solves the problem correctly is usually the best code.

### Signals of Good Code

- **Meaningful names**: Variables, functions, and classes describe what they represent, not how they work
- **Small functions**: Each function does one thing. If you need the word "and" to describe what a function does, it does too much.
- **Two or fewer function parameters**: More than two arguments suggest the function is handling too many concerns. Use an options object for complex inputs.
- **Consistent abstraction levels**: A function should not mix high-level orchestration with low-level string manipulation
- **No dead code**: Commented-out code, unused variables, and unreachable branches add noise

### Signals of Poor Code

- **Magic numbers and strings**: `if (status === 3)` tells you nothing. `if (status === ORDER_COMPLETE)` tells you everything.
- **Deep nesting**: More than two or three levels of indentation usually means the logic should be extracted or restructured
- **Long files**: A 500-line file is hard to navigate. A 2000-line file is a maintenance hazard.
- **Duplicated logic**: The same pattern repeated in multiple places will eventually diverge and cause bugs
- **Misleading names**: A function called `validateUser` that also saves to the database violates expectations

### How to Evaluate During Review

When reviewing code, ask these questions in order:

1. **Does it work?** Correctness comes first.
2. **Can I understand it in one read?** If you have to re-read a function multiple times, it needs simplification.
3. **Would I be comfortable changing this in six months?** If the answer is no, it needs better structure or documentation.
4. **Does it follow the project's conventions?** Consistency across a codebase matters more than any individual style preference.

## Key Takeaways

- Good code is readable, maintainable, and simple, in that priority order
- Meaningful names, small functions, and consistent abstraction levels are the strongest quality signals
- Deep nesting, magic values, and duplicated logic are the strongest warning signs
- Always evaluate code from the perspective of the next person who will need to change it
