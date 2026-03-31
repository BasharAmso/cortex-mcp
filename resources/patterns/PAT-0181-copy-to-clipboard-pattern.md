---
id: PAT-0181
name: Copy to Clipboard Pattern
category: patterns
tags: [clipboard, copy, feedback, api, fallback, security, permissions, ux]
capabilities: [clipboard-api-usage, copy-feedback, clipboard-fallback, secure-clipboard]
useWhen:
  - adding copy buttons to code blocks or URLs
  - implementing clipboard operations with proper fallbacks
  - providing visual feedback after a copy action
  - handling clipboard permissions and security restrictions
  - building a reusable copy-to-clipboard component
estimatedTokens: 550
relatedFragments: [SKL-0351, SKL-0347, SKL-0005]
dependencies: []
synonyms: ["copy button implementation", "clipboard API with fallback", "copy to clipboard feedback", "copy code snippet button", "clipboard permission handling", "click to copy pattern"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "app-polish"
---

# Copy to Clipboard Pattern

The copy-to-clipboard pattern places a button next to content (URLs, code, tokens, IDs) that copies the text with one click. The pattern is simple but the details matter: API choice, fallbacks, feedback timing, and security.

## API Hierarchy

```
navigator.clipboard.writeText()     ← Modern, async, requires HTTPS
  ↓ (fallback)
document.execCommand('copy')        ← Legacy, synchronous, works everywhere
  ↓ (fallback)
Manual selection prompt              ← Last resort ("Press Ctrl+C to copy")
```

## Complete Implementation

```jsx
async function copyToClipboard(text) {
  // Modern API (requires HTTPS or localhost)
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return { success: true };
    } catch (err) {
      // Permission denied or not focused — fall through
    }
  }

  // Legacy fallback
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    if (ok) return { success: true };
  } catch { /* fall through */ }

  return { success: false, manual: true };
}
```

## Reusable Copy Button Component

```jsx
function CopyButton({ text, label = 'Copy' }) {
  const [state, setState] = useState('idle'); // idle | copied | failed

  const handleCopy = async () => {
    const result = await copyToClipboard(text);
    if (result.success) {
      setState('copied');
      setTimeout(() => setState('idle'), 2000);
    } else if (result.manual) {
      prompt('Copy this text:', text); // Last resort
    } else {
      setState('failed');
      setTimeout(() => setState('idle'), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={state === 'copied' ? 'Copied to clipboard' : label}
      className="inline-flex items-center gap-1 text-sm"
    >
      {state === 'idle' && <><ClipboardIcon /> {label}</>}
      {state === 'copied' && <><CheckIcon className="text-green-600" /> Copied!</>}
      {state === 'failed' && <><XIcon className="text-red-600" /> Failed</>}
    </button>
  );
}
```

## Visual Feedback Rules

| Aspect | Recommendation |
|--------|---------------|
| Duration | Show "Copied!" for 2 seconds, then revert |
| Icon | Switch from clipboard icon to checkmark |
| Color | Green for success, red for failure |
| Animation | Subtle scale or fade transition |
| Sound | No sound (violates user expectations) |
| Position | Feedback appears in-place on the button, not as a separate toast |

## Code Block Copy Button

```jsx
function CodeBlock({ code, language }) {
  return (
    <div className="relative group">
      <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto">
        <code>{code}</code>
      </pre>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton text={code} label="Copy code" />
      </div>
    </div>
  );
}
```

- Show the copy button on hover (desktop) and always visible (mobile/touch)
- Position it in the top-right corner of the code block
- Use a semi-transparent background so it doesn't obscure code

## Security Considerations

- `navigator.clipboard.writeText` requires HTTPS (or localhost)
- The page must be focused; background tabs cannot write to clipboard
- Reading from clipboard (`readText`) requires explicit user permission
- Never copy sensitive data (passwords, tokens) without clear user intent
- Clear clipboard after copying sensitive data using a timeout

## Key Takeaways

- Use `navigator.clipboard.writeText` with a `document.execCommand` fallback
- Show in-place visual feedback ("Copied!") for exactly 2 seconds
- Code block copy buttons should appear on hover, positioned top-right
- The Clipboard API requires HTTPS; always implement the legacy fallback
- Never copy or read clipboard data without explicit user action
