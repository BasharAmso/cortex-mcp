---
id: SKL-0329
name: Microcopy Writing
category: skills
tags: [microcopy, ux-writing, error-messages, labels, tooltips, empty-states]
capabilities: [error-message-writing, label-design, tooltip-content, empty-state-copy, cta-writing]
useWhen:
  - writing clear and helpful error messages for forms and system errors
  - crafting button labels, form labels, and navigation text
  - designing empty states that guide users toward action
  - writing tooltips and helper text that clarify without cluttering
  - improving call-to-action text for better conversion
estimatedTokens: 650
relatedFragments: [SKL-0328, SKL-0325, PAT-0168, PAT-0170]
dependencies: []
synonyms: ["how to write good error messages", "what should my empty state say", "how to write better button labels", "how to write UX copy", "what makes a good CTA", "how to write helpful tooltips"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "ux-design"
---

# Skill: Microcopy Writing

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0329 |
| **Name** | Microcopy Writing |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Microcopy is the small text that guides users through an interface: button labels, error messages, tooltips, placeholder text, empty states, and confirmation dialogs. It is the most underinvested area of UX. Good microcopy reduces support tickets, increases conversion, and builds trust. Bad microcopy creates confusion, anxiety, and abandonment.

### Error Messages

Error messages are the highest-impact microcopy. Users are already frustrated when they see one.

**Formula: What happened + Why + What to do**

| Bad | Good |
|-----|------|
| "Invalid input" | "Email address needs an @ symbol" |
| "Error 403" | "You don't have permission to view this page. Contact your admin to request access." |
| "Something went wrong" | "We couldn't save your changes. Check your connection and try again." |
| "Password invalid" | "Password must be at least 8 characters with one number" |

Rules for error messages:
- Be specific about what went wrong
- Tell the user exactly how to fix it
- Use plain language, not error codes
- Place the message next to the problem, not in a banner at the top
- Never blame the user ("You entered an invalid..." becomes "This field needs...")

### Button Labels and CTAs

Buttons should describe what happens when you click them, not vague actions:

| Weak | Strong |
|------|--------|
| "Submit" | "Create Account" |
| "OK" | "Delete Project" |
| "Click Here" | "Download Report" |
| "Cancel" | "Keep Editing" (for destructive cancel) |
| "Yes" | "Remove Member" |

Use verb + noun format: "Save Draft", "Send Invitation", "Start Free Trial". The user should know exactly what will happen before clicking.

### Empty States

Empty states are a user's first impression of a feature. Use them to educate and motivate:

**Structure: Illustration (optional) + Explanation + Action**

```
[Illustration of a document]
"No projects yet"
"Projects help you organize your work and collaborate with your team."
[Create Your First Project]  ← Primary CTA
```

Good empty states answer three questions:
1. What will appear here? (explain the feature)
2. Why is it empty? (no data yet, no matches, no permission)
3. What should I do? (clear next action)

Never show just "No data" or a blank page. Every empty state is an onboarding opportunity.

### Tooltips and Helper Text

Tooltips clarify; they should never be required reading:

- **Use tooltips for**: Secondary explanations, feature context, abbreviation definitions
- **Do not use tooltips for**: Essential instructions (users on mobile cannot hover)
- **Keep them under 150 characters**: If you need more, use inline helper text or a help link
- **Trigger on hover and focus**: Support both mouse and keyboard users

Helper text below form fields is more reliable than tooltips for critical guidance:

```
Email address
[user@example.com          ]
We'll send a verification link to this address.
```

### Placeholder Text

Placeholder text disappears on input, so it must never contain essential information:

- **Good use**: Show format examples ("MM/DD/YYYY", "jane@example.com")
- **Bad use**: Instructions that vanish ("Enter your full legal name as it appears on your ID")
- **Never use as labels**: Placeholders are not accessible labels; always pair with a visible `<label>`

### Confirmation Dialogs

When an action is destructive or irreversible, the dialog must be specific:

```
Delete "Q4 Marketing Plan"?

This will permanently delete the document and all 12 comments.
This action cannot be undone.

[Cancel]  [Delete Document]  ← Red/destructive style
```

Never use "Are you sure?" with "OK/Cancel". Name the action on the destructive button.

## Key Takeaways

- Error messages should state what happened, why, and how to fix it in plain language
- Button labels should use verb + noun format describing the exact outcome
- Empty states are onboarding opportunities; explain the feature and provide a clear next action
- Tooltips clarify secondary information; never put essential instructions in a tooltip
- Confirmation dialogs for destructive actions must name the action on the button, not "OK"
