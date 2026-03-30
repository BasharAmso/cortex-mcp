---
id: SKL-0123
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
relatedFragments: [SKL-0006, SKL-0010, SKL-0120, PAT-0002, PAT-0009]
dependencies: []
synonyms: ["add live updates to my app", "build a chat feature", "real-time notifications", "should I use WebSocket or SSE", "stream data to the browser"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/goldbergyoni/nodebestpractices"
difficulty: advanced
---

# WebSocket & Real-time Features

Real-time means the server pushes data to the client without the client asking. Following nodebestpractices' principle of choosing the simplest adequate solution, pick the lightest transport that satisfies your requirements. Most "real-time" features only need server-to-client streaming.

## Transport Comparison

| Transport | Direction | Reconnect | Browser Support | Best For |
|-----------|-----------|-----------|-----------------|----------|
| Server-Sent Events (SSE) | Server to client | Built-in | All modern browsers | Notifications, feeds, live scores |
| WebSocket | Bidirectional | Manual | All modern browsers | Chat, collaboration, gaming |
| Long Polling | Simulated push | Manual | Everything | Legacy fallback only |
| WebTransport | Bidirectional + UDP | Manual | Chrome, Edge | Ultra-low latency (gaming, video) |

## Decision Framework

1. **Server pushes, client listens?** Use SSE. Simpler, works over HTTP, auto-reconnects, passes through all proxies and CDNs.
2. **Both sides send frequently?** Use WebSocket. True bidirectional on a single TCP connection.
3. **Need the simplest solution?** SSE. An order of magnitude easier to implement than WebSocket.

SSE is underused. Notifications, live feeds, progress updates, and dashboard refreshes are server-to-client and SSE handles them perfectly.

## SSE Implementation

**Server:** Set headers `Content-Type: text/event-stream`, `Cache-Control: no-cache`, `Connection: keep-alive`. Write `data: {json}\n\n` per event. Use `event:` for different types. Send `retry:` to control reconnect delay.

**Client:** `new EventSource('/api/events')` handles connection, reconnection, and parsing automatically.

## WebSocket Scaling Architecture

### Single Server
Client connects directly. State lives in memory. Simple and fast. Works until you need horizontal scaling.

### Multiple Servers
WebSocket connections are stateful and sticky. Messages on Server A must reach clients on Server B.

**Solutions (per nodebestpractices' infrastructure guidance):**
- **Redis Pub/Sub:** Each server subscribes to a Redis channel. Most common approach. Messages broadcast to all servers.
- **Redis Streams:** Like Pub/Sub with persistence and consumer groups. Good for message history and at-least-once delivery.
- **NATS / RabbitMQ:** Dedicated message broker. More features, more operational complexity.

### Room/Channel Pattern
Group connections by topic (chat room, document ID, user ID). Only broadcast to subscribers of that topic. Reduces unnecessary message delivery.

## Reconnection Strategy

Connections will drop. Handle it gracefully per nodebestpractices' resilience principles:

1. **Detect disconnection** (WebSocket `onclose`, SSE handles automatically)
2. **Reconnect with exponential backoff** (1s, 2s, 4s, 8s, cap at 30s)
3. **Resync state after reconnect.** Send last-seen event ID or timestamp. Server replays missed events or sends a full state snapshot.
4. **Show connection status.** A subtle banner ("Reconnecting...") prevents confusion when updates stop.

## Authentication

- **SSE:** Auth token via query parameter or cookie (EventSource does not support custom headers). Use short-lived tokens.
- **WebSocket:** Authenticate during HTTP upgrade handshake via cookie or URL token. Reject unauthorized connections before upgrade completes.
- **Token refresh:** For long-lived connections, implement periodic re-auth via ping/pong or close and reconnect with a fresh token.

## Common Mistakes

- **WebSocket for one-way data.** SSE is simpler and more reliable for server-to-client streaming.
- **No heartbeat/ping.** Silent drops go undetected. Send periodic pings (every 30s) to detect dead connections.
- **Unbounded memory.** Each connection holds state. Set limits, implement backpressure, monitor memory per process.
- **Missing reconnection logic.** Mobile networks drop constantly. Without reconnection and resync, users see stale data.
- **Broadcasting everything to everyone.** Use rooms/channels to scope messages appropriately.
