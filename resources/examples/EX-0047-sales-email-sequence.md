---
id: EX-0047
name: Sales Email Sequence
category: examples
tags: [sales, email, outreach, automation, personalization, tracking, sequence, crm, typescript]
capabilities: [email-sequencing, personalization-engine, timing-rules, engagement-tracking]
useWhen:
  - building automated multi-step email outreach sequences
  - implementing personalized sales email templates with merge fields
  - tracking email opens and replies for sales engagement
estimatedTokens: 650
relatedFragments: [SKL-0200, SKL-0205, PAT-0109, EX-0025]
dependencies: []
synonyms: ["drip email campaign", "sales outreach automation", "email cadence builder", "cold email sequence", "sales engagement engine"]
sourceUrl: "https://github.com/getmailspring/mailspring"
lastUpdated: "2026-04-01"
difficulty: intermediate
owner: builder
pillar: "sales"
---

# Sales Email Sequence

Automated multi-step email outreach with personalization, timing rules, and open/reply tracking.

## Implementation

```typescript
// --- Types ---
interface Contact {
  id: string;
  email: string;
  firstName: string;
  company: string;
  role: string;
  industry: string;
  customFields: Record<string, string>;
}

interface EmailStep {
  stepNumber: number;
  subject: string;
  body: string;
  delayDays: number;
  skipIfReplied: boolean;
  sendWindow: { startHour: number; endHour: number; timezone: string };
}

interface Sequence {
  id: string;
  name: string;
  steps: EmailStep[];
  stopOnReply: boolean;
}

interface Enrollment {
  contactId: string;
  sequenceId: string;
  currentStep: number;
  status: 'active' | 'replied' | 'completed' | 'bounced' | 'unsubscribed';
  startedAt: Date;
  lastSentAt?: Date;
  events: EngagementEvent[];
}

interface EngagementEvent {
  type: 'sent' | 'opened' | 'clicked' | 'replied' | 'bounced';
  stepNumber: number;
  timestamp: Date;
}

// --- Personalization Engine ---
function personalize(template: string, contact: Contact): string {
  const tokens: Record<string, string> = {
    '{{firstName}}': contact.firstName,
    '{{company}}': contact.company,
    '{{role}}': contact.role,
    '{{industry}}': contact.industry,
    ...Object.fromEntries(
      Object.entries(contact.customFields).map(([k, v]) => [`{{${k}}}`, v])
    ),
  };

  return Object.entries(tokens).reduce(
    (text, [token, value]) => text.replaceAll(token, value || ''),
    template
  );
}

// --- Timing Engine ---
function getNextSendTime(step: EmailStep, fromDate: Date): Date {
  const sendDate = new Date(fromDate);
  sendDate.setDate(sendDate.getDate() + step.delayDays);

  // Adjust to send window (skip weekends)
  while (sendDate.getDay() === 0 || sendDate.getDay() === 6) {
    sendDate.setDate(sendDate.getDate() + 1);
  }

  // Set to middle of send window for best open rates
  const midHour = Math.floor((step.sendWindow.startHour + step.sendWindow.endHour) / 2);
  sendDate.setHours(midHour, Math.floor(Math.random() * 30), 0, 0);

  return sendDate;
}

// --- Sequence Processor ---
function processEnrollment(
  enrollment: Enrollment,
  sequence: Sequence,
  contact: Contact,
  now: Date
): { action: 'send' | 'wait' | 'complete' | 'stop'; email?: { to: string; subject: string; body: string }; nextCheck?: Date } {
  // Stop if contact replied and sequence is set to stop
  if (sequence.stopOnReply && enrollment.events.some(e => e.type === 'replied')) {
    return { action: 'stop' };
  }

  // All steps sent
  if (enrollment.currentStep >= sequence.steps.length) {
    return { action: 'complete' };
  }

  const step = sequence.steps[enrollment.currentStep];

  // Skip if replied and step says to skip
  if (step.skipIfReplied && enrollment.events.some(e => e.type === 'replied')) {
    enrollment.currentStep++;
    return processEnrollment(enrollment, sequence, contact, now);
  }

  const fromDate = enrollment.lastSentAt ?? enrollment.startedAt;
  const sendTime = getNextSendTime(step, fromDate);

  if (now < sendTime) {
    return { action: 'wait', nextCheck: sendTime };
  }

  return {
    action: 'send',
    email: {
      to: contact.email,
      subject: personalize(step.subject, contact),
      body: personalize(step.body, contact),
    },
  };
}

// --- Engagement Stats ---
function sequenceStats(enrollments: Enrollment[]): Record<string, number> {
  const total = enrollments.length;
  const replied = enrollments.filter(e => e.events.some(ev => ev.type === 'replied')).length;
  const opened = enrollments.filter(e => e.events.some(ev => ev.type === 'opened')).length;
  const bounced = enrollments.filter(e => e.status === 'bounced').length;

  return {
    totalEnrolled: total,
    replyRate: total > 0 ? Math.round((replied / total) * 100) : 0,
    openRate: total > 0 ? Math.round((opened / total) * 100) : 0,
    bounceRate: total > 0 ? Math.round((bounced / total) * 100) : 0,
  };
}
```

## Key Patterns

- **Template personalization**: merge fields replaced from contact data including custom fields
- **Send window with weekend skip**: emails land during business hours on weekdays
- **Recursive step skip**: if a step is skipped, processor advances and re-evaluates immediately
- **Stop on reply**: sequence halts globally or per-step when contact responds
