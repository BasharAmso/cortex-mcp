---
id: PAT-0203
name: IoT Alert & Threshold Pattern
category: patterns
tags: [alerts, thresholds, hysteresis, notification-routing, escalation, iot, monitoring]
capabilities: [threshold-rule-design, hysteresis-implementation, notification-routing, alert-escalation]
useWhen:
  - setting up alerts when sensor values cross critical thresholds
  - preventing alert flapping with hysteresis or debounce
  - designing notification routing to the right person or channel
  - building alert escalation for unacknowledged critical events
  - configuring Grafana or similar alerting for IoT dashboards
estimatedTokens: 650
relatedFragments: [SKL-0392, PAT-0201, PAT-0076, SKL-0149]
dependencies: []
synonyms: ["how to set up IoT alerts", "alert when temperature too high", "stop alert flapping", "notification routing for devices", "grafana alerting for sensors", "escalation policy for IoT"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/grafana/grafana"
difficulty: beginner
owner: "cortex"
pillar: "iot"
---

# IoT Alert & Threshold Pattern

Effective IoT alerting surfaces actionable problems without drowning operators in noise. The goal is the right alert, to the right person, at the right time.

## Threshold Types

| Type | Logic | Use Case |
|------|-------|----------|
| **Static** | Value > X | Temperature above 80F in a server room |
| **Rate of change** | Value changes > X per minute | Pressure dropping rapidly (pipe leak) |
| **Absence** | No data received in X minutes | Device offline or sensor failure |
| **Anomaly** | Value deviates > N standard deviations from rolling average | Unusual energy consumption pattern |
| **Compound** | Condition A AND Condition B | High humidity AND rising temperature (mold risk) |

## Hysteresis: Preventing Alert Flapping

A sensor hovering around a threshold (e.g., temperature oscillating between 79F and 81F with an 80F threshold) generates rapid alert/clear cycles. This is "flapping" and it trains operators to ignore alerts.

**Hysteresis** uses separate thresholds for alerting and clearing:

```
Alert triggers at:  80F (upper threshold)
Alert clears at:    75F (lower threshold)
```

The 5-degree gap means the sensor must drop significantly below the alert point before the alert clears. This eliminates flapping from normal oscillation.

Grafana implements this with the "For" duration: an alert condition must persist for a configurable period (e.g., 5 minutes) before firing. This is time-based hysteresis rather than value-based.

## Debounce and Windowing

For noisy sensors, evaluate thresholds against aggregated values rather than individual readings:

- **Average over window**: Alert if 5-minute average exceeds threshold. Smooths noise.
- **Count over window**: Alert if value exceeds threshold more than N times in 10 minutes. Tolerates occasional spikes.
- **Min/Max over window**: Alert if the minimum value in the window exceeds threshold. Very conservative, catches sustained violations.

## Notification Routing

Not every alert needs the same response channel:

| Severity | Channel | Response Time | Example |
|----------|---------|---------------|---------|
| **Critical** | Phone call + SMS + push | Immediate | Fire alarm, gas leak, security breach |
| **Warning** | Push notification + email | 1-4 hours | Device battery low, temperature trending up |
| **Info** | Dashboard + daily digest | Next business day | Firmware update available, routine maintenance due |

Grafana's notification policies support routing by label: alerts tagged `severity=critical` go to PagerDuty, `severity=warning` go to Slack, `severity=info` go to email digest.

## Escalation Policy

Unacknowledged critical alerts must escalate:

1. **0 min**: Alert fires. Primary on-call receives phone call + SMS.
2. **5 min**: Not acknowledged. Secondary on-call receives notification.
3. **15 min**: Not acknowledged. Team lead receives notification. Alert marked as escalated.
4. **30 min**: Not acknowledged. Management notified. Incident created automatically.

Each escalation level adds recipients without removing previous ones. The alert tracks acknowledgment status and stops escalating once someone responds.

## Alert Lifecycle

```
PENDING → FIRING → ACKNOWLEDGED → RESOLVED
                 → ESCALATED → ACKNOWLEDGED → RESOLVED
```

- **Pending**: Condition detected, within "For" duration. Not yet fired.
- **Firing**: Condition persisted past threshold. Notifications sent.
- **Acknowledged**: Operator confirmed awareness. Escalation paused.
- **Resolved**: Condition cleared (passed hysteresis threshold). Resolution notification sent.

Track transitions with timestamps for SLA reporting and post-incident review.

## Key Takeaways

- Use hysteresis (separate alert and clear thresholds) to prevent alert flapping
- Evaluate thresholds against windowed aggregates, not individual readings, for noisy sensors
- Route notifications by severity: critical gets phone calls, warnings get push, info gets email digest
- Implement escalation policies so unacknowledged critical alerts reach higher authority
- Track the full alert lifecycle (pending, firing, acknowledged, resolved) for operational metrics
