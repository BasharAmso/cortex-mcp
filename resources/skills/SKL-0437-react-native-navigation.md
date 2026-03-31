---
id: SKL-0437
name: React Native Navigation
category: skills
tags: [react-native, navigation, stack, tabs, drawer, deep-linking, expo-router, mobile]
capabilities: [stack-navigation, tab-navigation, drawer-navigation, deep-linking-setup]
useWhen:
  - setting up navigation in a React Native app
  - choosing between React Navigation and Expo Router
  - implementing tab, stack, or drawer navigation patterns
  - adding deep linking or universal links to a mobile app
  - handling nested navigation and screen params
estimatedTokens: 680
relatedFragments: [SKL-0438, SKL-0007, PAT-0223]
dependencies: []
synonyms: ["react native navigation setup", "react navigation stack tabs", "expo router navigation", "deep linking react native", "mobile app navigation pattern", "react native screen transitions"]
lastUpdated: "2026-03-31"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: cortex
pillar: "platform"
---

# React Native Navigation

Stack, tab, and drawer navigation patterns with deep linking support for React Native apps.

## React Navigation vs Expo Router

**React Navigation** is the foundational library — imperative API, full control. **Expo Router** wraps React Navigation with file-based routing (like Next.js for mobile). For Expo projects, prefer Expo Router. For bare React Native or advanced cases, use React Navigation directly.

## Stack Navigator

Screen-to-screen navigation with a back stack:

```tsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen}
        options={{ presentation: "modal" }} />
    </Stack.Navigator>
  );
}
```

Navigate with `navigation.navigate("Detail", { id: 42 })`. Use `presentation: "modal"` for modal-style screens.

## Tab Navigator

Bottom tab bar for top-level sections:

```tsx
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={FeedStack} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}
```

**Pattern:** Each tab should contain its own stack navigator so screens within a tab maintain their own back history.

## Drawer Navigator

Side menu navigation for content-heavy apps:

```tsx
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

function AppDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Bookmarks" component={BookmarksScreen} />
    </Drawer.Navigator>
  );
}
```

## Nesting Navigators

Combine navigators for complex flows: tabs at the root, stacks inside each tab, and an auth stack that conditionally replaces the main navigator.

```tsx
function Root() {
  return isSignedIn ? <MainTabs /> : <AuthStack />;
}
```

Keep nesting shallow — three levels maximum. Deep nesting creates confusing navigation state and parameter passing.

## Deep Linking

Configure a linking map so URLs open specific screens:

```tsx
const linking = {
  prefixes: ["myapp://", "https://myapp.com"],
  config: {
    screens: {
      Home: "",
      Detail: "item/:id",
      Profile: "user/:username",
    },
  },
};

<NavigationContainer linking={linking}>
  {/* navigators */}
</NavigationContainer>
```

For Expo Router, deep linking is automatic — file paths map directly to URL paths (`app/item/[id].tsx` handles `myapp://item/42`).

## Key Takeaways

- Use Expo Router for file-based routing in Expo projects; React Navigation for bare RN
- Nest a stack inside each tab to preserve per-tab navigation history
- Keep navigator nesting to three levels maximum for maintainability
- Use `presentation: "modal"` for overlay screens instead of custom animations
- Configure deep linking early — retrofitting it is significantly harder
