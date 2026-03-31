---
id: SKL-0376
name: Video Conferencing Integration
category: skills
tags: [video-conferencing, webrtc, screen-sharing, recording, rooms, media-server, peer-to-peer]
capabilities: [webrtc-setup, room-management, screen-sharing, recording-pipeline]
useWhen:
  - adding video calling to a web or mobile application
  - integrating WebRTC for peer-to-peer or SFU-based conferencing
  - implementing screen sharing and recording features
  - designing room-based video call architecture
  - choosing between peer-to-peer and media server approaches
estimatedTokens: 650
relatedFragments: [SKL-0377, SKL-0381, PAT-0195]
dependencies: []
synonyms: ["how to add video calls to my app", "how to integrate WebRTC", "how to build a Zoom alternative", "how to implement screen sharing", "how to record video meetings", "how to set up video conferencing rooms"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: "cortex"
pillar: "collaboration"
---

# Skill: Video Conferencing Integration

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0376 |
| **Name** | Video Conferencing Integration |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Video conferencing adds synchronous visual communication to collaboration tools. The architecture choice between peer-to-peer and server-mediated approaches determines scalability, quality, and cost.

### WebRTC Foundation

WebRTC provides the browser-native API for real-time media. The connection flow:

```
1. Caller creates offer (SDP) via RTCPeerConnection
2. Signaling server relays offer to callee
3. Callee creates answer (SDP)
4. ICE candidates exchanged for NAT traversal
5. Direct media stream established (or routed through TURN server)
```

You need a signaling server (WebSocket-based) and optionally STUN/TURN servers for NAT traversal. STUN handles most cases; TURN relays media when direct connection fails (roughly 10-15% of connections).

### Architecture Patterns

| Pattern | Participants | Pros | Cons |
|---------|-------------|------|------|
| **Peer-to-Peer (Mesh)** | 2-4 users | Simple, low latency, no server cost | CPU scales O(n^2), breaks above 4 users |
| **SFU (Selective Forwarding)** | 5-50 users | Scalable, quality adaptation | Requires media server infrastructure |
| **MCU (Mixing)** | 50+ users | Single stream to each client | High server CPU, added latency |

For most applications, start with P2P for 1:1 calls and add an SFU (like mediasoup, Janus, or LiveKit) for group calls.

### Room Management

Rooms are the logical container for a call session:

- **Room ID**: Unique identifier, often UUID or human-readable slug
- **Participants**: List with roles (host, speaker, viewer)
- **State**: Waiting, Active, Ended
- **Settings**: Max participants, recording enabled, screen share allowed

Implement room lifecycle: create on first join, track participants via WebSocket presence, destroy after last participant leaves plus a grace period.

### Screen Sharing

Use `getDisplayMedia()` API to capture screen, window, or tab. Replace the video track in the existing peer connection. Key considerations: resolution (cap at 1080p for bandwidth), frame rate (5-15 fps sufficient for presentations, 30 fps for demos), and audio capture (system audio sharing varies by OS).

### Recording

Two approaches: server-side recording (SFU captures and mixes streams) or client-side (MediaRecorder API). Server-side is more reliable and produces consistent output. Store recordings as MP4 in object storage with metadata linking to room and participants.

## Key Takeaways

- Start with P2P WebRTC for 1:1 calls; add an SFU for group calls above 4 participants
- Always deploy TURN servers as fallback for the 10-15% of connections that fail direct NAT traversal
- Room lifecycle management prevents orphaned sessions and resource leaks
- Screen sharing is a track replacement, not a separate connection
- Server-side recording is more reliable than client-side for production use
