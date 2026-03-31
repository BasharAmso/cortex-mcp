---
id: SKL-0350
name: Keyboard Shortcuts
category: skills
tags: [keyboard, shortcuts, hotkeys, accessibility, keybinding, power-user, help-overlay, focus-management]
capabilities: [shortcut-registration, help-overlay, conflict-detection, keyboard-navigation]
useWhen:
  - adding keyboard shortcuts to a web application
  - building a shortcuts help overlay or cheat sheet
  - avoiding conflicts with browser and OS shortcuts
  - making power-user workflows keyboard-driven
  - improving accessibility through keyboard navigation
estimatedTokens: 650
relatedFragments: [SKL-0356, SKL-0326, SKL-0005]
dependencies: []
synonyms: ["how to add keyboard shortcuts", "hotkey system for web app", "keyboard shortcut overlay", "which keys should I use for shortcuts", "avoid browser shortcut conflicts", "keyboard-first design"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: "cortex"
pillar: "app-polish"
---

# Keyboard Shortcuts

Keyboard shortcuts transform casual users into power users. A well-designed shortcut system is discoverable, consistent, and never conflicts with browser or OS defaults.

## Safe Key Combinations

| Modifier | Safe With | Avoid |
|----------|-----------|-------|
| None | `/` (search), `?` (help), `j/k` (navigate), `Esc` (close) | Single letters when inputs exist |
| `Ctrl/Cmd` | `Ctrl+K` (command palette), `Ctrl+/` (help) | `Ctrl+C/V/X/Z/S/W/T/N` (browser owns these) |
| `Ctrl+Shift` | Most combinations | `Ctrl+Shift+I/J` (DevTools) |
| `Alt` | Not recommended on Windows (triggers menu bar) | Most combos on Windows |

Gmail-style single-key shortcuts (`j`, `k`, `e`, `#`) work well but must be disabled when any input, textarea, or contenteditable element is focused.

## Basic Shortcut Hook

```jsx
function useKeyboardShortcut(key, modifier, callback) {
  useEffect(() => {
    function handleKeyDown(e) {
      // Skip if user is typing in an input
      const tag = e.target.tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag) || e.target.isContentEditable) return;

      const modMatch = modifier === 'meta'
        ? (e.metaKey || e.ctrlKey)
        : modifier ? e[`${modifier}Key`] : !e.metaKey && !e.ctrlKey && !e.altKey;

      if (modMatch && e.key.toLowerCase() === key.toLowerCase()) {
        e.preventDefault();
        callback();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [key, modifier, callback]);
}

// Usage
useKeyboardShortcut('k', 'meta', () => openCommandPalette());
useKeyboardShortcut('/', null, () => focusSearchBar());
```

## Shortcut Registry Pattern

Centralize shortcuts to detect conflicts and generate help docs:

```jsx
const shortcuts = [
  { key: '/', mod: null,   action: 'focusSearch',      label: 'Focus search bar',    scope: 'global' },
  { key: '?', mod: null,   action: 'showHelp',         label: 'Show keyboard help',  scope: 'global' },
  { key: 'k', mod: 'meta', action: 'openCommandPalette', label: 'Command palette',   scope: 'global' },
  { key: 'j', mod: null,   action: 'nextItem',         label: 'Next item',           scope: 'list' },
  { key: 'k', mod: null,   action: 'prevItem',         label: 'Previous item',       scope: 'list' },
  { key: 'e', mod: null,   action: 'edit',             label: 'Edit selected',       scope: 'list' },
  { key: 'Backspace', mod: null, action: 'delete',     label: 'Delete selected',     scope: 'list' },
];
```

## Help Overlay

Show all shortcuts when the user presses `?`:

```jsx
function ShortcutHelpOverlay({ shortcuts, onClose }) {
  return (
    <div role="dialog" aria-label="Keyboard shortcuts" className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Keyboard Shortcuts</h2>
        {Object.entries(groupBy(shortcuts, 'scope')).map(([scope, items]) => (
          <div key={scope} className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 uppercase mb-2">{scope}</h3>
            {items.map(s => (
              <div key={s.action} className="flex justify-between py-1">
                <span>{s.label}</span>
                <kbd className="px-2 py-0.5 bg-gray-100 rounded text-sm font-mono">
                  {s.mod ? `${s.mod}+${s.key}` : s.key}
                </kbd>
              </div>
            ))}
          </div>
        ))}
        <p className="text-sm text-gray-400 mt-4">Press <kbd>Esc</kbd> to close</p>
      </div>
    </div>
  );
}
```

## Discoverability Tips

- Show shortcut hints next to menu items and tooltips (e.g., "Search `/`")
- Include a "Keyboard Shortcuts" link in the help menu or footer
- Use `?` as the universal "show shortcuts" key
- On first use, show a subtle one-time tooltip: "Pro tip: Press ? for shortcuts"

## Key Takeaways

- Never override browser-owned shortcuts (Ctrl+C/V/X/Z/S/W/T)
- Disable single-key shortcuts when any text input is focused
- Centralize shortcuts in a registry for conflict detection and help generation
- Make shortcuts discoverable through tooltips, menu hints, and a `?` overlay
- Scope shortcuts to contexts (global, list view, editor) to avoid conflicts
