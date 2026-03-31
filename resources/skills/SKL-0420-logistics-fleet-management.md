---
id: SKL-0420
name: Logistics & Fleet Management
category: skills
tags: [logistics, fleet-management, route-optimization, vehicle-tracking, delivery, supply-chain]
capabilities: [route-optimization, vehicle-tracking, delivery-scheduling, fleet-maintenance]
useWhen:
  - building a fleet management or logistics platform
  - optimizing delivery routes for a vehicle fleet
  - tracking vehicle locations in real time
  - scheduling deliveries and managing dispatch
  - tracking vehicle maintenance and compliance
estimatedTokens: 650
relatedFragments: [PAT-0214, SKL-0417, SKL-0421, PAT-0215]
dependencies: []
synonyms: ["how to build fleet management software", "route optimization algorithm", "vehicle tracking system", "delivery scheduling app", "logistics platform design", "how to track a fleet of vehicles"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/nicedoc/nicedoc.io"
difficulty: intermediate
owner: "cortex"
pillar: "domain-specific"
---

# Skill: Logistics & Fleet Management

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0420 |
| **Name** | Logistics & Fleet Management |
| **Category** | Skills |
| **Complexity** | Intermediate |

## Core Concepts

Logistics and fleet management platforms coordinate vehicles, drivers, routes, and deliveries. The domain is inherently real-time, geospatial, and optimization-heavy.

### Core Data Model

| Entity | Key Fields |
|--------|-----------|
| **Vehicle** | Type, capacity, status, current location, maintenance schedule |
| **Driver** | License, certifications, availability, assigned vehicle |
| **Route** | Origin, destination, waypoints, estimated time, distance |
| **Delivery** | Pickup/dropoff addresses, time windows, status, proof of delivery |
| **Maintenance** | Vehicle, type, date, mileage, cost, next due |

### Route Optimization

Route optimization minimizes total distance, time, or cost while respecting constraints: vehicle capacity, time windows, driver hours, and priority stops. This is a variant of the Vehicle Routing Problem (VRP). For small fleets (under 20 vehicles), use Google OR-Tools or OSRM. For larger fleets, use specialized services like Route4Me or Routific.

Key constraints: maximum driving hours per day, delivery time windows (deliver between 9am-12pm), vehicle capacity (weight and volume), and required skills (refrigerated truck, liftgate).

### Real-Time Vehicle Tracking

Use GPS trackers or smartphone apps to report vehicle positions. Store location data as time-series points. Display on maps with real-time updates (WebSocket or SSE). Calculate ETA based on current position and remaining route. Send automated notifications to customers when delivery is approaching.

```
GPS Device → API → Location Service → WebSocket → Dashboard/Map
                                     → Customer Notification
```

### Delivery Management

Track deliveries through a lifecycle: scheduled, dispatched, in-transit, arrived, completed, failed. Capture proof of delivery (signature, photo, timestamp, GPS coordinates). Handle exceptions: failed delivery attempts, returns, rescheduling. Provide customers with tracking links and real-time ETA updates.

### Fleet Maintenance

Track maintenance by mileage and time intervals: oil changes every 5,000 miles, tire rotation every 10,000 miles, annual inspections. Set automated alerts when maintenance is due. Record all maintenance with cost tracking. Monitor fuel consumption and flag anomalies. Track vehicle lifecycle cost to inform replacement decisions.

## Key Takeaways

- Route optimization must respect capacity, time windows, and driver hour constraints
- Use GPS time-series data for real-time tracking with customer ETA notifications
- Capture proof of delivery with photos, signatures, and GPS coordinates
- Automate maintenance scheduling by mileage and time intervals
- Plan for offline-capable mobile apps for drivers in low-connectivity areas
