mapboxgl.accessToken = config.accessToken;

var layerTypes = {
  'fill': ['fill-opacity'],
  'line': ['line-opacity'],
  'circle': ['circle-opacity', 'circle-stroke-opacity'],
  'symbol': ['icon-opacity', 'text-opacity'],
  'raster': ['raster-opacity'],
  'fill-extrusion': ['fill-extrusion-opacity'],
  'heatmap': ['heatmap-opacity']
};

var alignments = {
  'left': 'lefty',
  'center': 'centered',
  'right': 'righty',
  'full': 'fully'
};

function getLayerPaintType(layer) {
  var layerType = map.getLayer(layer).type;
  return layerTypes[layerType];
}

function setLayerOpacity(layer) {
  var paintProps = getLayerPaintType(layer.layer);
  paintProps.forEach(function (prop) {
    var options = {};
    if (layer.duration) {
      var transitionProp = prop + "-transition";
      options = { "duration": layer.duration };
      map.setPaintProperty(layer.layer, transitionProp, options);
    }
    map.setPaintProperty(layer.layer, prop, layer.opacity, options);
  });
}

// Build the story HTML
var story = document.getElementById('story');

// Chapter blocks
var features = document.createElement('div');
features.setAttribute('id', 'features');

config.chapters.forEach(function (record, idx) {
  var container = document.createElement('div');
  var chapter = document.createElement('div');

  if (record.id) container.setAttribute('id', record.id);
  container.classList.add('step');
  if (idx === 0) container.classList.add('active');

  chapter.classList.add('chapter');
  if (config.theme) chapter.classList.add(config.theme);

  if (record.title) {
    var title = document.createElement('h3');
    title.innerText = record.title;
    chapter.appendChild(title);
  }
  if (record.image) {
    var image = document.createElement('img');
    image.src = record.image;
    image.alt = record.title || '';
    chapter.appendChild(image);
  }
  if (record.description) {
    var story_text = document.createElement('p');
    story_text.innerHTML = record.description;
    chapter.appendChild(story_text);
  }

  container.appendChild(chapter);
  container.classList.add(alignments[record.alignment] || 'lefty');
  features.appendChild(container);
});

story.appendChild(features);

// Footer
if (config.footer) {
  var footer = document.createElement('div');
  footer.setAttribute('id', 'footer');
  var footerText = document.createElement('p');
  footerText.innerHTML = config.footer;
  footer.appendChild(footerText);
  story.appendChild(footer);
}

// Initialize map
var map = new mapboxgl.Map({
  container: 'map',
  style: config.chapters[0].style || 'mapbox://styles/mapbox/satellite-v9',
  center: config.chapters[0].location.center,
  zoom: config.chapters[0].location.zoom,
  pitch: config.chapters[0].location.pitch,
  bearing: config.chapters[0].location.bearing,
  scrollZoom: false
});

// Function to add all custom layers
function addLayers() {
  if (!map.getSource('trails')) {
    map.addSource('trails', {
      type: 'geojson',
      data: trailData
    });
  }
  if (!map.getLayer('trail-lines')) {
    map.addLayer({
      id: 'trail-lines',
      type: 'line',
      source: 'trails',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#c3ff00',
        'line-width': 5
      }
    });
  }
  // POI polygon overlays, these draw the blue highlighted boundary shapes on the map
  if (!map.getSource('pois')) {
    map.addSource('pois', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: { title: 'Shimada Friendship Park' },
            geometry: {
              type: 'Polygon',
              coordinates: [[
                [-122.34513372438607, 37.908684435885874],
                [-122.34509659450701, 37.90757365347936],
                [-122.3444963281323, 37.90781290033756],
                [-122.3441745358491, 37.90783487194916],
                [-122.34420857157127, 37.908452515669865],
                [-122.34457677620297, 37.90873814362098],
                [-122.34466650674354, 37.908694200931265],
                [-122.34474076650125, 37.908672229576936],
                [-122.34481502625898, 37.908660023265966],
                [-122.3449140392694, 37.908660023265966],
                [-122.34513372438607, 37.908684435885874]
              ]]
            }
          },
          {
            type: 'Feature',
            properties: { title: 'El Cerrito Plaza BART Station' },
            geometry: {
              type: 'Polygon',
              coordinates: [[
                [-122.29938777059758, 37.90293256660948],
                [-122.29898520980315, 37.903141865079846],
                [-122.29831115451884, 37.90235637715858],
                [-122.29877612783994, 37.902105216242205],
                [-122.29941897686112, 37.9029153302385],
                [-122.29931599619263, 37.90296950167679],
                [-122.29938777059758, 37.90293256660948]
              ]]
            }
          },
          {
            type: 'Feature',
            properties: { title: 'Glashaus Lofts' },
            geometry: {
              type: 'Polygon',
              coordinates: [[
                [-122.2898477227719, 37.847094635165746],
                [-122.28909929273047, 37.847233067117216],
                [-122.28886667258217, 37.84655953998495],
                [-122.28961510262357, 37.84638117406227],
                [-122.28984435146505, 37.84708931085416],
                [-122.2898477227719, 37.847094635165746]
              ]]
            }
          },
          {
            type: 'Feature',
            properties: { title: 'Danville Farmers Market' },
            geometry: {
              type: 'Polygon',
              coordinates: [[
                [-122.00067606616574, 37.820996943319216],
                [-122.00019504659639, 37.82074308927753],
                [-122.00061875319572, 37.82026448310489],
                [-122.0010915851979, 37.820549060122175],
                [-122.00067606616574, 37.820996943319216]
              ]]
            }
          }
        ]
      }
    });
  }

  if (!map.getLayer('poi-fill')) {
    map.addLayer({
      id: 'poi-fill',
      type: 'fill',
      source: 'pois',
      layout: { visibility: 'none' },
      paint: {
        'fill-color': '#00ffd0',
        'fill-opacity': 0.2
      }
    });
  }

  if (!map.getLayer('poi-outline')) {
    map.addLayer({
      id: 'poi-outline',
      type: 'line',
      source: 'pois',
      layout: { visibility: 'none' },
      paint: {
        'line-color': '#ffbb00',
        'line-width': 2
      }
    });
  }
}

