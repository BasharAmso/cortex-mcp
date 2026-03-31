---
id: PAT-0222
name: Platform Adaptive UI
category: patterns
tags: [adaptive-ui, platform-detection, ios, android, web, responsive, cross-platform, conditional-rendering]
capabilities: [platform-detection, adaptive-component-rendering, platform-specific-styling, os-convention-matching]
useWhen:
  - building cross-platform apps that should feel native on each platform
  - adapting UI behavior for iOS vs Android vs Web conventions
  - implementing platform-specific navigation or interaction patterns
  - handling platform differences in safe areas, fonts, or gestures
  - designing shared components that respect OS conventions
estimatedTokens: 660
relatedFragments: [SKL-0443, SKL-0437, SKL-0007, PAT-0224]
dependencies: []
synonyms: ["adapt ui per platform", "ios vs android ui differences", "platform specific components", "cross platform adaptive design", "platform conditional rendering", "responsive platform ui"]
lastUpdated: "2026-03-31"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: cortex
pillar: "platform"
---

# Pattern: Platform Adaptive UI

Adapting user interfaces to match platform conventions while sharing as much code as possible.

## The Problem

Cross-platform frameworks share code, but iOS and Android users expect different interaction patterns. A tab bar at the bottom feels right on iOS; Android users expect a navigation drawer. Ignoring these conventions makes your app feel foreign on every platform.

## Platform Detection

In React Native, detect the platform and adapt:

```tsx
import { Platform } from "react-native";

// Simple conditional
const padding = Platform.OS === "ios" ? 20 : 16;

// Platform.select for multi-platform values
const fontFamily = Platform.select({
  ios: "San Francisco",
  android: "Roboto",
  web: "Inter, system-ui",
  default: "system-ui",
});
```

For larger divergences, use platform-specific files:

```
Button.tsx         ← shared logic
Button.ios.tsx     ← iOS-specific rendering
Button.android.tsx ← Android-specific rendering
```

React Native's module resolver picks the right file automatically.

## Adaptive Component Pattern

Create a wrapper that selects the right implementation per platform:

```tsx
function NavigationContainer({ children }) {
  if (Platform.OS === "ios") {
    return <TabNavigation>{children}</TabNavigation>;
  }
  return <DrawerNavigation>{children}</DrawerNavigation>;
}
```

For Flutter, use `Platform` checks or the `flutter_platform_widgets` package:

```dart
import 'dart:io' show Platform;

Widget buildButton() {
  if (Platform.isIOS) {
    return CupertinoButton(child: Text("Tap"), onPressed: onTap);
  }
  return ElevatedButton(child: Text("Tap"), onPressed: onTap);
}
```

## Key Platform Differences

| Element | iOS Convention | Android Convention |
|---------|---------------|-------------------|
| **Navigation** | Bottom tabs, swipe back | Drawer menu, system back button |
| **Lists** | Swipe to reveal actions | Long press for context menu |
| **Dates** | Scroll wheel picker | Calendar popup |
| **Alerts** | Centered modal with stacked buttons | Bottom sheet or dialog |
| **Typography** | San Francisco, lighter weights | Roboto, Material type scale |
| **Safe areas** | Notch + home indicator | Status bar + navigation bar |

## Web Adaptation

For apps that also run on web (React Native Web, Flutter Web):

```tsx
const isWeb = Platform.OS === "web";

// Use hover states only on web
const interactionStyle = isWeb
  ? { cursor: "pointer", ":hover": { opacity: 0.8 } }
  : { activeOpacity: 0.7 };

// Replace native gestures with click handlers on web
const onInteract = isWeb ? { onClick: handler } : { onPress: handler };
```

## Key Takeaways

- Use `Platform.select` for value-level differences, platform-specific files for component-level differences
- Match OS conventions for navigation, alerts, and list interactions
- Adapt typography, spacing, and safe areas per platform
- Share business logic and state; diverge only at the interaction layer
- Test on real devices — simulators miss subtle platform behavior differences
