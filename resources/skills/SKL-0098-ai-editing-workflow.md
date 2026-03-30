---
id: SKL-0098
name: AI Editing Workflow
category: skills
tags: [editing, content-creation, ai-assisted, writing, refinement, quality, feedback-loops, drafting]
capabilities: [ai-powered-editing, draft-refinement, quality-gating, feedback-loop-design]
useWhen:
  - refining a rough draft with AI assistance
  - using AI as an editor rather than a writer
  - building a repeatable editing workflow for content
  - improving content quality without losing your voice
estimatedTokens: 550
relatedFragments: [SKL-0097, SKL-0099, SKL-0009]
dependencies: []
synonyms: ["AI edit my writing", "use AI to improve my draft", "how to edit with AI", "AI writing feedback", "draft then refine method"]
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
lastUpdated: "2026-03-30"
difficulty: beginner
---

# AI Editing Workflow

Use AI as your editor, not your writer. You draft, AI refines. The Prompt Engineering Guide demonstrates that prompt chaining and self-consistency techniques produce far better results than single-shot "make this better" prompts. Apply these principles to editing: break the editing task into focused rounds, each with its own prompt and evaluation criteria.

## The Draft-Then-Refine Method

### Principle

Write the first draft yourself. It will be messy, and that is the point. Your raw thinking contains the insight and personality that AI cannot generate from scratch. AI excels at restructuring, tightening, and polishing what already exists.

### The Workflow

```
You write raw draft
    -> AI analyzes structure and clarity (chain-of-thought)
    -> AI suggests specific edits (directional prompting)
    -> You accept, reject, or modify each suggestion
    -> Final pass: you read aloud and adjust
```

## Specific Editing Prompts

Use targeted prompts instead of "make this better." The Prompt Engineering Guide shows that specificity in prompts directly correlates with output quality. Vague prompts produce vague rewrites.

| Editing Goal | Prompt |
|--------------|--------|
| Tighten | "Cut 30% of the words without losing any ideas. Show me what you removed." |
| Simplify | "Rewrite any sentence longer than 20 words into two shorter ones." |
| Add examples | "Identify every abstract claim and suggest a concrete example for each." |
| Fix flow | "Reorder paragraphs so each one builds on the previous. Explain your reasoning." |
| Strengthen opening | "Give me 3 alternative opening lines that create more curiosity." |
| Kill filler | "Highlight every sentence that could be removed without changing the meaning." |
| Add transitions | "Add one transition sentence between each section to improve reading flow." |

## Feedback Loops Using Self-Consistency

The self-consistency technique from prompt engineering asks the model to generate multiple solutions and select the best. Apply this to editing:

### Round-Based Editing

1. **Round 1 (Structure):** "Does this piece have a clear thesis, supporting points, and conclusion? What is missing?"
2. **Round 2 (Clarity):** "Flag any sentence that is confusing, redundant, or too abstract."
3. **Round 3 (Voice):** "Does this sound like a human wrote it? Flag anything that sounds generic or AI-generated."

Each round addresses one dimension. Trying to fix everything at once produces mediocre results.

### The Diff Review

Ask AI to show changes as a diff: "Show me exactly what you changed and why, in a before/after format." This prevents silent rewrites that gut your voice. This mirrors the chain-of-thought approach: making the model explain its reasoning produces better, more transparent edits.

### Generate-Then-Select

For critical sections (opening line, headline, CTA), ask for multiple options:

"Give me 5 alternative versions of this opening paragraph. For each, explain what makes it work."

Then pick the best one yourself. Self-consistency across multiple generations surfaces the strongest version.

## Quality Gates

Before publishing, every piece should pass these checks:

| Gate | Check |
|------|-------|
| Thesis | Can you state the main point in one sentence? |
| Audience | Would your target reader care about this in the first 2 lines? |
| Substance | Does every paragraph contain a specific example, data point, or insight? |
| Voice | Read it aloud. Does it sound like you? |
| Length | Is every section earning its word count? |
| CTA | Does the reader know what to do next? |

## Key Constraints

- Never hand AI a blank page and say "write about X." You draft first.
- Never accept a full rewrite. Review changes individually.
- Never skip the read-aloud test. Your ear catches what your eyes miss.
- Always use targeted editing prompts, not "make this better"
- Always preserve your original phrasing when AI suggests a "cleaner" alternative that loses personality
