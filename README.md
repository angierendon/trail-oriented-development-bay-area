# Trail-Oriented Development in the San Francisco Bay Area

**Final Project — NYU Wagner Advanced GIS: Interactive Web Mapping and Spatial Data Visualization**
By Angie Rendon

## About

This scrollytelling map explores Trail-Oriented Development (TrOD) in the San Francisco Bay Area, a planning framework that uses off-street trails and greenways as anchors for walkable development. As users scroll through the story, the map flies to key locations along the regional trail network, highlighting examples of how trails are functioning as civic infrastructure that connects people to transit, housing, parks, and economic activity.

## Features

- Scrollytelling map built with Mapbox GL JS and Scrollama
- SF Bay Trail GeoJSON overlaid on satellite imagery
- Clickable polygon overlays marking points of interest along each trail corridor
- Smooth camera flyTo animations for each chapter
- Popup information cards for key sites including parks, BART stations, housing developments, and markets

## Trail Corridors Covered

- **Bay Trail** — Richmond
- **Ohlone Greenway** — Albany, El Cerrito, Richmond
- **Emeryville Greenway** — Emeryville
- **Iron Horse Regional Trail** — Contra Costa County

## Data Sources

- **SF Bay Trail** — Metropolitan Transportation Commission (MTC)
- **Ohlone Greenway; Emeryville Greenway; Iron Horse Trail; Points of Interest polygons** — Created using [geojson.io](https://geojson.io)
- **Map imagery** — Mapbox Satellite

## Tools Used

- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/) — Interactive map rendering
- [Scrollama](https://github.com/russellsamora/scrollama) — Scroll-driven storytelling
- [geojson.io](https://geojson.io) — Custom polygon and trail data creation
- [Location Helper](https://locationhelper.com) — Coordinate lookup

## Live Site

[https://angierendon.github.io/trail-oriented-development-bay-area](https://angierendon.github.io/trail-oriented-development-bay-area)
