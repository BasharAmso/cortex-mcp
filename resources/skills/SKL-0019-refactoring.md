---
id: SKL-0019
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
relatedFragments: [SKL-0016, SKL-0017]
dependencies: []
synonyms: ["clean up my messy code", "organize my code better", "remove duplicate code", "rename things to make sense", "simplify this function"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/ryanmcdermott/clean-code-javascript"
difficulty: intermediate
owner: fixer
---

# Skill: Refactoring

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0019 |
| **Version** | 1.0 |
| **Owner** | fixer |
| **Inputs** | Target files, STATE.md, DECISIONS.md, existing tests |
| **Outputs** | Refactored files, STATE.md updated |
| **Triggers** | `REFACTOR_REQUESTED` |

---

## Purpose

Improve internal structure of working code without changing behavior. Behavior before and after: identical. Structure before and after: better.

---

## Procedure

1. **Check for existing tests** before refactoring:
   - Tests exist: confirm they pass before starting
   - No tests: warn user that refactoring without tests carries risk; request confirmation
2. **Define refactor scope narrowly:**
   - What specific improvement?
   - What is out of scope?
   - Will any public interface change? If yes: stop — that's a breaking change, not a refactor
3. **Refactor in small steps** — one improvement at a time:
   - Extract repeated code into functions
   - Rename for clarity
   - Break large functions into smaller ones
   - Remove dead code
   - Simplify conditionals
   - Consolidate duplicated logic
4. **Verify behavior unchanged** after each step:
   - Run existing tests; if they fail, revert and investigate
   - If no tests: manually verify affected behavior
5. **Update STATE.md.**

---

## Constraints

- Never changes behavior — only structure
- Never changes public APIs or interfaces
- Always works in small verifiable steps
- Always warns user when no tests exist

---

## Primary Agent

fixer

---

## Definition of Done

- [ ] Test status checked before starting
- [ ] Refactor scope defined and limited
- [ ] No public interfaces changed
- [ ] All tests pass after refactoring (or behavior manually verified)
- [ ] STATE.md updated
