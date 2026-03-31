---
id: PAT-0223
name: Deep Linking Pattern
category: patterns
tags: [deep-linking, universal-links, app-links, deferred-deep-links, routing, mobile, navigation]
capabilities: [universal-link-setup, app-link-configuration, deferred-deep-link-handling, deep-link-routing]
useWhen:
  - enabling URLs to open specific screens in a mobile app
  - setting up universal links (iOS) or app links (Android)
  - implementing deferred deep links for users who haven't installed the app
  - routing deep link URLs to the correct screen and parameters
  - handling deep links during onboarding or authentication flows
estimatedTokens: 680
relatedFragments: [SKL-0437, SKL-0438, PAT-0222, SKL-0007]
dependencies: []
synonyms: ["universal links setup", "android app links", "deep link routing mobile", "deferred deep linking", "open app from url", "deep link to specific screen"]
lastUpdated: "2026-03-31"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: cortex
pillar: "platform"
---

# Pattern: Deep Linking

Enabling URLs to open specific content inside your mobile app, including universal links, app links, and deferred deep links.

## The Problem

Users share links, receive notifications, and click emails. Without deep linking, these all open a web browser or the app's home screen. Deep linking routes users directly to the relevant content, reducing friction and improving engagement.

## Link Types

| Type | Platform | Behavior |
|------|----------|----------|
| **URI Scheme** | Both | `myapp://item/42` — opens app only, no fallback |
| **Universal Links** | iOS | `https://myapp.com/item/42` — opens app if installed, web if not |
| **App Links** | Android | `https://myapp.com/item/42` — opens app if installed, web if not |
| **Deferred Deep Links** | Both | Remembers the target URL through app store install |

**Prefer universal/app links** over URI schemes. They work as normal web URLs when the app isn't installed and don't require the user to have the app.

## iOS Universal Links Setup

1. Host an `apple-app-site-association` file at `https://myapp.com/.well-known/apple-app-site-association`:

```json
{
  "applinks": {
    "apps": [],
    "details": [{
      "appID": "TEAMID.com.example.myapp",
      "paths": ["/item/*", "/user/*", "/invite/*"]
    }]
  }
}
```

2. Enable Associated Domains in Xcode: `applinks:myapp.com`

## Android App Links Setup

Add intent filters to `AndroidManifest.xml`:

```xml
<intent-filter android:autoVerify="true">
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data android:scheme="https" android:host="myapp.com"
        android:pathPrefix="/item" />
</intent-filter>
```

Host a Digital Asset Links file at `https://myapp.com/.well-known/assetlinks.json` to verify ownership.

## Routing Deep Links

Map URL paths to screens in your navigation configuration:

```tsx
// React Navigation linking config
const linking = {
  prefixes: ["https://myapp.com", "myapp://"],
  config: {
    screens: {
      Home: "",
      ItemDetail: "item/:id",
      UserProfile: "user/:username",
      InviteAccept: "invite/:code",
    },
  },
};
```

## Deferred Deep Links

For users who click a link but don't have the app installed yet:

```
User clicks link → App not installed → Redirect to App Store
→ User installs → First launch → Route to original destination
```

Implementation options:
- **Branch.io / AppsFlyer** — third-party SDKs that handle deferred deep links via fingerprinting and clipboard
- **Clipboard-based** — copy a token to clipboard before store redirect, read on first launch
- **Server-side** — store the deep link target server-side keyed by device fingerprint or IP

## Handling Auth-Gated Deep Links

When a deep link targets an authenticated screen:

```tsx
function DeepLinkHandler({ url }) {
  const { isAuthenticated } = useAuth();
  const { screen, params } = parseDeepLink(url);

  if (!isAuthenticated) {
    // Store destination, redirect to login
    storePostAuthDestination({ screen, params });
    return <Navigate to="Login" />;
  }

  return <Navigate to={screen} params={params} />;
}
```

Save the intended destination before authentication. After login completes, navigate to the stored destination.

## Key Takeaways

- Use universal links (iOS) and app links (Android) over custom URI schemes
- Host verification files at `.well-known/` to prove domain ownership
- Map URL paths to screens in your navigation configuration
- Handle auth-gated deep links by storing the destination through the login flow
- Use a third-party SDK for deferred deep links unless your needs are simple
