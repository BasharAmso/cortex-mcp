---
id: SKL-0328
name: Cognitive Load Reduction
category: skills
tags: [cognitive-load, progressive-disclosure, chunking, millers-law, defaults, simplicity]
capabilities: [cognitive-load-analysis, progressive-disclosure-design, chunking-strategy, default-selection, complexity-reduction]
useWhen:
  - simplifying a complex interface that overwhelms users
  - deciding what to show upfront vs what to hide behind progressive disclosure
  - designing forms, settings, or dashboards with many options
  - choosing smart defaults to reduce decision fatigue
  - applying cognitive psychology principles to interface design
estimatedTokens: 650
relatedFragments: [SKL-0329, SKL-0325, PAT-0170, PAT-0169]
dependencies: []
synonyms: ["how to simplify a complex UI", "what is progressive disclosure", "how to reduce decision fatigue in my app", "how many options should I show users", "what is Miller's law in UX", "how to make my interface less overwhelming"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: "cortex"
pillar: "ux-design"
---

# Skill: Cognitive Load Reduction

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0328 |
| **Name** | Cognitive Load Reduction |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Cognitive load is the mental effort required to use an interface. When cognitive load exceeds capacity, users make errors, abandon tasks, or avoid features entirely. The goal is not to remove complexity from the system, but to manage how and when complexity reaches the user.

### Three Types of Cognitive Load

| Type | Definition | Design Response |
|------|-----------|----------------|
| **Intrinsic** | Inherent complexity of the task itself | Cannot be removed; break into smaller steps |
| **Extraneous** | Load imposed by poor design | Eliminate through better layout, labels, and structure |
| **Germane** | Productive effort toward learning | Support through patterns, metaphors, and consistency |

Focus on eliminating extraneous load first. That is entirely within your control and produces the biggest gains.

### Miller's Law

People can hold roughly 7 (plus or minus 2) items in working memory at once. This applies to:

- **Navigation items**: Top-level menu should have 5-7 items, not 12
- **Form fields per group**: Chunk long forms into groups of 5-7 fields
- **Options in a dropdown**: Beyond 7, add search or categorization
- **Steps in a process**: Show 5-7 steps in a progress indicator, combine substeps

Miller's Law is about working memory chunks, not a rigid rule. The key insight is: group related items so each group counts as one "chunk."

### Progressive Disclosure

Show only what users need at each step. Reveal complexity as they ask for it:

| Technique | Example |
|-----------|---------|
| **Show/hide sections** | "Advanced settings" collapsed by default |
| **Staged forms** | Multi-step wizard instead of a single long form |
| **Contextual help** | Tooltips that appear on hover, not always visible |
| **Summary + detail** | Dashboard shows KPIs; click to expand full data |
| **Default values** | Pre-select the most common option; let users change it |

The rule: if 80% of users do not need an option, hide it behind one click. If 95% do not need it, hide it behind two clicks.

### Smart Defaults

Defaults are the most powerful cognitive load reducer. A well-chosen default eliminates a decision entirely:

- **Pre-select the most common option** (language based on locale, currency based on region)
- **Pre-fill with known data** (shipping address from account profile)
- **Use sensible starting values** (quantity: 1, date: today, timezone: detected)
- **Remember previous choices** (last-used filter, preferred view mode)

Bad defaults cost more than no defaults. A wrong pre-selection that users must correct creates frustration. Research actual usage patterns before setting defaults.

### Chunking Strategies

Break complex information into digestible groups:

- **Visual chunking**: Use whitespace, dividers, and cards to separate groups
- **Sequential chunking**: Multi-step wizards instead of monolithic forms
- **Categorical chunking**: Group related settings (Account, Notifications, Privacy)
- **Priority chunking**: Show primary actions prominently; secondary actions in overflow menus

### Complexity Audit Questions

Ask these about any screen that feels overwhelming:

1. Can any element be removed without losing essential function?
2. Can any two elements be combined into one?
3. Can anything be moved behind progressive disclosure?
4. Can a smart default eliminate a choice?
5. Is the visual hierarchy clear (one primary action, clear scanning path)?
6. Can the user accomplish the primary task in 3 steps or fewer?

## Key Takeaways

- Eliminate extraneous cognitive load first; it is design debt entirely within your control
- Apply Miller's Law by chunking information into groups of 5-7 items
- Use progressive disclosure to hide what 80% of users do not need
- Smart defaults eliminate decisions; research actual usage before setting them
- Audit screens with the question "can this be removed, combined, or hidden?"
