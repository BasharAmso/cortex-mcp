---
id: PAT-0180
name: Undo/Redo Pattern
category: patterns
tags: [undo, redo, command-pattern, history-stack, state-management, reversible, debounce]
capabilities: [undo-redo-system, command-history, state-snapshots, action-reversal]
useWhen:
  - implementing undo/redo for user actions
  - building a command history system
  - making destructive actions reversible
  - designing an editor with state history
  - debouncing rapid changes into single undo steps
estimatedTokens: 650
relatedFragments: [SKL-0347, SKL-0355, PAT-0180, SKL-0346]
dependencies: []
synonyms: ["how to implement undo redo", "command pattern for undo", "undo history stack", "reversible user actions", "Ctrl+Z implementation", "undo with debouncing"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: "cortex"
pillar: "app-polish"
---

# Undo/Redo Pattern

Undo makes users brave. When actions are reversible, people experiment more freely and recover from mistakes without anxiety. The Command Pattern is the standard implementation: every action is an object with `execute` and `undo` methods.

## Command Pattern Architecture

```
User Action → Create Command → Execute → Push to History Stack
                                              ↓
Undo (Ctrl+Z) ← Pop from History ← Move to Redo Stack
                                              ↓
Redo (Ctrl+Shift+Z) → Pop from Redo Stack → Execute → Push to History
```

## Implementation

```jsx
function useUndoRedo(initialState) {
  const [state, setState] = useState(initialState);
  const historyRef = useRef([initialState]);
  const indexRef = useRef(0);

  const pushState = useCallback((newState) => {
    // Discard any redo history after current index
    const history = historyRef.current.slice(0, indexRef.current + 1);
    history.push(newState);

    // Limit history size to prevent memory issues
    if (history.length > 50) history.shift();
    else indexRef.current++;

    historyRef.current = history;
    setState(newState);
  }, []);

  const undo = useCallback(() => {
    if (indexRef.current > 0) {
      indexRef.current--;
      setState(historyRef.current[indexRef.current]);
    }
  }, []);

  const redo = useCallback(() => {
    if (indexRef.current < historyRef.current.length - 1) {
      indexRef.current++;
      setState(historyRef.current[indexRef.current]);
    }
  }, []);

  const canUndo = indexRef.current > 0;
  const canRedo = indexRef.current < historyRef.current.length - 1;

  return { state, pushState, undo, redo, canUndo, canRedo };
}
```

## Command Pattern (For Complex Actions)

When actions affect multiple parts of state, use explicit command objects:

```jsx
const commands = {
  moveItem: (itemId, fromCol, toCol) => ({
    execute: (state) => { /* move item from fromCol to toCol */ },
    undo: (state) => { /* move item from toCol back to fromCol */ },
    description: `Move "${itemId}" from ${fromCol} to ${toCol}`,
  }),

  deleteItem: (itemId, snapshot) => ({
    execute: (state) => { /* remove item */ },
    undo: (state) => { /* restore item from snapshot */ },
    description: `Delete "${itemId}"`,
  }),
};
```

Advantages over snapshot-based undo:
- Uses less memory (stores operations, not full state copies)
- Can describe what changed (useful for history panel)
- Can batch related commands into a single undo step

## Debouncing for Text Input

Typing should not create one undo step per keystroke. Debounce rapid changes:

```jsx
function useDebouncedHistory(value, pushState, delay = 500) {
  const timeoutRef = useRef(null);
  const lastPushedRef = useRef(value);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (value !== lastPushedRef.current) {
        pushState(value);
        lastPushedRef.current = value;
      }
    }, delay);

    return () => clearTimeout(timeoutRef.current);
  }, [value, pushState, delay]);
}
```

Rules for batching:
- Text input: Batch all keystrokes within 500ms into one undo step
- Drag operations: One undo step per drag-and-drop, not per pixel moved
- Bulk operations: "Select all + delete" is one undo step

## Keyboard Shortcut Integration

```jsx
useEffect(() => {
  function handleKeyDown(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
      e.preventDefault();
      if (e.shiftKey) redo();
      else undo();
    }
  }
  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, [undo, redo]);
```

## UI Indicators

- Disable undo/redo buttons when the respective stack is empty
- Show tooltip: "Undo: Move item to Done" (describe the action, not just "Undo")
- Display `Ctrl+Z` / `Ctrl+Shift+Z` hints in tooltips
- Pair with toast undo for server-side destructive actions (delete, archive)

## Scope Rules

| Scope | Undo Covers | Example |
|-------|-------------|---------|
| **Local** | Single component state | Text editor undo |
| **Page** | All changes on current page | Kanban board moves |
| **Session** | All changes since session start | Design tool history |
| **Server** | Soft-delete with undo window | Gmail "Undo Send" |

## Key Takeaways

- Use snapshot-based history for simple state; command pattern for complex multi-part state
- Debounce text input to create one undo step per pause, not per keystroke
- Cap history at 50 entries to prevent memory growth
- New actions after an undo discard the redo stack
- Always pair Ctrl+Z/Ctrl+Shift+Z shortcuts with visible undo/redo buttons
