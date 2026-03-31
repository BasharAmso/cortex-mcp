---
id: PAT-0183
name: Changelog Display Pattern
category: patterns
tags: [changelog, timeline, release-notes, badges, version, read-unread, update-notification]
capabilities: [timeline-layout, version-badges, read-unread-tracking, version-comparison]
useWhen:
  - designing a changelog or release notes page
  - displaying version history in a timeline layout
  - tracking read/unread status for changelog entries
  - categorizing changes with visual badges
  - comparing features between versions
estimatedTokens: 600
relatedFragments: [SKL-0354, SKL-0347, SKL-0116, PAT-0183]
dependencies: []
synonyms: ["changelog page layout", "release notes timeline", "version history display", "how to show what changed", "update log design", "read unread changelog entries"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "app-polish"
---

# Changelog Display Pattern

A changelog display converts raw release notes into a scannable, visually structured page. Users should be able to quickly find what changed, understand whether it affects them, and see the trajectory of the product.

## Timeline Layout

```jsx
function ChangelogTimeline({ releases }) {
  return (
    <div className="max-w-2xl mx-auto">
      {releases.map((release, i) => (
        <article key={release.version} className="relative pl-8 pb-10 border-l-2 border-gray-200 last:border-0">
          {/* Timeline dot */}
          <div className={`absolute -left-2.5 top-0 w-5 h-5 rounded-full border-2 border-white ${
            i === 0 ? 'bg-blue-500' : 'bg-gray-300'
          }`} />

          {/* Version header */}
          <div className="flex items-baseline gap-3 mb-3">
            <h2 className="text-lg font-bold">{release.version}</h2>
            <time className="text-sm text-gray-500">{formatDate(release.date)}</time>
            {release.isNew && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">New</span>}
          </div>

          {/* Categorized changes */}
          {release.sections.map(section => (
            <div key={section.type} className="mb-3">
              <Badge type={section.type} />
              <ul className="mt-1 space-y-1">
                {section.items.map((item, j) => (
                  <li key={j} className="text-gray-700">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </article>
      ))}
    </div>
  );
}
```

## Change Type Badges

```jsx
function Badge({ type }) {
  const styles = {
    new:      'bg-green-100 text-green-800',
    improved: 'bg-blue-100 text-blue-800',
    fixed:    'bg-yellow-100 text-yellow-800',
    removed:  'bg-red-100 text-red-800',
    security: 'bg-purple-100 text-purple-800',
  };

  return (
    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${styles[type]}`}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
}
```

Badge conventions:
- **New** (green): Brand new features
- **Improved** (blue): Enhancements to existing features
- **Fixed** (yellow): Bug fixes
- **Removed** (red): Deprecated or removed features
- **Security** (purple): Security patches

## Read/Unread Tracking

```jsx
function useChangelogReadState() {
  const [lastReadVersion, setLastReadVersion] = useState(
    () => localStorage.getItem('changelog-last-read') || '0.0.0'
  );

  const markAsRead = (version) => {
    setLastReadVersion(version);
    localStorage.setItem('changelog-last-read', version);
  };

  const isUnread = (version) => {
    return compareVersions(version, lastReadVersion) > 0;
  };

  return { lastReadVersion, markAsRead, isUnread };
}

function compareVersions(a, b) {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    if ((pa[i] || 0) > (pb[i] || 0)) return 1;
    if ((pa[i] || 0) < (pb[i] || 0)) return -1;
  }
  return 0;
}
```

- Track the highest version the user has seen
- Show a "New" badge on unread entries in the timeline
- Show a notification dot on the changelog navigation link
- Auto-mark as read when the user visits the changelog page

## Version Filtering

Let users filter the changelog by change type or version range:

```jsx
function ChangelogFilters({ activeFilter, onFilterChange }) {
  const filters = ['all', 'new', 'improved', 'fixed', 'security'];

  return (
    <div className="flex gap-2 mb-6" role="tablist">
      {filters.map(filter => (
        <button
          key={filter}
          role="tab"
          aria-selected={activeFilter === filter}
          onClick={() => onFilterChange(filter)}
          className={`px-3 py-1 rounded-full text-sm ${
            activeFilter === filter ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
}
```

## Data Structure

```json
{
  "releases": [
    {
      "version": "2.4.0",
      "date": "2026-03-28",
      "sections": [
        { "type": "new", "items": ["Board view for projects", "PDF export for reports"] },
        { "type": "improved", "items": ["Search now returns results as you type"] },
        { "type": "fixed", "items": ["File uploads no longer fail silently over 10MB"] }
      ]
    }
  ]
}
```

Store changelog data as JSON or MDX for easy authoring and programmatic rendering.

## Key Takeaways

- Use a vertical timeline layout with version dots, dates, and categorized sections
- Color-coded badges (New, Improved, Fixed) let users scan for what matters to them
- Track read/unread state via localStorage and the latest version seen
- Provide filters by change type for users who want to find specific updates
- Store changelog as structured data (JSON), not freeform HTML, for consistent rendering
