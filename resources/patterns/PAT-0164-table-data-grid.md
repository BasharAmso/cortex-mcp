---
id: PAT-0164
name: Table & Data Grid Pattern
category: patterns
tags: [table, data-grid, tanstack-table, sorting, filtering, virtual-scrolling]
capabilities: [table-rendering, sorting-implementation, filtering-logic, virtual-scrolling, column-resizing]
useWhen:
  - building data tables with sorting and filtering
  - implementing pagination for large datasets
  - adding virtual scrolling for performance with many rows
  - creating resizable or reorderable columns
  - choosing between a simple table and a full data grid
estimatedTokens: 650
relatedFragments: [SKL-0318, SKL-0308, PAT-0162]
dependencies: []
synonyms: ["how to build a data table in React", "how to add sorting and filtering to a table", "how to virtualize a large table", "how to implement column resizing", "tanstack table tutorial", "how to paginate a data table"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/TanStack/table"
difficulty: intermediate
owner: "cortex"
pillar: "frontend"
---

# Pattern: Table & Data Grid

## Metadata

| Field | Value |
|-------|-------|
| **Pattern ID** | PAT-0164 |
| **Name** | Table & Data Grid Pattern |
| **Category** | Patterns |
| **Complexity** | Intermediate |

## Core Concepts

Data tables are the primary way to display structured data in business applications. TanStack Table (formerly React Table) is the standard headless library: it handles sorting, filtering, pagination, and column logic while you control the rendering.

### Simple Table vs Data Grid

| Feature | Simple `<table>` | TanStack Table |
|---------|-----------------|----------------|
| Static data display | Yes | Overkill |
| Sorting | Manual implementation | Built-in |
| Filtering | Manual implementation | Built-in |
| Pagination | Manual implementation | Built-in |
| Column resizing | Not supported | Built-in |
| Virtual scrolling | Not supported | Via TanStack Virtual |
| Row selection | Manual implementation | Built-in |

Use a plain `<table>` for static, small datasets (under 50 rows, no interactivity). Use TanStack Table for anything interactive.

### TanStack Table Setup

```typescript
import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';

const columns = [
  { accessorKey: 'name', header: 'Name', cell: (info) => info.getValue() },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role', filterFn: 'equals' },
  {
    accessorKey: 'createdAt',
    header: 'Joined',
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  },
];

function UsersTable({ data }) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((group) => (
          <tr key={group.id}>
            {group.headers.map((header) => (
              <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                {flexRender(header.column.columnDef.header, header.getContext())}
                {{ asc: ' ↑', desc: ' ↓' }[header.column.getIsSorted()] ?? ''}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### Virtual Scrolling for Large Datasets

For tables with thousands of rows, render only the visible rows using TanStack Virtual:

```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

const rowVirtualizer = useVirtualizer({
  count: rows.length,
  getScrollElement: () => tableContainerRef.current,
  estimateSize: () => 48, // estimated row height in px
  overscan: 10, // render 10 extra rows above/below viewport
});
```

Virtual scrolling reduces DOM nodes from thousands to dozens, keeping scroll performance smooth.

### Pagination Patterns

| Type | UX | Best For |
|------|-----|----------|
| **Page numbers** | Traditional, predictable | Admin panels, reports |
| **Load more button** | User-controlled, progressive | Feeds, search results |
| **Infinite scroll** | Automatic, continuous | Social feeds, product catalogs |

For server-side pagination, pass `pageIndex` and `pageSize` to your API and set `manualPagination: true` in TanStack Table.

### Column Features

- **Sorting:** Click header to toggle ascending/descending/none. Support multi-column sort with Shift+click.
- **Filtering:** Global search filters across all columns. Column-specific filters (dropdown for enums, range for numbers) provide precision.
- **Resizing:** Drag column borders to resize. Persist widths to localStorage.
- **Visibility:** Let users toggle columns on/off with a column picker dropdown.
- **Pinning:** Pin important columns to the left or right so they stay visible during horizontal scroll.

### Accessibility

- Use semantic `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>` elements.
- Add `scope="col"` to header cells.
- Use `aria-sort="ascending"` or `aria-sort="descending"` on sorted columns.
- Ensure sort buttons are keyboard-accessible.
- Provide a text description of applied filters for screen readers.

## Anti-Patterns

- Building a custom table system instead of using TanStack Table (reinventing the wheel)
- Rendering thousands of DOM rows without virtualization (causes scroll jank)
- Client-side sorting/filtering on server-paginated data (incomplete results)
- No loading state while fetching data (table flickers or shows stale data)
- Missing empty state when filters return no results

## Key Takeaways

- Use a plain `<table>` for static data; TanStack Table for interactive tables with sorting and filtering
- Virtual scrolling is mandatory for tables with more than a few hundred rows
- Server-side pagination for large datasets; client-side pagination only for small, complete datasets
- Always provide sorting indicators, loading states, and empty states
- Semantic HTML table elements are required for accessibility
