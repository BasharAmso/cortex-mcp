---
id: PAT-0170
name: Settings Page Pattern
category: patterns
tags: [settings, preferences, configuration, toggles, save-behavior, user-profiles]
capabilities: [settings-layout, grouped-settings, save-behavior-design, toggle-design, confirmation-patterns]
useWhen:
  - designing a settings or preferences page for a web or mobile app
  - choosing between auto-save and explicit save for settings
  - organizing many settings into logical groups
  - designing toggle switches, confirmation dialogs, and destructive actions in settings
  - building user profile and account management pages
estimatedTokens: 650
relatedFragments: [SKL-0328, SKL-0329, PAT-0166, PAT-0168]
dependencies: []
synonyms: ["how to design a settings page", "auto-save vs save button for settings", "how to organize app settings", "settings page layout best practices", "how to group user preferences", "account settings page design"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "ux-design"
---

# Pattern: Settings Page Pattern

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0170 |
| **Name** | Settings Page Pattern |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

Settings pages are where users configure their experience. They are visited infrequently but are critical when needed. A well-organized settings page builds trust; a chaotic one creates anxiety. The core challenge is organizing many options without overwhelming the user.

### Settings Organization

Group settings by domain, not by control type:

```
Settings
├── Profile
│   ├── Display name
│   ├── Avatar
│   └── Bio
├── Account
│   ├── Email
│   ├── Password
│   └── Two-factor authentication
├── Notifications
│   ├── Email notifications
│   ├── Push notifications
│   └── Quiet hours
├── Appearance
│   ├── Theme (light/dark/system)
│   ├── Language
│   └── Timezone
├── Billing
│   ├── Current plan
│   ├── Payment method
│   └── Invoices
└── Danger Zone
    ├── Export data
    └── Delete account
```

Rules:
- Group by user mental model ("Notifications" not "Toggles")
- Order groups by frequency of use (most visited first)
- Keep the "Danger Zone" (destructive actions) visually separated at the bottom
- Use a side navigation or tab bar for 4+ groups on desktop; stack vertically on mobile

### Layout Patterns

| Layout | Best For | Description |
|--------|----------|-------------|
| **Tabs** | 3-6 groups, equal importance | Horizontal tabs across the top |
| **Side nav + content** | 6+ groups, varying complexity | Left nav with content area on right |
| **Single scroll** | Few settings, simple options | All groups on one page with anchored headings |
| **Nested pages** | Deep settings (per-project, per-team) | Each group is a separate page |

For most SaaS products, side nav + content is the most scalable layout. It accommodates growth without requiring redesign.

### Save Behavior

| Approach | Use When | UX Details |
|----------|----------|-----------|
| **Auto-save** | Toggles, selects, non-critical preferences | Immediate feedback via toast ("Saved") |
| **Explicit save** | Text fields, multi-field forms, billing info | "Save Changes" button, disabled until changes exist |
| **Hybrid** | Mix of simple toggles and complex forms | Auto-save toggles, explicit save for forms |

Auto-save rules:
- Show a visual confirmation for every auto-saved change (checkmark, toast)
- Disable auto-save for destructive or irreversible changes
- Debounce text field auto-save by 1-2 seconds

Explicit save rules:
- "Save Changes" button appears only when changes exist (or becomes enabled)
- Warn on navigation away with unsaved changes ("You have unsaved changes. Leave anyway?")
- Show success confirmation after save completes

### Toggle Design

Toggles are the primary control in settings. Get them right:

- **Label on the left, toggle on the right**: Consistent alignment for scanning
- **Describe what ON means**: "Enable email notifications" not just "Notifications"
- **Add helper text** for non-obvious toggles: "When enabled, you'll receive a daily email summary"
- **Immediate effect**: Toggles should take effect immediately (auto-save pattern)
- **Confirmation for risky toggles**: "Disable two-factor authentication?" requires a confirmation dialog

### Destructive Actions

Settings pages contain irreversible actions (delete account, revoke access). Protect users:

- **Visual separation**: Red text or bordered "Danger Zone" section at the bottom
- **Confirmation dialog**: Require typing the account name or "DELETE" to confirm
- **Cooling period**: "Your account will be deleted in 14 days. You can cancel during this time."
- **Data export first**: Offer data export before allowing account deletion
- **Clear consequences**: "This will permanently delete 47 projects and remove all team members"

### Search in Settings

For products with many settings (50+), add a search bar at the top of the settings page:

- Search across setting labels and descriptions
- Highlight matching settings and scroll to them
- Show "No matching settings" with a link to help docs

This is increasingly expected in complex products and dramatically reduces the time users spend looking for a specific option.

## Anti-Patterns

- Alphabetical ordering of settings (meaningless to users)
- Delete account button with no confirmation or cooling period
- Auto-saving destructive changes (disabling security features)
- No feedback after save (users click "Save" and nothing visibly happens)
- Settings scattered across multiple unrelated pages in the app

## Key Takeaways

- Group settings by user mental model (Profile, Notifications, Billing), not by control type
- Auto-save toggles and simple selects; use explicit save for text forms and sensitive data
- Warn users before navigating away from unsaved changes
- Destructive actions need visual separation, confirmation dialogs, and cooling periods
- Add settings search for products with 50+ configurable options
