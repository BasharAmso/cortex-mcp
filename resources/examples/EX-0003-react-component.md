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
synonyms: ["how to make a react component", "react component with typescript example", "how to use useState and useEffect", "how to build a reusable component in react", "react hooks example"]
sourceUrl: "https://github.com/alan2207/bulletproof-react"
lastUpdated: "2026-03-30"
difficulty: beginner
owner: builder
---

# React Component Example

A feature-scoped React component following bulletproof-react architecture: typed props, data fetching with error/loading states, and clean layer separation.

```tsx
// features/users/components/user-card.tsx
// Bulletproof-react pattern: components live inside feature folders
import { useState, useEffect } from "react";

// Props interface documents the component's public API
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
        // API calls go through a centralized api layer
        const res = await fetch(`/api/users/${userId}`);
        if (!res.ok) throw new Error("Failed to load user");
        const data = await res.json();
        if (!cancelled) setUser(data);
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : "Unknown error");
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

- **Feature-based structure** (bulletproof-react): components, hooks, and API functions live under `features/<name>/`
- **Cleanup function** in useEffect prevents state updates on unmounted components
- **Three states handled:** loading, error, and success (never leave error states unhandled)
- **Accessible:** uses semantic HTML, `role` attributes, and `aria-label`
- **Optional callback** with `onSelect?.()` safe invocation
- **Typed props interface** serves as self-documenting component API
