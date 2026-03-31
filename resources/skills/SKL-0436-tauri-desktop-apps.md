---
id: SKL-0436
name: Tauri Desktop Apps
category: skills
tags: [tauri, rust, desktop, webview, lightweight, cross-platform, system-access, security]
capabilities: [rust-backend-integration, webview-frontend, small-binary-output, native-system-access]
useWhen:
  - building a lightweight desktop app without bundling Chromium
  - wanting Rust backend performance with a web frontend
  - needing small binary sizes for desktop distribution
  - accessing native OS APIs securely from a web UI
  - choosing between Electron and Tauri for a desktop project
estimatedTokens: 660
relatedFragments: [SKL-0435, SKL-0005, PAT-0224]
dependencies: []
synonyms: ["tauri app development", "rust desktop app with web frontend", "tauri vs electron", "lightweight desktop app framework", "tauri system access", "build desktop app with tauri"]
lastUpdated: "2026-03-31"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: cortex
pillar: "platform"
---

# Tauri Desktop Apps

Lightweight desktop applications with a Rust backend and web frontend, using the system webview instead of bundling Chromium.

## Architecture

Tauri uses the OS-native webview (WebView2 on Windows, WebKit on macOS/Linux) instead of shipping Chromium. The result is binaries under 10 MB compared to Electron's 150+ MB. The Rust core handles system access, and your frontend can be any web framework (React, Vue, Svelte, vanilla).

```
┌─────────────────────────────┐
│  Frontend (Web UI)          │  ← Any JS framework
│  ↕ Commands / Events        │
│  Rust Core (tauri backend)  │  ← System access, business logic
│  ↕ System Webview           │
│  OS (Windows/macOS/Linux)   │
└─────────────────────────────┘
```

## Commands: Frontend to Rust

Define Rust functions and call them from JavaScript:

```rust
// src-tauri/src/main.rs
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! From Rust.", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error running app");
}
```

```js
// Frontend — call the Rust command
import { invoke } from "@tauri-apps/api/core";

const greeting = await invoke("greet", { name: "World" });
```

Commands are async by default. Return `Result<T, E>` from Rust to handle errors gracefully on the frontend.

## Events: Rust to Frontend

For push-style communication from backend to frontend:

```rust
use tauri::Emitter;

app_handle.emit("download-progress", payload)?;
```

```js
import { listen } from "@tauri-apps/api/event";

const unlisten = await listen("download-progress", (event) => {
  console.log("Progress:", event.payload);
});
```

## Security: Allowlist

Tauri uses a permission system. Each API capability must be explicitly granted in `src-tauri/capabilities/default.json`:

```json
{
  "permissions": [
    "core:default",
    "fs:allow-read",
    "dialog:allow-open",
    "shell:allow-open"
  ]
}
```

Only grant what your app actually needs. This is a significant security advantage over Electron where Node.js APIs are broadly available.

## Building and Distribution

```bash
# Development
cargo tauri dev

# Production build
cargo tauri build
```

Output is a native installer per platform: `.msi`/`.exe` (Windows), `.dmg`/`.app` (macOS), `.deb`/`.AppImage` (Linux). Tauri supports auto-update via its built-in updater plugin with signature verification.

## Key Takeaways

- Tauri produces binaries 10-15x smaller than Electron by using the system webview
- Use `#[tauri::command]` for frontend-to-Rust calls and events for Rust-to-frontend push
- The permission system enforces least-privilege access to OS APIs
- Any web framework works as the frontend — the Rust core is framework-agnostic
- Auto-update is built in with cryptographic signature verification
