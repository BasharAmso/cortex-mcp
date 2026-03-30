---
id: SKL-0010
name: API Integration
category: skills
tags: [integration, api, webhook, stripe, supabase, third-party, sdk, system-design, caching, rate-limiting]
capabilities: [service-connection, webhook-handling, credential-management, sandbox-testing, resilience-patterns]
useWhen:
  - connecting to a third-party API or external service
  - implementing webhook receivers or event handlers
  - integrating payments, auth, email, SMS, or push notifications
  - setting up Stripe, Supabase, SendGrid, Twilio, or similar services
  - designing resilient integrations with caching and retry logic
estimatedTokens: 650
relatedFragments: [SKL-0006, SKL-0009, SKL-0011]
dependencies: []
synonyms: ["connect to an external API", "integrate Stripe into my app", "set up webhooks", "hook up a third party service", "how do I use this API"]
lastUpdated: "2026-03-29"
sourceUrl: "https://github.com/donnemartin/system-design-primer"
difficulty: intermediate
---

# API Integration

Connect the app to third-party services safely and reliably. Grounded in the System Design Primer covering scalability, caching, load balancing, and resilience patterns that apply to any external integration.

## Resilience Patterns (From System Design Primer)

| Pattern | When to apply |
|---------|--------------|
| Exponential backoff | Rate-limited APIs, transient failures |
| Circuit breaker | Prevent cascading failures from down services |
| Caching | Reduce API calls for idempotent reads (TTL-based) |
| Idempotency keys | Webhook processing, payment retries |
| Timeout + fallback | Every external call needs a timeout and a degraded-mode response |
| Async processing | Webhook handlers: return 200 immediately, process in background |

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

- All keys via environment variables -- never hardcoded
- Add new vars to `.env.example` with placeholder values
- Never commit `.env` -- only `.env.example`
- Separate credentials per environment (dev, staging, production)

### 3. Build by Integration Type

**Payments:** Use official SDK, handle payment intents server-side, implement webhooks, test with test cards, never store card data.

**Auth:** Use official client, handle session persistence, implement all auth states, protect routes.

**Email/SMS:** Use official library, create templates, include unsubscribe links (email), require opt-in (SMS).

**Webhooks (receiving):** Verify signatures always, return 200 immediately, process async, handle duplicates idempotently with idempotency keys.

**External APIs:** Cache responses (respect Cache-Control headers), handle rate limits with exponential backoff, never expose keys to frontend, have fallback for unavailability.

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
- Always implement timeout and fallback for external calls
