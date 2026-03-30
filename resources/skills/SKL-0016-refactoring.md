---
id: SKL-0016
name: Refactoring
category: skills
tags: [refactoring, maintenance, cleanup, code-quality]
capabilities: [code-restructuring, duplication-removal, naming-improvement, dead-code-removal]
useWhen:
  - improving code structure without changing behavior
  - extracting repeated code into reusable functions
  - cleaning up naming, simplifying conditionals, or removing dead code
estimatedTokens: 500
relatedFragments: [SKL-0002, SKL-0003]
dependencies: []
synonyms: ["clean up my messy code", "organize my code better", "remove duplicate code", "rename things to make sense", "simplify this function"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Refactoring

Restructure and clean up existing code without changing behavior. Structure improves; behavior stays identical.

## Procedure

### 1. Verify Tests Exist

Before touching anything, check for tests:

- **Tests exist:** Run them and confirm they pass
- **No tests:** Warn the user that refactoring without tests carries risk. Get confirmation before proceeding.

### 2. Define Scope Narrowly

Answer these before starting:

- What specific improvement are you making?
- What is out of scope?
- Will any public interface change? If yes, stop. That is a breaking change, not a refactor.

### 3. Refactor in Small Steps

One improvement at a time:

- Extract repeated code into functions
- Rename for clarity
- Break large functions into smaller ones
- Remove dead code
- Simplify conditionals
- Consolidate duplicated logic

### 4. Verify After Each Step

- Run tests after each change. If they fail, revert and investigate.
- If no tests exist, manually verify affected behavior.

## Key Rules

- Never change behavior, only structure
- Never change public APIs or interfaces
- Always work in small, verifiable steps
- Always warn when no tests exist
- Keep refactoring and bug fixing as separate tasks
