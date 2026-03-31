---
id: PAT-0145
name: Learning Content Versioning
category: patterns
tags: [versioning, content-management, course-updates, migration, backwards-compatibility, publishing]
capabilities: [content-versioning, non-disruptive-updates, version-migration, draft-publish-workflow]
useWhen:
  - updating course content without disrupting currently enrolled students
  - managing draft and published versions of learning materials
  - migrating students between content versions
  - maintaining a history of course changes for auditing
  - supporting multiple concurrent versions of a course
estimatedTokens: 650
relatedFragments: [SKL-0274, SKL-0276, PAT-0143]
dependencies: []
synonyms: ["how to version course content", "update courses without breaking enrollment", "content publishing workflow", "manage course drafts and live versions", "migrate students to new course version", "course content change management"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/overhangio/tutor"
difficulty: intermediate
owner: "cortex"
pillar: "education"
---

# Pattern: Learning Content Versioning

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0145 |
| **Name** | Learning Content Versioning |
| **Category** | Patterns |
| **Complexity** | Intermediate |

## Core Concepts

Course content changes constantly -- fixing typos, improving explanations, adding new material, restructuring sections. The challenge is making these changes without disrupting students mid-course. A student halfway through a module should not suddenly find their progress invalidated or content rearranged beneath them.

### Version Model

Each course has a version number and a lifecycle state:

```
course_versions: course_id, version (semver), status (draft | published | archived),
                 published_at, created_by, changelog
```

Content edits happen on a draft version. When ready, the draft is published as the new active version. The previous version moves to an archived state but remains accessible to students enrolled under it.

### Draft-Publish Workflow

Instructors always edit a draft copy, never the live version directly. The workflow:

1. **Create draft**: clone the current published version into a new draft
2. **Edit**: modify content, add/remove blocks, restructure sections
3. **Preview**: instructor reviews the draft as a student would see it
4. **Publish**: draft becomes the new published version
5. **Archive**: previous published version moves to archived

This mirrors how CMS platforms (WordPress, Contentful) handle content, and for good reason -- it prevents half-finished edits from reaching students.

### Enrollment Pinning

When a student enrolls, pin their enrollment to a specific course version:

```
enrollments: student_id, course_id, version_pinned, enrolled_at, status
```

This ensures the student sees a consistent course throughout their learning journey. They will not be affected by content changes published after their enrollment. The trade-off is that they may miss improvements, so offer an opt-in migration path.

### Version Migration

When a new version is published, give enrolled students a choice:

- **Stay on current version**: finish the course as originally enrolled (default)
- **Migrate to new version**: adopt the updated content

For migration, map progress from the old version to the new one. If the same block exists in both versions (matched by stable block ID, not position), carry over completion status. For new blocks, mark them as not started. For removed blocks, preserve the completion record but exclude from the new version's progress calculation.

### Stable Content IDs

Assign every content block a stable UUID at creation time. When a block is edited, keep the same ID. When a block is moved to a different position, keep the same ID. Only assign a new ID when creating a genuinely new block. Stable IDs are the foundation of version migration -- without them, you cannot map progress between versions.

### Change Classification

Classify changes to determine migration impact:

| Change Type | Migration Impact | Example |
|-------------|-----------------|---------|
| **Cosmetic** | None -- safe to push to all | Typo fix, image swap |
| **Additive** | Low -- new content is unstarted | New lesson added |
| **Structural** | Medium -- recompute progress | Sections reordered |
| **Breaking** | High -- manual migration needed | Lessons removed or split |

For cosmetic changes, consider a "hotfix" model that updates content in-place across all versions without requiring a new version number. Reserve versioning for additive, structural, and breaking changes.

### Audit Trail

Log every version transition with: who published, when, what changed (changelog), and how many students were affected. This supports compliance requirements for professional and accredited education programs.

## Key Takeaways

- Never edit live content directly -- use a draft-publish workflow to protect enrolled students
- Pin enrollments to a specific content version and offer opt-in migration to newer versions
- Use stable UUIDs on content blocks so progress can be mapped across versions
- Classify changes (cosmetic, additive, structural, breaking) to determine migration strategy
- Allow cosmetic hotfixes without full versioning to keep typo corrections fast
