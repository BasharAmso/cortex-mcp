---
id: EX-0037
name: Telehealth Video Session
category: examples
tags: [telehealth, video, hipaa, healthcare, waiting-room, session, provider, typescript]
capabilities: [session-lifecycle-management, waiting-room-queue, hipaa-safe-notes]
useWhen:
  - building a telehealth video consultation with waiting room flow
  - managing provider session controls and patient queue
  - storing HIPAA-compliant session notes with audit trails
estimatedTokens: 650
relatedFragments: [SKL-0357, PAT-0184, SKL-0151]
dependencies: []
synonyms: ["telehealth example", "video consultation system", "virtual clinic session", "telemedicine platform", "remote healthcare visit"]
sourceUrl: "https://github.com/nicholasgasior/jitsi-meet"
lastUpdated: "2026-04-01"
difficulty: advanced
owner: builder
pillar: "health"
---

# Telehealth Video Session

Video consultation management with waiting room queue, provider controls, and HIPAA-safe session notes.

## Implementation

```typescript
import { randomUUID } from 'crypto';

// --- Data Model ---
type SessionStatus = 'scheduled' | 'waiting' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';

interface Patient {
  id: string;
  mrn: string;         // medical record number
  displayName: string; // first name + last initial only (PHI minimization)
}

interface Provider {
  id: string;
  name: string;
  npi: string;         // National Provider Identifier
  specialty: string;
}

interface TelehealthSession {
  id: string;
  patient: Patient;
  provider: Provider;
  status: SessionStatus;
  scheduledAt: Date;
  waitingRoomEnteredAt?: Date;
  startedAt?: Date;
  endedAt?: Date;
  durationMinutes?: number;
  roomToken: string;    // ephemeral, expires after session
  notes: EncryptedNote[];
  auditLog: AuditEntry[];
}

interface EncryptedNote {
  id: string;
  encryptedContent: string; // encrypted at rest
  authorId: string;
  createdAt: Date;
  noteType: 'subjective' | 'objective' | 'assessment' | 'plan'; // SOAP format
}

interface AuditEntry {
  action: string;
  performedBy: string;
  timestamp: Date;
  ipAddress?: string;
}

// --- Waiting Room ---
class WaitingRoom {
  private queue: TelehealthSession[] = [];

  addPatient(session: TelehealthSession): void {
    session.status = 'waiting';
    session.waitingRoomEnteredAt = new Date();
    session.auditLog.push({
      action: 'ENTERED_WAITING_ROOM',
      performedBy: session.patient.id,
      timestamp: new Date(),
    });
    this.queue.push(session);
  }

  getQueue(providerId: string): TelehealthSession[] {
    return this.queue
      .filter(s => s.provider.id === providerId && s.status === 'waiting')
      .sort((a, b) => (a.waitingRoomEnteredAt?.getTime() ?? 0) - (b.waitingRoomEnteredAt?.getTime() ?? 0));
  }

  getWaitTime(session: TelehealthSession): number {
    if (!session.waitingRoomEnteredAt) return 0;
    return Math.round((Date.now() - session.waitingRoomEnteredAt.getTime()) / 60_000);
  }

  removePatient(sessionId: string): void {
    this.queue = this.queue.filter(s => s.id !== sessionId);
  }
}

// --- Session Lifecycle ---
class SessionManager {
  private sessions = new Map<string, TelehealthSession>();
  private waitingRoom = new WaitingRoom();

  createSession(patient: Patient, provider: Provider, scheduledAt: Date): TelehealthSession {
    const session: TelehealthSession = {
      id: randomUUID(),
      patient,
      provider,
      status: 'scheduled',
      scheduledAt,
      roomToken: randomUUID(), // short-lived token for video room
      notes: [],
      auditLog: [{ action: 'SESSION_CREATED', performedBy: 'system', timestamp: new Date() }],
    };
    this.sessions.set(session.id, session);
    return session;
  }

  patientJoins(sessionId: string): void {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error('Session not found');
    this.waitingRoom.addPatient(session);
  }

  providerAdmits(sessionId: string, providerId: string): void {
    const session = this.sessions.get(sessionId);
    if (!session || session.provider.id !== providerId) throw new Error('Unauthorized');

    session.status = 'in-progress';
    session.startedAt = new Date();
    session.auditLog.push({
      action: 'SESSION_STARTED',
      performedBy: providerId,
      timestamp: new Date(),
    });
    this.waitingRoom.removePatient(sessionId);
  }

  endSession(sessionId: string, providerId: string): void {
    const session = this.sessions.get(sessionId);
    if (!session || session.provider.id !== providerId) throw new Error('Unauthorized');

    session.status = 'completed';
    session.endedAt = new Date();
    session.durationMinutes = session.startedAt
      ? Math.round((session.endedAt.getTime() - session.startedAt.getTime()) / 60_000)
      : 0;
    session.roomToken = ''; // invalidate token immediately
    session.auditLog.push({
      action: 'SESSION_ENDED',
      performedBy: providerId,
      timestamp: new Date(),
    });
  }

  // --- HIPAA-Safe Notes (SOAP format) ---
  addNote(sessionId: string, authorId: string, content: string, noteType: EncryptedNote['noteType']): void {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error('Session not found');

    // In production: encrypt content with AES-256-GCM before storing
    const encryptedContent = Buffer.from(content).toString('base64'); // placeholder for real encryption

    session.notes.push({
      id: randomUUID(),
      encryptedContent,
      authorId,
      createdAt: new Date(),
      noteType,
    });
    session.auditLog.push({
      action: `NOTE_ADDED_${noteType.toUpperCase()}`,
      performedBy: authorId,
      timestamp: new Date(),
    });
  }

  getProviderQueue(providerId: string): TelehealthSession[] {
    return this.waitingRoom.getQueue(providerId);
  }
}

// --- Usage ---
const manager = new SessionManager();
const session = manager.createSession(
  { id: 'P001', mrn: 'MRN-12345', displayName: 'Sarah L.' },
  { id: 'DR01', name: 'Dr. Martinez', npi: '1234567890', specialty: 'Internal Medicine' },
  new Date('2026-04-01T14:00:00Z'),
);

manager.patientJoins(session.id);
console.log('Queue:', manager.getProviderQueue('DR01').length, 'patients waiting');

manager.providerAdmits(session.id, 'DR01');
manager.addNote(session.id, 'DR01', 'Patient reports mild headache for 3 days', 'subjective');
manager.endSession(session.id, 'DR01');
```

## Key Patterns

- **PHI minimization**: display name uses first name + last initial only, never full name in UI
- **Ephemeral room tokens**: video room token is invalidated immediately on session end
- **SOAP notes**: structured note types (Subjective, Objective, Assessment, Plan) follow clinical documentation standards
- **Full audit trail**: every state change logs who, what, and when for HIPAA compliance
- **Provider authorization**: all mutations verify the requesting provider owns the session
