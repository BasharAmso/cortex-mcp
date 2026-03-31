---
id: SKL-0315
name: WebSocket Real-Time UI
category: skills
tags: [websocket, real-time, socket-io, live-updates, optimistic-ui, reconnection]
capabilities: [websocket-integration, connection-management, optimistic-updates, real-time-rendering]
useWhen:
  - building real-time features like chat, notifications, or live dashboards
  - implementing WebSocket connections with reconnection logic
  - designing optimistic UI updates for low-latency feel
  - choosing between WebSocket, SSE, and polling
  - handling connection state in the UI
estimatedTokens: 650
relatedFragments: [SKL-0318, SKL-0309, PAT-0161]
dependencies: []
synonyms: ["how to build real-time features", "how to use WebSockets in React", "how to implement live updates", "how to build a chat app", "websocket vs server-sent events", "how to handle reconnection in WebSocket"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/socketio/socket.io"
difficulty: intermediate
owner: "cortex"
pillar: "frontend"
---

# Skill: WebSocket Real-Time UI

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0315 |
| **Name** | WebSocket Real-Time UI |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Real-time UI means the interface updates without the user refreshing the page. WebSockets provide a persistent, bidirectional connection between client and server, enabling instant data push.

### Choosing the Right Transport

| Transport | Direction | Best For | Complexity |
|-----------|-----------|----------|------------|
| **Polling** | Client pulls | Low-frequency updates (every 30s+) | Lowest |
| **SSE (Server-Sent Events)** | Server pushes | One-way streams (notifications, feeds) | Low |
| **WebSocket** | Bidirectional | Chat, collaboration, gaming, live data | Medium |
| **WebRTC** | Peer-to-peer | Video, audio, screen share | Highest |

Use polling for dashboards that refresh every minute. Use SSE for notification feeds. Use WebSocket when the client also sends frequent messages (chat, collaboration).

### Socket.IO Integration

Socket.IO adds automatic reconnection, room management, and fallback transports on top of WebSocket:

```typescript
// Client
import { io } from 'socket.io-client';

const socket = io('https://api.example.com', {
  auth: { token: getAuthToken() },
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
});

socket.on('connect', () => console.log('Connected'));
socket.on('message:new', (msg) => addMessageToUI(msg));
socket.on('disconnect', (reason) => showReconnecting(reason));
```

### React Hook Pattern

Encapsulate WebSocket logic in a custom hook:

```typescript
function useSocket(url: string) {
  const [status, setStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(url);
    socketRef.current = socket;
    socket.on('connect', () => setStatus('connected'));
    socket.on('disconnect', () => setStatus('disconnected'));
    return () => { socket.disconnect(); };
  }, [url]);

  const emit = useCallback((event: string, data: unknown) => {
    socketRef.current?.emit(event, data);
  }, []);

  return { status, emit, socket: socketRef };
}
```

### Connection State UI

Always show the user the connection state:

| State | UI Treatment |
|-------|-------------|
| **Connected** | Green dot or no indicator (default healthy state) |
| **Reconnecting** | Yellow banner: "Reconnecting..." with attempt count |
| **Disconnected** | Red banner: "Connection lost. Retrying..." with manual retry button |
| **Offline** | Gray banner: "You are offline. Changes will sync when reconnected." |

Never silently fail. Users need to know whether what they see is current.

### Optimistic Updates

For low-latency feel, update the UI before the server confirms:

1. User sends a message.
2. Immediately render the message in the UI with a "sending" indicator.
3. Server confirms receipt via acknowledgment.
4. Update the message status to "sent."
5. If the server rejects, show an error and offer retry.

```typescript
function sendMessage(text: string) {
  const tempId = crypto.randomUUID();
  // Optimistic: add to UI immediately
  addMessage({ id: tempId, text, status: 'sending' });

  socket.emit('message:send', { text }, (ack: { id: string }) => {
    // Server confirmed
    updateMessage(tempId, { id: ack.id, status: 'sent' });
  });

  // Timeout fallback
  setTimeout(() => {
    if (getMessage(tempId)?.status === 'sending') {
      updateMessage(tempId, { status: 'failed' });
    }
  }, 5000);
}
```

### Reconnection Strategy

- **Exponential backoff:** Start at 1s, double each attempt, cap at 30s.
- **Jitter:** Add random delay (0-500ms) to prevent thundering herd when many clients reconnect simultaneously.
- **State resync:** After reconnecting, fetch missed events from a REST endpoint or request a state snapshot from the server.
- **Idempotent messages:** Assign unique IDs to every message so duplicates from reconnection can be detected and ignored.

## Anti-Patterns

- Not showing connection state to the user (silent failures)
- Polling every second when WebSocket or SSE would be more efficient
- Not implementing reconnection logic (socket disconnects happen constantly)
- Trusting the server response order (messages can arrive out of sequence)
- Opening a new WebSocket connection per component instead of sharing one

## Key Takeaways

- Choose the simplest transport: polling for rare updates, SSE for server push, WebSocket for bidirectional
- Always display connection status so users know if their data is current
- Optimistic updates make real-time features feel instant; handle failures gracefully
- Reconnection with exponential backoff and state resync is mandatory for production
- Share a single WebSocket connection across the app via a custom hook or context
