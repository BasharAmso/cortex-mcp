---
id: SKL-0414
name: API Integration Automation
category: skills
tags: [api-integration, data-mapping, error-handling, retries, webhooks, automation]
capabilities: [api-connection-design, data-mapping, error-recovery, webhook-processing]
useWhen:
  - connecting multiple APIs together in an automated workflow
  - mapping data between different API schemas
  - handling API errors and implementing retry logic
  - building webhook receivers for event-driven automation
  - orchestrating multi-step API workflows
estimatedTokens: 650
relatedFragments: [SKL-0410, SKL-0411, PAT-0210, PAT-0211, PAT-0212]
dependencies: []
synonyms: ["how to connect APIs together", "API data mapping", "webhook automation", "how to handle API errors", "multi-step API workflow", "how to integrate third party APIs"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/n8n-io/n8n"
difficulty: intermediate
owner: "cortex"
pillar: "automation"
---

# Skill: API Integration Automation

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0414 |
| **Name** | API Integration Automation |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

API integration automation connects disparate systems into cohesive workflows. Whether syncing CRM data to email platforms or routing webhook events to downstream services, the patterns are consistent: authenticate, fetch, transform, deliver, and handle failures.

### Integration Architecture

```
Source API → Fetch → Transform/Map → Validate → Deliver → Destination API
                                         ↓
                                   Error Queue (retry later)
```

### Authentication Patterns

| Method | When to Use | Security Notes |
|--------|-------------|---------------|
| **API Key** | Simple integrations | Store in env vars, never in code |
| **OAuth 2.0** | User-delegated access | Handle token refresh automatically |
| **JWT** | Service-to-service | Short-lived tokens, rotate signing keys |
| **Webhook signatures** | Inbound webhooks | Verify HMAC before processing |

Always store credentials in environment variables or a secrets manager. Implement automatic token refresh for OAuth integrations. Verify webhook signatures before processing payloads.

### Data Mapping

Map fields between different API schemas. Handle type mismatches (strings to numbers, date formats). Use a mapping configuration that is separate from your code so non-engineers can update it. Handle missing fields with sensible defaults. Validate the mapped output before sending.

```javascript
function mapContact(hubspot) {
  return {
    email: hubspot.properties.email,
    name: `${hubspot.properties.firstname} ${hubspot.properties.lastname}`.trim(),
    created: new Date(hubspot.createdAt).toISOString(),
    tags: hubspot.properties.lifecycle_stage ? [hubspot.properties.lifecycle_stage] : [],
  };
}
```

### Error Handling and Retries

APIs fail. Implement retry with exponential backoff for transient errors (5xx, timeouts, rate limits). Do not retry client errors (4xx except 429). Use a dead letter queue for permanently failed requests. Log the full request/response for debugging. Set reasonable timeouts (10-30 seconds for most APIs).

### Webhook Processing

Receive webhooks with an HTTP endpoint. Respond with 200 immediately, then process asynchronously. Verify signatures. Handle duplicate deliveries with idempotency checks. Store raw payloads for debugging and replay.

## Key Takeaways

- Separate data mapping configuration from integration logic
- Implement automatic OAuth token refresh and credential rotation
- Retry transient errors with exponential backoff, never retry 4xx errors
- Verify webhook signatures and process payloads asynchronously
- Log full request/response pairs for debugging integration failures
