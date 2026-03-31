---
id: SKL-0295
name: Multiplayer Game Architecture
category: skills
tags: [multiplayer, networking, authoritative-server, lag-compensation, websockets, game-rooms]
capabilities: [client-server-architecture, lag-compensation-design, room-management, state-synchronization]
useWhen:
  - building a real-time multiplayer game
  - choosing between client-server and peer-to-peer architectures
  - implementing lag compensation and client-side prediction
  - managing game rooms and matchmaking
  - synchronizing game state across connected clients
estimatedTokens: 680
relatedFragments: [SKL-0291, PAT-0152, PAT-0153]
dependencies: []
synonyms: ["how to make a multiplayer game", "client-server game architecture", "lag compensation in online games", "game room and matchmaking setup", "sync game state between players", "authoritative server for games"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/colyseus/colyseus"
difficulty: advanced
owner: "cortex"
pillar: "game-dev"
---

# Skill: Multiplayer Game Architecture

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0295 |
| **Name** | Multiplayer Game Architecture |
| **Category** | Skills |
| **Complexity** | Advanced |

## Core Concepts

Multiplayer games are fundamentally a distributed state problem. The core challenge is keeping multiple clients synchronized while feeling responsive despite network latency.

### Architecture Models

| Model | How It Works | Best For |
|-------|-------------|----------|
| **Authoritative Server** | Server owns game state; clients send inputs, receive state | Competitive games, cheat prevention |
| **Client-Authoritative** | Clients own their own state; server relays | Cooperative/casual games, lower infra cost |
| **Peer-to-Peer** | Clients communicate directly | Small player counts, LAN games |

For any game where fairness matters, use an authoritative server. The server simulates the game loop, validates all inputs, and broadcasts state snapshots.

### The Networking Loop

```
Client: capture input → send to server → predict locally
Server: receive inputs → simulate tick → broadcast state
Client: receive state → reconcile with prediction → render
```

This loop runs at a fixed tick rate (typically 20-60 Hz) independent of the client's render frame rate.

### Client-Side Prediction and Reconciliation

To hide latency, the client immediately applies its own input locally (prediction). When the server's authoritative state arrives, the client compares it against the predicted state. If they match, no correction is needed. If they diverge, the client rewinds to the server state and replays unacknowledged inputs (reconciliation).

### Lag Compensation

For time-critical actions (shooting, collision), the server rewinds its world state to the time the client fired (based on the client's reported latency). This lets players aim at what they see on screen rather than where targets actually are on the server.

### Room Management (Colyseus Pattern)

Colyseus organizes multiplayer sessions into rooms with synchronized state schemas:

```typescript
import { Room, Schema, type } from "colyseus";

class GameState extends Schema {
  @type("number") round = 0;
  @type({ map: Player }) players = new MapSchema<Player>();
}

class GameRoom extends Room<GameState> {
  onCreate() { this.setState(new GameState()); }

  onJoin(client, options) {
    this.state.players.set(client.sessionId, new Player());
  }

  onMessage(client, type, message) {
    // Validate and apply input
  }

  onLeave(client) {
    this.state.players.delete(client.sessionId);
  }
}
```

The schema system tracks changes automatically and sends only deltas to clients, minimizing bandwidth.

### Matchmaking

Simple matchmaking filters players into rooms by criteria (skill rating, region, game mode). Start with a lobby room that collects players, then spawn a game room when enough join. For ranked play, use ELO or Glicko-2 rating systems.

### Bandwidth Optimization

- **Delta compression** - Send only changed properties, not full state
- **Interest management** - Only send data relevant to each client's view area
- **Quantization** - Reduce precision of floats (position to nearest 0.1)
- **Input batching** - Bundle multiple ticks of input into one packet

## Key Takeaways

- Use an authoritative server for any game where cheating or fairness matters
- Implement client-side prediction and server reconciliation to mask latency
- Organize sessions into rooms with schema-based state that syncs automatically
- Apply lag compensation for time-critical actions like shooting
- Minimize bandwidth with delta compression, interest management, and quantization
