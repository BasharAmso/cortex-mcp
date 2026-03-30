---
id: EX-0012
name: Push Notifications Example
category: examples
tags: [push-notifications, web-push, service-worker, permissions, notification-api, pwa, backend]
capabilities: [push-notification-setup, permission-request-ux, notification-handling]
useWhen:
  - adding push notifications to a web app or PWA
  - implementing Web Push API with a service worker
  - building notification permission request UX
estimatedTokens: 750
relatedFragments: [SKL-0007, SKL-0006, EX-0010]
dependencies: []
synonyms: ["how to send push notifications", "web push api example", "service worker notifications", "notification permission prompt", "push notification backend"]
lastUpdated: "2026-03-29"
difficulty: advanced
---

# Push Notifications Example

Web Push API with service worker handler, permission UX, and backend integration.

## Request Permission (User-Facing)

```tsx
// components/notification-prompt.tsx
"use client";
import { useState } from "react";

export function NotificationPrompt() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || Notification.permission !== "default") return null;

  const handleEnable = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      await subscribeToPush();
    }
    setDismissed(true);
  };

  return (
    <div role="alert" className="fixed bottom-20 inset-x-4 bg-white rounded-xl shadow-lg p-4 z-50">
      <p className="text-sm font-medium">Get notified about important updates?</p>
      <p className="text-xs text-gray-500 mt-1">You can turn this off anytime in settings.</p>
      <div className="flex gap-2 mt-3">
        <button onClick={handleEnable} className="btn-primary text-sm px-4 py-2">
          Enable notifications
        </button>
        <button onClick={() => setDismissed(true)} className="text-sm text-gray-400 px-4 py-2">
          Not now
        </button>
      </div>
    </div>
  );
}
```

## Subscribe to Push

```ts
// lib/push-subscribe.ts
async function subscribeToPush() {
  const reg = await navigator.serviceWorker.ready;

  const subscription = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
  });

  await fetch("/api/push/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(subscription),
  });
}

function urlBase64ToUint8Array(base64: string): Uint8Array {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const raw = atob(base64.replace(/-/g, "+").replace(/_/g, "/") + padding);
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
}
```

## Service Worker Push Handler

```js
// public/sw.js — add to existing service worker
self.addEventListener("push", (e) => {
  const data = e.data?.json() ?? {};

  const options = {
    body: data.body || "You have a new notification",
    icon: "/icons/icon-192.png",
    badge: "/icons/badge-72.png",
    tag: data.tag || "default",
    data: { url: data.url || "/" },
    actions: data.actions || [],
  };

  e.waitUntil(self.registration.showNotification(data.title || "My App", options));
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();

  const targetUrl = e.notification.data?.url || "/";

  e.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
      const existing = windowClients.find((c) => c.url.includes(targetUrl));
      if (existing) return existing.focus();
      return clients.openWindow(targetUrl);
    })
  );
});
```

## Backend: Send Notification

```ts
// app/api/push/send/route.ts
import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:you@example.com",
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(req: Request) {
  const { subscription, title, body, url } = await req.json();

  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({ title, body, url })
    );
    return Response.json({ success: true });
  } catch (err: any) {
    if (err.statusCode === 410) {
      // Subscription expired — remove from database
      return Response.json({ success: false, expired: true }, { status: 410 });
    }
    throw err;
  }
}
```

## Key Points

- **Never auto-prompt** on page load. Show a contextual prompt explaining the value first.
- **`userVisibleOnly: true`** is required by browsers; silent pushes are not allowed
- **VAPID keys** authenticate your server. Generate with `npx web-push generate-vapid-keys`
- **Handle 410 Gone** to clean up expired subscriptions from your database
- **`notificationclick`** focuses an existing tab or opens a new one for deep linking
- **`tag` property** collapses duplicate notifications instead of stacking
