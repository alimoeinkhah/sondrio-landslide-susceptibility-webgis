import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import { Map, View, Overlay } from 'ol';
import { Tile, Image, Group, Vector } from 'ol/layer';
import { OSM, BingMaps, StadiaMaps } from 'ol/source';
import ImageStatic from 'ol/source/ImageStatic';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import { fromLonLat } from 'ol/proj';
import { ScaleLine, FullScreen, MousePosition } from 'ol/control';
import LayerSwitcher from 'ol-layerswitcher';
import { createStringXY } from 'ol/coordinate';
import { Style, Stroke, Fill, Circle as CircleStyle } from 'ol/style';

const DATA_ROOT = './webmap-data';

const rasterDefinitions = {
  ndvi: {
    file: 'ndvi.png',
    extent: [1087117.8829735771, 5823206.394277651, 1100552.610005501, 5837071.787457673],
  },
  plan: {
    file: 'plan.png',
    extent: [1087117.8829735771, 5823206.394277651, 1100552.610005501, 5837071.787457673],
  },
  profile: {
    file: 'profile.png',
    extent: [1087117.8829735771, 5823206.394277651, 1100552.610005501, 5837071.787457673],
  },
  slope: {
    file: 'slope.png',
    extent: [1087117.8829735771, 5823206.394277651, 1100552.610005501, 5837071.787457673],
  },
  aspect: {
    file: 'aspect.png',
    extent: [1087117.8829735771, 5823206.394277651, 1100552.610005501, 5837071.787457673],
  },
  dtm: {
    file: 'dtm.png',
    extent: [1087117.8829735771, 5823206.394277651, 1100552.610005501, 5837071.787457673],
  },
  dusaf: {
    file: 'dusaf.png',
    extent: [1087117.0157803034, 5823204.21592859, 1100551.6506008878, 5837069.683129771],
  },
  faults: {
    file: 'faults.png',
    extent: [1087117.8829735771, 5823206.394277651, 1100552.610005501, 5837071.787457673],
  },
  rivers: {
    file: 'rivers.png',
    extent: [1087117.8829735771, 5823206.394277651, 1100552.610005501, 5837071.787457673],
  },
  roads: {
    file: 'roads.png',
    extent: [1087117.8829735771, 5823206.394277651, 1100552.610005501, 5837071.787457673],
  },
  susceptibility: {
    file: 'susceptibility.png',
    extent: [1087117.0368501036, 5823206.404741244, 1100551.674173058, 5837071.795692605],
  },
  susceptibilityReclassified: {
    file: 'susceptibility-reclassified.png',
    extent: [1087117.0368501036, 5823206.404741244, 1100551.674173058, 5837071.795692605],
  },
  susceptibilityResampled: {
    file: 'susceptibility-resampled.png',
    extent: [1087117.0367923244, 5823206.404741404, 1100551.674158592, 5837071.7956931675],
  },
};

function createRasterLayer(title, key, { visible = false, opacity = 0.78 } = {}) {
  const definition = rasterDefinitions[key];
  return new Image({
    title,
    visible,
    opacity,
    source: new ImageStatic({
      url: `${DATA_ROOT}/${definition.file}`,
      imageExtent: definition.extent,
      projection: 'EPSG:3857',
      interpolate: true,
    }),
  });
}

