---
id: SKL-0010
name: API Integration
category: skills
tags: [integration, api, webhook, stripe, supabase, third-party, sdk]
capabilities: [service-connection, webhook-handling, credential-management, sandbox-testing]
useWhen:
  - connecting to a third-party API or external service
  - implementing webhook receivers or event handlers
  - integrating payments, auth, email, SMS, or push notifications
  - setting up Stripe, Supabase, SendGrid, Twilio, or similar services
estimatedTokens: 600
relatedFragments: [SKL-0006, SKL-0009, SKL-0011]
dependencies: []
synonyms: ["connect to an external API", "integrate Stripe into my app", "set up webhooks", "hook up a third party service", "how do I use this API"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# API Integration

Connect the app to third-party services safely and reliably. Every integration is documented, every key is in an env var, every webhook is verified.

## Default Service Choices

| Type | Default | Why |
|------|---------|-----|
| Payments | Stripe | Best docs, widest adoption, excellent test mode |
| Auth | Supabase Auth | Free tier, open source |
| Email | SendGrid | Reliable delivery, simple API |
| SMS | Twilio | Industry standard |
| Push (mobile) | Expo Notifications | Built into Expo stack |
| File storage | Supabase Storage | Pairs with Supabase Auth |
| Realtime/DB | Supabase | Free tier, Postgres-based |

## Procedure

### 1. Research the Integration

Check project decisions for prior choices. Scan existing integration files. Read official docs for the chosen service.

### 2. Set Up Credentials Safely

- All keys via environment variables — never hardcoded
- Add new vars to `.env.example` with placeholder values
- Never commit `.env` — only `.env.example`

### 3. Build by Integration Type

**Payments:** Use official SDK, handle payment intents server-side, implement webhooks, test with test cards, never store card data.

**Auth:** Use official client, handle session persistence, implement all auth states, protect routes.

**Email/SMS:** Use official library, create templates, include unsubscribe links (email), require opt-in (SMS).

**Webhooks (receiving):** Verify signatures always, return 200 immediately, process async, handle duplicates idempotently.

**External APIs:** Cache responses, handle rate limits, never expose keys to frontend, have fallback for unavailability.

### 4. Test and Document

- Write integration tests using the service's sandbox/test mode
- Document in project decisions: service chosen, env vars required, webhook endpoints, gotchas
- Update `.env.example` with all new variables

## Key Constraints

- Never hardcode API keys, tokens, or credentials
- Never call payment APIs from the frontend
- Never store raw card data or passwords
- Never process webhooks without verifying signatures
- Always use official SDKs over raw HTTP calls
- Always test in sandbox mode first
