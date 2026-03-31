---
id: SKL-0438
name: Expo Development
category: skills
tags: [expo, react-native, eas-build, ota-updates, config-plugins, managed-workflow, mobile]
capabilities: [managed-workflow-setup, eas-build-deployment, ota-updates, config-plugin-customization]
useWhen:
  - starting a new React Native project with Expo
  - configuring EAS Build for iOS and Android
  - pushing over-the-air updates without app store review
  - customizing native configuration with config plugins
  - deciding between managed and bare Expo workflows
estimatedTokens: 660
relatedFragments: [SKL-0437, SKL-0007, PAT-0225]
dependencies: []
synonyms: ["expo react native setup", "eas build tutorial", "expo ota updates", "expo config plugins", "how to start expo project", "expo managed workflow guide"]
lastUpdated: "2026-03-31"
sourceUrl: "https://github.com/expo/expo"
difficulty: beginner
owner: cortex
pillar: "platform"
---

# Expo Development

Managed React Native development with EAS Build, OTA updates, and config plugins.

## Getting Started

Expo provides a managed environment for React Native. No Xcode or Android Studio required for most development:

```bash
npx create-expo-app@latest my-app
cd my-app
npx expo start
```

Scan the QR code with Expo Go (development) or create a development build for custom native modules. The Expo SDK includes 50+ commonly needed native modules (camera, notifications, file system, etc.) that work without manual linking.

## App Configuration

`app.json` (or `app.config.js` for dynamic values) defines your app identity:

```json
{
  "expo": {
    "name": "My App",
    "slug": "my-app",
    "version": "1.0.0",
    "ios": { "bundleIdentifier": "com.example.myapp" },
    "android": { "package": "com.example.myapp" },
    "plugins": ["expo-router", "expo-camera"]
  }
}
```

Use `app.config.js` when you need environment variables or conditional configuration:

```js
export default ({ config }) => ({
  ...config,
  extra: { apiUrl: process.env.API_URL },
});
```

## EAS Build

Expo Application Services (EAS) builds native binaries in the cloud:

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure build profiles
eas build:configure

# Build for both platforms
eas build --platform all --profile production
```

Build profiles in `eas.json` define environments (development, preview, production). Development builds include the dev client for hot reloading with native modules. Preview builds are for internal testing. Production builds go to app stores.

## OTA Updates

Push JavaScript and asset changes without app store review:

```bash
eas update --branch production --message "Fix checkout bug"
```

OTA updates change JS bundles and assets only — not native code. If you add a new native module, you need a full binary build. Use `expo-updates` runtime version policy to prevent mismatches between JS and native layers.

## Config Plugins

Customize native project configuration without ejecting:

```js
// plugins/withCustomScheme.js
const { withAndroidManifest } = require("expo/config-plugins");

module.exports = function withCustomScheme(config) {
  return withAndroidManifest(config, (config) => {
    // Modify AndroidManifest.xml
    return config;
  });
};
```

Config plugins run at build time to modify `Info.plist`, `AndroidManifest.xml`, Gradle files, or Podfiles. Most Expo SDK packages include their own config plugins — you only write custom ones for third-party native modules.

## Key Takeaways

- Start with `create-expo-app` for the fastest React Native setup
- Use EAS Build profiles to separate development, preview, and production builds
- OTA updates ship JS changes instantly but cannot modify native code
- Config plugins customize native configuration without ejecting from managed workflow
- Use `app.config.js` over `app.json` when you need environment variables
