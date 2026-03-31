---
id: PAT-0168
name: Notification UX Pattern
category: patterns
tags: [notifications, toast, badge, inbox, preference-center, urgency-levels]
capabilities: [notification-design, toast-messages, badge-indicators, notification-inbox, preference-management]
useWhen:
  - designing a notification system for a web or mobile application
  - choosing between toast, badge, inbox, and push notification types
  - building a notification preference center for users
  - defining urgency levels and notification routing rules
  - reducing notification fatigue while keeping users informed
estimatedTokens: 650
relatedFragments: [SKL-0329, SKL-0328, PAT-0170, SKL-0014]
dependencies: []
synonyms: ["how to design notifications", "toast vs badge vs push notification", "how to build a notification preference center", "how to avoid notification fatigue", "notification urgency levels", "in-app notification inbox design"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/novuhq/novu"
difficulty: beginner
owner: "cortex"
pillar: "ux-design"
---

# Pattern: Notification UX Pattern

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0168 |
| **Name** | Notification UX Pattern |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

Notifications inform users about events that need their attention. The challenge is delivering the right information at the right time through the right channel without creating fatigue. Over-notification is the fastest way to train users to ignore your product.

### Notification Types

| Type | Persistence | Interruption | Use For |
|------|------------|-------------|---------|
| **Toast/snackbar** | 3-5 seconds | Low | Action confirmations, status updates |
| **Badge** | Until cleared | None (passive) | Unread counts, pending items |
| **In-app inbox** | Persistent list | None (on demand) | Activity feed, historical notifications |
| **Banner** | Until dismissed | Medium | System alerts, maintenance notices |
| **Push (mobile)** | Lock screen | High | Time-sensitive actions, messages |
| **Email** | Inbox | Low | Digests, account changes, receipts |

### Toast/Snackbar Design

Toasts provide brief, non-blocking feedback:

```
┌──────────────────────────────────────┐
│ ✓ Project saved successfully    [Undo] │
└──────────────────────────────────────┘
```

- Position: bottom-left or top-right (be consistent)
- Auto-dismiss after 3-5 seconds (longer if there is an action like "Undo")
- Stack multiple toasts vertically with the newest on top
- Include an action when the notification is reversible (Undo, View, Retry)
- Never put critical information in a toast; users may miss it

### Badge Indicators

Badges signal unread or pending items without interrupting:

- **Dot badge**: Something new exists (no count), minimal visual weight
- **Count badge**: Shows exact number (cap at "99+" to avoid layout issues)
- **Placement**: Top-right corner of the icon or tab
- **Color**: Red for urgent, blue or gray for informational
- **Clearing**: Badge clears when the user views the content, not when they see the badge

### In-App Notification Inbox

For products with ongoing activity (comments, mentions, approvals), an inbox provides a persistent, scannable list:

- **Bell icon** in the header with a badge count
- **Dropdown or slide-out panel** showing recent notifications
- **Read/unread styling**: Bold or highlighted for unread, muted for read
- **Group by time**: "Today", "Yesterday", "Earlier this week"
- **Actions inline**: "Approve", "View", "Dismiss" directly on the notification
- **Mark all as read**: Essential when notifications accumulate
- **Link to full page**: "View all notifications" for the complete history

### Urgency Framework

Not all notifications are equal. Define urgency levels to route appropriately:

| Urgency | Examples | Channels | User Control |
|---------|---------|----------|-------------|
| **Critical** | Security breach, payment failure | Push + Email + Banner | Cannot disable |
| **High** | Direct message, approval request | Push + Inbox | Can switch to email only |
| **Medium** | Comment reply, status change | Inbox + optional push | Can disable push |
| **Low** | Weekly digest, product updates | Email only | Can unsubscribe |
| **Passive** | Badge update, activity count | Badge only | Always on |

### Preference Center

Users must control what notifications they receive and through which channel:

```
Notification Preferences
─────────────────────────
                        In-App    Email    Push
Comments & Mentions      ✓         ✓       ✓
Task Assignments         ✓         ✓       ☐
Status Updates           ✓         ☐       ☐
Weekly Digest            ☐         ✓       ☐
Product Announcements    ☐         ✓       ☐
```

Design principles:
- Default to reasonable settings (not everything on)
- Group preferences by category, not by channel
- Allow per-channel control (in-app, email, push) for each category
- Include a "Quiet hours" option for push notifications
- Never make critical security notifications opt-out

### Preventing Notification Fatigue

- **Batch similar notifications**: "3 people commented on your post" instead of 3 separate notifications
- **Respect frequency**: No more than 3-5 push notifications per day unless user-initiated
- **Decay gracefully**: If a user has not engaged with a notification type in 30 days, reduce or stop sending
- **Provide digest options**: Daily or weekly summary email instead of real-time for low-urgency items

## Anti-Patterns

- Sending push notifications for marketing within the first 24 hours of install
- No way to disable or customize notification preferences
- Toasts for errors that require user action (use a persistent banner instead)
- Badge counts that never clear even after viewing content
- Identical notification on all channels simultaneously (push + email + in-app for the same event)

## Key Takeaways

- Match notification type to urgency: toasts for confirmations, badges for passive counts, push for time-sensitive actions
- Build a preference center that gives users per-channel control grouped by category
- Batch similar notifications and respect frequency limits to prevent fatigue
- Critical security notifications should never be opt-out
- Toasts auto-dismiss and should never contain information the user must act on
