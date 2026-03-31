---
id: SKL-0277
name: Video Learning Platform
category: skills
tags: [video, streaming, transcripts, chaptering, engagement, e-learning]
capabilities: [video-hosting, chapter-management, transcript-generation, engagement-tracking]
useWhen:
  - building a video-based course or training platform
  - adding video hosting and streaming to a learning system
  - implementing video chapters, bookmarks, or transcripts
  - tracking video engagement and watch behavior
  - choosing between self-hosted and third-party video infrastructure
estimatedTokens: 650
relatedFragments: [SKL-0274, SKL-0276, SKL-0275]
dependencies: []
synonyms: ["how to host course videos", "build a video learning site", "add video chapters and transcripts", "video engagement tracking", "stream educational videos", "video course platform"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/overhangio/tutor"
difficulty: intermediate
owner: "cortex"
pillar: "education"
---

# Skill: Video Learning Platform

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0277 |
| **Name** | Video Learning Platform |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Video is the dominant format in online education, but raw video hosting is not enough. Learning-focused video needs chaptering, transcripts, engagement tracking, and smart completion detection.

### Video Infrastructure Options

| Approach | Cost | Control | Best For |
|----------|------|---------|----------|
| **Third-party (Mux, Cloudflare Stream, Bunny)** | Per-minute pricing | Low | Most platforms, fastest to ship |
| **YouTube/Vimeo unlisted** | Free/cheap | Very low | MVP, budget projects |
| **Self-hosted (HLS + S3 + CDN)** | Storage + bandwidth | Full | Large scale, custom DRM needs |

For most education platforms, a third-party video API (Mux or Cloudflare Stream) is the right choice. They handle encoding, adaptive bitrate streaming, and CDN delivery. Self-hosting only makes sense at scale or when DRM is required.

### Adaptive Bitrate Streaming

Always serve video via HLS or DASH, never as raw MP4 downloads. Adaptive bitrate streaming adjusts quality to the viewer's connection speed, preventing buffering. Upload a single high-quality source file and let the hosting service (or your own FFmpeg pipeline) generate multiple quality renditions (360p, 720p, 1080p).

### Chaptering and Navigation

Break videos into chapters with timestamps and titles. Store chapters as structured data alongside the video, not burned into the video file:

```
chapters: video_id, title, start_time, end_time, order
```

Display chapters as a clickable timeline overlay. Students should jump to any chapter without scanning. For longer lectures (30+ minutes), chapters are essential for re-study and review.

### Transcripts and Captions

Generate transcripts automatically (Whisper, Deepgram, or cloud speech-to-text) and allow manual correction. Store transcripts as timed text (VTT or SRT format). Transcripts serve three purposes: accessibility (captions for deaf/hard-of-hearing), searchability (full-text search across all course videos), and study aid (students read along or review without rewatching).

### Engagement Tracking

Track video events at a granular level: `play`, `pause`, `seek`, `speed_change`, `chapter_jump`, `complete`. The most valuable metric is the **engagement heatmap** -- which segments of a video are watched, rewatched, or skipped. Aggregate heatmaps across students reveal which parts of a lecture are confusing (high rewatch) or boring (high skip).

### Completion Detection

A video is "watched" when the student has viewed at least 90% of the total duration (not counting seeks back to already-watched segments). Track watched segments as time ranges and merge overlapping ranges. This prevents students from seeking to the end to mark a video complete.

### Playback Speed

Always offer 0.5x, 1x, 1.25x, 1.5x, and 2x playback speeds. Education-specific: remember each student's preferred speed per course and default to it on subsequent videos.

## Key Takeaways

- Use third-party video APIs (Mux, Cloudflare Stream) unless you have a specific reason to self-host
- Always serve adaptive bitrate (HLS/DASH), never raw MP4 files
- Chapter navigation is essential for any video longer than 10 minutes
- Auto-generate transcripts for accessibility, search, and study aids
- Track engagement heatmaps to identify confusing or boring video segments
