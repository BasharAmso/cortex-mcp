---
id: SKL-0159
name: Debugging Strategies
category: skills
tags: [debugging, troubleshooting, bug-fixing, error-analysis, problem-solving, diagnostics]
capabilities: [bug-isolation, root-cause-analysis, error-interpretation, systematic-debugging]
useWhen:
  - encountering an error message you do not understand
  - a feature works sometimes but not always
  - trying to find where a bug was introduced
  - narrowing down a problem in a large codebase
  - understanding why code behaves differently than expected
estimatedTokens: 650
relatedFragments: [SKL-0157, SKL-0162, PAT-0085, EX-0030]
dependencies: []
synonyms: ["how to debug code", "how to find a bug", "my code is not working what do I do", "how to troubleshoot errors", "systematic debugging for beginners", "how to figure out why my code broke"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/kamranahmedse/developer-roadmap"
difficulty: beginner
owner: "cortex"
pillar: "coding-literacy"
---

# Skill: Debugging Strategies

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0159 |
| **Name** | Debugging Strategies |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Debugging is not guessing. It is a systematic process of forming hypotheses and testing them. The developer roadmap lists debugging as a core competency across every engineering path because it is the skill you use when everything else fails.

### The Scientific Method for Bugs

1. **Reproduce** - Can you make the bug happen consistently? If it is intermittent, identify the conditions that trigger it (specific input, timing, environment).
2. **Isolate** - Narrow the scope. Comment out code, use binary search (disable half the system, see if the bug persists, repeat). The goal is to find the smallest piece of code that causes the problem.
3. **Hypothesize** - Based on what you see, form a specific theory: "The user object is null because the fetch fails silently."
4. **Test** - Verify your hypothesis with a targeted check. Add a log, set a breakpoint, or write a failing test.
5. **Fix and verify** - Apply the fix, then confirm the original reproduction case passes and nothing else broke.

### Essential Techniques

- **Read the error message carefully.** Most errors tell you exactly what went wrong and where. Read the full stack trace, starting from the bottom (your code) and working up.
- **Print/log debugging.** Add `console.log` or equivalent at key points to trace data flow. Log inputs, outputs, and branch decisions.
- **Breakpoint debugging.** Use your IDE's debugger to pause execution and inspect variables in context. Step through code line by line.
- **Binary search.** When you have no idea where the bug is, disable half the code. If the bug disappears, it is in the disabled half. Repeat.
- **Git bisect.** When a bug appeared recently, use `git bisect` to find the exact commit that introduced it.
- **Rubber duck debugging.** Explain the problem out loud, step by step. The act of articulating often reveals the flaw in your reasoning.

### Common Traps

- Assuming you know where the bug is without evidence
- Fixing symptoms instead of root causes
- Making multiple changes at once (you will not know which one fixed it)
- Ignoring error messages or stack traces

## Key Takeaways

- Always reproduce the bug before trying to fix it
- Use binary search to isolate problems in large codebases
- Read the full error message and stack trace before guessing
- Change one thing at a time and verify after each change
- Use `git bisect` when a bug appeared in recent commits
