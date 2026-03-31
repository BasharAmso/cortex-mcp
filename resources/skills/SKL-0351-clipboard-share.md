---
id: SKL-0351
name: Clipboard & Share
category: skills
tags: [clipboard, share, copy, web-share-api, deep-link, qr-code, social-sharing, url]
capabilities: [copy-to-clipboard, web-share, deep-linking, qr-code-generation]
useWhen:
  - adding copy-to-clipboard for code snippets or URLs
  - implementing native share dialogs on mobile
  - generating deep links to specific app states
  - creating QR codes for easy sharing
  - building share buttons for social media
estimatedTokens: 600
relatedFragments: [SKL-0013, SKL-0348, PAT-0181]
dependencies: []
synonyms: ["how to copy to clipboard in JavaScript", "share button for web app", "Web Share API example", "deep link to specific page", "generate QR code", "social share buttons"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: beginner
owner: "cortex"
pillar: "app-polish"
---

# Clipboard & Share

Sharing is how your app grows. Make it effortless to copy content, share links, and pass information between contexts. The Clipboard API and Web Share API handle the heavy lifting on modern browsers.

## Copy to Clipboard

```jsx
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers or non-HTTPS
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return true;
  }
}
```

### Copy Button with Feedback

```jsx
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={handleCopy} aria-label={copied ? 'Copied' : 'Copy to clipboard'}>
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  );
}
```

- Always show visual feedback ("Copied!") for 2 seconds
- Use a checkmark icon, not just text, for quick scanning
- Reset the feedback state after the timeout

## Web Share API (Native Share Sheet)

```jsx
async function shareContent({ title, text, url }) {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
    } catch (err) {
      if (err.name !== 'AbortError') console.error('Share failed:', err);
    }
  } else {
    // Fallback: copy link to clipboard
    await copyToClipboard(url);
    toast.show('Link copied to clipboard');
  }
}
```

- `navigator.share` is available on mobile browsers and recent desktop Chrome/Edge
- Always provide a fallback (copy to clipboard) for unsupported browsers
- The `AbortError` means the user cancelled; don't treat it as a failure

## Deep Links

Deep links point to specific content within your app. They enable sharing, bookmarking, and navigation from external sources.

```
https://yourapp.com/projects/abc123/tasks/456?view=board&filter=active
```

Rules for deep link design:
- Every meaningful view should have a unique URL
- Use path segments for hierarchy (`/project/task`), query params for view state (`?view=board`)
- Update the URL when the user navigates (use `history.pushState` or router)
- Handle deep links gracefully when the user isn't logged in (redirect to login, then back)

## QR Code Generation

```jsx
import QRCode from 'qrcode';

function QRShare({ url }) {
  const [dataUrl, setDataUrl] = useState('');

  useEffect(() => {
    QRCode.toDataURL(url, { width: 200, margin: 2 }).then(setDataUrl);
  }, [url]);

  return dataUrl ? (
    <img src={dataUrl} alt={`QR code for ${url}`} width={200} height={200} />
  ) : null;
}
```

- QR codes are useful for cross-device sharing (desktop to mobile)
- Include a text URL below the QR code as a fallback
- Use `qrcode` library (8KB gzipped) instead of an external API

## Social Share Links (No SDK Required)

```jsx
const shareLinks = {
  twitter: (url, text) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  linkedin: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  email: (url, subject) => `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(url)}`,
};
```

- Use intent URLs instead of heavy SDK scripts
- Open share links in a popup window (`window.open` with dimensions)
- Always `encodeURIComponent` user-provided text

## Key Takeaways

- Use the Clipboard API with a textarea fallback for broad browser support
- Always show "Copied!" feedback; users need confirmation the action worked
- Web Share API gives you the native share sheet on mobile for free
- Every shareable state in your app should have a unique, bookmarkable URL
- Use intent URLs for social sharing to avoid loading third-party SDKs
