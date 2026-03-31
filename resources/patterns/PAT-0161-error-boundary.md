---
id: PAT-0161
name: Error Boundary Pattern
category: patterns
tags: [error-boundary, react, fallback-ui, error-reporting, resilience, crash-recovery]
capabilities: [error-catching, fallback-rendering, error-reporting, graceful-degradation]
useWhen:
  - preventing a component crash from breaking the entire page
  - implementing fallback UI for runtime errors
  - reporting frontend errors to a monitoring service
  - building resilient React applications
  - recovering from errors without a full page reload
estimatedTokens: 650
relatedFragments: [SKL-0005, SKL-0313, PAT-0160]
dependencies: []
synonyms: ["how to handle React errors gracefully", "how to prevent a crash from breaking the whole page", "how to show a fallback UI on error", "how to catch JavaScript errors in React", "what is an error boundary", "how to report frontend errors"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: "cortex"
pillar: "frontend"
---

# Pattern: Error Boundary

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0161 |
| **Name** | Error Boundary Pattern |
| **Category** | Patterns |
| **Complexity** | Intermediate |

## Core Concepts

Error boundaries are React components that catch JavaScript errors in their child component tree, log them, and display a fallback UI instead of crashing the entire application. Without error boundaries, a single rendering error in one component takes down the whole page.

### Basic Error Boundary

Error boundaries must be class components (React does not have a hook equivalent for `componentDidCatch`):

```typescript
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <DefaultErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

### Using react-error-boundary

The `react-error-boundary` package provides a modern API with reset capabilities:

```typescript
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <h2>Something went wrong</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => reportToSentry(error, info)}
      onReset={() => { /* clear state, refetch data */ }}
    >
      <Dashboard />
    </ErrorBoundary>
  );
}
```

### Placement Strategy

Place error boundaries at multiple levels for granular recovery:

| Level | What It Protects | Fallback UI |
|-------|-----------------|-------------|
| **App root** | Entire application | Full-page error screen with "Reload" button |
| **Route/page** | Individual pages | Page-level error with "Go home" link |
| **Feature section** | Widgets, panels, cards | "This section failed to load" with retry |
| **Individual component** | Single risky component | Inline placeholder or hidden element |

The principle: the error boundary should be as close to the error source as possible. A chart component crashing should not take down the entire dashboard.

### What Error Boundaries Catch (and Do Not Catch)

**Catches:**
- Errors during rendering
- Errors in lifecycle methods
- Errors in constructors of child components

**Does NOT catch:**
- Event handler errors (use try/catch in the handler)
- Async errors (promises, setTimeout)
- Server-side rendering errors
- Errors in the error boundary itself

For async errors, use a pattern like:

```typescript
function useErrorBoundary() {
  const [, setState] = useState();
  return (error: Error) => {
    setState(() => { throw error; }); // triggers nearest error boundary
  };
}
```

### Error Reporting Integration

Connect error boundaries to your monitoring service:

```typescript
function reportToSentry(error: Error, errorInfo: ErrorInfo) {
  Sentry.captureException(error, {
    extra: {
      componentStack: errorInfo.componentStack,
    },
  });
}
```

Include the component stack trace. It shows exactly which component tree path led to the error, making debugging much faster than a bare stack trace.

### Fallback UI Design

Good fallback UI should:

1. **Acknowledge the error** — "Something went wrong" is better than a blank screen.
2. **Offer recovery** — a "Try again" button that calls `resetErrorBoundary`.
3. **Provide an escape** — a "Go back to home" link if retry fails.
4. **Match the app's design** — use the same styling as the rest of the app, not an unstyled error message.
5. **Be accessible** — use `role="alert"` so screen readers announce the error.

### Reset Strategies

After an error, the user needs a way to recover:

- **Retry the operation** — reset the boundary and re-render the failed component.
- **Navigate away** — clear the error state when the route changes.
- **Reset on prop change** — use `resetKeys` to automatically reset when specific props change.

```typescript
<ErrorBoundary
  FallbackComponent={ErrorFallback}
  resetKeys={[userId]} // auto-reset when userId changes
>
  <UserProfile userId={userId} />
</ErrorBoundary>
```

## Anti-Patterns

- Single error boundary at the root only (one error crashes everything)
- Blank screen as fallback (users think the app is broken, not that one component failed)
- Not reporting errors to a monitoring service (errors happen silently)
- Wrapping every single component in a boundary (excessive, adds complexity)
- No retry mechanism (users forced to reload the entire page)

## Key Takeaways

- Place error boundaries at multiple levels: app root, route, feature section
- Use `react-error-boundary` for a modern API with reset and retry capabilities
- Error boundaries only catch render errors; use try/catch for event handlers and async code
- Always report errors to a monitoring service with the component stack trace
- Fallback UI should acknowledge the error, offer retry, and match the app's design
