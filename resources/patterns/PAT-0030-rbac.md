---
id: PAT-0030
name: Role-Based Access Control
category: patterns
tags: [rbac, authorization, permissions, roles, middleware, access-control, security]
capabilities: [role-modeling, permission-design, auth-middleware, ui-conditional-rendering, admin-impersonation]
useWhen:
  - adding user roles like admin, editor, and viewer to an app
  - building authorization middleware for API routes
  - showing or hiding UI elements based on user permissions
  - implementing admin impersonation for support debugging
estimatedTokens: 650
relatedFragments: [PAT-0003, PAT-0029, PAT-0031, SKL-0004, SKL-0034]
dependencies: []
synonyms: ["how to make some users admin and others regular", "how do I restrict pages to certain users", "how to check if user has permission", "add roles and permissions to my app", "how to let admins log in as another user"]
lastUpdated: "2026-03-29"
difficulty: intermediate
---

# Role-Based Access Control

How to model roles and permissions and enforce them across your stack.

## Role/Permission Data Model

```
roles:         { id, name, description }
permissions:   { id, name, resource, action }  // e.g. "posts:write", "users:delete"
role_permissions: { role_id, permission_id }    // many-to-many
user_roles:    { user_id, role_id }             // many-to-many
```

**Design rules:**
- Check **permissions**, not roles. `user.can("posts:write")` not `user.role === "admin"`.
- Roles are just bundles of permissions. This lets you add roles without changing code.
- Use `resource:action` naming: `posts:read`, `posts:write`, `users:delete`, `billing:manage`.

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
    const user = req.user; // set by auth middleware
    if (!user) return res.status(401).json({ error: "Not authenticated" });

    if (!user.permissions.includes(permission)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }
    next();
  };
}

// Usage
app.delete("/api/posts/:id", requirePermission("posts:delete"), deletePost);
app.get("/api/users", requirePermission("users:read"), listUsers);
```

## UI Conditional Rendering

```tsx
// Permission-based component
function Can({ permission, children, fallback = null }) {
  const { user } = useAuth();
  return user.permissions.includes(permission) ? children : fallback;
}

// Usage
<Can permission="posts:write">
  <button>Edit Post</button>
</Can>

<Can permission="billing:manage" fallback={<UpgradeBanner />}>
  <BillingDashboard />
</Can>
```

**Critical rule:** UI hiding is cosmetic, not security. Always enforce permissions on the server. A hidden button is one DevTools session away from being clicked.

## Admin Impersonation

Allow admins to view the app as another user for debugging.

```
1. Admin clicks "Impersonate" on user profile
2. Server creates impersonation session:
   { real_user_id: admin.id, impersonated_user_id: target.id, started_at }
3. API resolves requests as impersonated user
4. All write actions are logged with both real and impersonated user IDs
5. UI shows clear "You are impersonating [User]" banner with "Stop" button
6. Restrict: cannot impersonate other admins, time limit (1 hour)
```

## Security Checklist

- [ ] Enforce permissions server-side on every endpoint (never trust the client)
- [ ] Check permissions, not role names, in authorization logic
- [ ] Return 403 (not 404) for unauthorized access to existing resources
- [ ] Log all permission checks that fail (detect probing)
- [ ] Prevent privilege escalation (users cannot assign roles higher than their own)
- [ ] Audit impersonation sessions with full logging

## Common Mistakes

- Hardcoding role names in application logic (`if role === "admin"`)
- Only checking permissions on the frontend
- Returning 404 instead of 403, leaking resource existence
- Allowing users to modify their own role assignments
- Not logging failed authorization attempts
