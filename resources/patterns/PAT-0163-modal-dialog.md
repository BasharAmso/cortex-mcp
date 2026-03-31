---
id: PAT-0163
name: Modal & Dialog Pattern
category: patterns
tags: [modal, dialog, accessibility, focus-trap, portal, radix-ui]
capabilities: [accessible-modal-implementation, focus-management, portal-rendering, dialog-stacking]
useWhen:
  - building modals or dialog boxes
  - implementing accessible focus trapping
  - rendering dialogs outside the DOM hierarchy with portals
  - managing dialog stacking and z-index
  - choosing between modal, non-modal, and drawer patterns
estimatedTokens: 650
relatedFragments: [SKL-0005, SKL-0310, PAT-0162]
dependencies: []
synonyms: ["how to build an accessible modal", "how to trap focus in a dialog", "how to use portals for modals", "how to stack multiple modals", "modal vs dialog vs drawer", "how to close a modal with escape key"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/radix-ui/primitives"
difficulty: beginner
owner: "cortex"
pillar: "frontend"
---

# Pattern: Modal & Dialog

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0163 |
| **Name** | Modal & Dialog Pattern |
| **Category** | Patterns |
| **Complexity** | Beginner |

## Core Concepts

Modals interrupt the user to request input or confirmation. They are powerful but intrusive. The native HTML `<dialog>` element and libraries like Radix UI handle the hard accessibility requirements (focus trapping, escape key, screen reader announcements) so you do not have to build them from scratch.

### The Native `<dialog>` Element

Modern browsers support `<dialog>` with built-in focus trapping and backdrop:

```typescript
function ConfirmDialog({ open, onClose, onConfirm, title, message }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="dialog-title"
    >
      <h2 id="dialog-title">{title}</h2>
      <p>{message}</p>
      <div>
        <button onClick={onClose}>Cancel</button>
        <button onClick={onConfirm}>Confirm</button>
      </div>
    </dialog>
  );
}
```

`showModal()` vs `show()`: `showModal()` adds a backdrop, traps focus, and closes on Escape. `show()` does none of these. Always use `showModal()` for modal dialogs.

### Radix UI Dialog

Radix UI provides unstyled, accessible dialog primitives with portal rendering:

```typescript
import * as Dialog from '@radix-ui/react-dialog';

function EditProfileModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button>Edit Profile</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[90vw] max-w-md">
          <Dialog.Title>Edit Profile</Dialog.Title>
          <Dialog.Description>Update your profile information.</Dialog.Description>
          {/* Form content */}
          <Dialog.Close asChild>
            <button aria-label="Close">X</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

### Accessibility Requirements

Every modal must implement these behaviors:

| Requirement | What It Means | How |
|-------------|--------------|-----|
| **Focus trap** | Tab cycles within the modal, never escapes to page behind | Native `<dialog>` or Radix handles this |
| **Initial focus** | First focusable element receives focus on open | Auto with `showModal()`, or `autoFocus` on a specific element |
| **Return focus** | Focus returns to the trigger element on close | Native `<dialog>` handles this; Radix handles this |
| **Escape to close** | Pressing Escape closes the modal | Native behavior with `showModal()` |
| **aria-labelledby** | Dialog has an accessible name from its title | Point to the title element's ID |
| **aria-describedby** | Optional longer description for screen readers | Point to the description element's ID |
| **Backdrop click** | Clicking outside closes the modal (optional but expected) | Handle `onClick` on overlay |

### Portal Rendering

Modals should render at the root of the DOM to avoid `z-index` and `overflow: hidden` issues from parent containers:

```typescript
import { createPortal } from 'react-dom';

function Modal({ children, open }) {
  if (!open) return null;
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">{children}</div>
    </div>,
    document.body
  );
}
```

Radix UI and shadcn/ui handle portals automatically.

### Dialog Variants

| Variant | Use Case | Behavior |
|---------|----------|----------|
| **Alert dialog** | Destructive confirmations ("Delete account?") | Cannot dismiss by clicking outside |
| **Modal dialog** | Forms, settings, content preview | Dismissible by clicking outside or Escape |
| **Drawer** | Mobile navigation, filters, details panel | Slides in from edge of screen |
| **Sheet** | Extended content, side panels | Full-height panel from left or right |
| **Popover** | Small contextual content near a trigger | Non-modal, closes on click outside |

### Stacking Multiple Dialogs

Avoid stacking modals when possible. If required:

1. Each new modal gets a higher `z-index`.
2. Only the topmost modal traps focus.
3. Closing the top modal returns focus to the previous modal.
4. Pressing Escape closes only the topmost modal.

Radix UI handles stacking automatically when you nest `Dialog.Root` components.

### Animation

```css
dialog[open] {
  animation: fade-in 150ms ease-out;
}

dialog[open]::backdrop {
  animation: fade-in 150ms ease-out;
}

@keyframes fade-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
```

## Anti-Patterns

- Building modals from `div` elements without focus trapping (inaccessible)
- No escape key handler (users expect Escape to close modals)
- Not returning focus to the trigger on close (keyboard users get lost)
- Using modals for content that should be a page (modal fatigue)
- Rendering modals inside scrollable containers without portals (z-index/overflow issues)

## Key Takeaways

- Use native `<dialog>` with `showModal()` for simple cases; Radix UI for complex ones
- Focus trapping, escape-to-close, and return focus are non-negotiable accessibility requirements
- Render modals in a portal at `document.body` to avoid z-index and overflow issues
- Prefer fewer modals; if content is complex enough, it should be its own page
- Use alert dialogs for destructive actions; they should not be dismissible by clicking outside
