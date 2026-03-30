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
---

# Analytics & Tracking

Instrument the product so every important user action is measurable. Grounded in the awesome-analytics ecosystem covering general analytics (PostHog, Matomo), privacy-focused options (Plausible, Umami, Fathom), heatmaps (Hotjar), analytics layers (Segment), and dashboards (Metabase, Grafana).

## Provider Selection

| Use Case | Provider | Type |
|----------|---------|------|
| Solo/MVP (free, privacy-first) | Plausible or Umami | Self-hosted or SaaS |
| Product analytics + funnels | PostHog (open source) | Self-hosted or cloud |
| Enterprise product analytics | Mixpanel or Amplitude | SaaS |
| Multi-destination routing | Segment or RudderStack | Analytics layer |
| Simple pageviews only | Fathom or GoatCounter | Privacy-focused SaaS |
| Internal dashboards | Metabase or Redash | Self-hosted, query-based |
| Heatmaps + session replay | PostHog or Hotjar | Visual analytics |

### Privacy-First Considerations

If operating in the EU or targeting privacy-conscious users:
- Choose cookie-free tools (Plausible, Umami, Fathom) -- no cookie banner needed
- Self-host analytics for full data ownership
- Avoid sending PII to third-party analytics providers
- Check GDPR/CCPA compliance of your chosen provider

## Procedure

### 1. Map Metrics to Events

Extract the primary metric, guardrail metrics, and key user flows from the PRD. Every tracked event must map to a metric. If it does not drive a decision, do not track it.

### 2. Define Event Taxonomy

Create a single source of truth for all event names (e.g., `src/services/analytics/events.js`):
- Naming convention: `[object]_[action]` in snake_case
- Examples: `user_signed_up`, `subscription_started`, `feature_used`
- Never use raw strings inline -- always reference the constants file

### 3. Build Analytics Service Layer

Create a provider-agnostic wrapper with these methods:
- `track(event, properties)` -- log an event
- `identify(userId, traits)` -- associate events with a user
- `alias(newId, oldId)` -- link anonymous to authenticated identity

All analytics calls must be wrapped in try/catch. Analytics must never break the product. Fail silently in dev if the provider is not configured.

### 4. Instrument the Critical Path

In priority order:
1. **Signup** + `identify()` with key traits
2. **Core feature usage** -- the action that defines product value
3. **Conversion to paid** -- subscription started, payment completed
4. **Retention signal** -- return visit, day-7 usage
5. **Failure states** -- payment failed, feature error

### 5. Build a Dashboard

Use Metabase, Grafana, or the analytics provider's built-in dashboard to display:
- Top 5 metrics with their events, targets, and current values
- Conversion funnel (signup to activation to payment)
- Retention curve (day 1, day 7, day 30)

## Key Constraints

- Never break the product on analytics failure -- all calls are try/catch
- Never track PII in event properties (PII goes in `identify()`, not `track()`)
- Never hardcode API keys
- Never instrument events not connected to a success metric
- Always use centralized event constants -- never raw string event names
