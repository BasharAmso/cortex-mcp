---
id: SKL-0357
name: Telehealth Platform
category: skills
tags: [telehealth, video-consultation, hipaa, scheduling, prescriptions, healthcare, remote-care, virtual-visit]
capabilities: [video-consultation-design, appointment-scheduling, prescription-workflow, hipaa-compliance]
useWhen:
  - building a telehealth or virtual care platform
  - adding video consultation to a healthcare application
  - implementing prescription management in a medical app
  - designing provider-patient scheduling workflows
  - ensuring HIPAA compliance for video consultations
estimatedTokens: 650
relatedFragments: [SKL-0362, SKL-0363, PAT-0185, PAT-0186]
dependencies: []
synonyms: ["how to build a telehealth app", "video doctor visit platform", "virtual care consultation system", "HIPAA compliant video chat", "remote medical appointment app", "telemedicine platform design"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: "cortex"
pillar: "health"
---

# Telehealth Platform

Building a telehealth platform requires coordinating real-time video, scheduling, clinical workflows, and strict privacy compliance into a seamless patient-provider experience.

## Core Architecture

```
Patient App → Scheduling Service → Video Service → Clinical Notes → Prescription Service
                    ↓                    ↓                              ↓
              Provider Calendar    WebRTC / TURN          E-Prescribe Integration
```

A telehealth platform has five essential subsystems:

1. **Scheduling** handles provider availability, patient booking, timezone conversion, and automated reminders (SMS/email 24h and 1h before).
2. **Waiting Room** places patients in a virtual queue with estimated wait time. Providers see their queue and can admit patients one at a time.
3. **Video Consultation** uses WebRTC for peer-to-peer video with TURN server fallback. Record sessions only with explicit patient consent and store encrypted.
4. **Clinical Documentation** lets providers write visit notes, attach diagnoses (ICD-10 codes), and generate after-visit summaries for patients.
5. **Prescription Management** integrates with e-prescribe networks (Surescripts in the US) to send prescriptions directly to pharmacies.

## Video Implementation

```javascript
// WebRTC setup for telehealth
const peerConnection = new RTCPeerConnection({
  iceServers: [
    { urls: 'stun:stun.example.com:3478' },
    { urls: 'turn:turn.example.com:3478', username: 'user', credential: 'pass' }
  ]
});

// Add local media stream
const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

// Connection quality monitoring for clinical use
peerConnection.onconnectionstatechange = () => {
  if (peerConnection.connectionState === 'disconnected') {
    showReconnectDialog(); // Critical: don't silently drop medical calls
  }
};
```

## HIPAA Requirements for Telehealth

| Requirement | Implementation |
|-------------|---------------|
| **Encryption in transit** | TLS 1.2+ for all API calls; SRTP for video/audio streams |
| **Encryption at rest** | AES-256 for stored recordings and clinical notes |
| **Access controls** | Role-based access; providers see only their patients |
| **Audit logging** | Log every access to PHI with timestamp, user, and action |
| **BAA required** | Sign Business Associate Agreements with video, hosting, and storage vendors |
| **Session timeout** | Auto-lock after 15 minutes of inactivity |

## Scheduling Design

- Show provider availability in the patient's local timezone
- Buffer 10-15 minutes between appointments for documentation
- Require intake forms before the visit (symptoms, medications, allergies)
- Send calendar invites with a one-click join link
- Allow rescheduling up to 2 hours before; cancellation policies vary by practice

## Network Resilience

Telehealth must handle poor connections gracefully since patients may be on mobile networks:

- Detect bandwidth and downgrade video quality (720p to 480p to audio-only)
- Show connection quality indicator to both parties
- Auto-reconnect within 30 seconds without requiring a new session
- Offer phone dial-in as a fallback if video fails entirely

## Key Takeaways

- Use WebRTC with TURN server fallback for reliable video across network conditions
- Every vendor handling patient data needs a signed BAA for HIPAA compliance
- Buffer time between appointments prevents provider burnout and scheduling conflicts
- Graceful degradation from video to audio to phone ensures the visit can always happen
- Record sessions only with explicit consent and store with AES-256 encryption
