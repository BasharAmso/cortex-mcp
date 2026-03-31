---
id: PAT-0121
name: Interview Analysis Pattern
category: patterns
tags: [interview-analysis, qualitative-coding, theme-extraction, user-research, insight-synthesis, affinity-mapping]
capabilities: [response-coding, theme-identification, insight-synthesis, cross-interview-analysis]
useWhen:
  - analyzing responses from user interviews or focus groups
  - extracting themes from open-ended survey responses
  - synthesizing qualitative data into actionable insights
  - coding and categorizing unstructured feedback
  - building an evidence-based case from qualitative research
estimatedTokens: 650
relatedFragments: [SKL-0236, SKL-0235, PAT-0122, PAT-0123]
dependencies: []
synonyms: ["how to analyze interview data", "qualitative data analysis", "how to find themes in user research", "coding interview responses", "what to do with interview transcripts", "how to synthesize user feedback"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/formbricks/formbricks"
difficulty: intermediate
owner: "cortex"
pillar: "market-research"
---

# Pattern: Interview Analysis Pattern

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0121 |
| **Name** | Interview Analysis Pattern |
| **Category** | Patterns |
| **Complexity** | Intermediate |

## Core Concepts

Raw interview data is not insight. The gap between "we talked to 20 users" and "here is what we learned" is a disciplined analysis process. This pattern transforms unstructured qualitative data into evidence-backed findings.

### The Analysis Pipeline

```
Transcribe → Code → Categorize → Extract Themes → Synthesize Insights → Validate
```

### Step 1: Prepare the Data

Transcribe each interview verbatim (automated transcription is fine, but review for accuracy on key quotes). Tag each transcript with participant metadata: segment, role, company size, recruitment source. This metadata becomes essential when you ask "do enterprise users feel differently than SMB users?"

### Step 2: Open Coding

Read through transcripts and assign codes (short labels) to meaningful segments. A "segment" is any statement that expresses an opinion, describes a behavior, or reveals a need.

**Coding rules:**
- Code what participants said, not what you think they meant.
- One segment can have multiple codes.
- Start descriptive ("frustrated with onboarding"), not interpretive ("bad UX").
- Track frequency: how many participants expressed each code?

**Example codes from a survey tool study:**
| Quote | Code |
|-------|------|
| "I give up setting up surveys because there are too many options" | setup-complexity |
| "I never know if my questions are good enough" | question-quality-anxiety |
| "I just want to copy what worked for someone else" | template-demand |

Tools like Formbricks capture structured responses alongside open-text feedback, giving you pre-categorized data (question type, targeting segment) that accelerates the coding step.

### Step 3: Axial Coding (Categorization)

Group related codes into higher-level categories. This is where patterns emerge:

| Category | Codes | Frequency (n=20) |
|----------|-------|-------------------|
| **Setup friction** | setup-complexity, config-overwhelm, time-to-first-survey | 14/20 |
| **Confidence gap** | question-quality-anxiety, response-rate-worry, analysis-uncertainty | 11/20 |
| **Template hunger** | template-demand, copy-competitor, best-practice-seeking | 9/20 |

### Step 4: Theme Extraction

Themes are the narrative interpretations of your categories. A category is descriptive ("setup friction"); a theme is interpretive ("users abandon surveys not because of capability gaps but because too many choices create decision paralysis").

Good themes:
- Are supported by multiple categories.
- Explain behavior, not just describe it.
- Suggest product or strategy implications.

### Step 5: Insight Synthesis

Transform themes into actionable insight statements:

**Format:** [Observation] + [Implication] + [Recommendation]

**Example:** "14 of 20 participants described abandoning survey setup due to option overload (observation). The core issue is decision paralysis, not missing capability (implication). Reduce the default survey builder to 3 question types with an 'advanced' toggle for power users (recommendation)."

### Step 6: Validation

- **Triangulate.** Does the qualitative theme align with quantitative data (analytics, survey metrics)?
- **Member-check.** Share findings with 2-3 participants. Does the interpretation resonate?
- **Disconfirm.** Actively look for interviews that contradict the theme. If 14/20 support it and 6/20 contradict it, the theme needs nuance, not deletion.

### Common Pitfalls

- Cherry-picking quotes that support a predetermined narrative.
- Skipping frequency counts (a theme from 2/20 interviews is an anecdote, not a finding).
- Interpreting during coding instead of describing (premature interpretation biases later analysis).
- Presenting raw codes to stakeholders instead of synthesized themes.

## Key Takeaways

- Follow the pipeline: transcribe, code, categorize, extract themes, synthesize, validate
- Code descriptively first ("frustrated with setup"), interpret later ("decision paralysis causes abandonment")
- Track frequency: insights from 14/20 participants are findings; from 2/20 are anecdotes
- Structure insights as observation + implication + recommendation for actionability
- Always look for disconfirming evidence; themes that survive contradiction are strongest
