

// Map styles
const streetsStyle = 'streets-v11';
const outdoorStyle = 'outdoors-v11';
const lightStyle = 'light-v10';
const darkStyle = 'dark-v10';
const satelliteStyle = 'satellite-v9';
const satStreetsStyle = 'satellite-streets-v11';
const navDayStyle = 'navigation-day-v1';
const navNightStyle = 'navigation-night-v1';

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data @ <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
    id: streetsStyle
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data @ <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
    id: satStreetsStyle
});

let baseMaps = {
    "Streets": streets,
    "Sattelite Streets": satelliteStreets
};

// Create the map object with center and zoom level.
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
//let TorontoData = "https://raw.githubusercontent.com/Bransblu/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/torontoRoutes.json";

// Accessing the Toronto neighborhoods GeoJSON URL.
let earthquakeLink = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grabbing JSON data
d3.json(earthquakeLink).then(function(data) {
    console.log(data);

    // This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

function getColor(magnitude) {
  if (magnitude > 5) {
    return "#ea2c2c";
  }
  if (magnitude > 4) {
    return "#ea822c";
  }
  if (magnitude > 3) {
    return "#ee9c00";
  }
  if (magnitude > 2) {
    return "#eecc00";
  }
  if (magnitude > 1) {
    return "#d4ee00";
  }
  return "#98ee00";
}

  // This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }
    // Creating a GeoJSON layer with the retrieved data.
// Creating a GeoJSON layer with the retrieved data.
// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(data, {

    // We turn each feature into a circleMarker on the map.
    
    pointToLayer: function(feature, latlng) {
                console.log(data);
                return L.circleMarker(latlng);
            },
          // We set the style for each circleMarker using our styleInfo function.
        style: styleInfo,
        onEachFeature: function(feature, layer) {
          layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
        }).addTo(map);
    });
// Then we add our 'graymap' tile layer to the map.
//streets.addTo(map);