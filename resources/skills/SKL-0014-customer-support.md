---
id: SKL-0014
name: Customer Support Infrastructure
category: skills
tags: [support, onboarding, empty-states, error-messages, help-content, emails]
capabilities: [onboarding-flows, empty-state-design, error-messaging, email-sequences, help-center]
useWhen:
  - building user onboarding or first-run experiences
  - designing empty states, error messages, or help content
  - creating welcome email sequences or lifecycle messaging
  - implementing NPS/CSAT surveys or feedback collection
estimatedTokens: 550
relatedFragments: [SKL-0005, SKL-0013, PAT-0001]
dependencies: []
synonyms: ["build onboarding for new users", "write better error messages", "create a help page", "set up welcome emails", "make the empty state less confusing"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Customer Support Infrastructure

Build infrastructure that makes customers successful before they need help. Good onboarding, clear empty states, actionable error messages, and self-serve support content.

## Support Gap Matrix

| Gap | Solution |
|-----|---------|
| New user does not know where to start | Onboarding flow |
| Feature exists but undiscovered | Tooltips + feature discovery |
| Errors are cryptic | Actionable error messages |
| Empty states give no guidance | Empty state redesign |
| Users need async help | Help center / FAQ |
| Need to measure satisfaction | NPS / CSAT survey |

## Procedure

### 1. Identify the Support Gap

Review the PRD and recent work to determine which gap to address.

### 2. Onboarding Flow

- 3-5 steps maximum
- First step completable in under 2 minutes
- Each step shows clear value (not admin tasks)
- Auto-complete steps when the user performs the action naturally
- Show a progress indicator

### 3. Empty States

Every list, table, or dashboard that can be empty needs:
- A title explaining what will appear here
- A description of why it is empty
- An action button to create the first item
- No blank screens, ever

### 4. Error Messages

Replace generic errors with actionable ones:
- Say what happened
- Explain why (if known)
- Tell the user what they can do next
- Never blame the user
- For server errors, say the team has been notified

### 5. Email Sequence (Minimum)

| Timing | Email | Purpose |
|--------|-------|---------|
| Immediate | Welcome | How to get started |
| Day 1 (if not activated) | Nudge | Primary CTA |
| Day 7 (if activated) | Next steps | What to explore next |
| Trial ending | Upgrade prompt | What they get with paid plan |

Never send more than one email per day to a user.

### 6. NPS/CSAT (If Required)

- Show survey 14+ days after signup, only to activated users
- Route detractors (0-6) to personal outreach
- Route promoters (9-10) to review or referral ask

### 7. Help Center (If Needed)

Create per-feature docs with: steps (start with verbs), expected result, and common problems.

## Key Constraints

- Never ship a feature with blank empty states
- Never use generic error messages — always actionable
- Never build heavy support tooling before users exist
- Always design onboarding around completing one meaningful action
