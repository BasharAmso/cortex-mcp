---
id: SKL-0014
name: Customer Support Infrastructure
category: skills
tags: [support, onboarding, empty-states, error-messages, help-content, emails, indie, retention, self-serve]
capabilities: [onboarding-flows, empty-state-design, error-messaging, email-sequences, help-center, feedback-collection]
useWhen:
  - building user onboarding or first-run experiences
  - designing empty states, error messages, or help content
  - creating welcome email sequences or lifecycle messaging
  - implementing NPS/CSAT surveys or feedback collection
  - reducing churn through proactive customer success infrastructure
estimatedTokens: 600
relatedFragments: [SKL-0005, SKL-0013, PAT-0001]
dependencies: []
synonyms: ["build onboarding for new users", "write better error messages", "create a help page", "set up welcome emails", "make the empty state less confusing"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/mezod/awesome-indie"
difficulty: intermediate
---

# Customer Support Infrastructure

Build infrastructure that makes customers successful before they need help. Grounded in indie/bootstrapped product wisdom from the awesome-indie community: solo founders cannot scale human support, so the product itself must guide users to success through great onboarding, clear errors, and self-serve content.

## Indie Support Principles

From bootstrapped founders (Rob Walling, Patrick McKenzie, Arvid Kahl):

1. **Support is a product feature** -- every support request reveals a UX gap to fix
2. **Self-serve first** -- docs, tooltips, and error messages before live support
3. **Founder support scales learning** -- early on, handle support personally to learn what confuses users
4. **Reduce support load by fixing the product** -- track support requests by category and fix the top 3

## Support Gap Matrix

| Gap | Solution | Priority |
|-----|---------|----------|
| New user does not know where to start | Onboarding flow | P0 |
| Feature exists but undiscovered | Tooltips + feature discovery | P1 |
| Errors are cryptic | Actionable error messages | P0 |
| Empty states give no guidance | Empty state redesign | P1 |
| Users need async help | Help center / FAQ | P1 |
| Need to measure satisfaction | NPS / CSAT survey | P2 |

## Procedure

### 1. Identify the Support Gap

Review the PRD and recent work to determine which gap to address.

### 2. Onboarding Flow

- 3-5 steps maximum
- First step completable in under 2 minutes
- Each step shows clear value (not admin tasks)
- Auto-complete steps when the user performs the action naturally
- Show a progress indicator
- Goal: get the user to their "aha moment" as fast as possible

### 3. Empty States

Every list, table, or dashboard that can be empty needs:
- A title explaining what will appear here
- A description of why it is empty
- An action button to create the first item
- No blank screens, ever

### 4. Error Messages

Replace generic errors with actionable ones:

| Bad | Good |
|-----|------|
| "Error 500" | "Something went wrong saving your project. Try again, or contact support if it keeps happening." |
| "Invalid input" | "Email address must include an @ symbol." |
| "Unauthorized" | "Your session has expired. Please sign in again." |

Rules: say what happened, explain why, tell the user what to do next, never blame the user.

### 5. Email Sequence (Minimum)

| Timing | Email | Purpose |
|--------|-------|---------|
| Immediate | Welcome | How to get started |
| Day 1 (if not activated) | Nudge | Primary CTA |
| Day 7 (if activated) | Next steps | What to explore next |
| Trial ending | Upgrade prompt | What they get with paid plan |

Never send more than one email per day to a user.

### 6. Support Request Tracking

Log every support request with category tags. Review weekly. The top 3 categories become product fixes, not more documentation.

## Key Constraints

- Never ship a feature with blank empty states
- Never use generic error messages -- always actionable
- Never build heavy support tooling before users exist
- Always design onboarding around completing one meaningful action
- Always treat support requests as product feedback, not just tickets
