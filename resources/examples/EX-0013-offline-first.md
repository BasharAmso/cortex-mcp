---
id: EX-0013
name: Offline-First Pattern
category: examples
tags: [offline-first, indexeddb, dexie, sync-queue, conflict-resolution, cache, pwa, service-worker]
capabilities: [offline-data-storage, background-sync, conflict-resolution]
useWhen:
  - building an app that works without internet
  - implementing local-first data storage with sync
  - adding an offline indicator and sync queue to a PWA
estimatedTokens: 800
relatedFragments: [SKL-0007, EX-0010, PAT-0009]
dependencies: []
synonyms: ["offline first app", "indexeddb example", "dexie.js tutorial", "sync queue pattern", "local first web app", "work without internet"]
lastUpdated: "2026-03-29"
difficulty: advanced
---

# Offline-First Pattern

Local-first data with IndexedDB (Dexie.js), sync queue, conflict resolution, and offline UI.

## Database Setup with Dexie

```ts
// lib/db.ts
import Dexie, { Table } from "dexie";

export interface TodoItem {
  id?: number;
  text: string;
  done: boolean;
  updatedAt: number;
  synced: boolean;
}

export interface SyncQueueEntry {
  id?: number;
  table: string;
  recordId: number;
  action: "create" | "update" | "delete";
  payload: any;
  createdAt: number;
  retries: number;
}

class AppDB extends Dexie {
  todos!: Table<TodoItem>;
  syncQueue!: Table<SyncQueueEntry>;

  constructor() {
    super("myapp");
    this.version(1).stores({
      todos: "++id, updatedAt, synced",
      syncQueue: "++id, table, createdAt",
    });
  }
}

export const db = new AppDB();
```

## Write-Through with Sync Queue

```ts
// lib/sync.ts
import { db, TodoItem, SyncQueueEntry } from "./db";

export async function saveTodo(todo: Omit<TodoItem, "synced" | "updatedAt">) {
  const now = Date.now();
  const id = await db.todos.put({ ...todo, updatedAt: now, synced: false });

  await db.syncQueue.add({
    table: "todos",
    recordId: id,
    action: todo.id ? "update" : "create",
    payload: { ...todo, id, updatedAt: now },
    createdAt: now,
    retries: 0,
  });

  processQueue(); // fire and forget
  return id;
}

export async function processQueue() {
  if (!navigator.onLine) return;

  const entries = await db.syncQueue.orderBy("createdAt").toArray();

  for (const entry of entries) {
    try {
      const res = await fetch(`/api/${entry.table}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: entry.action, ...entry.payload }),
      });

      if (!res.ok) throw new Error(`Sync failed: ${res.status}`);

      const serverData = await res.json();
      await db.table(entry.table).update(entry.recordId, { synced: true });
      await db.syncQueue.delete(entry.id!);

      // Apply server-assigned fields (e.g., canonical ID)
      if (serverData.id) {
        await db.table(entry.table).update(entry.recordId, serverData);
      }
    } catch {
      await db.syncQueue.update(entry.id!, { retries: entry.retries + 1 });
      if (entry.retries >= 5) await db.syncQueue.delete(entry.id!);
      break; // stop processing to preserve order
    }
  }
}
```

## Conflict Resolution (Last-Write-Wins)

```ts
// lib/conflict.ts
export function resolveConflict<T extends { updatedAt: number }>(
  local: T,
  remote: T
): T {
  // Last-write-wins based on timestamp
  return remote.updatedAt > local.updatedAt ? remote : local;
}

export async function pullFromServer() {
  if (!navigator.onLine) return;

  const res = await fetch("/api/todos?since=" + (await getLastSyncTime()));
  const remoteTodos = await res.json();

  for (const remote of remoteTodos) {
    const local = await db.todos.get(remote.id);
    if (!local) {
      await db.todos.put({ ...remote, synced: true });
    } else {
      const winner = resolveConflict(local, remote);
      await db.todos.put({ ...winner, synced: true });
    }
  }
}
```

## Online/Offline Indicator

```tsx
// hooks/use-online-status.ts
import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

export function useOnlineStatus() {
  return useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true // SSR assumes online
  );
}
```

```tsx
// components/offline-banner.tsx
export function OfflineBanner() {
  const online = useOnlineStatus();
  if (online) return null;

  return (
    <div role="status" className="bg-amber-100 text-amber-800 text-center text-sm py-2">
      You're offline. Changes will sync when you reconnect.
    </div>
  );
}
```

## Auto-Sync on Reconnect

```ts
// lib/register-sync.ts
window.addEventListener("online", () => {
  processQueue();
  pullFromServer();
});
```

## Key Points

- **Write locally first**, then enqueue changes for background sync
- **Sync queue preserves order** and retries failed entries up to 5 times
- **Last-write-wins** is the simplest conflict strategy; use vector clocks for collaborative editing
- **`useSyncExternalStore`** is the React 18+ way to subscribe to browser events
- **Offline banner** uses `role="status"` so screen readers announce connectivity changes
- **Break on failure** in the queue prevents out-of-order syncing
