# Sondrio Landslide Susceptibility Mapping & WebGIS

A GIS-based project for landslide susceptibility modelling, validation, population exposure assessment, and interactive web visualization in northern Sondrio, Italy.

[View Live Project](https://alimoeinkhah.github.io/sondrio-landslide-susceptibility-webgis/) | [Open Interactive WebGIS](https://alimoeinkhah.github.io/sondrio-landslide-susceptibility-webgis/webgis.html)

![Landslide Susceptibility Map](./images/landslide_susceptibility_map.jpg)

## Project Overview

This project evaluates landslide susceptibility around Chiesa in Valmalenco, in the Province of Sondrio, Lombardy. Terrain, vegetation, land-cover, infrastructure, hydrological, and geological factors were processed in a GIS environment and used to develop a landslide susceptibility model.

The model was validated using an independent testing dataset. The final susceptibility map was combined with WorldPop population data to estimate human exposure across four susceptibility classes.

An interactive OpenLayers WebGIS was developed to present the input factors, training and testing samples, susceptibility results, and population-exposure outputs. All project layers are hosted directly through GitHub Pages, so the published WebGIS does not depend on an external GeoServer.

## Objectives

- Prepare and standardize the spatial datasets required for landslide analysis.
- Generate terrain and proximity-based environmental factors.
- Build and validate a landslide susceptibility model.
- Classify susceptibility into low, moderate, high, and very-high classes.
- Estimate population exposure within each susceptibility class.
- Develop an interactive WebGIS for exploring the inputs and results.

## Study Area

The study area is located around Chiesa in Valmalenco, north of Sondrio and close to the Swiss border.

![Study Area](./images/casestudy.jpg)

## Input Data

| Dataset | Application |
|---|---|
| Digital Terrain Model | Elevation and terrain-factor extraction |
| NDVI | Vegetation-condition analysis |
| DUSAF | Land-use and land-cover information |
| Landslide inventory | Landslide reference areas |
| Roads | Distance-to-road analysis |
| Rivers | Distance-to-river analysis |
| Faults | Distance-to-fault analysis |
| WorldPop raster | Population-exposure assessment |

Terrain derivatives included slope, aspect, plan curvature, and profile curvature.

## Methodology

1. Clipped and aligned the raster and vector datasets to a common study area, coordinate reference system, extent, and pixel size.
2. Generated slope, aspect, plan curvature, and profile curvature from the Digital Terrain Model.
3. Prepared proximity layers for roads, rivers, and geological faults.
4. Created balanced landslide and non-landslide samples.
5. Prepared 1,000 sample points using a 70/30 training-testing split:
   - 700 training points
   - 300 testing points
6. Sampled the environmental factors at each training and testing location.
7. Generated the susceptibility model in R using the ModelMap workflow.
8. Validated the classification using an error matrix and accuracy metrics.
9. Reclassified the susceptibility output into four classes and combined it with WorldPop data.
10. Published 17 spatial layers through an interactive OpenLayers WebGIS.

## Results

- **Overall accuracy:** 82%
- **Training samples:** 700
- **Testing samples:** 300
- **Producer's accuracy — Class 1:** 79%
- **Producer's accuracy — Class 2:** 86%
- **User's accuracy — Class 1:** 86%
- **User's accuracy — Class 2:** 85%

The population-exposure assessment showed that:

- **62.6%** of the assessed population was located in low-susceptibility areas.
- **15.7%** was located in very-high-susceptibility areas.

## Interactive WebGIS

The published WebGIS includes 17 project layers and provides:

- Environmental-factor visualization
- Landslide susceptibility results
- Population-exposure outputs
- Training and testing sample layers
- Layer visibility controls
- OpenStreetMap, Bing Maps, and Stadia basemaps
- Full-screen map display
- Scale and coordinate information
- Static deployment through GitHub Pages

[Launch the Interactive WebGIS](https://alimoeinkhah.github.io/sondrio-landslide-susceptibility-webgis/webgis.html)

## Tools and Technologies

- QGIS
- GRASS GIS
- SAGA GIS
- GDAL
- R and ModelMap
- WorldPop
- OpenLayers
- JavaScript, HTML, and CSS
- Vite and Bootstrap
- GitHub Pages

## Run Locally

```bash
git clone https://github.com/alimoeinkhah/sondrio-landslide-susceptibility-webgis.git
cd sondrio-landslide-susceptibility-webgis
npm install
npm start
```

Open the local address displayed by Vite in your browser.

## Repository Structure

- `index.html` — Main project interface
- `work.html` — Data preparation and methodology
- `results.html` — Validation and exposure results
- `webgis.html` — Interactive WebGIS
- `assets/js/map-final.js` — OpenLayers map configuration
- `webmap-data/` — Web-ready raster and vector layers
- `images/` — Maps, figures, and workflow images
- `docs/` — Built website published through GitHub Pages

## Collaborators

This project was developed in collaboration with:

- [Moein Peyghambar Zadeh](https://github.com/moeinp70)
- [Saeed Mehdizadeh](https://github.com/saeedmehdizadeh)

## License

This repository is available under the [CC0 1.0 Universal License](./LICENSE).