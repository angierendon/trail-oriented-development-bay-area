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

// Title/header block
if (config.title) {
  var header = document.createElement('div');
  header.setAttribute('id', 'header');
  var titleText = document.createElement('h1');
  titleText.innerText = config.title;
  header.appendChild(titleText);
  if (config.subtitle) {
    var subtitleText = document.createElement('h2');
    subtitleText.innerText = config.subtitle;
    header.appendChild(subtitleText);
  }
  if (config.byline) {
    var bylineText = document.createElement('p');
    bylineText.innerText = config.byline;
    header.appendChild(bylineText);
  }
  story.appendChild(header);
}

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
  style: config.style,
  center: config.chapters[0].location.center,
  zoom: config.chapters[0].location.zoom,
  pitch: config.chapters[0].location.pitch,
  bearing: config.chapters[0].location.bearing,
  scrollZoom: false
});

// Add trail layer on map load
map.on('load', function () {
  map.addSource('trails', {
    type: 'geojson',
    data: trailData
  });
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
  // Points of interest source; add more features to this array as needed
  map.addSource('pois', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            title: 'Shimada Friendship Park',
            description: 'Located at the tip of the Marina Bay peninsula, this park serves as a civic destination that draws residents and visitors alike to the waterfront, acting as a community anchor along the Bay Trail in Richmond.'
          },
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
          properties: {
            title: 'El Cerrito Plaza BART Station',
            description: 'El Cerrito Plaza BART Station sits directly along the Ohlone Greenway, making it one of the most trail-accessible transit stations in the East Bay. The station features ample bike parking and secure bike lockers, allowing cyclists to seamlessly transition from the greenway to regional transit. The station is currently undergoing transit-oriented development that will bring new housing, retail, and public space directly adjacent to the platform, deepening the connection between the greenway, the neighborhood, and the broader Bay Area transit network.'
          },
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
          properties: {
            title: 'Glashaus Lofts',
            description: 'Glashaus Lofts is a 145-unit condominium community in Emeryville situated directly along the Emeryville Greenway. This townhome development exemplifies trail-oriented living, with shops, restaurants, and recreation facilities all within easy reach along the trail corridor. The project demonstrates how thoughtful infill development along greenways can create complete, walkable communities with reduced car dependency.'
          },
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
          properties: {
            title: 'Danville Farmers\'s Market',
            description: 'The Danville Farmers\' Market, held every Saturday at the Railroad Avenue municipal lot, illustrates how trail infrastructure can support local economic activity. Located directly along the Iron Horse Trail, the market is regularly accessed by locals on foot or by bike, reducing car trips and parking demand. The trail provides a safe, low-barrier connection to the market and nearby downtown Danville, demonstrating how off-street trail networks can function as active transportation.'
          },
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
        },// add more features here, separated by commas
      ]
    }
  });

  // POI fill layer
  map.addLayer({
    id: 'poi-fill',
    type: 'fill',
    source: 'pois',
    paint: {
      'fill-color': '#00bfff',
      'fill-opacity': 0.2
    }
  });

  // POI outline layer
  map.addLayer({
    id: 'poi-outline',
    type: 'line',
    source: 'pois',
    paint: {
      'line-color': '#ffffff',
      'line-width': 2
    }
  });

  // Click to show popup
  map.on('click', 'poi-fill', function (e) {
    // Remove any existing popups first
    var existingPopups = document.querySelectorAll('.mapboxgl-popup');
    existingPopups.forEach(function (popup) { popup.remove(); });
    new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: false,
      maxWidth: '500px'
    })
      .setLngLat(e.lngLat)
      .setHTML(
        '<div style="padding: 16px;">' +
        '<h3 style="margin: 0 0 10px 0; font-size: 1.1rem; font-family: system-ui;">' + e.features[0].properties.title + '</h3>' +
        '<p style="margin: 0; font-size: 0.9rem; line-height: 1.6; color: #333; font-family: system-ui;">' + e.features[0].properties.description + '</p>' +
        '</div>'
      )
      .addTo(map);
  });

  // Cursor pointer on hover
  map.on('mouseenter', 'poi-fill', function () {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'poi-fill', function () {
    map.getCanvas().style.cursor = '';
  });



  // Scrollama setup
  var scroller = scrollama();
  scroller.setup({
    step: '.step',
    offset: 0.5,
    progress: false
  }).onStepEnter(function (response) {
    var hint = document.getElementById('map-hint');
    if (hint) {
      if (response.element.id === 'marina-bay') {
        hint.style.opacity = '1';
      } else {
        hint.style.opacity = '0';
      }
    }
    var chapter = config.chapters.find(function (chap) {
      return chap.id === response.element.id;
    });
    if (chapter) {
      map.flyTo(chapter.location);
    }
    response.element.classList.add('active');
  }).onStepExit(function (response) {
    // Fade out hint when leaving marina-bay
    if (response.element.id === 'marina-bay') {
      var hint = document.getElementById('map-hint');
      if (hint) hint.style.opacity = '0';
    }
    // Close any open popups when scrolling to next chapter
    var existingPopups = document.querySelectorAll('.mapboxgl-popup');
    existingPopups.forEach(function (popup) { popup.remove(); });

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