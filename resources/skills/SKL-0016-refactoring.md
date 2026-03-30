---
id: SKL-0016
name: Refactoring
category: skills
tags: [refactoring, clean-code, code-quality, maintainability, SOLID, naming, duplication]
capabilities: [code-restructuring, duplication-removal, naming-improvement, dead-code-removal, function-extraction]
useWhen:
  - improving code structure without changing behavior
  - extracting repeated code into reusable functions
  - cleaning up naming, simplifying conditionals, or removing dead code
  - reducing function argument counts by introducing options objects
  - applying SOLID principles to existing code
estimatedTokens: 500
relatedFragments: [SKL-0002, SKL-0003]
dependencies: []
synonyms: ["clean up my messy code", "organize my code better", "remove duplicate code", "rename things to make sense", "simplify this function"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/ryanmcdermott/clean-code-javascript"
difficulty: intermediate
---

# Refactoring

Restructure existing code to be more readable, reusable, and refactorable without changing external behavior. Grounded in Clean Code principles adapted for JavaScript.

## Refactoring Targets (Priority Order)

| Target | Smell | Fix |
|--------|-------|-----|
| Functions doing multiple things | Long function with mixed concerns | Extract each concern into its own named function |
| Too many arguments | 3+ function parameters | Use a single options/config object with destructuring |
| Unclear names | `data`, `info`, `temp`, `l`, `yyyymmdstr` | Use pronounceable, searchable, intention-revealing names |
| Duplicate logic | Same pattern in 2+ places | Extract shared abstraction (function, module, class) |
| Magic numbers/strings | `setTimeout(fn, 86400000)` | Extract as named constant: `MILLISECONDS_PER_DAY` |
| Mental mapping | Single-letter variables in callbacks | Use descriptive names (`location` not `l`) |
| Deep nesting | 3+ levels of if/for | Early returns, guard clauses, extract helpers |
| Dead code | Unreachable functions, commented blocks | Delete it. Version control remembers. |

## Procedure

### 1. Verify Tests Exist

Before touching anything:

- **Tests exist:** Run them and confirm all pass
- **No tests:** Warn the user that refactoring without tests carries risk. Get confirmation before proceeding.

### 2. Define Scope Narrowly

- What specific improvement are you making?
- What is out of scope?
- Will any public interface change? If yes, stop. That is a breaking change, not a refactor.

### 3. Apply One Improvement at a Time

Follow the single-responsibility principle of refactoring:

1. **Extract** repeated code into named functions
2. **Rename** for clarity (same vocabulary for same concept)
3. **Reduce** function arguments using destructuring objects
4. **Replace** conditionals with polymorphism where types diverge
5. **Remove** dead code, unnecessary comments, and redundant context
6. **Flatten** nested logic with early returns

### 4. Verify After Each Step

Run tests after every change. If they fail, revert and investigate. Never batch multiple refactors into one untested change.

## Key Rules

- Never change behavior, only structure
- Never change public APIs or interfaces
- Functions should do one thing at one level of abstraction
- Prefer explicit over implicit (no mental mapping)
- Remove duplicate code, but only when the abstraction is right. Bad abstractions are worse than duplication.
- Keep refactoring and bug fixing as separate tasks
