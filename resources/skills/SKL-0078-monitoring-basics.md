---
id: SKL-0078
name: Monitoring Basics
category: skills
tags: [monitoring, observability, uptime, logging, alerting, sentry, betterstack, structured-logging, pino, apm]
capabilities: [monitoring-setup, structured-logging, uptime-monitoring, alert-configuration, incident-triage]
useWhen:
  - setting up monitoring for a new production app
  - deciding what to monitor and what to ignore
  - configuring alerts without creating noise
  - adding structured logging to an existing codebase
estimatedTokens: 650
relatedFragments: [PAT-0008, SKL-0079, SKL-0018]
dependencies: []
synonyms: ["how do I know if my app is down", "set up monitoring", "what should I monitor", "my app crashed and I didn't know", "add logging to my app"]
sourceUrl: "https://github.com/goldbergyoni/nodebestpractices"
lastUpdated: "2026-03-29"
difficulty: beginner
---

# Monitoring Basics

Monitoring is a game of finding out issues before customers do. Cover four layers: uptime, user-facing metrics, application-level metrics (event loop lag, memory), and distributed flow health. Start with three signals, add complexity only when needed.

## The Three Signals

| Signal | What It Tells You | Tool |
|--------|-------------------|------|
| **Errors** | Something broke | Sentry |
| **Uptime** | Is it reachable? | Betterstack (or UptimeRobot) |
| **Latency** | Is it slow? | Sentry Performance or Vercel Analytics |

Skip metrics dashboards, skip distributed tracing, skip Grafana until you have a team or a scaling problem.

## Uptime Monitoring

Set up a heartbeat check that pings your app every 1-5 minutes:

```javascript
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: Date.now() });
});
```

For deeper checks, verify database connectivity in the health endpoint. Point Betterstack or UptimeRobot at it and get notified via email/Slack/SMS when it goes down.

## Structured Logging

Log to stdout. Never specify log destination within the app. Let execution environments pipe streams to appropriate aggregators.

```javascript
// Bad: unstructured
console.log('User signed up: ' + email);

// Good: structured with context
logger.info('user_signup', { email, plan: 'free', source: 'landing_page' });
```

**Rules:**
- Use consistent field names across your app
- Include a request/transaction ID for tracing (use `AsyncLocalStorage` to maintain context across async calls)
- Use log levels correctly: `error` (broken), `warn` (degraded), `info` (business events), `debug` (dev only)
- Never log secrets, passwords, tokens, or full credit card numbers
- Use `pino` (Node.js) or `structlog` (Python). Both output JSON by default.

## APM (When You Need More)

APM products provide an additional layer of discovery by auto-detecting slow transactions and suggesting root causes. Add APM when you need to answer "why is this endpoint slow?" not just "is it slow?"

## Alerting Without Alert Fatigue

Every alert must require action. If you start ignoring alerts, the system is useless.

**Alert on:**
- App is down (uptime check fails 2+ times)
- Error rate spikes (10x normal in 5-minute window)
- Critical business flow breaks (payment failures, auth errors)

**Don't alert on:**
- Individual 404s
- Expected errors (validation failures, rate limits)
- Warnings that need no immediate action

**Alert routing:**
- Critical (app down, payment broken): SMS or phone call
- Important (error spike): Slack + email
- Informational (deploy succeeded): Slack only

## Key Constraints

- Start with uptime + error tracking. Add more only when you need it.
- Every alert must have a clear action. No "just FYI" alerts.
- Log structure matters more than log volume.
- Review alerts weekly. Noisy alert? Fix it or delete it.
- Your `/health` endpoint should be unauthenticated and fast.
