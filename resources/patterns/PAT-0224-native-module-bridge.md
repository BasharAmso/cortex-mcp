---
id: PAT-0224
name: Native Module Bridge
category: patterns
tags: [native-module, bridge, swift, kotlin, react-native, flutter, platform-channel, turbo-modules]
capabilities: [native-code-bridging, platform-channel-communication, turbo-module-creation, native-api-exposure]
useWhen:
  - accessing native APIs not available in your cross-platform framework
  - bridging Swift or Kotlin code to React Native or Flutter
  - creating a native module for device hardware access
  - wrapping an existing native SDK for cross-platform use
  - optimizing a performance-critical feature with native code
estimatedTokens: 700
relatedFragments: [SKL-0437, SKL-0438, SKL-0111, PAT-0222]
dependencies: []
synonyms: ["react native native module", "flutter platform channel", "bridge swift to react native", "bridge kotlin to javascript", "native module integration", "cross platform native code"]
lastUpdated: "2026-03-31"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: advanced
owner: cortex
pillar: "platform"
---

# Pattern: Native Module Bridge

Bridging native platform code (Swift/Kotlin) to cross-platform JavaScript or Dart frameworks.

## The Problem

Cross-platform frameworks cover most APIs, but sometimes you need direct access to platform-specific features: a proprietary SDK, hardware API, or performance-critical computation that must run natively. A native module bridge lets you write Swift/Kotlin code and call it from your cross-platform layer.

## React Native: Turbo Modules (New Architecture)

The new architecture uses JSI (JavaScript Interface) for synchronous, type-safe communication:

```ts
// NativeBiometrics.ts — Spec file (codegen input)
import type { TurboModule } from "react-native";
import { TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  authenticate(reason: string): Promise<boolean>;
  isAvailable(): boolean;
}

export default TurboModuleRegistry.getEnforcing<Spec>("Biometrics");
```

```swift
// ios/BiometricsModule.swift
@objc(Biometrics)
class BiometricsModule: NSObject {
  @objc func authenticate(_ reason: String,
                           resolve: @escaping RCTPromiseResolveBlock,
                           reject: @escaping RCTPromiseRejectBlock) {
    let context = LAContext()
    context.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics,
                           localizedReason: reason) { success, error in
      success ? resolve(true) : reject("AUTH_FAILED", error?.localizedDescription, error)
    }
  }

  @objc func isAvailable() -> Bool {
    return LAContext().canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: nil)
  }
}
```

```kotlin
// android/BiometricsModule.kt
class BiometricsModule(reactContext: ReactApplicationContext)
  : NativeBiometricsSpec(reactContext) {

  override fun authenticate(reason: String, promise: Promise) {
    val executor = ContextCompat.getMainExecutor(reactApplicationContext)
    val callback = object : BiometricPrompt.AuthenticationCallback() {
      override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
        promise.resolve(true)
      }
      override fun onAuthenticationFailed() {
        promise.reject("AUTH_FAILED", "Biometric authentication failed")
      }
    }
    // Show biometric prompt...
  }

  override fun isAvailable(): Boolean {
    val manager = BiometricManager.from(reactApplicationContext)
    return manager.canAuthenticate(BIOMETRIC_STRONG) == BIOMETRIC_SUCCESS
  }
}
```

## Flutter: Platform Channels

Flutter uses message-based platform channels:

```dart
// lib/biometrics.dart
class Biometrics {
  static const _channel = MethodChannel('com.example/biometrics');

  static Future<bool> authenticate(String reason) async {
    return await _channel.invokeMethod('authenticate', {'reason': reason});
  }
}
```

```swift
// ios/Runner/AppDelegate.swift
let channel = FlutterMethodChannel(name: "com.example/biometrics",
                                    binaryMessenger: controller.binaryMessenger)
channel.setMethodCallHandler { call, result in
  switch call.method {
  case "authenticate":
    let reason = (call.arguments as! [String: Any])["reason"] as! String
    // Perform authentication...
    result(true)
  default:
    result(FlutterMethodNotImplemented)
  }
}
```

## Expo: Config Plugins + Modules API

For Expo, create a native module without ejecting:

```ts
// modules/biometrics/index.ts
import { requireNativeModule } from "expo-modules-core";

const BiometricsModule = requireNativeModule("Biometrics");

export function authenticate(reason: string): Promise<boolean> {
  return BiometricsModule.authenticate(reason);
}
```

Expo Modules API uses Swift and Kotlin DSLs that reduce boilerplate compared to raw React Native bridges.

## Best Practices

| Guideline | Rationale |
|-----------|-----------|
| Keep the bridge surface small | Fewer methods = less maintenance across platforms |
| Use promises for async operations | Consistent error handling on both sides |
| Validate arguments on the native side | Don't trust the JS layer to send correct types |
| Write platform-specific tests | Bridge bugs are hard to debug from the JS layer |
| Wrap third-party SDKs, don't expose them directly | Insulates your JS code from SDK API changes |

## Key Takeaways

- React Native Turbo Modules use JSI for type-safe, synchronous native access
- Flutter uses MethodChannel for message-based communication with native code
- Expo Modules API provides the least boilerplate for Expo projects
- Keep the native bridge surface small and validate all arguments on the native side
- Wrap third-party SDKs behind your own interface to insulate from API changes
