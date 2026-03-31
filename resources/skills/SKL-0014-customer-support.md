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
owner: builder
pillar: "product-business"
---

# Skill: Customer Support Infrastructure

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0014 |
| **Version** | 1.0 |
| **Owner** | builder |
| **Inputs** | Task description, PRD, DECISIONS.md, existing UI components |
| **Outputs** | Onboarding, empty states, error messages, emails, help content, STATE.md updated |
| **Triggers** | `SUPPORT_FEATURE_REQUESTED` |

---

## Purpose

Build infrastructure that makes customers successful before they need help. Good onboarding, clear empty states, actionable error messages, and self-serve support content.

---

## Support Gap Matrix

| Gap | Solution |
|-----|---------|
| New user doesn't know where to start | Onboarding flow |
| Feature exists but undiscovered | Tooltips + feature discovery |
| Errors are cryptic | Actionable error messages |
| Empty states give no guidance | Empty state redesign |
| Users need async help | Help center / FAQ |
| Need to measure satisfaction | NPS / CSAT survey |

---

## Procedure

1. **Identify the support gap** from PRD and recent STATE.md completions.
2. **Onboarding flow:**
   - 3-5 steps maximum; first step completable in under 2 minutes
   - Each step shows clear value (not admin tasks)
   - Auto-complete steps when user does the action
   - Show progress indicator
3. **Empty states:** Every list/table/dashboard that can be empty needs title, description, and action button. No blank screens.
4. **Error messages:** Replace generic errors with actionable ones:
   - Say what happened, why (if known), and what user can do
   - Never blame the user; for server errors, say team is notified
5. **Email sequence (minimum):**
   - Immediate: welcome + how to get started
   - Day 1 (if not activated): nudge with primary CTA
   - Day 7 (if activated): what to explore next
   - Trial ending: what they get with paid plan
6. **NPS/CSAT (if PRD requires):** Show survey 14+ days after signup, only to activated users. Route detractors (0-6) to personal outreach, promoters (9-10) to review/referral ask.
7. **Help center (if needed):** Create `docs/help/` with getting-started, FAQ, per-feature docs, troubleshooting. Each article: steps (start with verbs), expected result, common problems.
8. **Update STATE.md.**

---

## Constraints

- Never ships a feature with blank empty states
- Never uses generic error messages — always actionable
- Never builds heavy support tooling before users exist
- Always writes onboarding around completing one meaningful action
- Never sends more than one email per day to a user

---

## Primary Agent

builder

---

## Definition of Done

- [ ] New features have onboarding or help content
- [ ] All empty states have title, description, and action
- [ ] Error messages are actionable
- [ ] Welcome email sequence created
- [ ] NPS/CSAT implemented (if PRD requires)
- [ ] Help articles written for user-facing features
- [ ] STATE.md updated
