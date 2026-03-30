---
id: PAT-0060
name: AI Pipeline Orchestration
category: patterns
tags: [ai-pipeline, prompt-chaining, llm-orchestration, state-management, cost-optimization, error-recovery, multi-step-ai]
capabilities: [pipeline-design, prompt-chaining, cost-management, ai-error-recovery]
useWhen:
  - chaining multiple AI service calls into a workflow
  - building multi-step generation pipelines (text, image, audio, video)
  - managing state across AI processing steps
  - optimizing cost between cloud APIs and self-hosted models
  - designing error recovery for AI-dependent workflows
estimatedTokens: 700
relatedFragments: [SKL-0009, SKL-0135, PAT-0001]
dependencies: []
synonyms: ["how to chain AI calls together", "multi-step AI workflow", "prompt chaining pattern", "AI pipeline design", "orchestrate LLM calls", "connect multiple AI services"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/digitalsamba/claude-code-video-toolkit"
difficulty: advanced
owner: cortex
---

# AI Pipeline Orchestration

Patterns for chaining AI services into reliable, cost-effective multi-step workflows.

## Core Pattern: Phase-Based Pipeline

Break complex AI work into sequential phases, each with defined inputs, outputs, and completion criteria:

```
Planning → Generation → Processing → Refinement → Output
    ↓          ↓            ↓            ↓          ↓
  intent    raw assets   transformed   polished   delivered
```

Each phase produces artifacts that feed the next. A state file tracks what's complete, enabling resumption without reprocessing.

## State Management

Use a single source-of-truth file (JSON or similar) to track pipeline state:

```json
{
  "phase": "processing",
  "steps": {
    "planning": { "status": "complete", "output": "plan.json" },
    "generation": { "status": "complete", "output": "assets/" },
    "processing": { "status": "in_progress", "completed": 3, "total": 5 }
  }
}
```

**Rules:**
- Write state after each step completes, not just at the end
- Record intent (what was planned) and reality (what files exist)
- Reconcile intent vs reality on resume to detect drift
- Generate context files per-project so any session can pick up where another left off

## Prompt Chaining Strategies

| Strategy | When to Use |
|----------|-------------|
| **Sequential** — output of step N is input to step N+1 | Linear workflows (draft → edit → polish) |
| **Fan-out/fan-in** — parallel generation, then merge | Independent subtasks (generate 5 images, then select best) |
| **Chain-of-thought** — reasoning steps before action | Complex decisions requiring intermediate reasoning |
| **ReAct loop** — reason, act, observe, repeat | Tasks requiring tool use or external data |
| **Tree of thoughts** — explore multiple paths, prune | Problems with branching solutions |

Scope each prompt tightly. A focused prompt for one step outperforms a mega-prompt trying to do everything.

## Cost Optimization

| Approach | Trade-off |
|----------|-----------|
| **Self-hosted models** for commodity tasks | Higher setup cost, near-zero marginal cost |
| **API calls** for quality-critical steps | Pay-per-call, highest quality |
| **Tiered routing** — cheap model first, expensive model for failures | Best cost/quality balance |
| **Caching** — store and reuse outputs for identical inputs | Eliminates redundant API spend |
| **Batch processing** — group API calls where possible | Lower per-unit cost, higher latency |

Measure cost per pipeline run. Set budgets and alerts. Self-hosted options work well for repetitive, high-volume steps.

## Error Recovery

AI calls are non-deterministic. Design for failure:

1. **Retry with backoff** — transient API failures resolve themselves
2. **Fallback models** — if primary model fails, try an alternative
3. **Checkpoint/resume** — never reprocess completed steps after a failure
4. **Validation gates** — verify output quality before passing to next step (length checks, format validation, safety filters)
5. **Idempotent steps** — same input always produces a usable output, even if not identical

## Anti-Patterns

- **Mega-prompt** — cramming the entire pipeline into one prompt. Breaks on complex tasks.
- **No state tracking** — re-running everything from scratch on each attempt. Wastes time and money.
- **Ignoring cost** — using the most expensive model for every step. Measure and optimize.
- **No validation between steps** — garbage from step 2 silently corrupts step 5.
