---
id: SKL-0194
name: Coffee Shop Operations
category: skills
tags: [coffee-shop, pos, menu-management, order-queue, waste-reduction, daily-prep]
capabilities: [menu-management, order-processing, inventory-tracking, waste-analysis]
useWhen:
  - setting up point of sale and menu management for a coffee shop
  - tracking daily prep quantities to reduce waste
  - managing an order queue during peak hours
  - analyzing sales data to optimize menu offerings
  - coordinating inventory with daily production needs
estimatedTokens: 650
relatedFragments: [SKL-0192, PAT-0100, PAT-0103]
dependencies: []
synonyms: ["how do I manage a coffee shop menu and orders", "what is the best POS setup for a small cafe", "how to reduce food waste in a coffee shop", "how do I track daily prep and inventory", "how to handle peak hour order queues"]
lastUpdated: "2026-03-30"
sourceUrl: "https://github.com/odoo/odoo"
difficulty: beginner
owner: "cortex"
pillar: "business-automation"
---

# Skill: Coffee Shop Operations

## Metadata

| Field | Value |
|-------|-------|
| **Skill ID** | SKL-0194 |
| **Name** | Coffee Shop Operations |
| **Category** | Skills |
| **Complexity** | Beginner |

## Core Concepts

Coffee shop operations revolve around speed, consistency, and waste control. Odoo's modular ERP approach shows how a Point of Sale system, inventory management, and accounting can work as integrated applications that "can be used as stand-alone applications, but also integrate seamlessly" into a full operational system. For a coffee shop, this means your POS, stock tracking, and daily reporting share one data source.

### Menu Management

Your menu is both a customer-facing product catalog and an operational document. Each menu item needs: a name, price, category (espresso drinks, pastries, seasonal specials), preparation time estimate, and a bill of materials (BOM) listing the ingredients consumed. A latte's BOM includes espresso beans (18g), milk (200ml), and a cup. When the POS records a latte sale, the system deducts those ingredients from inventory. This real-time consumption tracking is what connects sales to stock levels automatically.

### Order Queue Management

During peak hours, the order queue is the bottleneck. An effective system displays orders on a kitchen/bar screen in the sequence they were received, with drink complexity visible so baristas can batch similar orders. Odoo's POS supports this workflow with order routing to preparation stations. The key operational rule: display the order timestamp so staff can identify when wait times exceed your target (typically 3-5 minutes for coffee drinks). Flag orders approaching the threshold in a different color.

### Daily Prep Tracking

Baked goods, cold brew, and syrups require advance preparation. Daily prep tracking means recording what you produce each morning and comparing it against what sold and what was discarded. This creates a feedback loop:

1. **Record production**: 24 croissants baked, 5 gallons cold brew prepared
2. **Track sales**: 20 croissants sold, 4 gallons cold brew sold
3. **Log waste**: 4 croissants discarded at end of day, 1 gallon cold brew dumped
4. **Adjust**: Reduce next day's croissant prep to 21, cold brew to 4.5 gallons

Over two weeks of tracking, your prep quantities converge on actual demand, significantly reducing waste.

### Waste Reduction

Waste in a coffee shop falls into three categories: expired ingredients (milk, pastries), overproduction (unsold prep items), and operational waste (failed drinks, spills). Track each category separately. Expired ingredients indicate ordering problems. Overproduction indicates prep quantity problems. Operational waste above 2-3% of revenue indicates training needs. The integrated system approach means your waste data connects directly to your purchasing and prep decisions.

### Sales Analysis for Menu Optimization

Weekly sales reports reveal which items drive revenue and which occupy menu space without earning their keep. Categorize items by a simple matrix: high volume and high margin (keep and promote), high volume and low margin (adjust pricing), low volume and high margin (market better), low volume and low margin (remove or replace). Most coffee shops find that 20% of their menu generates 80% of revenue. Simplifying the menu reduces ingredient complexity, speeds preparation, and cuts waste.

## Key Takeaways

- Link every menu item to a bill of materials so POS sales automatically deduct inventory
- Display order timestamps and flag delays to manage peak-hour queue pressure
- Track daily prep versus actual sales and waste to converge on optimal production quantities
- Separate waste into expired, overproduced, and operational categories for targeted fixes
- Use the volume-margin matrix to simplify the menu and focus on high-performing items
