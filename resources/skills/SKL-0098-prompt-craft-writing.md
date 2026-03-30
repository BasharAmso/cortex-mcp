---
id: SKL-0098
name: Prompt Craft for Writing
category: skills
tags: [prompting, writing, content-creation, ai-assisted, copywriting, blogging, social-media, email, tone-matching]
capabilities: [prompt-engineering-for-content, tone-controlled-generation, iterative-refinement]
useWhen:
  - writing blog posts, social posts, or emails with AI assistance
  - building prompt templates for recurring content types
  - struggling to get AI output that matches your voice or intent
  - setting up system prompts for consistent tone across content
estimatedTokens: 550
relatedFragments: [SKL-0009, SKL-0099, SKL-0100]
dependencies: []
synonyms: ["how do I use AI to write", "AI writing prompts", "prompt template for blog post", "get better AI writing output", "AI content generation tips"]
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
lastUpdated: "2026-03-30"
difficulty: beginner
owner: builder
---

# Prompt Craft for Writing

Write better content faster by mastering the prompts that drive AI writing. The Prompt Engineering Guide documents techniques that directly apply to content creation: role prompting sets voice, few-shot examples teach style, chain-of-thought produces structured reasoning, and prompt chaining breaks complex content into manageable steps.

## Core Techniques

### 1. Role Prompting (Persona Prompts)

Tell the AI who it is before asking it to write. Role prompting is one of the most effective techniques for controlling output quality and style. A well-defined role sets voice, expertise, and audience awareness in a single instruction.

**Template:** "You are a [role] who writes for [audience]. Your tone is [2-3 adjectives]. You never [anti-pattern]."

**Example:** "You are a startup founder writing for other builders. Your tone is direct, practical, and encouraging. You never use corporate jargon or filler phrases."

### 2. Chain-of-Thought for Content

Chain-of-thought prompting asks the AI to reason through steps before producing output. For writing, this means separating thinking from drafting, which produces more structured, logical content.

**Steps:**
1. "First, identify the core insight of this topic."
2. "Next, outline 3 supporting points with examples."
3. "Now write the full piece using that outline."

Splitting thinking from writing prevents the AI from generating generic filler. The Prompt Engineering Guide shows this consistently improves output quality across tasks.

### 3. Few-Shot Examples

Few-shot prompting provides 2-3 examples of the desired output. For writing, this means pasting samples of your past content. The AI mirrors style, length, and structure from concrete examples far better than from abstract descriptions.

**Format:** "Here are examples of my writing style: [paste 2-3 short pieces]. Now write a new piece on [topic] matching this style."

### 4. System Prompts for Tone Matching

For recurring content, create a reusable system prompt that encodes your voice guidelines, forbidden phrases, and structural preferences. This acts as persistent context, similar to how the Prompt Engineering Guide recommends setting LLM parameters (temperature, top-p) for consistent behavior across sessions.

### 5. Prompt Chaining for Long-Form Content

Prompt chaining breaks a complex task into sequential steps, each feeding into the next. For long-form content:

1. **Research prompt:** "Summarize the key points about [topic]"
2. **Outline prompt:** "Create an outline from these points for [audience]"
3. **Draft prompt:** "Write section 1 using this outline and voice guidelines"
4. **Edit prompt:** "Tighten this draft. Cut filler. Fix passive voice."

Each step produces a focused output. Chaining avoids the quality degradation that comes from asking one prompt to do everything.

### 6. Iteration Techniques

The Prompt Engineering Guide emphasizes that prompt engineering is iterative. Never accept the first draft. Use targeted follow-ups:

| Follow-Up Prompt | Purpose |
|-------------------|---------|
| "Make it half as long" | Force conciseness |
| "Replace every abstraction with a concrete example" | Add substance |
| "Rewrite the opening to hook with a question" | Improve engagement |
| "Remove anything that sounds like AI wrote it" | Kill slop |
| "Add a personal anecdote in paragraph 2" | Inject authenticity |

## Content Type Templates

**Blog post:** "Write a [length] blog post about [topic] for [audience]. Open with [hook type]. Include [number] actionable takeaways. Close with [CTA type]."

**Social post:** "Write a [platform] post about [topic]. First line must hook. Max [length]. End with a question that invites comments."

**Email:** "Write a [type] email to [audience]. Subject line under 8 words. Body under [length]. One clear CTA."

## Key Constraints

- Never send a prompt without specifying audience and tone
- Never accept the first draft as final
- Never describe your voice abstractly when you can show examples instead (few-shot over zero-shot)
- Always separate the thinking step from the writing step for long-form content
- Review every AI output for phrases you would never actually say
