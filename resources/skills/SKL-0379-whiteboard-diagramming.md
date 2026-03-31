---
id: SKL-0379
name: Whiteboard & Diagramming
category: skills
tags: [whiteboard, diagramming, canvas, drawing, real-time-sync, export, collaboration, svg]
capabilities: [canvas-drawing, real-time-whiteboard, diagram-export, shape-management]
useWhen:
  - building a collaborative whiteboard or diagramming tool
  - implementing an infinite canvas with drawing primitives
  - adding real-time multi-user collaboration to a canvas
  - exporting diagrams as SVG or PNG
  - embedding a drawing tool into another application
estimatedTokens: 650
relatedFragments: [SKL-0152, PAT-0079, SKL-0374]
dependencies: []
synonyms: ["how to build a whiteboard app", "how to create a collaborative drawing tool", "how to implement an infinite canvas", "how to build something like Excalidraw or Miro", "how to add diagramming to my app", "how to export drawings as SVG"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/excalidraw/excalidraw"
difficulty: beginner
owner: "cortex"
pillar: "collaboration"
---

# Skill: Whiteboard & Diagramming

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0379 |
| **Name** | Whiteboard & Diagramming |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Whiteboard tools like Excalidraw provide infinite canvas drawing with a hand-drawn aesthetic. The architecture centers on a scene graph of elements, rendered to HTML Canvas, with optional real-time sync for collaboration.

### Element Model

Every shape on the canvas is an element with a consistent structure:

| Property | Purpose |
|----------|---------|
| **id** | Unique identifier |
| **type** | rectangle, ellipse, diamond, arrow, line, text, freedraw |
| **x, y** | Position coordinates |
| **width, height** | Dimensions |
| **angle** | Rotation in radians |
| **strokeColor, fillColor** | Visual styling |
| **points** | Array of [x, y] for lines and freedraw |
| **groupIds** | Grouping for multi-select operations |

Store the full scene as a JSON array of elements. This makes serialization, undo/redo, and collaboration straightforward.

### Canvas Rendering

Use HTML5 Canvas for rendering with a draw loop:

```
1. Clear canvas
2. Apply viewport transform (pan + zoom)
3. Sort elements by z-index
4. Draw each element with hand-drawn style (roughjs or custom)
5. Draw selection handles for active elements
6. Draw collaborator cursors
```

Excalidraw uses the `roughjs` library for its distinctive hand-drawn appearance. For performance, only render elements within the current viewport bounds (frustum culling).

### Infinite Canvas

Implement pan and zoom via viewport transformation matrix. Store element positions in world coordinates; transform to screen coordinates during rendering. Mouse/touch coordinates convert back to world coordinates for hit testing and element creation.

### Real-Time Collaboration

Sync element changes between users via WebSocket. Each edit sends the full updated element (not a diff) to keep logic simple. Excalidraw uses end-to-end encryption for shared sessions. Conflict resolution: last-write-wins per element, which works because users rarely edit the same shape simultaneously.

### Export Pipeline

Support multiple export formats:

- **PNG**: Render canvas to blob, apply background color, download
- **SVG**: Convert elements to SVG paths (better for documents and printing)
- **Clipboard**: Copy as PNG for pasting into other apps
- **JSON (.excalidraw)**: Full scene data for re-editing

### Embedding

Excalidraw ships as an npm package (`@excalidraw/excalidraw`) for embedding into React applications. The embeddable version accepts initial data, theme, and callback props. This pattern works well for adding diagramming to wikis, documentation tools, or note-taking apps.

## Key Takeaways

- Store scene as a flat JSON array of elements for simple serialization and collaboration
- Viewport transform matrix enables infinite canvas with efficient rendering
- Last-write-wins per element is sufficient for whiteboard collaboration since users rarely edit the same shape
- Ship the drawing engine as an embeddable component to maximize reuse across products
- Export to both raster (PNG) and vector (SVG) formats to cover presentation and print use cases
