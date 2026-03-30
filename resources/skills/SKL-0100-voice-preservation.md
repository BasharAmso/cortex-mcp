---
id: SKL-0100
name: Voice Preservation with AI
category: skills
tags: [voice, authenticity, content-creation, ai-assisted, tone, personal-brand, writing-style, slop-detection]
capabilities: [voice-training, slop-detection, authenticity-preservation, style-guideline-creation]
useWhen:
  - AI output sounds generic and you want it to match your voice
  - building a voice guide to use as a system prompt
  - detecting and removing AI slop from content
  - balancing AI efficiency with personal authenticity
estimatedTokens: 550
relatedFragments: [SKL-0098, SKL-0099, SKL-0009]
dependencies: []
synonyms: ["make AI sound like me", "AI writing sounds fake", "how to keep my voice with AI", "AI slop detection", "train AI on my writing style"]
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
lastUpdated: "2026-03-30"
difficulty: intermediate
owner: builder
---

# Voice Preservation with AI

Keep your authentic voice when using AI as a writing partner. The Prompt Engineering Guide shows that few-shot examples outperform abstract descriptions for style matching, role prompts set behavioral constraints, and directional stimulus prompting steers output toward specific qualities. Apply all three to preserve your voice.

## Training AI on Your Voice

### Build a Voice Sample Set

Collect 5-10 pieces of your best writing. Choose pieces where you sound most like yourself: casual messages, posts that got engagement, emails people complimented. Raw and unpolished beats formal and edited.

### Create a Voice Guidelines Document

Analyze your samples and extract patterns:

| Dimension | Extract |
|-----------|---------|
| Sentence length | Average word count, short vs. long mix |
| Vocabulary | Words you use often, words you never use |
| Structure | How you open, how you close, paragraph length |
| Tone markers | Humor style, level of formality, use of questions |
| Anti-patterns | Phrases you hate, structures you avoid |

**Template:** "My writing voice: [3 adjectives]. I tend to [2 habits]. I never [2 anti-patterns]. Typical sentence length: [range]. I open with [pattern] and close with [pattern]."

### Use Few-Shot Examples as System Context

The Prompt Engineering Guide demonstrates that few-shot prompting (providing concrete examples) consistently outperforms zero-shot instructions (abstract descriptions). Instead of telling the AI "write casually," show it 3 examples of your casual writing. Instead of saying "be direct," include a sample where you were direct. Load your voice samples at the start of every AI writing session.

## Directional Stimulus for Voice

Directional stimulus prompting adds a guiding hint to steer generation. For voice preservation, add explicit constraints:

- "Write in the style of the examples above, but about [new topic]"
- "Match the sentence length and paragraph structure of the samples"
- "If you find yourself writing a phrase the author in those examples would never say, replace it"

## Detecting AI Slop

AI slop is generic, over-polished language that no human would naturally write. Learn to spot it:

| Slop Signal | Example | Fix |
|-------------|---------|-----|
| Filler openers | "In today's fast-paced world..." | Delete. Start with your actual point. |
| Empty intensifiers | "Truly remarkable", "Incredibly powerful" | Replace with a specific detail |
| Hedging phrases | "It's worth noting that..." | Remove the hedge, state the thing |
| List padding | Three bullet points that say the same thing | Keep the best one, cut the rest |
| Fake transitions | "That being said", "With that in mind" | Use a line break or rewrite the connection |
| Over-structured | Perfect parallel structure in every sentence | Break the pattern. Vary rhythm. |

### The Slop Audit Prompt

After AI generates content, use this chain-of-thought audit: "Review this for AI-sounding language. Step 1: Flag every phrase that a real person would never say in conversation. Step 2: For each flagged phrase, explain why it sounds artificial. Step 3: Suggest a replacement that sounds natural."

The chain-of-thought structure (from the Prompt Engineering Guide) forces the model to reason about each edit instead of making surface-level substitutions.

## The 80/20 Rule

AI drafts 80% of the content. You write the remaining 20% that carries personality, lived experience, and original insight. The 20% you contribute is what makes the content yours.

**What AI handles well:** Structure, transitions, formatting, research summaries, alternative phrasings.

**What you must write yourself:** Opening hooks, personal anecdotes, controversial opinions, specific examples from your experience, the closing thought.

## Key Constraints

- Never publish AI output without a voice check pass
- Never let AI rewrite your best lines. Protect the phrases that sound most like you.
- Never use AI voice training as a substitute for developing your actual voice
- Always update your voice guidelines when your style evolves
- Always prefer your raw phrasing over AI's "improved" version when they conflict
