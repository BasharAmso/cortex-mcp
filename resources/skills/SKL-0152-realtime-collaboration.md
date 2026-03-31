---
id: SKL-0152
name: Real-Time Collaboration
category: skills
tags: [collaboration, real-time, crdt, operational-transform, presence, sync, offline, conflict-resolution, multiplayer, websocket]
capabilities: [real-time-editing, presence-tracking, conflict-resolution, offline-support, sync-architecture]
useWhen:
  - building a document editor with simultaneous multi-user editing
  - adding presence indicators showing who is viewing or editing
  - choosing between CRDTs and operational transforms for conflict resolution
  - implementing offline editing with automatic sync on reconnect
  - designing sync architecture for collaborative applications
estimatedTokens: 700
relatedFragments: [PAT-0079, PAT-0078, SKL-0151]
dependencies: []
synonyms: ["how to build a multiplayer editor", "how to let multiple users edit at the same time", "how to add live cursors to my app", "how to handle editing conflicts", "how to sync data between users in real time", "how to build Google Docs style collaboration"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/toeverything/AFFiNE"
difficulty: intermediate
owner: "cortex"
pillar: "collaboration"
---

# Skill: Real-Time Collaboration

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0152 |
| **Version** | 1.0 |
| **Owner** | cortex |
| **Inputs** | Application type, data model, expected user count, offline requirements |
| **Outputs** | Sync architecture, conflict resolution strategy, presence system |
| **Triggers** | `REALTIME_COLLAB_REQUESTED` |

---

## Purpose

Enable multiple users to work on the same document, board, or dataset simultaneously with real-time updates, presence awareness, and conflict-free merging. AFFiNE demonstrates this with a local-first, CRDT-based architecture that merges docs, whiteboards, and databases into one collaborative surface.

---

## Conflict Resolution Approaches

| Approach | How It Works | Best For |
|----------|-------------|----------|
| **Operational Transform (OT)** | Transforms operations against concurrent edits on a central server | Text editors with a reliable server (Google Docs model) |
| **CRDT (Conflict-free Replicated Data Types)** | Each client maintains a local replica that merges deterministically | Local-first apps, offline support, peer-to-peer |
| **Last-write-wins** | Latest timestamp overwrites previous value | Simple fields where conflicts are rare |

**Recommendation:** Use CRDTs for new projects. Libraries like Yjs and Automerge are mature, and CRDT-based systems handle offline and network partitions gracefully without a central server.

---

## Presence System

Presence tells users who else is online and what they are doing:

1. **Awareness protocol** -- broadcast each user's cursor position, selection range, and display name.
2. **Heartbeat** -- clients send periodic pings (every 5-15 seconds). Remove stale users after 30 seconds of silence.
3. **Cursor rendering** -- show colored cursors with name labels. Use consistent color assignment per user.
4. **Selection highlights** -- shade the text or area another user has selected.

---

## Sync Architecture

```
Client (local CRDT) <-> WebSocket <-> Server (merge + persist) <-> Other Clients
```

1. **Local-first:** All edits apply to the local CRDT immediately. The UI never waits for the server.
2. **Sync on connect:** When a client connects, exchange state vectors to determine what updates are missing, then send only the delta.
3. **Offline queue:** Edits made offline are stored locally and synced automatically on reconnect. CRDTs guarantee merge correctness regardless of edit order.
4. **Persistence:** The server periodically snapshots the merged CRDT state to a database for durability and fast initial loads.

---

## Key Design Decisions

- **Transport:** WebSockets for low-latency bidirectional sync. Fall back to HTTP long-polling if WebSockets are unavailable.
- **Document granularity:** Sync per-document, not per-workspace. Keeps update payloads small.
- **Access control:** Enforce permissions server-side before applying incoming updates. Never trust the client.
- **Undo/redo:** Implement as local operations, not global. Each user undoes only their own changes.

---

## Constraints

- Never apply remote updates without validating permissions server-side
- Never block the UI waiting for server acknowledgment (local-first principle)
- Never assume clients are always connected
- Always handle reconnection with state reconciliation
- Always throttle presence broadcasts to avoid flooding (100-500ms debounce)

---

## Definition of Done

- [ ] Conflict resolution strategy chosen and implemented
- [ ] Multiple users can edit simultaneously without data loss
- [ ] Presence indicators show active collaborators
- [ ] Offline edits sync correctly on reconnect
- [ ] Permissions enforced server-side
- [ ] Performance tested with target concurrent user count
