---
id: SKL-0418
name: Agriculture & Farm Management
category: skills
tags: [agriculture, farm-management, crop-tracking, field-mapping, livestock, iot-sensors]
capabilities: [crop-lifecycle-tracking, field-mapping, livestock-record-management, agricultural-planning]
useWhen:
  - building a farm management platform
  - tracking crop planting, growth, and harvest cycles
  - mapping fields and managing land parcels
  - recording livestock health and breeding data
  - integrating IoT sensors for soil and weather monitoring
estimatedTokens: 650
relatedFragments: [PAT-0214, PAT-0215, SKL-0420, SKL-0413]
dependencies: []
synonyms: ["how to build farm management software", "crop tracking system", "field mapping application", "livestock management app", "agricultural planning tool", "farm record keeping software"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/farmOS/farmOS"
difficulty: beginner
owner: "cortex"
pillar: "domain-specific"
---

# Skill: Agriculture & Farm Management

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0418 |
| **Name** | Agriculture & Farm Management |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Farm management software tracks the complex interplay of land, crops, livestock, equipment, and weather. The domain is geospatial by nature and increasingly data-driven through IoT sensors and precision agriculture.

### Data Model

farmOS, the leading open-source farm management system, models farms around assets, logs, and plans. Assets are things (fields, animals, equipment). Logs are events (planting, harvest, observation, input application). Plans group logs into workflows.

| Entity | Examples |
|--------|----------|
| **Land Asset** | Fields, paddocks, greenhouses, with GIS boundaries |
| **Plant Asset** | Crop plantings with variety, quantity, location |
| **Animal Asset** | Individual or group, breed, birth date, parents |
| **Equipment Asset** | Tractors, irrigation systems, sensors |
| **Log** | Seeding, transplanting, harvest, observation, input |
| **Plan** | Crop rotation plan, grazing rotation |

### Crop Tracking

Track the full crop lifecycle: soil preparation, seeding, transplanting, fertilization, pest management, irrigation, and harvest. Record inputs (seed variety, fertilizer type/amount, pesticide applications). Track yields per field per season for year-over-year comparison. Support crop rotation planning to maintain soil health.

### Field Mapping

Fields are geospatial polygons. Use GeoJSON for storage and Leaflet or Mapbox for display. Calculate field area automatically from boundaries. Support multiple layers: soil type, drainage, elevation, and historical yield data. Enable drawing tools for farmers to define field boundaries on satellite imagery.

```json
{
  "type": "Feature",
  "properties": { "name": "North Field", "area_ha": 12.5, "soil_type": "loam" },
  "geometry": { "type": "Polygon", "coordinates": [[[...], ...]] }
}
```

### Livestock Records

Track individual animals or groups with identification (ear tags, RFID). Record health events (vaccinations, treatments, vet visits), breeding (sire, dam, birth dates), and movements between pastures. Support weight tracking over time. Generate reports for regulatory compliance (movement records, medication withdrawal periods).

### Sensor Integration

Connect soil moisture sensors, weather stations, and water meters. Store time-series data. Set threshold alerts (soil moisture below X, temperature frost warning). Display dashboards with current conditions and historical trends. farmOS supports sensor data ingestion via its API.

## Key Takeaways

- Model farms around assets (land, plants, animals) and logs (events/activities)
- Use GeoJSON polygons for field mapping with calculated areas
- Track full crop lifecycle with input records for traceability
- Support offline mobile access for field workers in rural areas
- Integrate IoT sensors with threshold-based alerts for real-time monitoring
