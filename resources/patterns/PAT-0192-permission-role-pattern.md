---
id: PAT-0192
name: Permission & Role Pattern
category: patterns
tags: [rbac, permissions, roles, access-control, team-hierarchy, sharing, inheritance, authorization]
capabilities: [role-based-access, permission-inheritance, sharing-levels, team-hierarchy]
useWhen:
  - implementing role-based access control for a collaboration tool
  - designing permission inheritance across team and resource hierarchies
  - adding sharing with configurable access levels
  - building admin panels with user and group management
  - handling cross-team resource visibility
estimatedTokens: 650
relatedFragments: [SKL-0374, SKL-0378, PAT-0003]
dependencies: []
synonyms: ["how to implement RBAC", "how to design permissions for a team app", "how to add role-based access control", "how to handle sharing permissions", "how to build a permission system with inheritance", "how to manage team roles and access levels"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/outline/outline"
difficulty: intermediate
owner: "cortex"
pillar: "collaboration"
---

# Permission & Role Pattern

Role-based access control with inheritance for team collaboration tools.

## Role Hierarchy

Define roles at multiple levels with clear precedence:

```
System Admin > Workspace Owner > Team Admin > Member > Viewer > Guest
```

| Role | Capabilities |
|------|-------------|
| **Admin** | All operations, user management, billing |
| **Owner** | Create/delete collections, manage team members |
| **Editor** | Create/edit documents, comment, share |
| **Viewer** | Read documents, add comments |
| **Guest** | Access only explicitly shared items |

## Permission Resolution

Outline resolves permissions through inheritance with override capability:

```
1. Check document-level permission (explicit override)
2. If none, check collection-level permission
3. If none, check team membership role
4. If none, deny access
```

This cascading model reduces admin overhead. Most users get access through their team role. Exceptions are handled with document-level overrides for sensitive content.

## Permission Storage

Store permissions as a matrix of (subject, resource, action) tuples:

```sql
CREATE TABLE permissions (
  subject_type  ENUM('user', 'group', 'team'),
  subject_id    UUID,
  resource_type ENUM('workspace', 'collection', 'document'),
  resource_id   UUID,
  action        ENUM('read', 'write', 'admin', 'share'),
  granted_by    UUID,
  expires_at    TIMESTAMP NULL
);
```

Index on `(resource_type, resource_id)` for "who can access this?" queries and `(subject_type, subject_id)` for "what can this user access?" queries.

## Sharing Model

Public sharing creates time-limited, optionally password-protected links:

| Share Type | Scope | Controls |
|------------|-------|----------|
| **Internal share** | Named user or group | Read/write/admin |
| **Link share** | Anyone with URL | Read-only, password, expiry |
| **Embedded** | Iframe or API | Read-only, domain-restricted |

## Group-Based Assignment

Assign permissions to groups rather than individuals whenever possible. When a team member joins or leaves, update group membership once instead of modifying every resource. Outline uses collections as implicit groups: adding someone to a collection grants access to all documents within it.

## Audit Trail

Log every permission change: who granted/revoked what, to whom, when. This is critical for compliance and debugging access issues. Store audit entries immutably with the permission change details, actor, and timestamp.

## Key Takeaways

- Inherit permissions from parent resources (workspace > collection > document) to minimize explicit grants
- Store permissions as (subject, resource, action) tuples with bidirectional indexes
- Use group-based assignment over individual grants for maintainability
- Support document-level overrides for sensitive content that breaks the inheritance chain
- Log every permission change immutably for compliance and debugging
