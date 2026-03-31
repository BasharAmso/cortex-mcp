---
id: PAT-0194
name: Comment & Thread Pattern
category: patterns
tags: [comments, threads, mentions, reactions, nested-comments, resolution, discussion, collaboration]
capabilities: [threaded-comments, mention-system, reaction-handling, comment-resolution]
useWhen:
  - adding comments and discussions to any content type
  - implementing threaded conversations with replies
  - building @mention functionality with notifications
  - adding emoji reactions to comments
  - implementing comment resolution workflows
estimatedTokens: 650
relatedFragments: [SKL-0377, SKL-0374, PAT-0193]
dependencies: []
synonyms: ["how to add comments to my app", "how to implement threaded discussions", "how to build an @mention system", "how to add emoji reactions to comments", "how to resolve comment threads", "how to design nested comments"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/outline/outline"
difficulty: beginner
owner: "cortex"
pillar: "collaboration"
---

# Comment & Thread Pattern

Threaded discussions with mentions, reactions, and resolution for collaborative content.

## Comment Model

```
Comment {
  id:          UUID
  parentId:    UUID | null     // null = top-level, set = reply
  contentId:   UUID            // the document, issue, or PR being discussed
  contentType: string          // "document", "issue", "pull_request"
  authorId:    UUID
  body:        string          // Markdown with @mentions
  mentions:    UUID[]          // extracted user IDs
  reactions:   Map<emoji, UUID[]>
  resolved:    boolean
  resolvedBy:  UUID | null
  createdAt:   timestamp
  editedAt:    timestamp | null
}
```

Use `parentId` for single-level threading (replies to a top-level comment). Avoid deeply nested trees (Reddit-style) in collaboration tools since they fragment context. Outline and GitHub both limit threading to one level deep.

## Threading Strategy

| Strategy | Depth | Best For |
|----------|-------|----------|
| **Flat** | 0 | Simple feedback, chat-like |
| **Single-level** | 1 | Code review, document comments (GitHub, Outline) |
| **Nested tree** | N | Forums, community discussion (Reddit) |

For collaboration tools, single-level threading is the sweet spot. It groups related discussion without the navigation complexity of deep nesting.

## @Mentions

Parse `@username` or `@{user-id}` from comment body during save:

```
1. Extract mention patterns from body text
2. Resolve usernames to user IDs
3. Store extracted IDs in mentions array
4. Create notification for each mentioned user
5. Render mentions as linked, styled spans in the UI
```

Support @channel or @team mentions that notify all members of a group. Rate-limit mention notifications to prevent spam.

## Reactions

Store reactions as a map of emoji to user ID arrays:

```json
{
  "reactions": {
    "thumbsup": ["user-1", "user-3"],
    "heart": ["user-2"],
    "eyes": ["user-1", "user-2"]
  }
}
```

Toggle semantics: clicking a reaction you already added removes it. Display reaction counts with the current user's reactions highlighted. Limit to a predefined emoji set (6-12 options) rather than the full Unicode emoji range to keep the UI clean.

## Resolution Workflow

Comments on documents and code reviews often need a "resolved" state:

1. Any participant can mark a thread as resolved
2. Resolved threads collapse in the UI but remain accessible
3. New replies to a resolved thread automatically unresolve it
4. Track who resolved and when for accountability
5. Filter view: "Show unresolved only" for review workflows

This pattern is critical for code review and document feedback cycles where teams need to track which comments have been addressed.

## Polymorphic Attachment

Use `(contentType, contentId)` to attach comments to any entity type. This avoids creating separate comment tables for documents, issues, and pull requests. Query with: `WHERE contentType = ? AND contentId = ?`.

## Key Takeaways

- Single-level threading (one reply depth) is the sweet spot for collaboration tool comments
- Store mentions as extracted user IDs alongside the body text for efficient notification delivery
- Reactions use toggle semantics and a limited emoji set for clean UX
- Resolution workflows with auto-unresolve on new replies keep feedback cycles productive
- Polymorphic `(contentType, contentId)` lets one comment system serve all entity types
