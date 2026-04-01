---
id: EX-0045
name: React Component Testing
category: examples
tags: [react, testing, testing-library, jest, vitest, component, frontend, unit-test, mock]
capabilities: [component-rendering, user-event-simulation, async-testing, api-mocking]
useWhen:
  - writing tests for React components with Testing Library
  - testing user interactions like typing and clicking in React
  - mocking API calls in frontend component tests
estimatedTokens: 650
relatedFragments: [EX-0003, SKL-0005, PAT-0043]
dependencies: []
synonyms: ["react test example", "testing library guide", "component unit test", "frontend test patterns", "react testing best practices"]
sourceUrl: "https://github.com/testing-library/react-testing-library"
lastUpdated: "2026-04-01"
difficulty: intermediate
owner: builder
pillar: "frontend"
---

# React Component Testing

Testing React components with Testing Library covering renders, user events, async data, and API mocking.

## Implementation

```typescript
// --- Component Under Test: SearchPanel ---
// SearchPanel.tsx (simplified for context)
interface SearchResult { id: string; title: string; }
interface SearchPanelProps {
  onSelect: (result: SearchResult) => void;
}

// --- Test File: SearchPanel.test.tsx ---
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { SearchPanel } from './SearchPanel';

// --- Mock API ---
const mockSearchApi = vi.fn();

vi.mock('./api', () => ({
  searchApi: (...args: unknown[]) => mockSearchApi(...args),
}));

const mockResults: SearchResult[] = [
  { id: '1', title: 'React Testing Patterns' },
  { id: '2', title: 'React Component Design' },
];

describe('SearchPanel', () => {
  const onSelect = vi.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchApi.mockResolvedValue(mockResults);
  });

  // --- Render Test ---
  it('renders search input and placeholder', () => {
    render(<SearchPanel onSelect={onSelect} />);

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  // --- User Typing Triggers Search ---
  it('calls API when user types a query', async () => {
    render(<SearchPanel onSelect={onSelect} />);

    const input = screen.getByRole('searchbox');
    await user.type(input, 'React');

    await waitFor(() => {
      expect(mockSearchApi).toHaveBeenCalledWith('React');
    });
  });

  // --- Async Results Rendering ---
  it('displays search results after API response', async () => {
    render(<SearchPanel onSelect={onSelect} />);

    await user.type(screen.getByRole('searchbox'), 'React');

    const listbox = await screen.findByRole('listbox');
    const options = within(listbox).getAllByRole('option');

    expect(options).toHaveLength(2);
    expect(options[0]).toHaveTextContent('React Testing Patterns');
    expect(options[1]).toHaveTextContent('React Component Design');
  });

  // --- Click Selection ---
  it('calls onSelect when a result is clicked', async () => {
    render(<SearchPanel onSelect={onSelect} />);

    await user.type(screen.getByRole('searchbox'), 'React');
    const listbox = await screen.findByRole('listbox');
    await user.click(within(listbox).getByText('React Testing Patterns'));

    expect(onSelect).toHaveBeenCalledWith({ id: '1', title: 'React Testing Patterns' });
  });

  // --- Keyboard Navigation ---
  it('supports keyboard selection with Enter', async () => {
    render(<SearchPanel onSelect={onSelect} />);

    await user.type(screen.getByRole('searchbox'), 'React');
    await screen.findByRole('listbox');
    await user.keyboard('{ArrowDown}{Enter}');

    expect(onSelect).toHaveBeenCalledWith(mockResults[0]);
  });

  // --- Error State ---
  it('shows error message when API fails', async () => {
    mockSearchApi.mockRejectedValueOnce(new Error('Network error'));

    render(<SearchPanel onSelect={onSelect} />);
    await user.type(screen.getByRole('searchbox'), 'React');

    expect(await screen.findByRole('alert')).toHaveTextContent('Search failed');
  });

  // --- Empty State ---
  it('shows empty state when no results found', async () => {
    mockSearchApi.mockResolvedValueOnce([]);

    render(<SearchPanel onSelect={onSelect} />);
    await user.type(screen.getByRole('searchbox'), 'zzz');

    expect(await screen.findByText('No results found')).toBeInTheDocument();
  });
});
```

## Key Patterns

- **User-centric queries**: `getByRole`, `getByPlaceholderText` mirror how users find elements
- **`userEvent.setup()`**: simulates realistic typing and clicks (not `fireEvent`)
- **`waitFor` / `findBy`**: handle async state updates from API calls
- **`vi.mock` with `vi.fn()`**: isolate API layer and control responses per test
- **`within` scoping**: narrows queries to a specific container for precision
