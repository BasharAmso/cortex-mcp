---
id: SKL-0097
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
relatedFragments: [SKL-0009, SKL-0098, SKL-0099]
dependencies: []
synonyms: ["how do I use AI to write", "AI writing prompts", "prompt template for blog post", "get better AI writing output", "AI content generation tips"]
lastUpdated: "2026-03-29"
difficulty: beginner
---

# Prompt Craft for Writing

Write better content faster by mastering the prompts that drive AI writing. Covers persona prompts, chain-of-thought for content, few-shot examples, and reusable templates for blogs, social posts, and emails.

## Core Techniques

### 1. Persona Prompts

Tell the AI who it is before asking it to write. A persona prompt sets voice, expertise, and audience awareness in a single instruction.

**Template:** "You are a [role] who writes for [audience]. Your tone is [2-3 adjectives]. You never [anti-pattern]."

**Example:** "You are a startup founder writing for other builders. Your tone is direct, practical, and encouraging. You never use corporate jargon or filler phrases."

### 2. Chain-of-Thought for Content

Ask the AI to think before it writes. This produces more structured, logical content.

**Steps:**
1. "First, identify the core insight of this topic."
2. "Next, outline 3 supporting points with examples."
3. "Now write the full piece using that outline."

Splitting thinking from writing prevents the AI from generating generic filler.

### 3. Few-Shot Examples

Provide 2-3 samples of your past writing. The AI mirrors style, length, and structure from examples far better than from abstract descriptions.

**Format:** "Here are examples of my writing style: [paste 2-3 short pieces]. Now write a new piece on [topic] matching this style."

### 4. System Prompts for Tone Matching

For recurring content, create a reusable system prompt that encodes your voice guidelines, forbidden phrases, and structural preferences. Load it at the start of every session instead of re-explaining each time.

### 5. Iteration Techniques

Never accept the first draft. Use targeted follow-ups:

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
- Never describe your voice abstractly when you can show examples instead
- Always separate the thinking step from the writing step for long-form content
- Review every AI output for phrases you would never actually say
