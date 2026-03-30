---
id: PAT-0051
name: Empty States
category: patterns
tags: [empty-state, first-time-ux, error-state, no-results, onboarding, illustration, zero-data]
capabilities: [empty-state-design, first-run-experience, error-state-handling, no-results-messaging]
useWhen:
  - designing what users see before they have any data
  - handling search results that return nothing
  - building error states and offline screens
  - creating first-time user experiences
  - improving engagement on sparse or new accounts
estimatedTokens: 600
relatedFragments: [SKL-0116, SKL-0003, SKL-0023, PAT-0050]
dependencies: []
synonyms: ["what to show when there's no data", "blank screen design", "no results found page", "first time user screen", "zero state design", "empty page placeholder"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/uixmat/onborda"
difficulty: beginner
owner: builder
---

# Empty States

Empty states are some of the most important screens in your app. They appear at moments of high user vulnerability: first launch, failed searches, errors, and cleared inboxes. A well-designed empty state turns confusion into direction.

## Types of Empty States

| Type | When It Appears | Goal |
|------|----------------|------|
| First-use | User has no data yet | Guide to first action |
| No results | Search or filter returns nothing | Suggest alternatives |
| User-cleared | User deleted/completed all items | Celebrate + suggest next |
| Error | Something failed | Explain + offer recovery |
| Offline | No network connection | Show cached data or status |

## Anatomy of a Good Empty State

Every empty state needs three elements:

```
┌─────────────────────────────┐
│                             │
│      [Illustration]         │  1. Visual (optional but effective)
│                             │
│   What belongs here         │  2. Explanation (1-2 sentences)
│   and why it's empty        │
│                             │
│   [ Primary Action ]        │  3. CTA (one clear next step)
│                             │
└─────────────────────────────┘
```

## First-Use Empty State

The most critical empty state. This is your onboarding surface.

Rules:
- Lead with the benefit, not the feature ("See all your projects here" not "No projects found")
- Single CTA button ("Create your first project")
- Optional: show a preview or sample of what the populated state looks like
- Keep illustration lightweight (SVG, not heavy PNG)
- Do not show error-style language ("No data", "Nothing here")

```html
<div class="empty-state" role="status">
  <img src="/illustrations/projects-empty.svg" alt="" aria-hidden="true" />
  <h2>Your projects will appear here</h2>
  <p>Create your first project to start tracking progress.</p>
  <a href="/new-project" class="btn-primary">Create Project</a>
</div>
```

## No Results State

Triggered by search or filters that return nothing.

Rules:
- Confirm what was searched ("No results for 'onboarding'")
- Suggest corrections ("Check your spelling or try broader terms")
- Offer alternative paths (clear filters, browse categories)
- Never show a completely blank screen

## Error State

Rules:
- Use plain language, not error codes ("We couldn't load your data" not "Error 500")
- Offer a retry action as the primary CTA
- If the error is temporary, say so ("This usually fixes itself in a few minutes")
- Provide a fallback path ("Go back to dashboard")
- Log the actual error for developers, show a friendly message for users

## User-Cleared State

When users complete or clear all items (inbox zero, all tasks done):

- Celebrate the accomplishment (brief, not over the top)
- Suggest a meaningful next action
- Do not make users feel like they broke something

## Design Guidelines

| Guideline | Detail |
|-----------|--------|
| Illustrations | SVG, consistent style, max 200px height, decorative (aria-hidden) |
| Copy length | Heading: 4-8 words. Body: 1-2 sentences max |
| CTA count | Exactly one primary action per empty state |
| Tone | Encouraging and helpful, never blaming |
| Responsive | Illustrations scale down or hide on mobile |
| Accessibility | Use role="status" so screen readers announce the state |

## Anti-Patterns

- Showing raw "null", "undefined", or "0 items" without context
- Blank white screens with no explanation
- Error states that blame the user ("You did something wrong")
- Multiple competing CTAs in an empty state
- Heavy illustrations that slow page load
- Using the same generic empty state for every screen
