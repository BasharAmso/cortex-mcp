---
id: PAT-0112
name: Win-Loss Analysis
category: patterns
tags: [sales, win-loss, analysis, feedback, deal-review, competitive-intelligence]
capabilities: [post-deal-analysis, pattern-detection, feedback-loops, competitive-learning]
useWhen:
  - conducting post-deal reviews to understand why deals were won or lost
  - identifying patterns in competitive losses
  - building a systematic feedback loop between sales and product
  - improving win rates through data-driven deal analysis
  - creating a library of deal narratives for sales training
estimatedTokens: 650
relatedFragments: [SKL-0216, SKL-0212, PAT-0110]
dependencies: []
synonyms: ["how do I analyze lost deals", "what is the best way to do win loss reviews", "post-deal analysis process", "why are we losing deals", "competitive loss pattern detection", "sales deal retrospective"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/twentyhq/twenty"
difficulty: intermediate
owner: "cortex"
pillar: "sales"
---

# Pattern: Win-Loss Analysis

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0112 |
| **Name** | Win-Loss Analysis |
| **Category** | Patterns |
| **Complexity** | Intermediate |

## Core Concepts

Win-loss analysis is the systematic study of why deals close or do not close. Most sales teams do this informally ("we lost on price") but rarely with the rigor needed to produce actionable insights. A structured win-loss program turns anecdotal deal feedback into strategic intelligence.

### Data Capture in the CRM

Twenty CRM and similar open-source CRMs support custom fields and flexible data models that make structured win-loss capture possible. For every closed deal (won or lost), record:

- **Outcome**: Won, Lost, or No Decision (prospect chose to do nothing).
- **Primary reason**: A single, forced-choice field from a controlled list (Price, Feature Gap, Competitor, Timing, Champion Left, No Budget, Poor Fit).
- **Competitor(s) involved**: Which alternatives were in the evaluation.
- **Decision criteria**: What the prospect said mattered most (ranked).
- **Deal timeline**: How long from first meeting to decision.
- **Stakeholders involved**: Roles of the people who influenced the decision.

The controlled-list approach is critical. Free-text "reason lost" fields produce inconsistent data that cannot be aggregated. Force reps to choose from a curated list, then add a free-text field for nuance.

### The Interview Method

CRM data captures the rep's perspective, which is biased. The gold standard is interviewing the prospect directly:

- **For losses**: ask "What ultimately drove your decision? What could we have done differently?" within 2 weeks of the loss.
- **For wins**: ask "What nearly stopped you from choosing us? Who else did you consider?" to surface hidden risks.
- **Third-party interviews**: for strategic deals, hire a neutral third party to conduct the interview. Prospects are more candid with someone who is not the vendor.

Keep interviews to 15-20 minutes with 5-7 structured questions. Record and transcribe them for pattern analysis.

### Pattern Detection

Individual win-loss reviews are useful. Aggregated patterns are powerful. After 20-30 reviews, analyze:

- **Loss reasons by competitor**: Do you consistently lose on price to Competitor A but on features to Competitor B? Different competitors require different battle strategies.
- **Loss reasons by segment**: Enterprise deals may lose on compliance while SMB deals lose on price. This informs product roadmap and packaging decisions.
- **Win reasons by persona**: If you win when the champion is a technical user but lose when the champion is a business user, your messaging needs adjustment.
- **No-decision rate**: A high no-decision rate (>30%) means your pipeline includes deals that were never real. This is a qualification problem, not a selling problem.

### Feedback Loops

Win-loss insights must flow to three audiences:

1. **Sales team** - Update battle cards, objection handlers, and training materials based on patterns.
2. **Product team** - Feature gaps that cause repeated losses become roadmap candidates. Quantify the revenue impact ("we lost $400K last quarter due to missing SSO support").
3. **Marketing team** - Messaging that resonates with winners should be amplified. Messaging that losers cite as misleading should be fixed.

### Cadence

Review individual deals within one week of close. Aggregate patterns quarterly. Present findings to leadership with specific recommendations, not just data.

## Key Takeaways

- Use controlled-list fields for loss reasons to enable aggregation; free-text fields produce unusable data.
- Interview prospects directly for unbiased insights; rep-reported reasons are often incomplete.
- Aggregate 20-30 reviews before drawing conclusions; individual deals are anecdotes, not patterns.
- Route findings to sales (battle cards), product (roadmap input), and marketing (messaging fixes).
- Track no-decision rates separately; high no-decision rates signal a qualification problem.
