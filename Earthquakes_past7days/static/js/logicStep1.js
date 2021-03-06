// Add console.log to check to see if our code is working.
//console.log("working");

// Create the map object with center and zoom level.
//let map = L.map('mapid').setView([30, 30], 2);

// // Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};


/* // Grabbing our GeoJSON data.
L.geoJSON(sanFranAirport, {
    onEachFeature: function(feature, layer) {
        console.log(layer);
        layer.bindPopup("<h2>" + "Airport Code: " + feature.properties.faa + "</h2>" + "<h3>" + "Airport Name: " + feature.properties.name + "</h3>");
        //("<h2>" + feature.properties.name + feature.properties.city + ", " + feature.properties.state + "</h2>");
    }

    }).addTo(map); */


// Loop through the cities array and create one marker for each city.
/* cityData.forEach(function(city) {
    console.log(city)
    L.circleMarker(city.location, {
        radius: city.population/100000
    })
    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
  .addTo(map);
}); */

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
    attribution: 'Map data @ <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery ?? <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
    id: streetsStyle
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data @ <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery ?? <a href="https://www.mapbox.com/">Mapbox</a>',
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

    // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data)
    /* , {
    color: "##0000FF", 
    weight: 1,
    fillcolor: '#FFFF00',
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>" + "Neighborhood: " + feature.properties.AREA_NAME +
            "</h3>"); 
    } })*/
.addTo(map);
    
});

/* let myStyle = {
    color: "##0000FF", 
    fillcolor: '#FFFF00',
    weight: 10
}; */

// Then we add our 'graymap' tile layer to the map.
//streets.addTo(map);