function createVectorLayer(title, file, style, opacity = 1) {
  return new Vector({
    title,
    visible: false,
    opacity,
    source: new VectorSource({
      url: `${DATA_ROOT}/${file}`,
      format: new GeoJSON({ dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' }),
    }),
    style,
  });
}

const osm = new Tile({
  title: 'OpenStreetMap',
  type: 'base',
  visible: true,
  source: new OSM(),
});

const landslideStyle = new Style({
  fill: new Fill({ color: 'rgba(215, 25, 28, 0.35)' }),
  stroke: new Stroke({ color: '#a50026', width: 1.2 }),
});

const trainingZoneStyle = new Style({
  fill: new Fill({ color: 'rgba(90, 126, 217, 0.30)' }),
  stroke: new Stroke({ color: '#3554a5', width: 1 }),
});

const testingZoneStyle = new Style({
  fill: new Fill({ color: 'rgba(237, 99, 138, 0.30)' }),
  stroke: new Stroke({ color: '#b52c5d', width: 1 }),
});

const trainingPointStyle = new Style({
  image: new CircleStyle({
    radius: 4,
    fill: new Fill({ color: '#85b66f' }),
    stroke: new Stroke({ color: '#ffffff', width: 1 }),
  }),
});

const testingPointStyle = new Style({
  image: new CircleStyle({
    radius: 4,
    fill: new Fill({ color: '#f3a6b2' }),
    stroke: new Stroke({ color: '#ffffff', width: 1 }),
  }),
});

const ndvi = createRasterLayer('Ndvi', 'ndvi', { opacity: 0.72 });
const landslides = createVectorLayer('Landslides', 'landslides.geojson', landslideStyle);
const nonLandslideZones = createVectorLayer(
  'NLZ',
  'non-landslide-zones.geojson',
  (feature) => feature.get('Train_Test') === 'Testing' ? testingZoneStyle : trainingZoneStyle,
);
const planCurvature = createRasterLayer('Plan Curvature', 'plan');
const profileCurvature = createRasterLayer('Profile Curvature', 'profile');
const slope = createRasterLayer('Slope', 'slope', { visible: true, opacity: 0.82 });
const aspect = createRasterLayer('Aspect', 'aspect');
const dtm = createRasterLayer('Dtm', 'dtm');
const dusaf = createRasterLayer('Dusaf', 'dusaf');
const faults = createRasterLayer('Faults', 'faults');
const susceptibilityResampled = createRasterLayer('Susceptibility Resampled', 'susceptibilityResampled', { opacity: 0.82 });
const rivers = createRasterLayer('Rivers', 'rivers');
const roads = createRasterLayer('Roads', 'roads');
const susceptibility = createRasterLayer('Susceptibility', 'susceptibility', { opacity: 0.82 });
const susceptibilityReclassified = createRasterLayer('Susceptibility Reclassified', 'susceptibilityReclassified', { opacity: 0.82 });
const trainingPoints = createVectorLayer('Training Points', 'training-points.geojson', trainingPointStyle);
const testingPoints = createVectorLayer('Testing Points', 'testing-points.geojson', testingPointStyle);

const basemapLayers = new Group({
  title: 'Base Maps',
  layers: [osm],
});

const overlayLayers = new Group({
  title: 'Overlay Layers',
  layers: [
    ndvi,
    landslides,
    nonLandslideZones,
    planCurvature,
    profileCurvature,
    slope,
    aspect,
    dtm,
    dusaf,
    faults,
    susceptibilityResampled,
    rivers,
    roads,
    susceptibility,
    susceptibilityReclassified,
    trainingPoints,
    testingPoints,
  ],
});

const map = new Map({
  target: document.getElementById('map'),
  layers: [basemapLayers, overlayLayers],
  view: new View({
    center: fromLonLat([9.8532, 46.2712]),
    zoom: 11.5,
  }),
});

map.addControl(new ScaleLine());
map.addControl(new FullScreen());
map.addControl(new MousePosition({
  coordinateFormat: createStringXY(4),
  projection: 'EPSG:4326',
  className: 'custom-control',
  placeholder: '0.0000, 0.0000',
}));
map.addControl(new LayerSwitcher({}));

const bingMapsKey = 'AqbDxABFot3cmpxfshRqLmg8UTuPv_bg69Ej3d5AkGmjaJy_w5eFSSbOzoHeN2_H';
const bingRoads = new Tile({
  title: 'Bing Maps—Roads',
  type: 'base',
  visible: false,
  source: new BingMaps({ key: bingMapsKey, imagerySet: 'Road' }),
});
const bingAerial = new Tile({
  title: 'Bing Maps—Aerial',
  type: 'base',
  visible: false,
  source: new BingMaps({ key: bingMapsKey, imagerySet: 'Aerial' }),
});
const stadiaWatercolor = new Tile({
  title: 'Stadia Watercolor',
  type: 'base',
  visible: false,
  source: new StadiaMaps({ layer: 'stamen_watercolor' }),
});
const stadiaToner = new Tile({
  title: 'Stadia Toner',
  type: 'base',
  visible: false,
  source: new StadiaMaps({ layer: 'stamen_toner' }),
});
basemapLayers.getLayers().extend([bingRoads, bingAerial, stadiaWatercolor, stadiaToner]);

const popupElement = document.getElementById('popup');
const popupContent = document.getElementById('popup-content');
const popupCloser = document.getElementById('popup-closer');
const popup = new Overlay({ element: popupElement });
map.addOverlay(popup);

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

map.on('singleclick', (event) => {
  const feature = map.forEachFeatureAtPixel(event.pixel, (candidate) => candidate);
  if (!feature) {
    popup.setPosition(undefined);
    return;
  }

  const properties = feature.getProperties();
  const rows = [
    ['Type', properties.TIPOLOGIA],
    ['Dataset', properties.Train_Test],
    ['Hazard', properties.Hazard],
    ['Slope', properties.slope],
    ['NDVI', properties.ndvi],
    ['Elevation', properties.dtm],
  ].filter(([, value]) => value != null);

  popupContent.innerHTML = rows.length
    ? rows.map(([label, value]) => `<div><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</div>`).join('')
    : '<div>Map feature</div>';
  popup.setPosition(event.coordinate);
});

popupCloser.onclick = () => {
  popup.setPosition(undefined);
  popupCloser.blur();
  return false;
};

map.on('pointermove', (event) => {
  const hit = map.hasFeatureAtPixel(event.pixel);
  map.getTargetElement().style.cursor = hit ? 'pointer' : '';
});
