---
id: SKL-0352
name: User Preferences & Settings
category: skills
tags: [settings, preferences, theme, language, notifications, persistence, sync, user-config]
capabilities: [preference-management, theme-switching, settings-persistence, preference-sync]
useWhen:
  - building a settings page for user preferences
  - implementing theme or language switching
  - persisting user preferences across sessions
  - syncing settings between devices
  - designing notification preference controls
estimatedTokens: 600
relatedFragments: [SKL-0060, SKL-0314, PAT-0170, SKL-0116]
dependencies: []
synonyms: ["how to build a settings page", "save user preferences", "theme switcher implementation", "sync settings across devices", "notification preferences UI", "persist user choices"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "app-polish"
---

# User Preferences & Settings

Settings let users make your app theirs. The best settings pages are organized by category, apply changes immediately, and persist across sessions and devices.

## Common Preference Categories

| Category | Settings | Storage |
|----------|----------|---------|
| **Appearance** | Theme (light/dark/system), font size, density | Local + server |
| **Language** | UI language, date/number format, timezone | Server |
| **Notifications** | Email, push, in-app; per-event toggles | Server |
| **Privacy** | Analytics opt-out, data export, account deletion | Server |
| **Accessibility** | Reduced motion, high contrast, screen reader hints | Local + server |
| **Workspace** | Default view, sidebar collapsed, sort order | Local |

## Preference Storage Strategy

```jsx
// Layer 1: Immediate local state (instant UI updates)
const [theme, setTheme] = useState(() => {
  return localStorage.getItem('theme') || 'system';
});

// Layer 2: localStorage (persists across sessions)
useEffect(() => {
  localStorage.setItem('theme', theme);
  applyTheme(theme);
}, [theme]);

// Layer 3: Server sync (persists across devices)
useEffect(() => {
  const timer = setTimeout(() => {
    api.updatePreferences({ theme });
  }, 1000); // Debounce server writes
  return () => clearTimeout(timer);
}, [theme]);
```

Three-layer persistence:
1. **React state** for instant UI response
2. **localStorage** for cross-session persistence
3. **Server API** for cross-device sync (debounced)

## Theme Switching

```jsx
function applyTheme(preference) {
  const isDark = preference === 'dark' ||
    (preference === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  document.documentElement.classList.toggle('dark', isDark);
  document.querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', isDark ? '#1a1a2e' : '#ffffff');
}
```

- Always offer three options: Light, Dark, System
- "System" should be the default; it respects the user's OS preference
- Listen for OS theme changes with `matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ...)`

## Settings UI Pattern

```jsx
function SettingsSection({ title, children }) {
  return (
    <fieldset className="border-b pb-6 mb-6">
      <legend className="text-lg font-semibold mb-4">{title}</legend>
      <div className="space-y-4">{children}</div>
    </fieldset>
  );
}

function ToggleSetting({ label, description, value, onChange }) {
  const id = useId();
  return (
    <div className="flex items-center justify-between">
      <div>
        <label htmlFor={id} className="font-medium">{label}</label>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <input id={id} type="checkbox" role="switch" checked={value} onChange={e => onChange(e.target.checked)} />
    </div>
  );
}
```

Settings page principles:
- Group related settings under clear headings
- Apply changes immediately (no "Save" button needed for toggles)
- Show a description under each setting to explain what it does
- Use `fieldset` and `legend` for semantic grouping

## Notification Preferences

```jsx
const notificationCategories = [
  { key: 'marketing', label: 'Product updates & tips', channels: ['email'] },
  { key: 'activity',  label: 'Comments and mentions',  channels: ['email', 'push', 'in-app'] },
  { key: 'security',  label: 'Login alerts',            channels: ['email', 'push'], required: true },
];
```

- Security notifications should always be on (mark as required, disable toggle)
- Let users control channels (email, push, in-app) per category
- Provide a "Mute all" option for temporary silence

## Key Takeaways

- Use three-layer persistence: state, localStorage, and server sync
- Apply preference changes instantly; debounce server writes
- Always default theme to "System" to respect OS preferences
- Group settings by category with clear headings and descriptions
- Never let users disable security-critical notifications
