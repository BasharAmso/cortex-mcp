---
id: EX-0046
name: Mobile Navigation Patterns
category: examples
tags: [react-native, navigation, tab-bar, stack, deep-linking, mobile, expo, typescript]
capabilities: [tab-navigation, stack-navigation, deep-linking, navigation-typing]
useWhen:
  - setting up tab bar and stack navigation in React Native
  - implementing deep linking for a mobile app
  - configuring typed navigation with React Navigation
estimatedTokens: 630
relatedFragments: [EX-0010, SKL-0007, PAT-0166]
dependencies: []
synonyms: ["react native navigation", "mobile tab bar setup", "deep link config", "stack navigator example", "react navigation boilerplate"]
sourceUrl: "https://github.com/react-navigation/react-navigation"
lastUpdated: "2026-04-01"
difficulty: intermediate
owner: builder
pillar: "app-polish"
---

# Mobile Navigation Patterns

Tab bar, stack navigation, and deep linking for React Native with full TypeScript types.

## Implementation

```typescript
import React from 'react';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

// --- Navigation Types ---
type HomeStackParams = {
  Feed: undefined;
  PostDetail: { postId: string };
  UserProfile: { userId: string };
};

type SearchStackParams = {
  Search: undefined;
  SearchResults: { query: string };
};

type TabParams = {
  HomeTab: undefined;
  SearchTab: undefined;
  SettingsTab: undefined;
};

// --- Stack Navigators ---
const HomeStack = createNativeStackNavigator<HomeStackParams>();
const SearchStack = createNativeStackNavigator<SearchStackParams>();
const Tab = createBottomTabNavigator<TabParams>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        animation: 'slide_from_right',
      }}
    >
      <HomeStack.Screen name="Feed" component={FeedScreen} options={{ title: 'Home' }} />
      <HomeStack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={({ route }) => ({ title: `Post ${route.params.postId}` })}
      />
      <HomeStack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{ title: 'Profile' }}
      />
    </HomeStack.Navigator>
  );
}

function SearchNavigator() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="Search" component={SearchScreen} />
      <SearchStack.Screen name="SearchResults" component={SearchResultsScreen} />
    </SearchStack.Navigator>
  );
}

// --- Tab Icon Map ---
const TAB_ICONS: Record<keyof TabParams, { focused: string; default: string }> = {
  HomeTab: { focused: 'home', default: 'home-outline' },
  SearchTab: { focused: 'search', default: 'search-outline' },
  SettingsTab: { focused: 'settings', default: 'settings-outline' },
};

// --- Deep Linking ---
const prefix = Linking.createURL('/');

const linking: LinkingOptions<TabParams> = {
  prefixes: [prefix, 'https://myapp.com'],
  config: {
    screens: {
      HomeTab: {
        screens: {
          Feed: '',
          PostDetail: 'post/:postId',
          UserProfile: 'user/:userId',
        },
      },
      SearchTab: {
        screens: {
          Search: 'search',
          SearchResults: 'search/:query',
        },
      },
      SettingsTab: 'settings',
    },
  },
};

// --- Root Navigator ---
export default function AppNavigator() {
  return (
    <NavigationContainer linking={linking}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            const icons = TAB_ICONS[route.name];
            const iconName = focused ? icons.focused : icons.default;
            return <Ionicons name={iconName as any} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#8E8E93',
        })}
      >
        <Tab.Screen name="HomeTab" component={HomeNavigator} options={{ title: 'Home' }} />
        <Tab.Screen name="SearchTab" component={SearchNavigator} options={{ title: 'Search' }} />
        <Tab.Screen name="SettingsTab" component={SettingsScreen} options={{ title: 'Settings' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

## Key Patterns

- **Typed params**: `NativeStackNavigator<Params>` gives compile-time safety on `route.params`
- **Nested navigation**: each tab owns its own stack so back-navigation stays within the tab
- **Deep link config**: URL paths map to screen names, enabling `myapp.com/post/123` to open PostDetail
- **Tab icon map**: declarative focused/unfocused icon lookup avoids inline conditionals
