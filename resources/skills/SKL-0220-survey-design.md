---
id: SKL-0220
name: Survey Design
category: skills
tags: [survey-design, market-research, user-feedback, questionnaire, data-collection, research-methods]
capabilities: [question-design, bias-avoidance, sample-sizing, survey-distribution]
useWhen:
  - collecting structured feedback from users or potential customers
  - validating product hypotheses with quantitative data
  - measuring customer satisfaction or Net Promoter Score
  - gathering market research data before building a feature
  - designing an in-app or email survey
estimatedTokens: 650
relatedFragments: [PAT-0114, SKL-0219, SKL-0221]
dependencies: []
synonyms: ["how to write a good survey", "survey question best practices", "how many responses do I need", "how to avoid survey bias", "customer feedback survey template", "NPS survey design"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/formbricks/formbricks"
difficulty: beginner
owner: "cortex"
pillar: "market-research"
---

# Skill: Survey Design

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0220 |
| **Name** | Survey Design |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Effective surveys produce reliable, actionable data. Poor surveys produce noise that misleads decisions. Formbricks, the open-source survey platform, demonstrates key principles: targeted delivery (in-app, website, link, email), question type variety, and user segmentation for triggering surveys at the right moment.

### Question Types and When to Use Them

| Type | Use When | Example |
|------|----------|---------|
| **Single select** | Forcing a clear choice | "What is your primary role?" |
| **Multi-select** | Allowing multiple applicable answers | "Which features do you use weekly?" |
| **Likert scale** | Measuring agreement or satisfaction | "How satisfied are you? (1-5)" |
| **Open text** | Exploring unknown territory | "What almost stopped you from signing up?" |
| **NPS (0-10)** | Benchmarking loyalty over time | "How likely are you to recommend us?" |
| **Ranking** | Understanding relative priority | "Rank these features by importance" |

### Bias Avoidance

The biggest threat to survey quality is bias in question design:

- **Leading questions**: Avoid "How much do you love our new feature?" Use neutral framing: "How would you rate the new feature?"
- **Double-barreled questions**: "Is the product fast and easy to use?" asks two things. Split them.
- **Social desirability bias**: People overstate positive behaviors. Use indirect questions for sensitive topics.
- **Order effects**: Randomize option order for multi-select questions. Place sensitive questions later.
- **Acquiescence bias**: People tend to agree. Mix positively and negatively worded items.

### Sample Size Guidelines

For confidence in results:
- **Qualitative insights** (open-ended): 15-30 responses often reveal main themes.
- **Directional data** (simple preferences): 50-100 responses per segment.
- **Statistically significant results**: 200+ responses for reliable percentages, 384+ for 95% confidence with 5% margin of error on a large population.

### Survey Length and Completion Rates

Formbricks' best practice data shows completion rates drop significantly after 5 minutes:
- **1-3 questions**: 80%+ completion (best for in-app micro-surveys).
- **5-7 questions**: 60-70% completion (good for targeted research).
- **10+ questions**: Below 50% completion (use only for committed panels).

### Distribution Strategy

Match the channel to the context:
- **In-app surveys**: Target based on user behavior (e.g., after completing onboarding). Highest relevance.
- **Email surveys**: Good for churned users or periodic satisfaction checks. Lower response rate.
- **Link surveys**: Share on social media or communities for broad reach. Watch for self-selection bias.
- **Website surveys**: Intercept visitors at specific pages. Good for pre-purchase research.

### Survey Structure Template

1. **Welcome screen**: Purpose, estimated time, confidentiality note.
2. **Screening questions**: Verify the respondent fits your target segment (1-2 questions).
3. **Core questions**: Your primary research objectives (3-5 questions).
4. **Demographic questions**: Context for segmentation (2-3 questions, at the end).
5. **Thank you screen**: Appreciation and optional follow-up invitation.

## Key Takeaways

- Keep surveys under 7 questions for reasonable completion rates
- Avoid leading, double-barreled, and socially desirable question framing
- Match distribution channel to context: in-app for behavioral triggers, email for periodic checks
- 50-100 responses per segment is enough for directional decisions; 384+ for statistical significance
- Always pilot-test your survey with 3-5 people before full launch
