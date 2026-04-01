---
id: EX-0033
name: LinkedIn Content Strategy
category: examples
tags: [linkedin, content-strategy, social-media, calendar, engagement, posting, typescript]
capabilities: [content-calendar-generation, post-scheduling, engagement-tracking]
useWhen:
  - planning a LinkedIn content calendar with pillar topics
  - tracking post engagement metrics and identifying top performers
  - generating post ideas from a topic rotation schedule
estimatedTokens: 630
relatedFragments: [SKL-0237, SKL-0238, PAT-0124]
dependencies: []
synonyms: ["linkedin content example", "social media calendar", "content planning tool", "post scheduler", "engagement tracker"]
sourceUrl: "https://github.com/typefully/typefully"
lastUpdated: "2026-04-01"
difficulty: beginner
owner: builder
pillar: "personal-brand"
---

# LinkedIn Content Strategy

Content calendar generator with pillar topic rotation, post drafting, and engagement analytics.

## Implementation

```typescript
// --- Data Model ---
type PostFormat = 'text' | 'carousel' | 'poll' | 'video' | 'article' | 'image';
type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';

interface ContentPillar {
  id: string;
  name: string;
  description: string;
  hashtags: string[];
  frequency: number; // posts per week
}

interface ScheduledPost {
  id: string;
  pillarId: string;
  title: string;
  hook: string;          // first line (most important for LinkedIn)
  body: string;
  format: PostFormat;
  scheduledDate: Date;
  status: 'draft' | 'scheduled' | 'published' | 'skipped';
  engagement?: EngagementMetrics;
}

interface EngagementMetrics {
  impressions: number;
  likes: number;
  comments: number;
  reposts: number;
  clicks: number;
  followers: number;     // new followers from this post
  recordedAt: Date;
}

// --- Calendar Generator ---
function generateWeeklyCalendar(
  pillars: ContentPillar[],
  weekStartDate: Date,
  postDays: DayOfWeek[],
): ScheduledPost[] {
  const dayMap: Record<DayOfWeek, number> = {
    monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5,
  };

  const posts: ScheduledPost[] = [];
  let pillarIndex = 0;

  for (const day of postDays) {
    const postDate = new Date(weekStartDate);
    postDate.setDate(postDate.getDate() + dayMap[day] - 1);

    const pillar = pillars[pillarIndex % pillars.length];
    posts.push({
      id: `post-${postDate.toISOString().slice(0, 10)}`,
      pillarId: pillar.id,
      title: `[${pillar.name}] - Draft`,
      hook: '',
      body: '',
      format: 'text',
      scheduledDate: postDate,
      status: 'draft',
    });
    pillarIndex++;
  }

  return posts;
}

// --- Engagement Analytics ---
interface EngagementReport {
  totalPosts: number;
  avgImpressions: number;
  avgEngagementRate: number;
  topPerformers: ScheduledPost[];
  bestPillar: { pillarId: string; avgRate: number };
  bestFormat: { format: PostFormat; avgRate: number };
}

function engagementRate(m: EngagementMetrics): number {
  if (m.impressions === 0) return 0;
  return (m.likes + m.comments * 2 + m.reposts * 3) / m.impressions;
}

function analyzeEngagement(posts: ScheduledPost[]): EngagementReport {
  const published = posts.filter(p => p.status === 'published' && p.engagement);

  const rates = published.map(p => engagementRate(p.engagement!));
  const avgRate = rates.length > 0 ? rates.reduce((a, b) => a + b, 0) / rates.length : 0;
  const avgImpressions = published.reduce((sum, p) => sum + (p.engagement?.impressions ?? 0), 0) / (published.length || 1);

  // Best pillar
  const pillarRates = new Map<string, number[]>();
  for (const p of published) {
    const arr = pillarRates.get(p.pillarId) ?? [];
    arr.push(engagementRate(p.engagement!));
    pillarRates.set(p.pillarId, arr);
  }
  let bestPillar = { pillarId: '', avgRate: 0 };
  for (const [id, r] of pillarRates) {
    const avg = r.reduce((a, b) => a + b, 0) / r.length;
    if (avg > bestPillar.avgRate) bestPillar = { pillarId: id, avgRate: avg };
  }

  // Best format
  const formatRates = new Map<PostFormat, number[]>();
  for (const p of published) {
    const arr = formatRates.get(p.format) ?? [];
    arr.push(engagementRate(p.engagement!));
    formatRates.set(p.format, arr);
  }
  let bestFormat: { format: PostFormat; avgRate: number } = { format: 'text', avgRate: 0 };
  for (const [fmt, r] of formatRates) {
    const avg = r.reduce((a, b) => a + b, 0) / r.length;
    if (avg > bestFormat.avgRate) bestFormat = { format: fmt, avgRate: avg };
  }

  const topPerformers = [...published].sort((a, b) =>
    engagementRate(b.engagement!) - engagementRate(a.engagement!)
  ).slice(0, 5);

  return { totalPosts: published.length, avgImpressions, avgEngagementRate: avgRate, topPerformers, bestPillar, bestFormat };
}

// --- Usage ---
const pillars: ContentPillar[] = [
  { id: 'ai', name: 'AI Orchestration', description: 'Building with AI agents', hashtags: ['#AI', '#LLM'], frequency: 2 },
  { id: 'career', name: 'Career Lessons', description: 'Enterprise PM learnings', hashtags: ['#Career', '#PM'], frequency: 2 },
  { id: 'build', name: 'Build in Public', description: 'Shipping real products', hashtags: ['#BuildInPublic'], frequency: 1 },
];

const calendar = generateWeeklyCalendar(pillars, new Date('2026-04-06'), ['monday', 'wednesday', 'friday']);
console.log(`Generated ${calendar.length} posts for the week`);
```

## Key Patterns

- **Pillar rotation**: cycles through content themes to maintain topic diversity and audience breadth
- **Hook-first structure**: separates hook from body because LinkedIn truncates after 2 lines
- **Weighted engagement rate**: comments count 2x and reposts 3x, reflecting LinkedIn's algorithm priorities
- **Best-format analysis**: identifies which post format (carousel, text, poll) resonates most with your audience
