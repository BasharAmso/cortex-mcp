---
id: PAT-0158
name: Leaderboard Pattern
category: patterns
tags: [game-dev, leaderboard, ranking, anti-cheat, score-submission, multiplayer]
capabilities: [score-tracking, ranking-systems, anti-cheat-validation, seasonal-resets, leaderboard-ui]
useWhen:
  - adding a leaderboard or high score system to a game
  - designing server-side score validation to prevent cheating
  - implementing seasonal or periodic leaderboard resets
  - choosing between global, friends, and regional leaderboards
  - displaying rankings in a game UI
estimatedTokens: 650
relatedFragments: [SKL-0306, PAT-0157, PAT-0066, SKL-0143]
dependencies: []
synonyms: ["how to build a leaderboard for my game", "high score system design", "how to prevent leaderboard cheating", "score submission and ranking", "seasonal leaderboard resets", "global vs friends leaderboard"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/colyseus/colyseus"
difficulty: beginner
owner: "cortex"
pillar: "game-dev"
---

# Pattern: Leaderboard

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0158 |
| **Name** | Leaderboard Pattern |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

A leaderboard ranks players by score, time, or achievement. The critical design challenge is not displaying numbers; it is ensuring scores are legitimate and the system scales without becoming a target for cheaters.

### Architecture

```
Client                    Server                    Database
──────                    ──────                    ────────
Game ends →
  Submit score ────────→ Validate score
                          - Check plausibility
                          - Verify session token
                          - Rate limit
                          Store score ──────────→ scores table
                                                   (player, score, season, timestamp)
  Request leaderboard ─→ Query rankings
                          - Cache top 100
                          - Compute player rank
  Display rankings ←──── Return results ←───────── Sorted query
```

### Score Submission

**Never trust the client.** The client reports what happened, but the server decides if it is valid.

```typescript
// Server-side score validation
async function submitScore(playerId: string, score: number, sessionId: string) {
  // 1. Verify session is real and active
  const session = await getSession(sessionId);
  if (!session || session.playerId !== playerId) throw new Error('Invalid session');

  // 2. Plausibility check
  const maxPossible = calculateMaxScore(session.duration, session.level);
  if (score > maxPossible) throw new Error('Score exceeds maximum possible');

  // 3. Rate limit (one submission per game session)
  if (session.scoreSubmitted) throw new Error('Score already submitted');

  // 4. Store and mark session
  await db.scores.insert({ playerId, score, season: currentSeason(), timestamp: Date.now() });
  await db.sessions.update(sessionId, { scoreSubmitted: true });
}
```

### Anti-Cheat Layers

| Layer | What It Catches | Implementation |
|-------|----------------|----------------|
| **Server authority** | Fabricated scores | All game logic runs or validates server-side |
| **Plausibility bounds** | Impossible scores | Max score = f(level, duration, multipliers) |
| **Rate limiting** | Spam submissions | One score per completed game session |
| **Session tokens** | Spoofed identities | Signed, short-lived session tokens |
| **Statistical outlier detection** | Subtle cheating | Flag scores >3 standard deviations above mean |
| **Manual review queue** | Edge cases | Top 10 scores reviewed before display |

No anti-cheat is perfect. The goal is to make cheating harder than playing legitimately.

### Ranking Strategies

| Strategy | Query | Best For |
|----------|-------|----------|
| **Global top N** | `ORDER BY score DESC LIMIT 100` | Simple, low-write games |
| **Around-me** | Player's rank +/- 5 positions | Motivation for mid-tier players |
| **Friends only** | Filter by friend list | Social games |
| **Percentile** | "Top 5%" badge | Large player bases |

For "around me" ranking, use a pre-computed rank column or Redis sorted sets (`ZREVRANK`) for O(log N) rank lookups.

### Seasonal Resets

Seasons keep leaderboards fresh and give returning players a clean start:

```typescript
interface Season {
  id: string;        // "2026-Q1"
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

// Scores always tagged with season ID
// Previous seasons remain queryable but archived
// New season auto-creates on schedule (cron job or date check)
```

Reset frequency depends on game cadence: weekly for casual games, monthly for competitive, quarterly for slower-paced games.

### Leaderboard UI Principles

1. **Show the player's own rank** prominently, even if they are not in the top 100
2. **Highlight rank changes** (up/down arrows) to create engagement
3. **Display relative context:** "You are #4,231 of 50,000 players" or "Top 8%"
4. **Load progressively:** Show top 10 immediately, lazy-load the rest
5. **Offer multiple views:** All-time, this season, this week, friends

## Anti-Patterns

- Trusting client-reported scores without server validation
- Storing only the top N scores (loses historical data and prevents "around me" views)
- No rate limiting on score submission endpoints
- Resetting leaderboards without archiving previous season data
- Showing only global top 10 (demoralizing for 99.9% of players)

## Key Takeaways

- Server-side validation is non-negotiable; never trust client scores
- Layer multiple anti-cheat checks: plausibility, rate limits, session tokens, outlier detection
- Show players their own rank and nearby competitors, not just the global top 10
- Seasonal resets keep leaderboards fresh and give everyone a reason to return
- Use Redis sorted sets or pre-computed ranks for fast "around me" queries
