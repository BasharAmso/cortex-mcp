---
id: EX-0042
name: Property Listing Platform
category: examples
tags: [real-estate, property, listing, search, map, geolocation, filters, typescript]
capabilities: [property-search, distance-calculation, listing-scoring, saved-searches]
useWhen:
  - building a real estate listing site with search filters
  - implementing property search with map and distance calculations
  - designing a listing match scoring system for property recommendations
estimatedTokens: 650
relatedFragments: [SKL-0154, PAT-0082]
dependencies: []
synonyms: ["real estate app", "property search engine", "MLS listing platform", "home finder", "rental listing system"]
sourceUrl: "https://github.com/realtyna/flavor"
lastUpdated: "2026-04-01"
difficulty: intermediate
owner: builder
pillar: "domain-specific"
---

# Property Listing Platform

Real estate listing engine with search filters, distance calculation, and listing match scoring.

## Implementation

```typescript
// --- Types ---
interface Property {
  id: string;
  title: string;
  price: number;
  type: 'house' | 'apartment' | 'condo' | 'townhouse';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  lat: number;
  lng: number;
  amenities: string[];
  listedAt: Date;
}

interface SearchFilters {
  priceMin?: number;
  priceMax?: number;
  types?: Property['type'][];
  bedroomsMin?: number;
  bathroomsMin?: number;
  sqftMin?: number;
  amenities?: string[];
  centerLat?: number;
  centerLng?: number;
  radiusMiles?: number;
  sortBy: 'price-asc' | 'price-desc' | 'newest' | 'best-match';
}

interface SavedSearch {
  id: string;
  userId: string;
  name: string;
  filters: SearchFilters;
  notifyOnNew: boolean;
  createdAt: Date;
}

interface SearchResult {
  property: Property;
  distanceMiles?: number;
  matchScore: number;
}

// --- Distance Calculation (Haversine) ---
function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8; // Earth radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180)
    * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// --- Match Scoring ---
function scoreProperty(property: Property, filters: SearchFilters): number {
  let score = 50; // base score

  // Price: closer to midpoint of range scores higher
  if (filters.priceMin !== undefined && filters.priceMax !== undefined) {
    const mid = (filters.priceMin + filters.priceMax) / 2;
    const deviation = Math.abs(property.price - mid) / mid;
    score += Math.max(0, 25 * (1 - deviation));
  }

  // Amenity overlap
  if (filters.amenities && filters.amenities.length > 0) {
    const matched = filters.amenities.filter(a => property.amenities.includes(a)).length;
    score += 15 * (matched / filters.amenities.length);
  }

  // Recency bonus (listed within 7 days)
  const daysOld = (Date.now() - property.listedAt.getTime()) / 86400000;
  if (daysOld <= 7) score += 10 * (1 - daysOld / 7);

  return Math.round(score);
}

// --- Search Engine ---
function searchProperties(properties: Property[], filters: SearchFilters): SearchResult[] {
  let results: SearchResult[] = properties.map(property => {
    const distanceMiles = (filters.centerLat !== undefined && filters.centerLng !== undefined)
      ? haversineDistance(filters.centerLat, filters.centerLng, property.lat, property.lng)
      : undefined;
    return { property, distanceMiles, matchScore: scoreProperty(property, filters) };
  });

  // Apply filters
  results = results.filter(({ property, distanceMiles }) => {
    if (filters.priceMin !== undefined && property.price < filters.priceMin) return false;
    if (filters.priceMax !== undefined && property.price > filters.priceMax) return false;
    if (filters.types?.length && !filters.types.includes(property.type)) return false;
    if (filters.bedroomsMin !== undefined && property.bedrooms < filters.bedroomsMin) return false;
    if (filters.bathroomsMin !== undefined && property.bathrooms < filters.bathroomsMin) return false;
    if (filters.sqftMin !== undefined && property.sqft < filters.sqftMin) return false;
    if (filters.radiusMiles !== undefined && distanceMiles !== undefined && distanceMiles > filters.radiusMiles) return false;
    return true;
  });

  // Sort
  results.sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-asc': return a.property.price - b.property.price;
      case 'price-desc': return b.property.price - a.property.price;
      case 'newest': return b.property.listedAt.getTime() - a.property.listedAt.getTime();
      case 'best-match': return b.matchScore - a.matchScore;
    }
  });

  return results;
}
```

## Key Patterns

- **Haversine formula**: accurate distance between two GPS coordinates on Earth's surface
- **Match scoring**: weighted composite score from price proximity, amenity overlap, and recency
- **Radius filtering**: geographic search within a configurable distance from a center point
- **Saved searches**: persist filter criteria per user with new-listing notification flag
