---
id: SKL-0347
name: Toast & Feedback Systems
category: skills
tags: [toast, notification, snackbar, feedback, undo, alert, success-message, stacking]
capabilities: [toast-notification, undo-action, notification-stacking, feedback-messaging]
useWhen:
  - showing success, error, or info messages after user actions
  - implementing undo for destructive actions
  - designing notification stacking and auto-dismiss behavior
  - choosing between toasts, banners, and inline messages
  - building an app-wide feedback system
estimatedTokens: 600
relatedFragments: [SKL-0345, SKL-0344, PAT-0168, PAT-0180]
dependencies: []
synonyms: ["how to show toast notifications", "success message after form submit", "undo delete action", "notification system design", "snackbar vs toast vs alert", "stacking notifications"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "app-polish"
---

# Toast & Feedback Systems

Toasts confirm that something happened. They appear briefly, require no interaction, and disappear on their own. The key design challenge is making them noticeable without being disruptive.

## When to Use Each Feedback Type

| Type | Use For | Duration | User Action |
|------|---------|----------|-------------|
| **Toast** | Success, info, minor errors | 3-5s auto-dismiss | None required |
| **Toast + Undo** | Destructive actions (delete, archive) | 5-8s | Optional undo |
| **Banner** | System-wide alerts (maintenance, offline) | Persistent | Dismiss button |
| **Inline message** | Form validation, field errors | Until resolved | Fix the error |
| **Modal** | Critical errors, data loss warnings | Until acknowledged | Confirm/cancel |

## Toast Component Structure

```jsx
function Toast({ type, message, undoAction, onDismiss }) {
  const icons = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' };
  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  };

  return (
    <div role="status" aria-live="polite" className={`border rounded-lg p-3 flex items-center gap-3 ${colors[type]}`}>
      <span aria-hidden="true">{icons[type]}</span>
      <p className="flex-1">{message}</p>
      {undoAction && <button onClick={undoAction} className="font-medium underline">Undo</button>}
      <button onClick={onDismiss} aria-label="Dismiss notification" className="opacity-60 hover:opacity-100">✕</button>
    </div>
  );
}
```

## Toast Container and Stacking

```jsx
function ToastContainer({ toasts, removeToast }) {
  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm"
    >
      {toasts.slice(0, 3).map(toast => (
        <Toast key={toast.id} {...toast} onDismiss={() => removeToast(toast.id)} />
      ))}
      {toasts.length > 3 && (
        <p className="text-sm text-gray-500 text-center">+{toasts.length - 3} more</p>
      )}
    </div>
  );
}
```

Stacking rules:
- Show maximum 3 toasts at once; collapse the rest into a count
- Newest toast appears at the bottom (closest to where users look)
- Each toast has its own dismiss timer
- On hover, pause all auto-dismiss timers

## Undo Pattern for Destructive Actions

```jsx
function deleteItem(id) {
  // Soft-delete: hide from UI immediately
  setItems(prev => prev.filter(item => item.id !== id));

  const toastId = toast.show({
    type: 'info',
    message: 'Item deleted',
    undoAction: () => {
      // Restore in UI
      setItems(prev => [...prev, deletedItem]);
      toast.dismiss(toastId);
    },
    duration: 6000,
  });

  // Hard-delete after undo window expires
  setTimeout(() => api.deleteItem(id), 6000);
}
```

- Delay the actual server deletion until the undo window expires
- Show the undo button for 5-8 seconds
- Undo must restore the exact previous state, not reload from the server

## Accessibility Requirements

- Use `role="status"` and `aria-live="polite"` for non-urgent toasts
- Use `role="alert"` and `aria-live="assertive"` only for errors
- Toasts must be keyboard-dismissible
- Don't rely on color alone to convey toast type; include an icon or label
- Auto-dismiss must pause when the toast has keyboard or mouse focus

## Key Takeaways

- Auto-dismiss success toasts in 3-5 seconds; error toasts should persist until dismissed
- Always offer undo for destructive actions instead of a confirmation dialog
- Cap visible toasts at 3 and collapse overflow into a count
- Use `aria-live` regions so screen readers announce toast content
- Position toasts in a consistent corner; bottom-right is the convention for web apps
