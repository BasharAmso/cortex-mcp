---
id: SKL-0043
name: WebSocket & Real-time Features
category: skills
tags: [websocket, realtime, socket-io, server-sent-events, sse, live-updates, push-notifications, pubsub]
capabilities: [websocket-design, realtime-architecture, sse-implementation, pubsub-patterns]
useWhen:
  - building real-time features like live chat or collaborative editing
  - implementing live update feeds or notification systems
  - choosing between WebSocket, SSE, and long polling
  - adding real-time data streaming to a client application
  - scaling real-time connections across multiple server instances
estimatedTokens: 650
relatedFragments: [SKL-0006, SKL-0010, SKL-0040, PAT-0002, PAT-0009]
dependencies: []
synonyms: ["add live updates to my app", "build a chat feature", "real-time notifications", "should I use WebSocket or SSE", "stream data to the browser"]
lastUpdated: "2026-03-29"
sourceUrl: ""
difficulty: advanced
---

# WebSocket & Real-time Features

Real-time means the server pushes data to the client without the client asking. Choose the simplest transport that satisfies your requirements.

## Transport Comparison

| Transport | Direction | Reconnect | Browser Support | Best For |
|-----------|-----------|-----------|-----------------|----------|
| Server-Sent Events (SSE) | Server to client only | Built-in | All modern browsers | Notifications, feeds, live scores |
| WebSocket | Bidirectional | Manual | All modern browsers | Chat, collaboration, gaming |
| Long Polling | Simulated push | Manual | Everything | Legacy fallback only |
| WebTransport | Bidirectional + UDP | Manual | Chrome, Edge | Ultra-low latency (gaming, video) |

## Decision Framework

1. **Server pushes data, client just listens?** Use SSE. It is simpler, works over HTTP, auto-reconnects, and passes through all proxies and CDNs.
2. **Client and server both send frequently?** Use WebSocket. True bidirectional on a single TCP connection.
3. **Need the absolute simplest solution?** Use SSE. It is an order of magnitude easier to implement than WebSocket.
4. **Need to support ancient browsers or restrictive proxies?** Long polling as fallback.

SSE is underused. Most "real-time" features (notifications, live feeds, progress updates, dashboard refreshes) are server-to-client and SSE handles them perfectly.

## SSE Implementation Pattern

**Server:** Set headers `Content-Type: text/event-stream`, `Cache-Control: no-cache`, `Connection: keep-alive`. Write `data: {json}\n\n` for each event. Use `event:` field for different event types. Send `retry:` to control reconnect delay.

**Client:** `new EventSource('/api/events')` handles connection, reconnection, and parsing automatically. Listen with `source.addEventListener('message', handler)`.

## WebSocket Architecture

### Single Server
Client connects directly. State lives in memory. Simple and fast. Works until you need more than one server.

### Multiple Servers (Scaling)
WebSocket connections are stateful and sticky. A message sent on Server A must reach clients on Server B.

**Solutions:**
- **Redis Pub/Sub:** Each server subscribes to a Redis channel. Messages broadcast to all servers, which relay to their connected clients. Most common approach.
- **Redis Streams:** Like Pub/Sub but with persistence and consumer groups. Good for message history and at-least-once delivery.
- **NATS / RabbitMQ:** Dedicated message broker. More features, more operational complexity.

### Room/Channel Pattern
Group connections by topic (chat room, document ID, user ID). Only broadcast to subscribers of that topic. Reduces unnecessary message delivery.

## Reconnection Strategy

Connections will drop. Handle it gracefully:

1. **Detect disconnection** (WebSocket `onclose` event, SSE handles automatically)
2. **Reconnect with exponential backoff** (1s, 2s, 4s, 8s, cap at 30s)
3. **Resync state after reconnect.** Send a "last seen event ID" or timestamp. Server replays missed events or sends a full state snapshot.
4. **Show connection status to user.** A subtle banner: "Reconnecting..." prevents confusion when updates stop arriving.

## Authentication

- **SSE:** Send auth token as a query parameter or cookie (EventSource does not support custom headers). Use short-lived tokens in query params.
- **WebSocket:** Authenticate during the HTTP upgrade handshake via cookie or token in the URL. Validate before completing the upgrade. Reject unauthorized connections immediately.
- **Token refresh:** For long-lived connections, implement a ping/pong mechanism that re-authenticates periodically or close and reconnect with a fresh token.

## Common Mistakes

- **Opening a WebSocket for one-way data.** SSE is simpler and more reliable for server-to-client streaming.
- **No heartbeat/ping.** Silent connection drops go undetected. Send periodic pings (every 30s) to detect dead connections.
- **Unbounded memory on the server.** Each connection holds state. Set connection limits, implement backpressure, and monitor memory per process.
- **Missing reconnection logic.** Mobile networks drop constantly. Without reconnection and state resync, users see stale data.
- **Broadcasting everything to everyone.** Use rooms/channels to scope messages. A chat app should not send every message to every connected client.
