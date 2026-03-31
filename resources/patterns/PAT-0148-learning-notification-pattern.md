---
id: PAT-0148
name: Learning Notification Pattern
category: patterns
tags: [notifications, reminders, deadlines, engagement, multi-channel, learning-nudges]
capabilities: [notification-workflow-design, multi-channel-delivery, engagement-nudges, deadline-reminders]
useWhen:
  - designing notification systems for educational platforms
  - implementing assignment deadline reminders
  - building grade notification workflows
  - adding engagement nudges to reduce student dropout
  - planning multi-channel delivery for learning communications
estimatedTokens: 650
relatedFragments: [SKL-0282, SKL-0283, PAT-0147]
dependencies: []
synonyms: ["how to send assignment reminders", "grade notification system", "student engagement notifications", "deadline reminder design", "learning platform notification strategy", "how to reduce student dropout with nudges"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/novuhq/novu"
difficulty: beginner
owner: "cortex"
pillar: "education"
---

# Learning Notification Pattern

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0148 |
| **Name** | Learning Notification Pattern |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

Notifications in educational platforms serve two purposes: keeping students on track (deadlines, grades) and sustaining engagement (encouragement, streaks). Novu's workflow engine demonstrates how to orchestrate multi-channel notifications with subscriber preferences and digest batching. The challenge is being helpful without being annoying.

### Notification Categories

| Category | Trigger | Urgency | Channel |
|----------|---------|---------|---------|
| **Assignment posted** | Instructor creates assignment | Medium | In-app + email |
| **Deadline reminder** | 48h and 24h before due date | High | Push + email |
| **Grade published** | Instructor submits grade | Medium | In-app + push |
| **Forum reply** | Someone replies to student's post | Low | In-app only |
| **Streak encouragement** | Student misses a day after 3+ day streak | Medium | Push |
| **At-risk alert** | Student inactive for 7+ days | High | Email + SMS (to parent if minor) |
| **Course announcement** | Instructor broadcasts message | High | In-app + email |
| **Certificate earned** | Student completes course | Low | In-app + email |

### Multi-Channel Delivery Strategy

Follow Novu's pattern of unified notification workflows with channel fallback:

```
Trigger event → Check subscriber preferences
  → Primary channel (in-app)
  → If unread after 1 hour → Fallback channel (push)
  → If unread after 24 hours → Escalation channel (email)
```

Never send the same notification on all channels simultaneously. Escalate progressively. Respect student opt-out preferences per category.

### Notification Workflow Engine

Model each notification type as a workflow:

```
DeadlineReminder workflow:
  1. Filter: Is assignment still active? Has student already submitted?
  2. Digest: Batch multiple upcoming deadlines into one message
  3. Delay: Send at 9 AM in student's timezone (not 3 AM)
  4. Deliver: Push notification with assignment name and time remaining
  5. Fallback: Email if push not delivered within 2 hours
```

### Digest and Batching

Students enrolled in multiple courses receive dozens of events daily. Batch related notifications:

- **Daily digest**: Combine all forum replies, announcements, and low-urgency items into one morning email.
- **Deadline digest**: Group assignments due within the same week into a single "upcoming deadlines" notification.
- **Grade digest**: Batch grades published within a 4-hour window into one notification.

Novu's digest engine handles this by holding notifications in a buffer for a configurable window before sending a combined message.

### Engagement Nudges

Nudges reduce dropout when designed with behavioral psychology principles:

1. **Streak reminders**: "You've studied 5 days in a row! Keep it going." Sent when a student is about to break a streak.
2. **Progress milestones**: "You're 75% through Module 3!" Celebrate progress, not just completion.
3. **Social proof**: "23 classmates completed this week's quiz. Ready to join them?"
4. **Loss aversion**: "Your streak resets at midnight. 10 minutes to keep it alive." Use sparingly.
5. **Re-engagement**: After 7 days inactive, send a personal message from the instructor (auto-generated but instructor-signed).

### Subscriber Preferences

Let students control their notification experience:

```
Preferences {
  studentId,
  channels: {
    email: true, push: true, sms: false, inApp: true
  },
  categories: {
    deadlines: "all",
    grades: "all",
    forums: "digest",
    announcements: "all",
    nudges: "minimal"  // only streaks, no social proof
  },
  quietHours: { start: "22:00", end: "08:00", timezone: "US/Eastern" }
}
```

Respect quiet hours absolutely. Queue notifications and deliver when the window opens. Never wake a student at 2 AM for a forum reply.

### Timing Best Practices

- **Deadline reminders**: 48 hours and 24 hours before. Not 1 week (too early) or 1 hour (too late).
- **Grade notifications**: Within 1 hour of instructor posting. Students check constantly after submitting work.
- **Daily digest**: Morning (8-9 AM local time). Students plan their day around it.
- **Engagement nudges**: Late afternoon (4-5 PM). Catches students with free time after classes.

## Key Takeaways

- Categorize notifications by urgency and use progressive channel escalation, not simultaneous blast.
- Digest and batch low-urgency notifications to prevent notification fatigue.
- Engagement nudges reduce dropout when they celebrate progress and use social proof sparingly.
- Respect quiet hours and student preferences per notification category.
- Time notifications intentionally: deadline reminders at 48h/24h, digests in the morning, nudges in the afternoon.
