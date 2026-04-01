---
id: EX-0023
name: MVP Landing Page with Waitlist
category: examples
tags: [mvp, landing-page, waitlist, signup, launch, marketing, react, typescript]
capabilities: [landing-page-creation, waitlist-collection, email-capture]
useWhen:
  - launching a product with a waitlist before building
  - creating an MVP landing page to validate demand
  - collecting signups before the product is ready
estimatedTokens: 600
relatedFragments: [SKL-0429, SKL-0423, SKL-0013, PAT-0220, EX-0024]
dependencies: []
synonyms: ["landing page example", "waitlist page", "mvp signup page", "pre-launch page", "coming soon page with email capture"]
sourceUrl: "https://github.com/shadcn-ui/taxonomy"
lastUpdated: "2026-04-01"
difficulty: beginner
owner: builder
pillar: "product-business"
---

# MVP Landing Page with Waitlist

A conversion-focused landing page that captures waitlist signups.

## Implementation

```typescript
// --- API Route (Next.js) ---
// app/api/waitlist/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
  }

  // Check for duplicates
  const existing = await db.waitlist.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ message: 'Already on the list!', position: existing.position });
  }

  const count = await db.waitlist.count();
  const entry = await db.waitlist.create({
    data: { email, position: count + 1, source: req.headers.get('referer') ?? 'direct' },
  });

  // Send confirmation email (async, don't block response)
  sendWelcomeEmail(email, entry.position).catch(console.error);

  return NextResponse.json({ message: 'You\'re in!', position: entry.position });
}

// --- Landing Page Component ---
// app/page.tsx
'use client';
import { useState } from 'react';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [position, setPosition] = useState<number | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setPosition(data.position);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <main>
      <h1>Ship faster with AI-powered workflows</h1>
      <p>Join {position ? `${position}+` : '500+'} builders on the waitlist.</p>

      {status === 'success' ? (
        <p>You're #{position} on the list. Check your email.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
          />
          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Joining...' : 'Join the Waitlist'}
          </button>
        </form>
      )}
    </main>
  );
}
```

## Key Patterns

- **Position number**: creates urgency and social proof ("You're #247")
- **Duplicate handling**: returns existing position instead of erroring
- **Source tracking**: `referer` header tells you which channel converts best
- **Async email**: confirmation email doesn't block the signup response
