---
id: EX-0019
name: Product Catalog with Filters
category: examples
tags: [ecommerce, product, catalog, filter, search, faceted, typescript, react]
capabilities: [product-listing, faceted-filtering, search-integration]
useWhen:
  - building a product listing page with filters
  - implementing faceted search for an e-commerce store
  - designing a filterable catalog with categories and price ranges
estimatedTokens: 650
relatedFragments: [SKL-0257, PAT-0136, SKL-0271, EX-0020]
dependencies: []
synonyms: ["product listing page", "ecommerce catalog", "faceted search example", "product filter component", "shop page with filters"]
sourceUrl: "https://github.com/medusajs/medusa"
lastUpdated: "2026-04-01"
difficulty: intermediate
owner: builder
pillar: "ecommerce"
---

# Product Catalog with Filters

A faceted product catalog with category, price, and attribute filters.

## Implementation

```typescript
// --- Types ---
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  attributes: Record<string, string>;
  inStock: boolean;
}

interface FilterState {
  categories: string[];
  priceMin?: number;
  priceMax?: number;
  attributes: Record<string, string[]>;
  inStockOnly: boolean;
  sortBy: 'price-asc' | 'price-desc' | 'name' | 'newest';
  page: number;
  pageSize: number;
}

interface CatalogResult {
  products: Product[];
  total: number;
  facets: { category: Record<string, number>; priceRange: { min: number; max: number } };
}

// --- Catalog Engine ---
function queryCatalog(products: Product[], filters: FilterState): CatalogResult {
  let filtered = products;

  // Category filter
  if (filters.categories.length > 0) {
    filtered = filtered.filter(p => filters.categories.includes(p.category));
  }

  // Price range
  if (filters.priceMin !== undefined) {
    filtered = filtered.filter(p => p.price >= filters.priceMin!);
  }
  if (filters.priceMax !== undefined) {
    filtered = filtered.filter(p => p.price <= filters.priceMax!);
  }

  // Attribute filters (AND across attributes, OR within)
  for (const [attr, values] of Object.entries(filters.attributes)) {
    if (values.length > 0) {
      filtered = filtered.filter(p => values.includes(p.attributes[attr]));
    }
  }

  // Stock filter
  if (filters.inStockOnly) {
    filtered = filtered.filter(p => p.inStock);
  }

  // Build facets from filtered results
  const facets = {
    category: filtered.reduce<Record<string, number>>((acc, p) => {
      acc[p.category] = (acc[p.category] ?? 0) + 1;
      return acc;
    }, {}),
    priceRange: {
      min: Math.min(...filtered.map(p => p.price)),
      max: Math.max(...filtered.map(p => p.price)),
    },
  };

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'name': return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  // Paginate
  const start = filters.page * filters.pageSize;
  return {
    products: sorted.slice(start, start + filters.pageSize),
    total: sorted.length,
    facets,
  };
}

// --- React Hook (simplified) ---
function useProductCatalog(allProducts: Product[]) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    attributes: {},
    inStockOnly: false,
    sortBy: 'newest',
    page: 0,
    pageSize: 24,
  });

  const result = useMemo(
    () => queryCatalog(allProducts, filters),
    [allProducts, filters]
  );

  const updateFilter = (patch: Partial<FilterState>) =>
    setFilters(prev => ({ ...prev, ...patch, page: 0 }));

  return { ...result, filters, updateFilter };
}
```

## Key Patterns

- **Faceted filtering**: compute category counts from filtered (not total) results so counts reflect active filters
- **AND across attributes, OR within**: "Color: Red OR Blue" AND "Size: M" narrows correctly
- **Reset page on filter change**: `page: 0` in `updateFilter` prevents empty pages
- **Separate engine from UI**: `queryCatalog` is pure, testable, framework-agnostic
