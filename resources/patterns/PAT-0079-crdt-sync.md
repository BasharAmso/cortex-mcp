---
id: PAT-0079
name: CRDT Sync Patterns
category: patterns
tags: [crdt, sync, yjs, automerge, conflict-free, replication, distributed, merge, offline-first, local-first]
capabilities: [conflict-free-merging, offline-sync, document-replication, state-reconciliation, garbage-collection]
useWhen:
  - choosing between operation-based and state-based CRDTs
  - implementing offline-first document sync with Yjs or Automerge
  - designing merge logic for distributed collaborative editing
  - handling network partitions in a collaborative application
  - optimizing CRDT storage with garbage collection and snapshots
estimatedTokens: 650
relatedFragments: [SKL-0152, PAT-0078, PAT-0002]
dependencies: []
synonyms: ["how to sync data without conflicts", "how to build offline first collaboration", "what is a CRDT and how to use it", "how to merge edits from multiple users", "how to use Yjs or Automerge", "how to handle data sync when users go offline"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/toeverything/AFFiNE"
difficulty: intermediate
owner: "cortex"
pillar: "collaboration"
---

# CRDT Sync Patterns

Conflict-free Replicated Data Types (CRDTs) enable multiple users to edit shared data concurrently and merge changes automatically without conflicts. AFFiNE uses Yjs-based CRDTs (via y-octo, a Rust implementation) as the core sync engine for its local-first collaborative workspace.

## Operation-Based vs State-Based

| Type | How It Works | Trade-off |
|------|-------------|-----------|
| **Op-based (CmRDT)** | Broadcasts individual operations (insert char at position 5) | Smaller messages, but requires reliable exactly-once delivery |
| **State-based (CvRDT)** | Sends full state snapshots and merges with a join function | Tolerates message loss and reordering, but larger payloads |

**In practice**, Yjs and Automerge use a hybrid approach: they exchange compact update deltas (not full state) but can reconstruct state from any subset of updates, combining the best of both.

## Library Comparison

| Library | Language | Strengths | Best For |
|---------|----------|-----------|----------|
| **Yjs** | JavaScript | Fastest JS CRDT, rich ecosystem (y-websocket, y-indexeddb), small bundle | Web apps, editors, real-time collaboration |
| **Automerge** | JS + Rust (WASM) | Rich data model (JSON-like), automatic history, Rust core | Apps needing deep undo history and structured data |
| **y-octo** | Rust | Yjs-compatible, thread-safe, high performance | Server-side sync engines, native apps |

## Sync Protocol

```
Client A                    Server                    Client B
   |-- state vector -------->|                           |
   |<-- missing updates -----|                           |
   |                         |<-- state vector ----------|
   |                         |--- missing updates ------>|
   |-- new edit ------------>|--- broadcast edit ------->|
```

1. **State vector exchange:** On connect, each client sends its state vector (a map of client IDs to sequence numbers). The server responds with only the updates the client is missing.
2. **Live updates:** After initial sync, new edits are broadcast to all connected clients immediately via WebSocket.
3. **Offline reconciliation:** Edits made offline are stored in local persistence (IndexedDB, SQLite). On reconnect, the state vector exchange automatically catches up without duplicates.

## Document Merge

CRDTs guarantee **eventual consistency**: all replicas that have received the same set of updates converge to the same state, regardless of the order updates were applied. This means:

- No merge conflicts, ever. The merge function is deterministic.
- Concurrent inserts at the same position are ordered by client ID (stable tie-breaking).
- Concurrent deletes and edits resolve gracefully (deleted content stays deleted).

## Network Partitions

CRDTs handle partitions naturally:
- Each partition continues editing independently.
- When partitions reconnect, state vectors identify the gap and updates flow.
- The merged result includes all changes from both sides.
- No user intervention required for resolution.

## Garbage Collection and Performance

CRDT documents grow over time as edit history accumulates. Mitigation strategies:

1. **Snapshots:** Periodically serialize the current document state as a compact snapshot. New clients load the snapshot instead of replaying all history.
2. **Garbage collection:** Yjs can discard tombstones (deleted items) once all clients have acknowledged them. This reduces document size significantly for long-lived documents.
3. **Subdocuments:** Split large workspaces into independent CRDT documents (one per page or section). Only load and sync what the user is viewing.
4. **Lazy loading:** Load document structure first, then fetch content of visible sections on demand.

## Anti-Patterns

- Replaying full history on every client connect (use state vectors and snapshots)
- Storing CRDTs in a relational database as individual operations (use binary snapshots)
- Skipping garbage collection on long-lived documents (unbounded memory growth)
- Treating CRDTs as a database replacement (they are a sync primitive, not a query engine)
- Ignoring document size monitoring in production (set alerts on snapshot size)
