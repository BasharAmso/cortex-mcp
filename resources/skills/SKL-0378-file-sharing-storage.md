---
id: SKL-0378
name: File Sharing & Storage
category: skills
tags: [file-sharing, storage, upload, versioning, permissions, sync, webdav, cloud-storage]
capabilities: [file-upload-management, sharing-permissions, version-control, sync-protocol]
useWhen:
  - building a file sharing and storage platform
  - implementing file upload with versioning and permissions
  - designing sync between desktop clients and cloud storage
  - adding WebDAV support for native OS file access
  - creating team file storage with granular sharing controls
estimatedTokens: 650
relatedFragments: [PAT-0192, SKL-0374, PAT-0015]
dependencies: []
synonyms: ["how to build a file sharing app", "how to add file upload with versioning", "how to sync files between devices", "how to implement file permissions and sharing", "how to build a Dropbox or Google Drive alternative", "how to add cloud storage to my app"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nextcloud/server"
difficulty: beginner
owner: "cortex"
pillar: "collaboration"
---

# Skill: File Sharing & Storage

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0378 |
| **Name** | File Sharing & Storage |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

File sharing platforms like Nextcloud provide upload, storage, versioning, and permission-controlled sharing. The architecture combines a web interface, WebDAV protocol support, and a sync client for seamless file management across devices.

### Storage Architecture

Organize storage in a layered model:

| Layer | Responsibility |
|-------|---------------|
| **Storage Backend** | Local filesystem, S3-compatible object storage, or Azure Blob |
| **Metadata Database** | File names, paths, sizes, ETags, permissions, share links |
| **Cache Layer** | Thumbnails, preview images, search indices |

Nextcloud abstracts the storage backend behind a virtual filesystem API, making it possible to swap backends without changing application logic.

### File Upload Flow

```
1. Client sends chunked upload (5MB chunks for large files)
2. Server assembles chunks into final file
3. Generate ETag (content hash) for sync detection
4. Create thumbnail and preview for supported types
5. Index content for full-text search
6. Notify subscribed users of new/changed file
```

Use chunked uploads for reliability. If a chunk fails, retry only that chunk instead of restarting the entire upload. Support resumable uploads via `tus` protocol or custom chunking.

### Versioning

Store previous versions automatically on every save. Nextcloud keeps versions with decreasing frequency over time: all versions for the first day, one per day for the first month, one per week after that. This balances storage cost with recovery flexibility.

### Sharing Model

```
Owner -> Share Link (public, password-protected, expiring)
      -> User Share (read, write, reshare)
      -> Group Share (inherits group membership)
      -> Federated Share (cross-server via federation protocol)
```

Each share can set: read/write permission, expiration date, password requirement, download restriction, and whether the recipient can reshare.

### Sync Protocol

Desktop/mobile clients sync using ETags for change detection. The flow: client requests directory listing with ETags, compares against local state, downloads changed files, uploads local changes. Conflict detection uses modification timestamps and ETags. When conflicts occur, create a conflict copy rather than overwriting.

### WebDAV Integration

Expose files via WebDAV for native OS integration. Users mount the storage as a network drive on Windows, macOS, and Linux without installing a dedicated sync client. WebDAV also enables integration with office applications for direct file editing.

## Key Takeaways

- Chunked, resumable uploads are essential for reliability with large files
- ETag-based sync detection is simpler and more reliable than timestamp comparison alone
- Versioning with decreasing frequency over time balances recovery needs with storage costs
- Abstract the storage backend early so you can migrate from local filesystem to S3 without refactoring
- WebDAV support gives users native OS file access without a dedicated client app
