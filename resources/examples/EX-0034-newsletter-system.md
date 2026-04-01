---
id: EX-0034
name: Newsletter Subscription System
category: examples
tags: [newsletter, email, subscription, double-opt-in, segments, campaign, typescript]
capabilities: [subscriber-management, double-opt-in-flow, campaign-tracking]
useWhen:
  - building an email newsletter with double opt-in confirmation
  - segmenting subscribers by interests or behavior
  - tracking campaign open rates and click-through rates
estimatedTokens: 620
relatedFragments: [SKL-0239, PAT-0125, SKL-0238]
dependencies: []
synonyms: ["newsletter example", "email list management", "subscriber system", "mailing list implementation", "email campaign tracker"]
sourceUrl: "https://github.com/listmonk/listmonk"
lastUpdated: "2026-04-01"
difficulty: intermediate
owner: builder
pillar: "personal-brand"
---

# Newsletter Subscription System

Email list management with double opt-in, subscriber segmentation, and campaign analytics.

## Implementation

```typescript
import { randomUUID } from 'crypto';

// --- Data Model ---
type SubscriberStatus = 'pending' | 'confirmed' | 'unsubscribed' | 'bounced';

interface Subscriber {
  id: string;
  email: string;
  name?: string;
  status: SubscriberStatus;
  segments: string[];
  confirmToken: string;
  subscribedAt: Date;
  confirmedAt?: Date;
  unsubscribedAt?: Date;
  metadata: Record<string, string>;
}

interface Campaign {
  id: string;
  subject: string;
  previewText: string;
  htmlBody: string;
  targetSegments: string[];
  sentAt?: Date;
  stats: CampaignStats;
}

interface CampaignStats {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  bounced: number;
  unsubscribed: number;
}

// --- Subscriber Management ---
class NewsletterService {
  private subscribers = new Map<string, Subscriber>();
  private campaigns = new Map<string, Campaign>();

  subscribe(email: string, segments: string[], name?: string): { confirmToken: string } {
    const normalized = email.toLowerCase().trim();
    const existing = [...this.subscribers.values()].find(s => s.email === normalized);

    if (existing?.status === 'confirmed') {
      throw new Error('Already subscribed');
    }

    const confirmToken = randomUUID();
    const subscriber: Subscriber = {
      id: randomUUID(),
      email: normalized,
      name,
      status: 'pending',
      segments,
      confirmToken,
      subscribedAt: new Date(),
      metadata: {},
    };

    this.subscribers.set(subscriber.id, subscriber);
    // In production: send confirmation email with token link
    return { confirmToken };
  }

  confirmSubscription(token: string): boolean {
    const subscriber = [...this.subscribers.values()].find(s => s.confirmToken === token);
    if (!subscriber || subscriber.status !== 'pending') return false;

    subscriber.status = 'confirmed';
    subscriber.confirmedAt = new Date();
    return true;
  }

  unsubscribe(email: string): boolean {
    const subscriber = [...this.subscribers.values()].find(s => s.email === email.toLowerCase());
    if (!subscriber || subscriber.status === 'unsubscribed') return false;

    subscriber.status = 'unsubscribed';
    subscriber.unsubscribedAt = new Date();
    return true;
  }

  // --- Segmentation ---
  getSegmentSubscribers(segment: string): Subscriber[] {
    return [...this.subscribers.values()].filter(
      s => s.status === 'confirmed' && s.segments.includes(segment),
    );
  }

  getActiveCount(): number {
    return [...this.subscribers.values()].filter(s => s.status === 'confirmed').length;
  }

  // --- Campaign Analytics ---
  computeRates(campaignId: string): { openRate: number; clickRate: number; bounceRate: number; unsubRate: number } | null {
    const campaign = this.campaigns.get(campaignId);
    if (!campaign || campaign.stats.delivered === 0) return null;

    const { delivered, opened, clicked, bounced, unsubscribed } = campaign.stats;
    return {
      openRate: opened / delivered,
      clickRate: clicked / delivered,
      bounceRate: bounced / (delivered + bounced),
      unsubRate: unsubscribed / delivered,
    };
  }

  // --- List Health ---
  getListHealth(): { total: number; confirmed: number; pending: number; bounced: number; healthScore: number } {
    const all = [...this.subscribers.values()];
    const confirmed = all.filter(s => s.status === 'confirmed').length;
    const pending = all.filter(s => s.status === 'pending').length;
    const bounced = all.filter(s => s.status === 'bounced').length;
    const total = all.length;

    const healthScore = total > 0 ? (confirmed / total) * (1 - bounced / total) : 0;

    return { total, confirmed, pending, bounced, healthScore: Math.round(healthScore * 100) / 100 };
  }
}

// --- Usage ---
const newsletter = new NewsletterService();
const { confirmToken } = newsletter.subscribe('reader@example.com', ['ai', 'career'], 'Alex');
newsletter.confirmSubscription(confirmToken);

console.log(`Active subscribers: ${newsletter.getActiveCount()}`);
console.log('AI segment:', newsletter.getSegmentSubscribers('ai').length);
console.log('List health:', newsletter.getListHealth());
```

## Key Patterns

- **Double opt-in**: pending state with confirm token prevents spam signups and improves deliverability
- **Segment-based targeting**: subscribers self-select interests, campaigns target specific segments
- **List health score**: combines confirmation rate and bounce rate into a single metric
- **Email normalization**: lowercase + trim prevents duplicate entries from case variations
