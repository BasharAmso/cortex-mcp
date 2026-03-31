---
id: PAT-0219
name: Feedback Collection Pattern
category: patterns
tags: [feedback, surveys, nps, in-app-feedback, response-analysis, user-research]
capabilities: [survey-timing, feedback-channel-design, response-analysis, feedback-routing]
useWhen:
  - implementing in-app feedback collection
  - deciding when and how to trigger user surveys
  - analyzing and categorizing feedback responses
  - building a feedback pipeline from collection to action
  - choosing between different survey formats and channels
estimatedTokens: 650
relatedFragments: [SKL-0426, SKL-0424, SKL-0428, PAT-0217]
dependencies: []
synonyms: ["when to send NPS surveys", "how to collect in-app feedback", "how to analyze user feedback", "best practices for user surveys", "how to design feedback forms", "how to route feedback to the right team"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/formbricks/formbricks"
difficulty: beginner
owner: "cortex"
pillar: "product-business"
---

# Feedback Collection Pattern

Practical patterns for collecting, analyzing, and acting on user feedback at the right moments.

## Timing Matters More Than Questions

The same question asked at the wrong time produces bad data. Formbricks popularized event-based survey triggering:

| Trigger Event | Survey Type | Why This Timing |
|--------------|-------------|----------------|
| After completing a key action | CSAT (1-5) | User just experienced value |
| After using a new feature 3x | Feature feedback | Enough exposure to have an opinion |
| 30 days after signup | NPS (0-10) | User has formed a relationship |
| After a support ticket is closed | CES (effort score) | Fresh memory of the experience |
| After cancellation | Exit survey | Honest about reasons for leaving |
| After upgrade | Value confirmation | Understand what drove the decision |

## The Two-Question Pattern

The most effective in-app survey has exactly two questions:

1. **Quantitative:** A score (NPS, CSAT, or thumbs up/down)
2. **Qualitative:** "What is the main reason for your score?"

The qualitative follow-up is where the real insights live. The score is useful for trending; the text tells you what to do about it.

## Survey Design Rules

| Rule | Rationale |
|------|-----------|
| Maximum 3 questions | Every question beyond 3 drops completion by 15-20% |
| No leading questions | "How much do you love X?" biases responses |
| One topic per survey | Mixing topics confuses respondents and dilutes data |
| Optional open text | Forced text fields get garbage responses |
| Mobile-friendly | 50%+ of in-app surveys are seen on mobile |
| Clear progress indicator | "Question 1 of 3" reduces abandonment |

## Feedback Channel Matrix

| Channel | Volume | Quality | Bias |
|---------|--------|---------|------|
| In-app surveys | High | Medium | Active users only |
| Email surveys | Medium | Medium | Engaged users only |
| Support tickets | Medium | High (specific) | Frustrated users over-represented |
| User interviews | Low | Very high | Self-selected, articulate users |
| Social media | Variable | Low | Public performance, extreme opinions |
| App store reviews | Low-Medium | Medium | Polarized (love or hate) |

## Response Analysis Framework

After collecting responses, categorize them:

```
Raw Feedback → Tag by Theme → Score by Frequency → Cross-reference with Segment → Prioritize
```

| Theme Tag | Examples |
|-----------|---------|
| **UX friction** | "Confusing navigation," "Too many clicks" |
| **Missing feature** | "I wish I could export to PDF" |
| **Bug report** | "The page crashes when I do X" |
| **Praise** | "Love how fast this is" (note what they love) |
| **Pricing concern** | "Too expensive for what I get" |

## Feedback-to-Action Pipeline

| Step | Owner | Output |
|------|-------|--------|
| Collect | Product/Support | Tagged feedback entries |
| Analyze weekly | Product Manager | Top themes with frequency counts |
| Prioritize monthly | Product + Engineering | Items added to roadmap via RICE |
| Ship and close | Engineering | Feature released |
| Communicate | Product/Marketing | "You asked, we built" announcement |

The last step is the most commonly skipped and the most important for trust.

## Key Takeaways
- Trigger surveys on behavior events, not arbitrary schedules
- Two questions (score + open text) outperform lengthy surveys
- The qualitative follow-up is more valuable than the quantitative score
- Analyze feedback by theme and frequency, not individual responses
- Always close the loop by telling users what changed because of their feedback
