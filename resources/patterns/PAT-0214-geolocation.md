---
id: PAT-0214
name: Geolocation Pattern
category: patterns
tags: [geolocation, maps, geocoding, radius-search, routing, spatial-data]
capabilities: [map-integration, geocoding, proximity-search, route-display]
useWhen:
  - adding maps and location features to an application
  - geocoding addresses to coordinates or reverse
  - implementing radius or proximity search
  - displaying routes between locations on a map
  - storing and querying spatial data efficiently
estimatedTokens: 650
relatedFragments: [SKL-0420, SKL-0418, SKL-0417, PAT-0213]
dependencies: []
synonyms: ["how to add maps to an app", "geocoding addresses", "radius search implementation", "how to display routes on a map", "spatial queries in a database", "find nearby locations"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: "cortex"
pillar: "domain-specific"
---

# Geolocation Pattern

Patterns for integrating maps, geocoding, proximity search, and spatial data into applications.

## Map Provider Comparison

| Provider | Free Tier | Strengths | Pricing Model |
|----------|-----------|-----------|---------------|
| **Mapbox** | 50K loads/mo | Custom styling, 3D, navigation | Per-load |
| **Google Maps** | $200/mo credit | Best geocoding, Street View | Per-request |
| **Leaflet + OSM** | Unlimited (self-host) | Open source, lightweight | Free (tile hosting costs) |
| **MapLibre** | Unlimited | Open source Mapbox GL fork | Free |

For cost-sensitive projects, use Leaflet with OpenStreetMap tiles. For rich interactivity, use Mapbox or MapLibre GL JS.

## Geocoding

Geocoding converts addresses to coordinates (lat/lng). Reverse geocoding does the opposite. Cache geocoding results aggressively as they rarely change and API calls are expensive. Batch geocode on import, not on every page load.

```javascript
// Forward geocoding
const response = await fetch(
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token}`
);
const { features } = await response.json();
const [lng, lat] = features[0].center;
```

## Radius / Proximity Search

Find locations within a distance from a point. Two approaches:

**Database-level (recommended):** Use PostGIS for PostgreSQL or geospatial indexes in MongoDB. PostGIS `ST_DWithin` is accurate and fast with spatial indexes.

```sql
SELECT name, ST_Distance(location, ST_SetSRID(ST_MakePoint(-73.99, 40.73), 4326)) AS distance
FROM stores
WHERE ST_DWithin(location, ST_SetSRID(ST_MakePoint(-73.99, 40.73), 4326), 5000)
ORDER BY distance;
```

**Application-level (fallback):** Use the Haversine formula for distance calculation. Viable for small datasets (under 10K points). Pre-filter with a bounding box before calculating exact distances.

## Route Display

Display routes between points using a routing engine. Mapbox Directions API, Google Directions API, or OSRM (open source) provide turn-by-turn routes. Display routes as polylines on the map. Show estimated time and distance. Support waypoints for multi-stop routes.

## Spatial Data Storage

Store coordinates as geographic types, not separate float columns. PostGIS `geography` type handles Earth curvature. Index with GiST or SP-GiST indexes for fast queries. Store GeoJSON for complex shapes (polygons, multipolygons). Use SRID 4326 (WGS 84) as the standard coordinate reference system.

## Guidelines

1. **Cache geocoding results** in your database to reduce API costs
2. **Use database spatial indexes** for proximity queries, not application-level math
3. **Store coordinates as geographic types** for accurate distance calculations
4. **Pre-filter with bounding boxes** before expensive distance calculations
5. **Display maps lazily** (load only when visible) to reduce API costs and page load time
