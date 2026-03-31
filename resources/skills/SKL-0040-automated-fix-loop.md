---
id: SKL-0040
name: Automated Fix Loop
category: skills
tags: [prompt-engineering, automated-fixing, iterative-repair, react-pattern, self-correction, ci-cd, linting, test-driven]
capabilities: [automated-repair, iterative-debugging, self-correction-loops]
useWhen:
  - fixing linting errors or type errors across a codebase automatically
  - running a test-fix-retest cycle until all tests pass
  - applying automated code fixes after a CI failure
  - iterating on AI-generated code that does not pass validation
  - batch-fixing repetitive code issues (imports, naming, formatting)
estimatedTokens: 600
relatedFragments: [SKL-0042, SKL-0041, PAT-0001, PAT-0010]
dependencies: []
synonyms: ["how to automatically fix failing tests", "how to run fix and retest in a loop", "automated code repair", "how to fix lint errors automatically", "iterative debugging process"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
difficulty: advanced
owner: fixer
pillar: "framework-core"
---

# Automated Fix Loop

An iterative repair pattern that applies the ReAct (Reason + Act) framework from prompt engineering to code fixing: observe the error, reason about the fix, apply the fix, verify, repeat.

## When to Use

Use the Automated Fix Loop when you have a deterministic validation step (tests, linter, type checker, build) and the fixes are mechanical or pattern-based. Do not use for complex logic bugs that require understanding business context.

## The Loop Pattern

```
WHILE (validation fails) AND (attempts < MAX_ATTEMPTS):
  1. RUN validation (test, lint, build, type-check)
  2. PARSE error output (file, line, error type, message)
  3. CLASSIFY the error (syntax, type, import, logic, config)
  4. GENERATE fix based on error classification
  5. APPLY fix to the codebase
  6. INCREMENT attempt counter
  7. GOTO 1

IF attempts >= MAX_ATTEMPTS:
  REPORT remaining errors and request human intervention
```

## Error Classification Table

| Error Class | Example | Fix Strategy |
|------------|---------|-------------|
| **Missing import** | `Cannot find module 'foo'` | Add import statement or install package |
| **Type mismatch** | `Type 'string' is not assignable to 'number'` | Cast, convert, or fix the source type |
| **Unused variable** | `'x' is declared but never used` | Remove declaration or prefix with `_` |
| **Syntax error** | `Unexpected token` | Fix the syntax at the indicated location |
| **Test assertion** | `Expected 5, received 3` | Fix the implementation, not the test |
| **Config/env** | `Missing env variable FOO` | Add to `.env` or config, never hardcode |

## Implementation Steps

1. **Set MAX_ATTEMPTS.** Default to 5. Diminishing returns beyond that. If 5 iterations do not fix it, the problem is not mechanical.
2. **Parse errors structurally.** Extract file path, line number, error code, and message. Do not try to fix errors you cannot parse.
3. **Fix one error class at a time.** Fixing a type error may resolve 10 downstream errors. Re-run validation after each fix category.
4. **Never modify tests to make them pass.** The fix must be in the implementation. The only exception is when the test itself has a bug (wrong expected value).
5. **Track what you changed.** Keep a log of every file modified and why. This is your audit trail.

## Safety Guards

- **Idempotent fixes only.** A fix applied twice should not create a new error.
- **Diff review gate.** After the loop completes, review the total diff before committing. Automated fixes can accumulate surprising changes.
- **Scope limit.** Only fix files related to the original change. If the loop starts touching unrelated files, stop and escalate.
- **Rollback capability.** Work on a branch or stash before starting. If the loop makes things worse, revert cleanly.

## Integration with CI

```yaml
# GitHub Actions example
- name: Fix and verify
  run: |
    for i in $(seq 1 5); do
      npm run lint:fix && npm test && break
      echo "Attempt $i failed, retrying..."
    done
```

## Anti-Patterns

- Running the loop without a maximum attempt limit (infinite loop)
- Modifying tests to match broken implementation
- Fixing errors in unrelated files
- Applying fixes without understanding the error class
- Skipping the final diff review before committing
