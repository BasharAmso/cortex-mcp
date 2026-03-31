---
id: PAT-0169
name: Onboarding Flow Pattern
category: patterns
tags: [onboarding, welcome-wizard, tooltip-tour, progressive-profiling, checklist, first-run]
capabilities: [onboarding-design, welcome-wizard, tooltip-tour, progressive-profiling, checklist-pattern]
useWhen:
  - designing a first-run experience for new users
  - choosing between wizard, tooltip tour, checklist, or progressive profiling
  - reducing time-to-value for new signups
  - collecting user preferences without creating friction
  - measuring onboarding completion and drop-off rates
estimatedTokens: 650
relatedFragments: [SKL-0325, SKL-0329, SKL-0328, PAT-0166]
dependencies: []
synonyms: ["how to onboard new users", "best onboarding flow for my app", "welcome wizard vs tooltip tour", "how to reduce new user drop-off", "progressive profiling explained", "onboarding checklist design"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "ux-design"
---

# Pattern: Onboarding Flow Pattern

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0169 |
| **Name** | Onboarding Flow Pattern |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

Onboarding is the bridge between signup and the user's first moment of value. The best onboarding does the minimum work to get the user to their "aha" moment. Every additional step before that moment risks losing the user permanently.

### Onboarding Patterns

| Pattern | Description | Best For |
|---------|------------|----------|
| **Welcome wizard** | Step-by-step modal flow on first login | Apps requiring setup (workspace, preferences) |
| **Tooltip tour** | Contextual highlights over the real UI | Feature discovery in complex interfaces |
| **Checklist** | Persistent list of setup tasks with progress | Self-serve products with multiple activation steps |
| **Progressive profiling** | Collect info over time, not all at once | Apps where preferences evolve with usage |
| **Empty state** | Guide action through well-designed empty screens | Content creation tools, dashboards |

Most products need a combination. A common pattern: welcome wizard for critical setup, then a checklist for remaining activation steps, with tooltip tours for feature discovery over time.

### Welcome Wizard

A guided flow that collects essential information on first login:

```
Step 1: Welcome       Step 2: Your Role     Step 3: Create First
"Hi Jane! Let's      "What brings you      "Create your first
get you set up."     here today?"          project to get
                                            started."
[Get Started]         ○ Team lead           [Create Project]
                      ○ Individual          [Skip for now]
                      ○ Just exploring
```

Rules:
- Maximum 3-5 steps; every step beyond 3 loses 20% of users
- Always show progress (step 2 of 4, progress bar)
- Make every step skippable except truly required setup
- End with the user inside the product, not on another setup screen
- Personalize subsequent experience based on wizard answers

### Tooltip Tour

Contextual highlights that introduce UI elements in the real interface:

- Highlight one element at a time with a spotlight effect (dimmed background)
- Short copy: 1-2 sentences max explaining what the element does, not how to use it
- "Next" and "Skip tour" buttons on every tooltip
- Trigger on first visit to a section, not on every visit
- Maximum 5 tooltips per tour; more than that and users will skip

Position tooltips so they do not cover the element they describe. Arrow points to the element; content appears in available space.

### Onboarding Checklist

A persistent list of activation tasks that drives users toward value:

```
Getting Started (2/5 complete)
✓ Create your account
✓ Set up your workspace
☐ Invite a team member
☐ Create your first project
☐ Connect an integration
```

Design principles:
- Show progress visually (progress bar, fraction complete)
- Order tasks by value: the most impactful action should be first
- Celebrate completions (checkmark animation, confetti on 100%)
- Keep the checklist visible but dismissible (sidebar widget or banner)
- Offer a reward for completion (unlock a feature, badge, extended trial)

### Progressive Profiling

Instead of asking 15 questions on signup, collect information gradually as context makes it relevant:

| When | Ask | Why |
|------|-----|-----|
| **Signup** | Name, email, password | Minimum to create account |
| **First project** | Team size, project type | Personalize templates and suggestions |
| **After 3 sessions** | Role, goals | Customize dashboard and recommendations |
| **Feature discovery** | Specific preferences | Only when the user encounters the feature |

This approach reduces signup friction (fewer fields means higher conversion) while still collecting the data you need for personalization.

### Measuring Onboarding Success

Track these metrics to evaluate and improve onboarding:

| Metric | What It Measures | Target |
|--------|-----------------|--------|
| **Activation rate** | Users who complete the key action (aha moment) | 40-60% within first session |
| **Time to value** | Minutes from signup to first meaningful action | Under 5 minutes |
| **Wizard completion** | Users who finish all wizard steps | 70%+ |
| **Checklist completion** | Users who complete all checklist tasks | 50%+ within first week |
| **Day 1 / Day 7 retention** | Users who return after initial signup | D1: 40%+, D7: 20%+ |

If activation rate is below target, the onboarding has too many steps before the aha moment. Cut steps, not add them.

## Anti-Patterns

- Showing a 10-step wizard before the user sees any value
- Tooltip tours that cannot be skipped or dismissed
- Asking for unnecessary information during signup (company size, how did you hear about us)
- No onboarding at all, dropping users into a complex empty interface
- Onboarding that only runs once with no way to replay it

## Key Takeaways

- The goal of onboarding is to reach the aha moment as fast as possible; every step before it risks losing the user
- Welcome wizards should be 3-5 steps maximum with every step skippable except critical setup
- Checklists work best for self-serve products; show progress and celebrate completion
- Progressive profiling collects information over time instead of all at signup
- Measure activation rate and time-to-value; if they are low, cut onboarding steps
