# Sondrio Landslide Susceptibility Mapping & WebGIS

A GIS-based workflow for landslide susceptibility modelling, validation, population exposure assessment, and interactive web visualization in northern Sondrio, Italy.

![Landslide Susceptibility Map](./images/landslide_susceptibility_map.jpg)

## Project Overview

This project evaluates landslide susceptibility around Chiesa in Valmalenco in the Province of Sondrio, Lombardy. Terrain, vegetation, land-cover, infrastructure, hydrological, and geological factors were processed in a GIS environment and used to generate a landslide susceptibility model.

The model was validated using an independent testing dataset. The final susceptibility map was then combined with WorldPop population data to assess human exposure across four susceptibility classes. An interactive WebGIS was developed to present the inputs and results.

## Objectives

- Prepare and standardize the spatial datasets required for landslide analysis.
- Generate terrain and proximity-based environmental factors.
- Build and validate a landslide susceptibility model.
- Classify the results into low, moderate, high, and very-high susceptibility.
- Estimate population exposure within each susceptibility class.
- Develop an interactive WebGIS for exploring the input layers and results.

## Study Area

The study area is located near Chiesa in Valmalenco, north of Sondrio and close to the Swiss border.

![Study Area](./images/casestudy.jpg)

## Input Data

| Data | Application |
|---|---|
| Digital Terrain Model | Elevation and terrain-factor extraction |
| NDVI | Vegetation condition |
| DUSAF | Land-use and land-cover information |
| Landslide inventory | Landslide reference areas |
| Roads | Distance-to-road analysis |
| Rivers | Distance-to-river analysis |
| Faults | Distance-to-fault analysis |
| WorldPop raster | Population exposure assessment |

Terrain derivatives included slope, aspect, plan curvature, and profile curvature.

## Methodology

1. Clipped and aligned raster and vector datasets to a common study area, coordinate reference system, extent, and pixel size.
2. Generated slope, aspect, plan curvature, and profile curvature from the Digital Terrain Model.
3. Prepared proximity layers for roads, rivers, and faults.
4. Created balanced landslide and non-landslide samples.
5. Prepared 1,000 sample points using a 70/30 training–testing split:
   - 700 training points
   - 300 testing points
6. Sampled the environmental factors at each training and testing location.
7. Generated the susceptibility model in R using the ModelMap workflow.
8. Validated the classification using an error matrix and accuracy metrics.
9. Reclassified the susceptibility output into four classes and combined it with WorldPop data.
10. Published the spatial layers through an interactive OpenLayers WebGIS.

## Results

- **Overall Accuracy:** 82%
- **Training samples:** 700
- **Testing samples:** 300
- **Producer’s Accuracy — Class 1:** 79%
- **Producer’s Accuracy — Class 2:** 86%
- **User’s Accuracy — Class 1:** 86%
- **User’s Accuracy — Class 2:** 85%

The population exposure assessment showed that:

- **62.6%** of the assessed population was located in low-susceptibility areas.
- **15.7%** was located in very-high-susceptibility areas.

## WebGIS Features

The interactive WebGIS provides:

- Environmental and susceptibility layer visualization
- Layer visibility controls
- OpenStreetMap, Bing Maps, and Stadia basemaps
- Training and testing sample layers
- Full-screen map display
- Scale and coordinate information
- Susceptibility and population-exposure outputs

## Tools and Technologies

- QGIS
- GRASS GIS
- SAGA GIS
- GDAL
- R and ModelMap
- WorldPop
- OpenLayers
- GeoServer WMS
- JavaScript, HTML, and CSS
- Vite and Bootstrap

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
- `images/` — Maps, figures, and workflow images
- `docs/` — Built website files

## Collaborators

This project was developed in collaboration with:

- [Moein Peyghambar Zadeh](https://github.com/moeinp70)
- [Saeed Mehdizadeh](https://github.com/saeedmehdizadeh)

## License

This repository is available under the CC0 1.0 Universal license.
