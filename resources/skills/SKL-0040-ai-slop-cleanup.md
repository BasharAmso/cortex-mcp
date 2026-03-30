---
id: SKL-0040
name: AI Slop Cleanup
category: skills
tags: [prompt-engineering, code-quality, ai-generated-code, cleanup, refactoring, dead-code, over-engineering, code-review]
capabilities: [ai-code-review, slop-detection, code-cleanup, quality-improvement]
useWhen:
  - reviewing AI-generated code before committing
  - cleaning up verbose or over-engineered AI output
  - removing dead code, unnecessary abstractions, or redundant comments
  - standardizing AI-generated code to match project conventions
  - improving readability of code that "works but looks weird"
estimatedTokens: 600
relatedFragments: [SKL-0039, SKL-0037, PAT-0006]
dependencies: []
synonyms: ["how to clean up AI generated code", "AI code is too verbose", "how to fix sloppy code from copilot", "AI wrote too many comments", "code from chatgpt needs cleanup"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
difficulty: intermediate
---

# AI Slop Cleanup

A systematic process for identifying and removing low-quality patterns in AI-generated code. AI tools produce functional code quickly, but that code often contains characteristic "slop" patterns that degrade maintainability.

## Common AI Slop Patterns

| Pattern | Example | Fix |
|---------|---------|-----|
| **Over-commenting** | Comments that restate the code (`// increment counter` above `counter++`) | Remove comments that add no information. Keep only "why" comments. |
| **Unnecessary abstractions** | A wrapper function that calls one function | Inline the wrapper. Abstractions should earn their existence. |
| **Dead code** | Commented-out alternatives, unused imports, unreachable branches | Delete it. Version control remembers. |
| **Verbose naming** | `userDataInformationObject` | Rename to `user`. Names should be precise, not long. |
| **Defensive over-checking** | `if (x !== null && x !== undefined && typeof x !== 'undefined')` | Use `if (x != null)` or proper TypeScript types. |
| **Inconsistent style** | Mix of arrow functions and function declarations in the same file | Pick the project convention, apply consistently. |
| **Magic strings/numbers** | `if (status === 'active')` repeated 5 times | Extract to a constant: `const ACTIVE = 'active'` |
| **Kitchen-sink imports** | Importing entire libraries when one function is needed | Use named imports: `import { debounce } from 'lodash'` |

## Cleanup Checklist (Sequential)

1. **Delete dead code.** Remove all commented-out code, unused imports, and unreachable branches. This is always safe and makes everything else easier to read.
2. **Remove redundant comments.** Keep only comments that explain WHY, not WHAT. Code should be self-documenting for the "what."
3. **Inline trivial abstractions.** If a function is called once and its name just restates the body, inline it.
4. **Apply project naming conventions.** Rename variables, functions, and files to match existing patterns in the codebase.
5. **Simplify conditionals.** Replace nested if/else chains with early returns, guard clauses, or switch statements.
6. **Extract magic values.** Replace repeated strings and numbers with named constants.
7. **Verify types.** Tighten TypeScript types. Replace `any` with specific types. Add return types to exported functions.
8. **Run linter and formatter.** Let tooling handle formatting debates. ESLint + Prettier (or Biome) should have the final word.

## The "Would I Write This?" Test

For every block of AI-generated code, ask: "If I wrote this by hand, would it look like this?" If not, it needs cleanup. AI tends to optimize for correctness at the expense of clarity. Your job is to restore clarity without breaking correctness.

## When to Regenerate vs. Clean Up

- **Clean up** when the logic is correct but the style is wrong
- **Regenerate** when the approach is fundamentally over-engineered (3 files for something that should be 1 function)
- **Rewrite manually** when the AI misunderstood the intent entirely

## Anti-Patterns

- Accepting AI code without reading it ("it passed the tests")
- Keeping AI-generated comments as-is (they are often wrong or trivial)
- Adding more abstractions on top of over-abstracted AI code
- Cleaning up style without verifying the logic is correct first
- Treating AI output as authoritative (it is a first draft, not a final answer)
