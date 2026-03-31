---
id: PAT-0176
name: Outbox Pattern
category: patterns
tags: [outbox, reliable-messaging, dual-write, event-publishing, transactional-outbox, change-data-capture]
capabilities: [reliable-event-publishing, dual-write-avoidance, transactional-messaging, cdc-integration]
useWhen:
  - publishing events reliably after a database write
  - avoiding the dual-write problem between database and message broker
  - ensuring messages are sent if and only if the database transaction commits
  - implementing reliable event-driven communication between services
  - adding event publishing to a system that currently only writes to a database
estimatedTokens: 650
relatedFragments: [PAT-0173, PAT-0059, SKL-0332, PAT-0056]
dependencies: []
synonyms: ["how to publish events reliably", "transactional outbox explained", "dual write problem solution", "outbox pattern for beginners", "how to avoid lost messages", "database and message broker consistency"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/donnemartin/system-design-primer"
difficulty: advanced
owner: "cortex"
pillar: "architecture"
---

# Outbox Pattern

The outbox pattern solves the dual-write problem: when a service needs to update a database and publish a message, doing both as separate operations risks inconsistency. The database write might succeed while the message publish fails (or vice versa), leaving the system in an inconsistent state.

## The Dual-Write Problem

```
# Dangerous - dual write
save_order(order)           # Step 1: Write to database
publish_event(OrderCreated) # Step 2: Publish to message broker
```

If step 1 succeeds and step 2 fails, the order exists but no event was published. Downstream services never learn about the order. If step 2 succeeds and step 1 fails, an event was published for a non-existent order.

Wrapping both in a distributed transaction (2PC) is fragile and not supported by most message brokers.

## How the Outbox Works

Instead of publishing directly to the message broker, write the event to an **outbox table** in the same database, within the same local transaction as the business data.

```
BEGIN TRANSACTION
  INSERT INTO orders (id, customer_id, total) VALUES (...)
  INSERT INTO outbox (id, event_type, payload, created_at) VALUES (
    uuid(), 'OrderCreated', '{"orderId": "...", ...}', now()
  )
COMMIT
```

Both writes succeed or fail together. The event is guaranteed to exist if and only if the order exists.

## Publishing from the Outbox

A separate process reads the outbox table and publishes events to the message broker. Two approaches:

### Polling Publisher

A background process periodically queries the outbox table for unpublished events, publishes them to the broker, and marks them as published.

```
SELECT * FROM outbox WHERE published = false ORDER BY created_at
-- For each row:
--   Publish to message broker
--   UPDATE outbox SET published = true WHERE id = ?
```

**Pros:** Simple to implement. Works with any database.
**Cons:** Polling interval creates a latency floor. Frequent polling adds database load.

### Change Data Capture (CDC)

A CDC tool (Debezium, AWS DMS) monitors the database transaction log and streams outbox inserts to the message broker in near-real-time.

**Pros:** Low latency (milliseconds). No polling overhead. Does not add load to the database through queries.
**Cons:** More complex infrastructure. Requires access to the database's transaction log. CDC tool becomes a critical dependency.

CDC is the preferred approach for production systems at scale. Polling is fine for simpler setups or lower throughput.

## Outbox Table Design

```sql
CREATE TABLE outbox (
  id            UUID PRIMARY KEY,
  event_type    VARCHAR(255) NOT NULL,
  aggregate_id  VARCHAR(255) NOT NULL,  -- For ordering (e.g., order ID)
  payload       JSONB NOT NULL,
  created_at    TIMESTAMP NOT NULL DEFAULT now(),
  published     BOOLEAN NOT NULL DEFAULT false
);
```

Include `aggregate_id` so the publisher can maintain ordering for events related to the same entity. Events for different aggregates can be published in any order.

## Idempotent Consumers

The outbox guarantees at-least-once publishing (the publisher might crash after publishing but before marking the event as published, causing a duplicate on restart). Consumers must handle duplicate events.

Use the event's `id` field for deduplication. Store processed event IDs and skip duplicates.

## Cleanup

The outbox table grows continuously. Periodically delete published events older than a retention period (e.g., 7 days). Keep unpublished events indefinitely until they are successfully published and investigated if they remain stuck.

## When to Use

Use the outbox pattern whenever a service must reliably publish events after a state change. It is especially important in event-driven architectures and saga orchestration where lost events cause data inconsistency across services. The slight added complexity of the outbox table and publisher is far less dangerous than dual writes.
