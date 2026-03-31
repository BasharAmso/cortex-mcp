---
id: SKL-0377
name: Team Chat Architecture
category: skills
tags: [chat, messaging, channels, threads, presence, websocket, real-time, search, integrations]
capabilities: [chat-system-design, channel-management, thread-support, presence-tracking, message-search]
useWhen:
  - building a team messaging system with channels and DMs
  - designing real-time chat with WebSocket architecture
  - implementing threaded conversations and message search
  - adding presence indicators and typing status
  - integrating chat with bots and external services
estimatedTokens: 650
relatedFragments: [SKL-0152, PAT-0195, PAT-0194]
dependencies: []
synonyms: ["how to build a team chat app", "how to design a Slack alternative", "how to implement real-time messaging", "how to add channels and threads to chat", "how to build chat with WebSockets", "how to show online status in a chat app"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/RocketChat/Rocket.Chat"
difficulty: intermediate
owner: "cortex"
pillar: "collaboration"
---

# Skill: Team Chat Architecture

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0377 |
| **Name** | Team Chat Architecture |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Team chat systems like Rocket.Chat provide real-time messaging through channels, direct messages, and threads. The architecture centers on WebSocket connections for instant delivery, with a REST API for history and management operations.

### Message Model

Every message carries:

| Field | Purpose |
|-------|---------|
| **id** | Unique identifier (UUID or ObjectId) |
| **roomId** | Channel, DM, or thread container |
| **senderId** | Author reference |
| **content** | Text, markdown, or rich blocks |
| **attachments** | Files, images, embeds |
| **threadId** | Parent message (null for top-level) |
| **reactions** | Emoji reactions with user lists |
| **timestamp** | Server-assigned creation time |
| **editedAt** | Last edit timestamp (null if never edited) |

### Channel Types

```
Public Channel  - Discoverable, anyone can join
Private Channel - Invite-only, hidden from non-members
Direct Message  - 1:1 or small group (2-8 users)
Thread          - Scoped conversation under a parent message
```

Rocket.Chat also supports federated channels across server instances, enabling cross-organization communication.

### Real-Time Architecture

WebSocket connections handle: new messages, edits, deletes, typing indicators, presence changes, and reactions. Each client subscribes to rooms they have joined. The server broadcasts events to all subscribers of a room.

Scale WebSocket connections with sticky sessions behind a load balancer, or use a pub/sub layer (Redis) to fan out events across multiple server instances.

### Presence System

Track user status (online, away, busy, offline) using heartbeat pings over the WebSocket connection. If no heartbeat received within the timeout window (typically 60 seconds), mark the user as offline. Broadcast presence changes to contacts and shared channels.

### Search and History

Store messages in a database (MongoDB for Rocket.Chat, PostgreSQL works well too). Implement full-text search across message content, sender names, and channel names. Paginate history loading with cursor-based pagination (not offset) for consistent results as new messages arrive.

### Integration Layer

Support incoming and outgoing webhooks, slash commands, and a bot framework. Incoming webhooks let external services post messages. Outgoing webhooks notify external services of message events. This enables CI/CD notifications, support ticket creation, and custom automation.

## Key Takeaways

- WebSocket for real-time delivery, REST API for history and management creates clean separation
- Use Redis pub/sub to scale WebSocket connections across multiple server instances
- Threaded conversations reduce noise in busy channels without fragmenting context
- Presence heartbeats with timeout-based offline detection are simpler and more reliable than disconnect events
- Cursor-based pagination prevents message skipping in actively updating channels
