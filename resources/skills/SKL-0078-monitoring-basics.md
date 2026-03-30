---
id: SKL-0078
name: Monitoring Basics
category: skills
tags: [monitoring, observability, uptime, logging, alerting, sentry, betterstack, structured-logging]
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
lastUpdated: "2026-03-29"
difficulty: beginner
---

# Monitoring Basics

You need to know when your app is broken before your users tell you. Start with three signals, add complexity only when needed.

## The Three Things to Monitor

| Signal | What It Tells You | Tool |
|--------|-------------------|------|
| **Errors** | Something broke | Sentry |
| **Uptime** | Is it reachable? | Betterstack (or UptimeRobot) |
| **Latency** | Is it slow? | Sentry Performance or Vercel Analytics |

That's it for a solo dev. Skip metrics dashboards, skip distributed tracing, skip Grafana. Add those when you have a team or a scaling problem.

## Uptime Monitoring

Set up a heartbeat check that pings your app every 1-5 minutes:

1. Create a `/health` endpoint that returns 200 when the app is running
2. Point Betterstack (or UptimeRobot) at it
3. Get notified via email/Slack/SMS when it goes down

```javascript
// Minimal health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: Date.now() });
});
```

For deeper checks, verify database connectivity in the health endpoint.

## Structured Logging

Logs should be machine-parseable, not just human-readable:

```javascript
// Bad: unstructured
console.log('User signed up: ' + email);

// Good: structured
logger.info('user_signup', { email, plan: 'free', source: 'landing_page' });
```

**Structured logging rules:**
- Use consistent field names across your app
- Include request ID for tracing a request through your system
- Use log levels correctly: `error` (broken), `warn` (degraded), `info` (business events), `debug` (dev only)
- Never log secrets, passwords, tokens, or full credit card numbers

**Simple setup:** Use `pino` (Node.js) or Python's `structlog`. Both output JSON by default.

## Alerting Without Alert Fatigue

The goal is: every alert requires action. If you start ignoring alerts, the system is useless.

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

## Key Rules

- Start with uptime + error tracking. Add more only when you need it.
- Every alert must have a clear action. No "just FYI" alerts.
- Log structure matters more than log volume.
- Review alerts weekly. Noisy alert? Fix it or delete it.
- Your `/health` endpoint should be unauthenticated and fast.
