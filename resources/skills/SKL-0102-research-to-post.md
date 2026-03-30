---
id: SKL-0102
name: Research-to-Post Workflow
category: skills
tags: [research, content-creation, ai-assisted, writing, fact-checking, outlines, synthesis, citations, publishing]
capabilities: [ai-research, source-synthesis, outline-generation, fact-checking, content-publishing]
useWhen:
  - researching a topic before writing about it
  - synthesizing multiple sources into a single coherent piece
  - turning research notes into a publishable blog post or article
  - fact-checking AI-generated claims before publishing
estimatedTokens: 550
relatedFragments: [SKL-0098, SKL-0099, SKL-0100, SKL-0009]
dependencies: []
synonyms: ["research a topic with AI", "turn notes into a blog post", "AI fact checking", "how to research with AI for writing", "synthesize sources into content"]
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
lastUpdated: "2026-03-30"
difficulty: intermediate
owner: builder
---

# Research-to-Post Workflow

Use AI to research topics, synthesize sources, and turn raw notes into publishable content. The Prompt Engineering Guide documents techniques that map directly to each phase: generate knowledge prompting for research, chain-of-thought for synthesis, prompt chaining for outline-to-draft, and self-consistency for fact-checking.

## The Full Pipeline

```
Topic selection
    -> AI-assisted research (generate knowledge prompting)
    -> Source synthesis (chain-of-thought)
    -> Outline generation (prompt chaining)
    -> Draft writing (role prompting + few-shot)
    -> Fact-check pass (self-consistency)
    -> Publish
```

## Phase 1: AI-Assisted Research

### Generate Knowledge Prompting

The Prompt Engineering Guide describes generate knowledge prompting: ask the AI to generate relevant knowledge about a topic before using that knowledge to produce output. This two-step approach improves accuracy.

**Step 1 (Generate knowledge):** "Generate 10 key facts, recent developments, and common misconceptions about [topic]."

**Step 2 (Use knowledge):** "Using the facts above, write an outline for a [format] targeting [audience]."

### Source Discovery with RAG Principles

AI can suggest where to look, but you must verify sources exist. Apply Retrieval Augmented Generation (RAG) principles from the Prompt Engineering Guide:

| Source Type | How to Use AI |
|-------------|---------------|
| Books | "What are the definitive books on [topic]?" Then verify they exist. |
| Research papers | "What key studies or papers cover [topic]?" Then find them on Google Scholar. |
| Expert voices | "Who are the recognized experts on [topic]?" Then check their actual published work. |
| Data points | "What statistics are commonly cited about [topic]?" Then trace each to its primary source. |

### The Verification Rule

Every factual claim AI provides must be verified against a primary source before you publish it. AI confidently generates plausible-sounding statistics, quotes, and citations that do not exist. The Prompt Engineering Guide's section on factuality risks documents this behavior.

## Phase 2: Source Synthesis

### Chain-of-Thought Synthesis

After gathering real, verified sources, use chain-of-thought prompting to find patterns:

"Here are my research notes from [N] sources: [paste notes]. Think step by step: (1) What points do sources agree on? (2) Where do they disagree? (3) What gaps do none of the sources address? (4) What is the single most surprising insight?"

The explicit "think step by step" instruction (from the Prompt Engineering Guide) produces more thorough, structured analysis than asking for a simple summary.

### Building Your Angle

The synthesis reveals what everyone agrees on. Your job is to find the angle that is yours. Ask yourself: "What do I know from experience that these sources miss?"

## Phase 3: Outline Generation

### Prompt Chaining for Structure

Use prompt chaining to move from synthesis to outline:

**Prompt 1:** "Based on this synthesis, what are the 3-5 strongest points for a [format] about [topic]?"
**Prompt 2:** "Create an outline with introduction, [N] main sections with supporting points, and conclusion with actionable takeaway."
**Prompt 3:** "For each section, suggest a specific example or data point to include."

Review the outline before writing. Restructuring an outline takes 2 minutes. Restructuring a finished draft takes 30.

## Phase 4: Fact-Checking with Self-Consistency

### Multiple-Path Verification

The self-consistency technique asks the model to approach a problem multiple ways and compare answers. Apply this to fact-checking:

| Check | Prompt |
|-------|--------|
| Claim verification | "List every factual claim in this piece. For each, rate your confidence (high/medium/low) and flag any you are uncertain about." |
| Cross-check | "For each low-confidence claim, generate the claim from scratch without seeing my version. Do they match?" |
| Recency check | "Flag any claims that may be outdated. What is the most recent data available on each point?" |
| Bias check | "Does this piece present a balanced view? What perspective is missing?" |

### Citation Practices

- Link to primary sources, not summaries or aggregators
- Use inline links for web content, footnotes for long-form articles
- When citing statistics, include the year and source organization
- If you cannot find the primary source for a claim, remove the claim

## Key Constraints

- Never publish AI-provided statistics without verifying the primary source
- Never cite a source you have not personally checked exists
- Never skip the outline review step for content over 500 words
- Always disclose when AI assisted your research process, if your audience expects it
- Always add your unique angle. Research synthesis without original insight is a summary, not content.
