// Store our API endpoint inside queryUrl
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson";

console.log(link);

// function createMap(earthquakes) {

// Creating map object
var myMap = L.map("map", {
    center: [37.09, -94.71],
    zoom: 5
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  }).addTo(myMap);

///}
  // Function that will determine the color of a neighborhood based on the borough it belongs to
  function chooseColor(magnitude) {
    switch (true) {
    case magnitude < 1:
      return "green";
      break;
    case  magnitude < 2:
      return "lime";
      break;
    case  magnitude < 3:
      return "yellow";
      break;
    case  magnitude < 4:
      return "orange";
      break;
    case  magnitude > 4:
        return "red";
        break;
    default:
      return "white";
    }
  }


//https://leafletjs.com/examples/geojson/
  
d3.json(link, function(data) {
    L.geoJson(data, {
        pointToLayer: function (feature,latlng) {
            var latlng = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
            var magnitude = feature.properties.mag;
            // console.log(data.features);
            createFeatures(data.features);

            //style formatting
            var geojsonMarkerOptions = {
                radius: feature.properties.mag * feature.properties.mag * 2,
                fillColor: chooseColor(feature.properties.mag),
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
                
            };

            //plotting circles
            return L.circleMarker(latlng, geojsonMarkerOptions);
            

            
            //creating function to bind popups
            function createFeatures(earthquakeData) {
            
            //Function to run once for each feature in the features array
            function onEachFeature(feature, layer) {
                console.log(feature.properties.place);
                layer.bindPopup("<h3>" + feature.properties.place +
                    "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
            }

            // Create a GeoJSON layer containing the features array on the earthquakeData object
            // Run the onEachFeature function once for each piece of data in the array
            var earthquakes = L.geoJSON(data.features, {
            onEachFeature: onEachFeature
             });

    }}
}).addTo(myMap);
});
