---
id: SKL-0356
name: Command Palette
category: skills
tags: [command-palette, spotlight, search, fuzzy-matching, keyboard, cmdk, power-user, actions]
capabilities: [command-palette-design, fuzzy-search, action-dispatch, keyboard-navigation]
useWhen:
  - adding a spotlight/command palette to a web application
  - implementing fuzzy search across app actions and pages
  - building a keyboard-first navigation system
  - creating a unified search + action interface
  - improving power-user productivity with quick commands
estimatedTokens: 650
relatedFragments: [SKL-0350, SKL-0346, SKL-0005, PAT-0167]
dependencies: []
synonyms: ["how to build a command palette", "spotlight search for web app", "Cmd+K menu implementation", "fuzzy search actions", "keyboard launcher in app", "cmdk component"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: "cortex"
pillar: "app-polish"
---

# Command Palette

A command palette lets users search and execute any action from a single keyboard shortcut. It combines navigation, search, and actions into one interface. Every productivity app (VS Code, Figma, Notion, Linear) has one because it dramatically reduces time-to-action.

## Core Architecture

```
User types → Fuzzy match against registry → Show ranked results → Execute on select
```

The command registry is the backbone. Every navigable page, every action, and every searchable entity registers itself:

```jsx
const commands = [
  // Navigation
  { id: 'nav-dashboard', type: 'page', label: 'Dashboard', icon: '📊', action: () => navigate('/dashboard'), keywords: ['home', 'overview'] },
  { id: 'nav-settings', type: 'page', label: 'Settings', icon: '⚙', action: () => navigate('/settings'), keywords: ['preferences', 'config'] },

  // Actions
  { id: 'action-new-project', type: 'action', label: 'Create new project', icon: '+', action: () => openNewProjectModal(), keywords: ['add'] },
  { id: 'action-invite', type: 'action', label: 'Invite team member', icon: '👤', action: () => openInviteModal(), keywords: ['add user'] },

  // Quick toggles
  { id: 'toggle-theme', type: 'action', label: 'Toggle dark mode', icon: '🌓', action: () => toggleTheme(), keywords: ['light', 'dark'] },
];
```

## Fuzzy Matching

Simple fuzzy match that handles typos and partial input:

```jsx
function fuzzyMatch(query, text) {
  const lower = text.toLowerCase();
  const q = query.toLowerCase();
  let qi = 0;

  for (let i = 0; i < lower.length && qi < q.length; i++) {
    if (lower[i] === q[qi]) qi++;
  }
  return qi === q.length;
}

function searchCommands(query, commands) {
  if (!query) return commands.slice(0, 8); // Show recent/popular when empty

  return commands
    .filter(cmd => fuzzyMatch(query, cmd.label) || cmd.keywords?.some(k => fuzzyMatch(query, k)))
    .sort((a, b) => {
      // Prioritize label starts-with over fuzzy
      const aStarts = a.label.toLowerCase().startsWith(query.toLowerCase());
      const bStarts = b.label.toLowerCase().startsWith(query.toLowerCase());
      return bStarts - aStarts;
    })
    .slice(0, 10);
}
```

## Command Palette Component

```jsx
function CommandPalette({ commands, isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const results = searchCommands(query, commands);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex(i => Math.min(i + 1, results.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex(i => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && results[selectedIndex]) {
      results[selectedIndex].action();
      onClose();
    }
    if (e.key === 'Escape') onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-[20vh]" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden" onClick={e => e.stopPropagation()} role="combobox" aria-expanded="true">
        <input
          autoFocus
          value={query}
          onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
          onKeyDown={handleKeyDown}
          placeholder="Type a command or search..."
          className="w-full px-4 py-3 text-lg border-b outline-none"
          aria-activedescendant={results[selectedIndex]?.id}
        />
        <ul className="max-h-72 overflow-y-auto" role="listbox">
          {results.map((cmd, i) => (
            <li
              key={cmd.id}
              id={cmd.id}
              role="option"
              aria-selected={i === selectedIndex}
              className={`px-4 py-2.5 flex items-center gap-3 cursor-pointer ${i === selectedIndex ? 'bg-blue-50 text-blue-900' : ''}`}
              onClick={() => { cmd.action(); onClose(); }}
              onMouseEnter={() => setSelectedIndex(i)}
            >
              <span className="text-lg w-6 text-center" aria-hidden="true">{cmd.icon}</span>
              <span className="flex-1">{cmd.label}</span>
              <span className="text-xs text-gray-400 uppercase">{cmd.type}</span>
            </li>
          ))}
          {results.length === 0 && <li className="px-4 py-6 text-center text-gray-400">No results found</li>}
        </ul>
      </div>
    </div>
  );
}
```

## Using cmdk Library

For production apps, the `cmdk` library (by Pacocoursey) handles accessibility, keyboard navigation, and animations:

```jsx
import { Command } from 'cmdk';

<Command.Dialog open={open} onOpenChange={setOpen}>
  <Command.Input placeholder="Type a command..." />
  <Command.List>
    <Command.Empty>No results.</Command.Empty>
    <Command.Group heading="Navigation">
      <Command.Item onSelect={() => navigate('/dashboard')}>Dashboard</Command.Item>
      <Command.Item onSelect={() => navigate('/settings')}>Settings</Command.Item>
    </Command.Group>
    <Command.Group heading="Actions">
      <Command.Item onSelect={() => createProject()}>New Project</Command.Item>
    </Command.Group>
  </Command.List>
</Command.Dialog>
```

## Design Patterns

- Position the palette at ~20% from the top of the viewport (not centered)
- Show 6-10 results maximum; more causes decision paralysis
- Group results by type (Pages, Actions, Recent) when query is empty
- Show keyboard hints (arrow keys, Enter, Esc) at the bottom
- Open with `Cmd+K` / `Ctrl+K`; this is the universal standard

## Key Takeaways

- Register every page and action in a central command registry
- Use fuzzy matching that checks both labels and keyword aliases
- Prioritize starts-with matches over fuzzy matches in ranking
- Use `cmdk` library for production; build custom only if you need deep control
- Show recent or popular commands when the input is empty for zero-query value
