---
id: SKL-0354
name: Changelog & What's New
category: skills
tags: [changelog, release-notes, whats-new, version, announcement, feature-highlight, update-log]
capabilities: [changelog-design, in-app-announcements, version-tracking, feature-highlighting]
useWhen:
  - building a changelog or release notes page
  - designing in-app "What's New" announcements
  - communicating new features to users after updates
  - tracking and displaying version history
  - highlighting important changes without disrupting workflow
estimatedTokens: 600
relatedFragments: [SKL-0347, SKL-0116, PAT-0183, SKL-0019]
dependencies: []
synonyms: ["how to show release notes", "in-app changelog", "what's new feature announcement", "version history page", "notify users about new features", "changelog best practices"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "app-polish"
---

# Changelog & What's New

A good changelog builds trust and reduces support requests. It tells users what changed, why it matters to them, and what to do about it. The best changelogs are user-facing narratives, not developer commit logs.

## Changelog Entry Format

```markdown
## v2.4.0 — March 2026

### New
- **Board view for projects** — Drag tasks between columns to update status. Works on mobile too.
- **Export to PDF** — Download any report as a formatted PDF from the share menu.

### Improved
- Search now returns results as you type (no more hitting Enter)
- Dashboard loads 40% faster on slow connections

### Fixed
- File uploads no longer fail silently when over 10MB
- Calendar events now show in the correct timezone
```

Writing rules:
- Lead with what the user can now **do**, not what you **changed**
- Group by New / Improved / Fixed (not "Added / Changed / Deprecated")
- One sentence per item; bold the feature name
- Skip internal refactors and dependency bumps unless they affect performance

## In-App "What's New" Modal

```jsx
function WhatsNewModal({ version, features, onDismiss }) {
  return (
    <div role="dialog" aria-label="What's new" className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
          New in {version}
        </span>
        <h2 className="text-xl font-semibold mt-3 mb-4">What's New</h2>
        <ul className="space-y-3">
          {features.map(f => (
            <li key={f.title} className="flex gap-3">
              <span className="text-2xl">{f.icon}</span>
              <div>
                <p className="font-medium">{f.title}</p>
                <p className="text-sm text-gray-600">{f.description}</p>
              </div>
            </li>
          ))}
        </ul>
        <button onClick={onDismiss} className="mt-6 w-full btn-primary">Got it</button>
      </div>
    </div>
  );
}
```

## When to Show What's New

| Trigger | Format | Frequency |
|---------|--------|-----------|
| Major feature launch | Modal with screenshots | Once per version |
| Minor improvements | Subtle badge on menu item | Until clicked |
| Bug fixes | Changelog page only | Never interrupt |
| Breaking changes | Banner + migration guide | Until acknowledged |

Rules:
- Only show the modal for features users will actually notice
- Track `lastSeenVersion` in user preferences to avoid repeat prompts
- Never show "What's New" to brand-new users who haven't used the old version

## Changelog Page Design

```jsx
function ChangelogPage({ releases }) {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Changelog</h1>
      {releases.map(release => (
        <article key={release.version} className="mb-10 relative pl-6 border-l-2 border-gray-200">
          <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500" />
          <div className="flex items-baseline gap-3 mb-3">
            <h2 className="text-lg font-semibold">{release.version}</h2>
            <time className="text-sm text-gray-500">{release.date}</time>
          </div>
          <div className="prose prose-sm" dangerouslySetInnerHTML={{ __html: release.html }} />
        </article>
      ))}
    </div>
  );
}
```

## Notification Badge for Updates

```jsx
function ChangelogBadge({ currentVersion, lastSeenVersion }) {
  const hasNew = currentVersion !== lastSeenVersion;
  return (
    <a href="/changelog" className="relative">
      Changelog
      {hasNew && (
        <span className="absolute -top-1 -right-2 w-2 h-2 bg-blue-500 rounded-full" aria-label="New updates available" />
      )}
    </a>
  );
}
```

## Key Takeaways

- Write changelog entries for users, not developers; focus on what they can do now
- Use a "What's New" modal only for significant features, not every release
- Track `lastSeenVersion` to prevent showing old announcements
- Display changelogs in a timeline layout with clear version numbers and dates
- Never interrupt brand-new users with "What's New"; they haven't experienced "What Was"
