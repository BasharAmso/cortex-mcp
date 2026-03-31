---
id: PAT-0195
name: Team Notification Pattern
category: patterns
tags: [notifications, channels, preferences, digest, do-not-disturb, urgency, email, push, in-app]
capabilities: [multi-channel-notification, preference-management, digest-aggregation, urgency-routing]
useWhen:
  - building a notification system for a team application
  - implementing user notification preferences across channels
  - designing digest emails that aggregate multiple notifications
  - adding do-not-disturb and urgency-based delivery rules
  - routing notifications to email, push, SMS, and in-app channels
estimatedTokens: 650
relatedFragments: [SKL-0380, PAT-0193, SKL-0377]
dependencies: []
synonyms: ["how to build a notification system", "how to let users control notification preferences", "how to send digest emails", "how to implement do-not-disturb for notifications", "how to route notifications to different channels", "how to avoid notification overload"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/novuhq/novu"
difficulty: beginner
owner: "cortex"
pillar: "collaboration"
---

# Team Notification Pattern

Multi-channel notification delivery with preferences, digest, and urgency routing.

## Notification Pipeline

Novu's architecture processes notifications through a clear pipeline:

```
Event Trigger -> Template Resolution -> Preference Check -> Channel Routing -> Delivery
```

| Stage | Purpose |
|-------|---------|
| **Trigger** | Application event fires (issue assigned, comment posted) |
| **Template** | Select notification template with channel-specific content |
| **Preferences** | Check subscriber preferences (opted out? digest mode?) |
| **Routing** | Determine delivery channels (in-app, email, push, SMS) |
| **Delivery** | Send via provider (SendGrid, FCM, Twilio, etc.) |

## Channel Strategy

| Channel | Best For | Latency | Cost |
|---------|----------|---------|------|
| **In-App** | All notifications, the primary channel | Instant | Free |
| **Email** | Detailed content, action required | Minutes | Low |
| **Push** | Time-sensitive, mobile users | Seconds | Low |
| **SMS** | Critical alerts, incidents | Seconds | High |
| **Chat** | Team awareness (Slack, Teams) | Seconds | Free |

Route by urgency: in-app for everything, email for action items, push for time-sensitive, SMS only for critical/emergency.

## Subscriber Preferences

Let users control their notification experience:

```json
{
  "userId": "user-123",
  "preferences": {
    "issue_assigned": { "inApp": true, "email": true, "push": true },
    "comment_reply": { "inApp": true, "email": false, "push": true },
    "weekly_digest": { "inApp": false, "email": true, "push": false },
    "marketing":     { "inApp": false, "email": false, "push": false }
  },
  "globalMute": false,
  "quietHours": { "start": "22:00", "end": "08:00", "timezone": "America/New_York" }
}
```

Novu provides an embeddable React component (`<Inbox />`) that renders preference management UI out of the box.

## Digest Engine

Aggregate multiple notifications into a single delivery:

```
1. Notification arrives during digest window
2. Instead of immediate delivery, queue in digest bucket
3. At digest interval (hourly, daily), collect all queued items
4. Merge into single email/notification with summary
5. Deliver aggregated notification
```

Common digest strategies: time-based (every hour), count-based (every 10 events), or hybrid (whichever threshold hits first). Novu supports configurable digest windows per notification type.

## Do-Not-Disturb

Implement quiet hours that suppress non-critical notifications:

- **Quiet hours**: User-defined time window per timezone
- **Focus mode**: Temporary mute for a duration ("mute for 2 hours")
- **Channel suppression**: Mute specific channels or threads
- **Urgency override**: Critical/emergency notifications bypass DND

Queue suppressed notifications and deliver when DND ends, or batch them into a summary.

## Urgency Classification

| Level | Behavior | Example |
|-------|----------|---------|
| **Critical** | All channels, bypass DND | Production outage |
| **High** | Push + in-app immediately | Assigned to you |
| **Medium** | In-app immediately, email in digest | Comment on your issue |
| **Low** | In-app only, batchable | Activity in watched project |

## Key Takeaways

- Process notifications through a pipeline: trigger, template, preferences, routing, delivery
- In-app is the primary channel; escalate to push/email/SMS based on urgency
- Digest aggregation prevents notification fatigue for active team environments
- User preferences must be granular (per notification type per channel) with global overrides
- Do-not-disturb with urgency bypass respects user focus without missing critical alerts
