---
id: PAT-0193
name: Activity Feed Pattern
category: patterns
tags: [activity-feed, event-stream, notifications, timeline, filtering, aggregation, real-time]
capabilities: [event-stream-design, feed-filtering, activity-aggregation, real-time-updates]
useWhen:
  - building an activity feed showing team actions
  - designing event streams with filtering and aggregation
  - implementing real-time activity updates in a dashboard
  - creating audit logs or change histories
  - aggregating related events to reduce noise
estimatedTokens: 650
relatedFragments: [PAT-0195, SKL-0375, PAT-0194]
dependencies: []
synonyms: ["how to build an activity feed", "how to show recent team activity", "how to design an event stream", "how to aggregate activity notifications", "how to build a timeline of changes", "how to implement a news feed for a team app"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/makeplane/plane"
difficulty: beginner
owner: "cortex"
pillar: "collaboration"
---

# Activity Feed Pattern

Event-driven activity streams for team collaboration tools.

## Event Model

Every significant action produces an activity event:

| Field | Purpose |
|-------|---------|
| **id** | Unique event identifier |
| **actor** | User who performed the action |
| **verb** | "created", "updated", "commented", "assigned" |
| **object** | The entity acted upon (issue, document, etc.) |
| **target** | Optional context (moved issue to "In Progress") |
| **context** | Project, workspace, or channel scope |
| **timestamp** | When it happened (UTC) |
| **metadata** | Changed fields, old/new values for diffs |

This follows the Activity Streams vocabulary (W3C standard), making it interoperable with external systems.

## Feed Assembly

Plane assembles feeds by querying events scoped to what the user can see:

```
User Feed = Events WHERE
  (context IN user's projects)
  AND (object is accessible to user)
  ORDER BY timestamp DESC
  LIMIT page_size
```

Use cursor-based pagination (timestamp + id) for consistent results as new events arrive. Never use offset pagination for activity feeds.

## Aggregation

Group related events to prevent feed flooding:

| Raw Events | Aggregated Display |
|-----------|-------------------|
| User A assigned issue 1, 2, 3 | "User A assigned 3 issues" |
| 5 comments on Issue #42 in 10 min | "5 new comments on Issue #42" |
| User B updated status 3 times | "User B updated status to Done" (show final state) |

Aggregate events by (actor, verb, time window). Plane uses a 15-minute window for grouping. Show the aggregated version in the feed with an expand option for details.

## Real-Time Delivery

Push new events to connected clients via WebSocket or Server-Sent Events (SSE):

```
1. Action occurs -> Write event to database
2. Publish event to Redis pub/sub channel
3. WebSocket server receives event
4. Fan out to subscribed clients (filtered by access)
5. Client prepends event to feed
```

SSE is simpler when you only need server-to-client updates (no bidirectional communication needed for a read-only feed).

## Filtering

Let users filter their feed by:

- **Object type**: Issues, documents, comments, deployments
- **Actor**: Specific team members or "my activity"
- **Project/workspace**: Scope to a specific context
- **Time range**: Today, this week, custom range

Store filter preferences per user to persist their default view.

## Storage Considerations

Activity events are append-only and grow fast. Partition by time (monthly tables) or use a time-series optimized store. Set a retention policy (90 days in the feed, archived to cold storage after). Index on `(context, timestamp)` for feed queries and `(object_type, object_id)` for entity history.

## Key Takeaways

- Model events as (actor, verb, object, target) following Activity Streams vocabulary
- Aggregate related events within a time window to prevent feed flooding
- Use cursor-based pagination, never offset, for feeds with constantly arriving events
- SSE is simpler than WebSocket when the feed is read-only (server-to-client only)
- Partition activity tables by time and set retention policies to manage growth
