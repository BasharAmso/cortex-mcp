---
id: SKL-0101
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
relatedFragments: [SKL-0097, SKL-0098, SKL-0099, SKL-0009]
dependencies: []
synonyms: ["research a topic with AI", "turn notes into a blog post", "AI fact checking", "how to research with AI for writing", "synthesize sources into content"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Research-to-Post Workflow

Use AI to research topics, synthesize sources, and turn raw notes into publishable content. Includes fact-checking practices to avoid publishing AI hallucinations.

## The Full Pipeline

```
Topic selection
    -> AI-assisted research
    -> Source synthesis
    -> Outline generation
    -> Draft writing
    -> Fact-check pass
    -> Publish
```

## Phase 1: AI-Assisted Research

### Topic Research Prompt

"I'm writing about [topic] for [audience]. Give me: (1) the 5 most important subtopics, (2) common misconceptions, (3) recent developments in the last 12 months, (4) the strongest counterarguments to the main thesis."

### Source Discovery

AI can suggest where to look, but you must verify sources exist.

| Source Type | How to Use AI |
|-------------|---------------|
| Books | "What are the definitive books on [topic]?" Then verify they exist. |
| Research papers | "What key studies or papers cover [topic]?" Then find them on Google Scholar. |
| Expert voices | "Who are the recognized experts on [topic]?" Then check their actual published work. |
| Data points | "What statistics are commonly cited about [topic]?" Then trace each to its primary source. |

### The Verification Rule

Every factual claim AI provides must be verified against a primary source before you publish it. AI confidently generates plausible-sounding statistics, quotes, and citations that do not exist.

## Phase 2: Source Synthesis

### From Multiple Sources to One Narrative

After gathering real, verified sources, use AI to find patterns:

"Here are my research notes from [N] sources: [paste notes]. Identify: (1) points where sources agree, (2) points of disagreement, (3) gaps that none of the sources address, (4) the single most surprising insight."

### Building Your Angle

The synthesis reveals what everyone agrees on. Your job is to find the angle that is yours. Ask yourself: "What do I know from experience that these sources miss?"

## Phase 3: Outline Generation

### Structured Outline Prompt

"Create an outline for a [length] [format] about [topic]. Target audience: [audience]. Main thesis: [your thesis]. Include: introduction with hook, [N] main sections with supporting points, and a conclusion with actionable takeaway."

Review the outline before writing. Restructuring an outline takes 2 minutes. Restructuring a finished draft takes 30.

## Phase 4: Fact-Checking

### Fact-Check Prompts

Run these before publishing:

| Check | Prompt |
|-------|--------|
| Claim verification | "List every factual claim in this piece. For each, rate your confidence (high/medium/low) and flag any you are uncertain about." |
| Quote accuracy | "Are there any quotes or attributed statements? Flag any that should be verified against the original source." |
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
