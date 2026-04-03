---
id: SKL-0345
name: Error Page Design
category: skills
tags: [error-page, "404", "500", offline, error-handling, ux, friendly-errors, recovery]
capabilities: [error-page-design, error-messaging, recovery-actions, offline-handling]
useWhen:
  - designing custom 404, 500, or offline pages
  - writing user-friendly error messages
  - adding recovery actions to error states
  - handling network failures gracefully
  - building error boundaries in React or similar frameworks
estimatedTokens: 650
relatedFragments: [PAT-0001, PAT-0051, SKL-0075, SKL-0116]
dependencies: []
synonyms: ["how to design a 404 page", "friendly error messages", "what to show when something breaks", "custom error page", "offline page design", "error page best practices"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "app-polish"
---

# Error Page Design

Error pages are an opportunity, not an embarrassment. A well-designed error page keeps users oriented, explains what happened in plain language, and offers a clear path forward.

## Error Page Types

| Error | Cause | Tone | Primary Action |
|-------|-------|------|----------------|
| **404** | Broken link, typo, deleted content | Helpful | Search bar or link to home |
| **500** | Server crash | Apologetic | Retry button + status page link |
| **403** | No permission | Clear | Login link or request access |
| **Offline** | No network | Calm | Cached content or retry |
| **Timeout** | Slow server | Patient | Auto-retry with manual fallback |
| **Rate Limited** | Too many requests | Informative | Wait time + retry |

## Anatomy of a Good Error Page

```html
<main class="error-page" role="main">
  <div class="error-content">
    <h1>Page not found</h1>
    <p>The page you're looking for doesn't exist or has been moved.</p>
    <div class="error-actions">
      <a href="/" class="btn-primary">Go to homepage</a>
      <form action="/search" class="error-search">
        <label for="search" class="sr-only">Search</label>
        <input id="search" type="search" placeholder="Search for what you need" />
        <button type="submit">Search</button>
      </form>
    </div>
  </div>
</main>
```

Every error page needs:
1. **Clear heading** that says what happened (not HTTP codes)
2. **One sentence** explaining why in plain language
3. **Primary action** to recover (not just "go back")
4. **Secondary option** (search, support link, or related content)

## Error Message Writing Rules

| Do | Don't |
|----|-------|
| "We couldn't save your changes" | "Error 500: Internal Server Error" |
| "Check your connection and try again" | "Network request failed" |
| "This page doesn't exist" | "404 Not Found" |
| "You don't have access to this page" | "403 Forbidden" |
| "We're fixing this now" | "Something went wrong" |

## Inline Error States (Not Full Pages)

For component-level failures, use inline error messages with retry:

```jsx
function DataSection({ error, retry }) {
  if (error) {
    return (
      <div role="alert" className="p-4 border border-red-200 rounded-lg bg-red-50">
        <p className="text-red-800 font-medium">Couldn't load this section</p>
        <p className="text-red-600 text-sm mt-1">This is usually temporary.</p>
        <button onClick={retry} className="mt-2 text-sm text-red-700 underline">
          Try again
        </button>
      </div>
    );
  }
  // ... normal content
}
```

## Offline Handling

```jsx
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);
  return isOnline;
}
```

When offline:
- Show a subtle banner, not a full-page takeover
- Allow browsing cached/local content
- Queue actions for when connectivity returns
- Auto-dismiss the banner when back online

## Key Takeaways

- Never show raw HTTP status codes to users; translate them to plain language
- Every error page must have at least one recovery action
- Use inline errors for component failures, full pages only for route-level errors
- Offline states should degrade gracefully, not block the entire app
- Test error pages deliberately; they are high-trust moments with users
