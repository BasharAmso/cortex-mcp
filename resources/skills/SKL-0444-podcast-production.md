---
id: SKL-0444
name: Podcast Production
category: skills
tags: [podcast, audio, recording, editing, hosting, rss, content, show-notes]
capabilities: [podcast-setup, audio-editing, episode-publishing, show-notes-writing, rss-management]
useWhen:
  - starting a podcast and need equipment and hosting recommendations
  - setting up a podcast RSS feed and submitting to directories
  - planning episode structure and interview preparation
  - editing audio and improving production quality
  - writing show notes that drive traffic and SEO
estimatedTokens: 650
relatedFragments: [SKL-0081, SKL-0097, SKL-0241]
dependencies: []
synonyms: ["how do I start a podcast", "what equipment do I need for podcasting", "how to edit podcast audio", "how to get my podcast on Apple Podcasts", "how to structure a podcast episode", "how to grow a podcast audience"]
lastUpdated: "2026-03-31"
sourceUrl: "https://github.com/TryGhost/Ghost"
difficulty: beginner
owner: "cortex"
pillar: "content-creation"
---

# Podcast Production

Publishing platforms like Ghost treat audio as a first-class content type alongside text and email. Ghost's editor includes native audio cards for embedding episodes directly into posts, RSS feeds are generated automatically for every collection, and the Content API lets you distribute episodes headlessly to any frontend. This pattern (structured content + RSS + API distribution) is the foundation of modern podcast production regardless of which platform you choose.

## Recording Setup

Start simple and upgrade based on listener feedback, not assumptions:

| Tier | Microphone | Interface | Cost |
|------|-----------|-----------|------|
| Starter | USB dynamic (ATR2100x, Samson Q2U) | None needed | $60-80 |
| Mid | XLR dynamic (Shure SM58, Rode PodMic) | Focusrite Scarlett Solo | $150-250 |
| Pro | XLR condenser (Rode NT1, Shure SM7B) | Rodecaster Pro | $400-800 |

Record in a quiet room with soft surfaces. A closet full of clothes outperforms an untreated office. Use headphones while recording to catch issues in real time.

## Episode Structure

A repeatable structure reduces prep time and sets listener expectations:

1. **Hook** (15-30 seconds) — Lead with the most interesting point or question
2. **Intro** (30-60 seconds) — Show name, host name, what this episode covers
3. **Core content** (15-45 minutes) — 2-4 segments with clear transitions
4. **Call to action** (30 seconds) — One ask: subscribe, visit a link, leave a review
5. **Outro** (15 seconds) — Thank the listener, tease next episode

For interviews, prepare 5-7 questions but follow the conversation. The best moments come from follow-up questions, not the script.

## Editing Workflow

Use Audacity (free), GarageBand (free on Mac), Descript (AI-powered), or Hindenburg (pro). A basic editing pass takes 1.5x the episode length:

1. Remove long silences, false starts, and filler words
2. Normalize audio levels (-16 LUFS for stereo, -19 LUFS for mono)
3. Add intro/outro music (use royalty-free sources like Epidemic Sound or Free Music Archive)
4. Apply noise reduction if needed (light touch, heavy noise reduction sounds robotic)
5. Export as MP3 at 128kbps mono for spoken word

## Hosting and RSS

Your podcast host generates the RSS feed that directories consume. Choose based on your needs:

| Host | Free Tier | Strengths |
|------|-----------|-----------|
| Buzzsprout | 2 hrs/month | Beginner-friendly, auto-optimization |
| Anchor (Spotify) | Unlimited | Free, built-in Spotify distribution |
| Transistor | No | Multiple shows, private podcasts, analytics |
| Podbean | 5 hrs/month | Monetization tools, live streaming |

After your host generates the RSS feed, submit it to Apple Podcasts, Spotify, Google Podcasts, Amazon Music, and Pocket Casts. Most directories pull from the same RSS feed, so update once and it propagates everywhere. Ghost's approach of auto-generating RSS for every content collection follows this same pattern.

## Show Notes That Drive Traffic

Show notes are your podcast's SEO surface. Treat each episode page like a blog post:

- Episode summary (2-3 sentences, not a transcript)
- Timestamped sections for easy navigation
- Links to every resource, person, or tool mentioned
- One clear call to action with a trackable link
- Embedded audio player (Ghost's audio card, Transistor embed, or HTML5 audio)

Ghost and similar CMS platforms let you publish show notes as full posts with the audio embedded, delivered to subscribers via email and exposed via RSS, turning each episode into a multi-channel content asset.

## Key Takeaways

- Start with a USB dynamic microphone and a quiet room; upgrade only when your show has consistent listeners
- Pick a repeatable episode structure so listeners know what to expect and you spend less time on prep
- Your RSS feed is the single distribution point for all podcast directories; get it right once
- Show notes are content, not an afterthought; they drive search traffic and give listeners a reason to visit your site
- Batch-record and batch-edit episodes to maintain a consistent publishing schedule without burnout
