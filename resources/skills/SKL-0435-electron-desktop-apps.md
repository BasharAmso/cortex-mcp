---
id: SKL-0435
name: Electron Desktop Apps
category: skills
tags: [electron, desktop, node, chromium, ipc, auto-update, packaging, cross-platform]
capabilities: [desktop-app-architecture, ipc-communication, auto-updates, native-packaging]
useWhen:
  - building a cross-platform desktop application with web technologies
  - setting up main and renderer process communication
  - packaging an Electron app for distribution
  - implementing auto-update functionality
  - accessing native OS features from a web-based UI
estimatedTokens: 680
relatedFragments: [SKL-0436, SKL-0005, PAT-0224]
dependencies: []
synonyms: ["how to build a desktop app with electron", "electron main renderer process", "electron ipc communication", "package electron app", "electron auto update", "desktop app with javascript"]
lastUpdated: "2026-03-31"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: cortex
pillar: "platform"
---

# Electron Desktop Apps

Building cross-platform desktop applications using Chromium and Node.js, with proper process architecture and distribution.

## Process Architecture

Electron runs two process types. The **main process** (Node.js) manages windows, system tray, menus, and OS-level APIs. The **renderer process** (Chromium) displays your web UI. Each `BrowserWindow` spawns its own renderer.

```js
// main.js — Main process
const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,   // always enable
      nodeIntegration: false,   // always disable in renderer
    },
  });
  win.loadFile("index.html");
}

app.whenReady().then(createWindow);
```

**Security rule:** Never enable `nodeIntegration` in the renderer. Use a preload script with `contextBridge` to expose only the APIs the renderer needs.

## IPC Communication

Use `ipcMain` and `ipcRenderer` through a preload bridge for safe bidirectional messaging:

```js
// preload.js — Exposes safe API to renderer
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  saveFile: (data) => ipcRenderer.invoke("save-file", data),
  onUpdateAvailable: (cb) => ipcRenderer.on("update-available", cb),
});
```

```js
// main.js — Handle IPC in main process
const { ipcMain, dialog } = require("electron");

ipcMain.handle("save-file", async (event, data) => {
  const { filePath } = await dialog.showSaveDialog({ defaultPath: "output.json" });
  if (filePath) await fs.promises.writeFile(filePath, JSON.stringify(data));
  return filePath;
});
```

Use `invoke`/`handle` (promise-based) over `send`/`on` (fire-and-forget) for request-response patterns.

## Auto-Update

`electron-updater` (from `electron-builder`) provides auto-update via GitHub Releases, S3, or custom servers:

```js
const { autoUpdater } = require("electron-updater");

autoUpdater.checkForUpdatesAndNotify();
autoUpdater.on("update-downloaded", () => {
  autoUpdater.quitAndInstall();
});
```

Publish new versions by pushing a tagged release with built artifacts. The app checks for updates on launch and downloads in the background.

## Packaging

Use `electron-builder` or `electron-forge` to produce platform-specific installers:

```json
{
  "build": {
    "appId": "com.example.myapp",
    "mac": { "target": "dmg" },
    "win": { "target": "nsis" },
    "linux": { "target": "AppImage" }
  }
}
```

Keep the main process lean. Heavy computation should run in worker threads or a utility process (`utilityProcess.fork()`), not the main process, to avoid blocking the window manager.

## Key Takeaways

- Always use `contextIsolation: true` and `nodeIntegration: false` for security
- Communicate between processes through a preload bridge with `contextBridge`
- Use `invoke`/`handle` for request-response IPC, `send`/`on` for one-way events
- Package with `electron-builder` or `electron-forge` for native installers
- Offload heavy work to worker threads to keep the UI responsive
