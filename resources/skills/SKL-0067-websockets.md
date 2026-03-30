---
id: SKL-0067
name: WebSockets
category: skills
tags: [websockets, socket-io, realtime, rooms, redis-adapter, sse, pub-sub]
capabilities: [websocket-setup, room-management, realtime-auth, scaling-websockets, sse-fallback]
useWhen:
  - adding real-time features like chat, notifications, or live updates
  - choosing between WebSockets and Server-Sent Events
  - scaling WebSocket connections across multiple server instances
  - handling authentication and reconnection for persistent connections
estimatedTokens: 600
relatedFragments: [SKL-0006, SKL-0064, PAT-0002]
dependencies: []
synonyms: ["how do I add real-time updates to my app", "I need a chat feature", "how to push notifications to the browser", "my websocket connections keep dropping", "how to scale socket io with multiple servers"]
lastUpdated: "2026-03-29"
difficulty: advanced
---

# WebSockets

Add real-time, bidirectional communication between server and clients for live features.

## When to Use What

| Technology | Direction | Best For |
|-----------|-----------|----------|
| WebSockets (Socket.io) | Bidirectional | Chat, multiplayer, collaborative editing |
| Server-Sent Events (SSE) | Server to client only | Notifications, live feeds, progress updates |
| Polling | Client to server | Simple status checks, low-frequency updates |

**Recommendation:** SSE for one-way updates (notifications, feeds). WebSockets only when you need bidirectional communication.

## Procedure

### 1. Set Up Socket.io

```typescript
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

const io = new Server(httpServer, {
  cors: { origin: process.env.CLIENT_URL },
  pingTimeout: 30000,
  pingInterval: 25000,
});

// Required for multi-server deployments
const pubClient = createClient({ url: process.env.REDIS_URL });
const subClient = pubClient.duplicate();
await Promise.all([pubClient.connect(), subClient.connect()]);
io.adapter(createAdapter(pubClient, subClient));
```

### 2. Authenticate Connections

Authenticate in the middleware, not after connection:

```typescript
io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const user = await verifyToken(token);
    socket.data.user = user;
    next();
  } catch (err) {
    next(new Error('Authentication failed'));
  }
});
```

### 3. Room Patterns

Rooms group connections for targeted broadcasts:

```typescript
// Join user to their rooms on connect
io.on('connection', (socket) => {
  const userId = socket.data.user.id;
  socket.join(`user:${userId}`);            // personal notifications
  socket.join(`org:${socket.data.user.orgId}`); // org-wide updates
});

// Send to specific room from anywhere in your app
io.to('user:abc123').emit('notification', { message: 'New comment' });
io.to('org:xyz').emit('update', { type: 'member_joined' });
```

### 4. Handle Reconnection

Socket.io handles reconnection automatically, but you need to handle state sync:

```typescript
io.on('connection', (socket) => {
  // Send missed events on reconnect
  const lastSeen = socket.handshake.auth.lastEventTimestamp;
  if (lastSeen) {
    const missed = await getEventsSince(socket.data.user.id, lastSeen);
    missed.forEach(event => socket.emit(event.type, event.data));
  }
});
```

### 5. SSE Fallback for Simple Cases

If you only need server-to-client updates, SSE is simpler:

```typescript
app.get('/events', authenticate, (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  const send = (data: object) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  const channel = `user:${req.user.id}`;
  redisSubscriber.subscribe(channel, send);
  req.on('close', () => redisSubscriber.unsubscribe(channel, send));
});
```

## Scaling Checklist

- Use Redis adapter for Socket.io across multiple server instances
- Set up sticky sessions if using a load balancer (or use Redis adapter)
- Monitor connection count per server and set connection limits
- Implement heartbeat/ping to detect dead connections early

## Key Constraints

- Always authenticate before accepting messages
- Never broadcast sensitive data to rooms without authorization checks
- Use Redis adapter in any multi-server deployment
- Set connection limits to prevent resource exhaustion
- Never store session state only in the socket object -- persist to database or Redis
