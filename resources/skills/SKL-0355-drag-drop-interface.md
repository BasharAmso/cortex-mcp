---
id: SKL-0355
name: Drag & Drop Interface
category: skills
tags: [drag-drop, sortable, kanban, dnd, file-upload, reorder, accessibility, touch]
capabilities: [sortable-lists, kanban-boards, file-drop-zones, drag-accessibility]
useWhen:
  - building sortable lists or reorderable content
  - implementing kanban board drag between columns
  - creating drag-to-upload file drop zones
  - making drag interactions accessible to keyboard users
  - adding touch support for drag operations on mobile
estimatedTokens: 650
relatedFragments: [SKL-0346, SKL-0005, SKL-0350, PAT-0015]
dependencies: []
synonyms: ["how to add drag and drop", "sortable list implementation", "kanban board drag between columns", "file drag and drop upload", "accessible drag and drop", "reorder items by dragging"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: "cortex"
pillar: "app-polish"
---

# Drag & Drop Interface

Drag and drop is intuitive for visual reordering but notoriously hard to implement well. The challenges are touch support, accessibility, drop zone feedback, and maintaining state consistency.

## Library Selection

| Library | Best For | Size |
|---------|----------|------|
| `@dnd-kit/core` | Modern React apps, flexible API | ~15KB |
| `react-beautiful-dnd` | Kanban boards (archived, use dnd-kit) | ~30KB |
| HTML Drag and Drop API | Simple file drops only | 0KB |
| `SortableJS` | Framework-agnostic sortable lists | ~10KB |

Recommendation: Use `@dnd-kit` for React projects. It handles keyboard, touch, and pointer events with a unified API.

## Sortable List with dnd-kit

```jsx
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} role="listitem">
      {children}
    </div>
  );
}

function SortableList({ items, onReorder }) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) onReorder(active.id, over.id);
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
        <div role="list" aria-label="Reorderable list">
          {items.map(item => (
            <SortableItem key={item.id} id={item.id}>{item.content}</SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
```

## File Drop Zone

```jsx
function FileDropZone({ onFiles, accept = '*' }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    onFiles(files);
  };

  return (
    <div
      onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
    >
      <p>{isDragging ? 'Drop files here' : 'Drag files here or click to browse'}</p>
      <input type="file" accept={accept} multiple className="sr-only" onChange={e => onFiles(Array.from(e.target.files))} />
    </div>
  );
}
```

## Accessibility Requirements

Drag and drop must have a keyboard alternative:

- **Arrow keys** to move the selected item up/down
- **Space/Enter** to pick up and drop an item
- **Escape** to cancel a drag operation
- **Screen reader announcements** for position changes: "Item moved from position 2 to position 3"

```jsx
// dnd-kit provides this via KeyboardSensor + announcements
const announcements = {
  onDragStart: ({ active }) => `Picked up ${active.id}. Use arrow keys to move.`,
  onDragOver: ({ active, over }) => `${active.id} is over ${over?.id}.`,
  onDragEnd: ({ active, over }) => `${active.id} dropped${over ? ` on ${over.id}` : ''}.`,
  onDragCancel: ({ active }) => `Dragging cancelled. ${active.id} returned to original position.`,
};
```

## Visual Feedback Checklist

- [ ] Dragged item has reduced opacity or elevation change
- [ ] Drop zones highlight when a draggable hovers over them
- [ ] A placeholder/ghost shows where the item will land
- [ ] Items animate into their new positions after a drop
- [ ] Cursor changes to `grab` on hover, `grabbing` while dragging
- [ ] Cancel animation returns the item to its original spot

## Key Takeaways

- Use `@dnd-kit` for React; it handles pointer, touch, and keyboard in one API
- Always provide keyboard alternatives; drag and drop is not accessible by default
- Set an activation distance (5px) to prevent accidental drags from clicks
- Show clear visual feedback for every phase: hover, pickup, over target, and drop
- For file uploads, combine a drop zone with a traditional file input as fallback
