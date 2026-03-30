---
id: SKL-0012
name: Analytics & Tracking
category: skills
tags: [analytics, tracking, metrics, events, dashboards, posthog, mixpanel, plausible, privacy, funnels]
capabilities: [event-instrumentation, user-identification, funnel-tracking, dashboard-design, metric-mapping, privacy-compliance]
useWhen:
  - adding event tracking or analytics instrumentation
  - setting up product analytics or usage dashboards
  - mapping PRD success metrics to trackable events
  - instrumenting signup, conversion, or retention funnels
  - choosing between privacy-focused and full-featured analytics
estimatedTokens: 600
relatedFragments: [SKL-0005, SKL-0011, SKL-0013]
dependencies: []
synonyms: ["track what users do", "add analytics to my app", "how do I measure signups", "set up event tracking", "build a dashboard for metrics"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/newTendermint/awesome-analytics"
difficulty: intermediate
owner: builder
---

# Skill: Analytics & Tracking

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0012 |
| **Version** | 1.0 |
| **Owner** | builder |
| **Inputs** | Task description, PRD success metrics, DECISIONS.md, source code |
| **Outputs** | Analytics service, event taxonomy, ANALYTICS.md, STATE.md updated |
| **Triggers** | `ANALYTICS_REQUESTED` |

---

## Purpose

Instrument the product so every important user action is measurable. Track events tied to PRD success metrics — not everything, just what drives decisions.

---

## Provider Defaults

| Use Case | Provider |
|----------|---------|
| Solo/MVP (free) | PostHog (open source) |
| Product analytics + funnels | Mixpanel or Amplitude |
| Multi-destination routing | Segment |
| Simple pageviews only | Plausible or Fathom |

---

## Procedure

1. **Read PRD success metrics** — extract primary metric, guardrail metrics, key user flows. Every tracked event must map to a metric.
2. **Choose analytics provider** from DECISIONS.md or defaults above. Default: PostHog. Log to DECISIONS.md.
3. **Define event taxonomy** in `src/services/analytics/events.js`:
   - Naming: `[object]_[action]` in snake_case (e.g., `user_signed_up`, `subscription_started`)
   - Single source of truth for all event names — never use raw strings inline
4. **Build analytics service layer** — provider-agnostic wrapper with `track()`, `identify()`, `alias()` methods.
   - **Critical:** All analytics calls wrapped in try/catch. Analytics must NEVER break the product.
   - Fail silently in dev if provider not configured.
5. **Instrument the critical path** in priority order:
   1. Signup + `identify()` with key traits
   2. Core feature usage (the action defining product value)
   3. Conversion to paid
   4. Retention signal (return visit, day-7 usage)
   5. Failure states (payment failed, feature failed)
6. **Document dashboard metrics** in `docs/ANALYTICS.md` — top 5 metrics with events, targets, and funnels to monitor.
7. **Update STATE.md.**

---

## Constraints

- Never breaks the product on analytics failure — all calls are try/catch
- Never tracks PII in event properties (PII goes in identify(), not track())
- Never hardcodes API keys
- Never instruments events not connected to a PRD metric
- Always uses centralized event constants — never raw string event names

---

## Primary Agent

builder

---

## Definition of Done

- [ ] PRD success metrics mapped to tracking events
- [ ] Event taxonomy defined in events.js
- [ ] Analytics service layer built (provider-agnostic)
- [ ] All calls wrapped in try/catch
- [ ] Signup, core feature, and billing events instrumented
- [ ] User identity called at signup
- [ ] Dashboard metrics documented in ANALYTICS.md
- [ ] Provider credentials in env vars
- [ ] STATE.md updated
