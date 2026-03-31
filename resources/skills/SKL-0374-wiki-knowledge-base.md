---
id: SKL-0374
name: Wiki & Knowledge Base
category: skills
tags: [wiki, knowledge-base, documentation, search, permissions, team-content, structured-content]
capabilities: [wiki-architecture, document-hierarchy, full-text-search, team-permissions]
useWhen:
  - building an internal wiki or knowledge base for a team
  - designing document hierarchy with collections and nested pages
  - adding full-text search across structured content
  - implementing team-based document permissions
  - creating a self-hosted knowledge management system
estimatedTokens: 650
relatedFragments: [SKL-0152, PAT-0192, PAT-0194]
dependencies: []
synonyms: ["how to build a team wiki", "how to create a knowledge base app", "how to organize team documentation", "how to add search to a wiki", "how to build something like Notion or Confluence", "how to structure team knowledge"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/outline/outline"
difficulty: beginner
owner: "cortex"
pillar: "collaboration"
---

# Skill: Wiki & Knowledge Base

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0374 |
| **Name** | Wiki & Knowledge Base |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

A team wiki organizes knowledge into a searchable, permission-controlled hierarchy. Outline's architecture demonstrates the gold-standard approach: documents live inside collections, collections belong to teams, and everything is full-text searchable.

### Document Model

Structure content as Markdown-compatible documents with rich editing support:

| Layer | Purpose | Example |
|-------|---------|---------|
| **Workspace** | Top-level tenant | "Acme Corp" |
| **Collection** | Topic grouping | "Engineering", "Product" |
| **Document** | Individual page | "API Style Guide" |
| **Nested Document** | Sub-page hierarchy | "REST Conventions" under API Style Guide |

Each document stores: title, body (Markdown/ProseMirror JSON), author, collaborators, revision history, and publish state (draft vs. published).

### Search Architecture

Full-text search is the primary navigation mechanism. Implement using PostgreSQL `tsvector`/`tsquery` for self-hosted or Elasticsearch for scale. Index document titles, body content, and metadata. Rank results by relevance, recency, and user access level.

### Real-Time Collaboration

Outline uses WebSocket connections for live co-editing. The pattern: user opens document, establishes WS connection, receives cursor positions and edits from other users, and merges changes via operational transforms or CRDTs.

### Permission Hierarchy

```
Workspace Admin > Collection Admin > Editor > Viewer > No Access
```

Documents inherit permissions from their collection by default. Override at the document level for sensitive content. Support sharing via link with optional password protection.

### API-First Design

Expose all operations through a REST API: create, read, update, delete, search, share, and export. This enables integrations with Slack, CI/CD tools, and custom workflows. Webhook events notify external systems of document changes.

### Revision History

Store every save as a revision. Allow diffing between versions, restoring previous versions, and attributing changes to specific authors. This is critical for compliance and accountability in team environments.

## Key Takeaways

- Structure wikis as Workspace > Collection > Document > Nested Document for natural navigation
- Full-text search with relevance ranking is more important than perfect folder hierarchies
- Permission inheritance from collections reduces admin overhead while per-document overrides handle exceptions
- Revision history with author attribution builds trust and accountability
- API-first design enables the integration ecosystem that makes a wiki sticky