// Add layers on initial map load
map.on('load', function () {
  addLayers();
  setTimeout(addLayers, 500); // fallback in case layers didn't load

  var scroller = scrollama();
  scroller.setup({
    step: '.step',
    offset: 0.5,
    progress: false
  }).onStepEnter(function (response) {
    // Re-add layers if needed after style load
    if (response.element.id === 'sf-bay-trail') {
      setTimeout(function () {
        if (!map.getLayer('trail-lines')) addLayers();
      }, 300);
    }

    var chapter = config.chapters.find(function (chap) {
      return chap.id === response.element.id;
    });

    if (chapter) {
      if (chapter.style) {
        if (chapter.style !== map.getStyle().sprite) {
          map.setStyle(chapter.style);
          map.once('style.load', function () {
            map.setConfigProperty('basemap', 'lightPreset', 'dusk');
            addLayers();
            map.flyTo(chapter.location);
            // Show POI polygons after layers are added
            if (chapter.style === 'mapbox://styles/mapbox/standard') {
              if (map.getLayer('poi-fill')) map.setLayoutProperty('poi-fill', 'visibility', 'visible');
              if (map.getLayer('poi-outline')) map.setLayoutProperty('poi-outline', 'visibility', 'visible');
            }
          });
        } else {
          map.flyTo(chapter.location);
          if (!map.getLayer('trail-lines')) addLayers(); // Re-add layers if they got wiped
           // Toggle POI polygon visibility based on map style
          if (chapter.style === 'mapbox://styles/mapbox/standard') {
            if (map.getLayer('poi-fill')) map.setLayoutProperty('poi-fill', 'visibility', 'visible');
            if (map.getLayer('poi-outline')) map.setLayoutProperty('poi-outline', 'visibility', 'visible');
          } else {
            if (map.getLayer('poi-fill')) map.setLayoutProperty('poi-fill', 'visibility', 'none');
            if (map.getLayer('poi-outline')) map.setLayoutProperty('poi-outline', 'visibility', 'none');
          }
        }
      } else {
        map.flyTo(chapter.location);
        if (map.getLayer('poi-fill')) map.setLayoutProperty('poi-fill', 'visibility', 'none');
        if (map.getLayer('poi-outline')) map.setLayoutProperty('poi-outline', 'visibility', 'none');
      }
    }

    response.element.classList.add('active');

  }).onStepExit(function (response) {
    response.element.classList.remove('active');
  });

  window.addEventListener('resize', scroller.resize);
});

// Fade cards in based on scroll position
window.addEventListener('scroll', function () {
  document.querySelectorAll('.step').forEach(function (step) {
    var rect = step.getBoundingClientRect();
    var chapter = step.querySelector('.chapter');
    if (!chapter) return;
    var distFromBottom = window.innerHeight - rect.bottom + rect.height * 0.3;
    var opacity = Math.min(Math.max(distFromBottom / 200, 0), 1);
    chapter.style.opacity = opacity;
  });
});

// Wait for DOM to be ready then attach back to top button
setTimeout(function () {
  var btn = document.querySelector('#back-to-top a');
  if (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      backToTop();
    });
  }
}, 1000);

function backToTop() {
  document.getElementById('intro').scrollIntoView({ behavior: 'smooth' });
}