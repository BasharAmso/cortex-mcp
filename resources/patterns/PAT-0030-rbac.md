---
id: PAT-0030
name: Role-Based Access Control
category: patterns
tags: [rbac, authorization, permissions, roles, middleware, access-control, security, least-privilege, impersonation]
capabilities: [role-modeling, permission-design, auth-middleware, ui-conditional-rendering, admin-impersonation]
useWhen:
  - adding user roles like admin, editor, and viewer to an app
  - building authorization middleware for API routes
  - showing or hiding UI elements based on user permissions
  - implementing admin impersonation for support debugging
  - designing a permission model that scales with feature growth
estimatedTokens: 700
relatedFragments: [PAT-0003, PAT-0029, PAT-0031, SKL-0015, SKL-0029]
dependencies: []
synonyms: ["how to make some users admin and others regular", "how do I restrict pages to certain users", "how to check if user has permission", "add roles and permissions to my app", "how to let admins log in as another user"]
lastUpdated: "2026-03-29"
difficulty: intermediate
owner: builder
sourceUrl: "https://github.com/OWASP/CheatSheetSeries"
---

# Role-Based Access Control

How to model roles and permissions and enforce them across your stack. OWASP authorization guidance emphasizes checking permissions at every layer, not just the UI.

## Permission Data Model

```
roles:            { id, name, description }
permissions:      { id, name, resource, action }  // "posts:write", "users:delete"
role_permissions: { role_id, permission_id }       // many-to-many
user_roles:       { user_id, role_id }             // many-to-many
```

**Design rules:**
- Check **permissions**, not roles. `user.can("posts:write")` not `user.role === "admin"`.
- Roles are bundles of permissions. Add roles without changing code.
- Use `resource:action` naming: `posts:read`, `posts:write`, `users:delete`.

## Typical Role Hierarchy

| Role | Permissions | Notes |
|------|-------------|-------|
| **Viewer** | `*.read` | Read-only access |
| **Editor** | `*.read`, `posts:write`, `comments:write` | Create and edit content |
| **Admin** | All permissions | Full access |
| **Super Admin** | All + `system:*` | Platform-level operations |

## API Authorization Middleware

```typescript
function requirePermission(permission: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: "Not authenticated" });
    if (!req.user.permissions.includes(permission)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }
    next();
  };
}

app.delete("/api/posts/:id", requirePermission("posts:delete"), deletePost);
```

## UI Conditional Rendering

```tsx
function Can({ permission, children, fallback = null }) {
  const { user } = useAuth();
  return user.permissions.includes(permission) ? children : fallback;
}

<Can permission="posts:write">
  <button>Edit Post</button>
</Can>
```

**Critical rule:** UI hiding is cosmetic, not security. Always enforce permissions on the server.

## Admin Impersonation

1. Admin clicks "Impersonate" on user profile
2. Server creates impersonation session with both real and target user IDs
3. All write actions are logged with both IDs
4. UI shows clear "You are impersonating [User]" banner
5. Time limit (1 hour), cannot impersonate other admins

## Security Checklist

- [ ] Enforce permissions server-side on every endpoint
- [ ] Check permissions, not role names, in authorization logic
- [ ] Return 403 (not 404) for unauthorized access to existing resources
- [ ] Log all failed authorization attempts
- [ ] Prevent privilege escalation (users cannot assign higher roles)
- [ ] Audit impersonation sessions with full logging
