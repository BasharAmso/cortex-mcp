---
id: EX-0003
name: React Component Example
category: examples
tags: [react, component, props, state, hooks, typescript, frontend]
capabilities: [react-component-creation, state-management, effect-handling]
useWhen:
  - creating a new React component with TypeScript
  - understanding React hooks patterns (useState, useEffect)
  - building a reusable UI component with props
estimatedTokens: 550
relatedFragments: [EX-0004, PAT-0006]
dependencies: []
---

# React Component Example

A typed React component with props, state, and effects.

```tsx
import { useState, useEffect } from "react";

interface UserCardProps {
  userId: string;
  onSelect?: (userId: string) => void;
}

export function UserCard({ userId, onSelect }: UserCardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchUser() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/users/${userId}`);
        if (!res.ok) throw new Error("Failed to load user");
        const data = await res.json();
        if (!cancelled) setUser(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchUser();
    return () => { cancelled = true; };
  }, [userId]);

  if (loading) return <div role="status">Loading...</div>;
  if (error) return <div role="alert">{error}</div>;
  if (!user) return null;

  return (
    <button
      onClick={() => onSelect?.(userId)}
      className="user-card"
      aria-label={`Select ${user.name}`}
    >
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </button>
  );
}
```

## Key Points

- **TypeScript props interface** documents the component's API
- **Cleanup function** in useEffect prevents state updates on unmounted components
- **Three states handled:** loading, error, and success
- **Accessible:** uses semantic HTML, role attributes, and aria-label
- **Optional callback** with `onSelect?.()` safe invocation
