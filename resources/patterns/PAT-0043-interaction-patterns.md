---
id: PAT-0043
name: UI Interaction Patterns
category: patterns
tags: [interaction-patterns, modals, tooltips, accordions, tabs, drag-and-drop, infinite-scroll, skeleton-loading, toggle, collapsible]
capabilities: [interaction-pattern-selection, modal-design, progressive-disclosure, loading-state-design, navigation-pattern-implementation]
useWhen:
  - choosing the right interaction pattern for a UI component
  - implementing modals, tooltips, accordions, or tabs
  - designing loading states and progressive disclosure
  - building drag-and-drop or infinite scroll interfaces
estimatedTokens: 750
relatedFragments: [SKL-0023, SKL-0005, SKL-0106, SKL-0003]
dependencies: []
synonyms: ["should I use a modal or a new page", "accordion vs tabs", "how to show loading state", "drag and drop best practices", "tooltip or popover", "when to use infinite scroll"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/Patternslib/Patterns"
difficulty: beginner
owner: builder
pillar: "ux-design"
---

# UI Interaction Patterns

Every interaction pattern has a purpose and a cost. Choose the pattern that matches the user's task, not the one that looks impressive. Misused patterns create friction; well-chosen patterns feel invisible.

## Pattern Selection Guide

### Modals (Dialogs)

**Use when**: Requiring immediate user attention or confirmation before proceeding (delete confirmation, unsaved changes warning, focused sub-task).

**Avoid when**: Displaying information that does not require action, showing forms with many fields, or presenting content users may want to reference alongside other content.

**Rules**: Always provide a visible close button and Escape key dismissal. Trap focus inside the modal. Return focus to the trigger element on close. Prevent background scrolling. Use `role="dialog"` and `aria-modal="true"`.

### Tooltips

**Use when**: Providing brief contextual help for an element (icon meaning, field hint, truncated text expansion). Content should be 1-2 sentences maximum.

**Avoid when**: The information is essential for task completion (use inline text instead) or when the content includes interactive elements like links or buttons (use a popover).

**Rules**: Trigger on hover and focus (not just hover). Position with smart overflow detection. Dismiss on Escape. Never put critical information only in a tooltip since keyboard and mobile users may miss it.

### Accordions (Collapsibles)

**Use when**: Presenting multiple sections where users typically need only one at a time (FAQ, settings categories, long-form content with scannable headings).

**Avoid when**: Users need to compare content across sections or when there are fewer than 3 sections (just show the content).

**Rules**: Use semantic heading elements as triggers. Allow multiple sections open simultaneously unless there is a strong reason for mutual exclusivity. Animate open/close smoothly. Apply `aria-expanded` to trigger elements. First child element acts as the trigger by default.

### Tabs

**Use when**: Switching between related views of the same data or context (profile sections, dashboard views, settings categories with few items each).

**Avoid when**: The content in each tab is unrelated, or when there are more than 6 tabs (use navigation or a select dropdown instead).

**Rules**: Arrow keys navigate between tabs. Only the active tab is in the tab order. Use `role="tablist"`, `role="tab"`, and `role="tabpanel"`. Loading a tab should not change the URL unless tabs represent distinct pages.

### Toggle Switches

**Use when**: Binary settings that take effect immediately (dark mode, notifications on/off, feature flags).

**Avoid when**: The action requires a submit/save step (use a checkbox instead) or when there are more than two states.

**Rules**: Communicate current state visually and to assistive tech. Use `role="switch"` with `aria-checked`. Provide a visible label describing what is being toggled. State can optionally persist via local or session storage.

### Drag and Drop

**Use when**: Reordering lists, organizing items into groups, or spatial arrangement tasks (kanban boards, playlist ordering).

**Avoid when**: There is a simpler alternative (move up/down buttons for short lists) or when precision placement matters.

**Rules**: Always provide a keyboard alternative (arrow keys to reorder). Show clear drop targets with visual feedback. Announce state changes to screen readers. Handle touch and mouse input. Provide undo for accidental drops.

### Infinite Scroll

**Use when**: Browsing large collections where order is not critical (social feeds, image galleries, search results exploration).

**Avoid when**: Users need to reach the footer, find specific items by position, or when the total count matters (use pagination).

**Rules**: Show a skeleton loading state while fetching. Provide a "load more" button as a fallback. Preserve scroll position on back navigation. Announce new content to screen readers via live regions. Always offer an alternative way to access content (search, filters).

### Skeleton Loading

**Use when**: Content is loading and you know the layout shape in advance. Replaces spinners for content-rich pages.

**Avoid when**: Load times are consistently under 200ms (show nothing) or when layout shape is unpredictable.

**Rules**: Match the skeleton shape to the actual content layout. Animate with a subtle shimmer. Replace skeleton with real content without layout shift. Never show a skeleton for more than 5 seconds without a progress indicator or error state.
