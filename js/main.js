function htmlbodyHeightUpdate() {
    var height3 = $(window).height();
    var height1 = $('.nav').height() + 50;
    height2 = $('.container-main').height();
    if (height2 > height3) {
        $('html').height(Math.max(height1, height3, height2) + 10);
        $('body').height(Math.max(height1, height3, height2) + 10);
    } else
    {
        $('html').height(Math.max(height1, height3, height2));
        $('body').height(Math.max(height1, height3, height2));
    }

}
$(document).ready(function () {
    htmlbodyHeightUpdate();
    $(window).resize(function () {
        htmlbodyHeightUpdate();
    });
    $(window).scroll(function () {
        height2 = $('.container-main').height();
        htmlbodyHeightUpdate();
    });
});
var map = L.map('mymap').setView([34.1, -117.28], 7);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: "pk.eyJ1Ijoiam9ydGVnYWhvbWVzIiwiYSI6ImNqeWtsbXIwODBmcmczbW9iYTcycmUycXIifQ.YQcwA678CCL-sQwDDMh49g"
}).addTo(map);

var mapLayer;
var yellowMarker = L.icon({
  iconUrl: 'icons/yellow.png',
  iconSize: [20, 20],
  iconAnchor: [0, 0],
  popupAnchor: [6, 0]
})
var redMarker = L.icon({
  iconUrl: 'icons/red.png',
  iconSize: [12, 12],
  iconAnchor: [0, 0],
  popupAnchor: [6, 0]
})
var orangeMarker = L.icon({
  iconUrl: 'icons/orange.png',
  iconSize: [12, 12],
  iconAnchor: [0, 0],
  popupAnchor: [6, 0]
})
var greenMarker = L.icon({
  iconUrl: "icons/green.png",
  iconSize: [20, 20],
  iconAnchor: [0, 0],
  popupAnchor: [6, 0]
});
var search = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-08-13&minlatitude=31&maxlatitude=40&minlongitude=-125&maxlongitude=-110&minmagnitude=4&maxmagnitude=10';

const greenAlert = '&alertlevel=green';
const yellowAlert = '&alertlevel=yellow';
const orangeAlert = 'alertlevel=orange';
const redAlert = 'alertlevel=red';

var mapLayer;
var greenLayer;
var yellowLayer;
var orangeLayer;
var redLayer;

//  L.marker([34,-117.5], {icon: greenMarker}).addTo(map);
//function fetchGreen() {
  //fetch("https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&alertlevel=green") //link used to "fetch the data"
  //  .then(function(response) { //tcreate a funciton to remove the data,
    //  return response.json(); // we tell the computer that this data is called .json
    //})

function fetchData() {
  fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson") //link used to "fetch the data"
    .then(function(response) { //tcreate a funciton to remove the data,
      return response.json(); // we tell the computer that this data is called .json
    })
    .then(function(data) { //creates new funciton to console log the data

      function switchIcons(feature, latlng) {
        switch (feature.properties.alert) {
          case 'green':
            return L.marker(latlng, {
              icon: greenMarker
            })
       };
       switch(feature.properties.alert) {
         case 'yellow':
         return L.marker(latlng, {
           icon: yellowMarker
         })
       };
       switch(feature.properties.alert) {
         case 'orange':
         return L.marker(latlng, {
           icon: orangeMarker
         })
       };
       switch(feature.properties.alert) {
         case 'red':
         return L.marker(latlng, {
           icon: redMarker
         })
       };
   }    //end of switch bracket
      mapLayer = L.geoJSON(data, {
        pointToLayer: switchIcons,
        onEachFeature: function(features, mapLayer) {
          mapLayer.bindPopup('<p><b>Magnitude: </b>' + features.properties.mag + '<br><b>Location: </b>' + features.properties.place + '<br><b> Alert: </b>' + features.properties.alert + '<br></p>');
        }
      })
    })
}
fetchData();
function fetchGreen() {
  fetch(search+greenAlert) //link used to "fetch the data"
    .then(function(response) { //tcreate a funciton to remove the data,
      return response.json(); // we tell the computer that this data is called .json
    })
    .then(function(data) { //creates new funciton to console log the data
      function greenIcons(feature, latlng) {
        switch (feature.properties.alert) {
          case 'green':
            return L.marker(latlng, {
              icon: greenMarker
            });
       }
   }    //end of switch bracket
      greenLayer = L.geoJSON(data, {
        pointToLayer: greenIcons,
        onEachFeature: function(features, mapLayer) {
      mapLayer.bindPopup('<p><b>Magnitude: </b>' + features.properties.mag + '<br><b>Location: </b>' + features.properties.place + '<br><b> Alert: </b>' + features.properties.alert + '<br></p>').on('mouseover', onClick)
//       function(features, maplayer)
//       function onClick(e) {
//     greenLayer.L.circle(features, {
// 	color: 'red',
// 	fillColor: '#f03',
// 	fillOpacity: 0.5,
// 	radius: 500
// }).addTo(mymap);
// }
        }
      });
      function onClick(e) {
    this.L.circle([lat, lng], {
	color: 'red',
	fillColor: '#f03',
	fillOpacity: 0.5,
	radius: 500
}).addTo(mymap);
}
    });
}
fetchGreen();
function fetchYellow() {
  fetch(search+yellowAlert) //link used to "fetch the data"
    .then(function(response) { //tcreate a funciton to remove the data,
      return response.json(); // we tell the computer that this data is called .json
    })
    .then(function(data) { //creates new funciton to console log the data
      function yellowIcons(feature, latlng) {
        switch (feature.properties.alert) {
          case 'yellow':
            return L.marker(latlng, {
              icon: yellowMarker
            });
       }
   }    //end of switch bracket
      yellowLayer = L.geoJSON(data, {
        pointToLayer: yellowIcons,
        onEachFeature: function(features, mapLayer) {
      mapLayer.bindPopup('<p><b>Magnitude: </b>' + features.properties.mag + '<br><b>Location: </b>' + features.properties.place + '<br><b> Alert: </b>' + features.properties.alert + '<br></p>');
        }
      });
    });
}
fetchYellow();
function fetchOrange() {
  fetch('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2013-01-01&alertlevel=orange') //link used to "fetch the data"
    .then(function(response) { //tcreate a funciton to remove the data,
      return response.json(); // we tell the computer that this data is called .json
    })
    .then(function(data) { //creates new funciton to console log the data
      function orangeIcons(feature, latlng) {
        switch (feature.properties.alert) {
          case 'orange':
            return L.marker(latlng, {
              icon: orangeMarker
            });
       }
   }    //end of switch bracket
      orangeLayer = L.geoJSON(data, {
        pointToLayer: orangeIcons,
        onEachFeature: function(features, mapLayer) {
      mapLayer.bindPopup('<p><b>Magnitude: </b>' + features.properties.mag + '<br><b>Location: </b>' + features.properties.place + '<br><b> Alert: </b>' + features.properties.alert + '<br></p>');
        }
      });
    });
}
fetchOrange();
function fetchRed() {
  fetch('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2013-01-01&alertlevel=red') //link used to "fetch the data"
    .then(function(response) { //tcreate a funciton to remove the data,
      return response.json(); // we tell the computer that this data is called .json
    })
    .then(function(data) { //creates new funciton to console log the data
      function redIcons(feature, latlng) {
        switch (feature.properties.alert) {
          case 'red':
            return L.marker(latlng, {
              icon: redMarker
            });
       }
   }    //end of switch bracket
      redLayer = L.geoJSON(data, {
        pointToLayer: redIcons,
        onEachFeature: function(features, mapLayer) {
      mapLayer.bindPopup('<p><b>Magnitude: </b>' + features.properties.mag + '<br><b>Location: </b>' + features.properties.place + '<br><b> Alert: </b>' + features.properties.alert + '<br></p>');
        }
      });
    });
}
fetchRed();

const fetchButton = document.getElementById("myCheck");
const greenCheckBox = document.getElementById("greenBox");
const yellowCheckBox = document.getElementById('yellowBox');
const orangeCheckBox = document.getElementById('orangeBox');
const redCheckBox = document.getElementById('reBox');
fetchButton.addEventListener('click', function() {
  if (fetchButton.checked === true) {
    mapLayer.addTo(map);
  } else {
    map.removeLayer(mapLayer);
  }
});
greenBox.addEventListener('click', function() {
  if (greenBox.checked === true) {
    greenLayer.addTo(map);
  } else {
    map.removeLayer(greenLayer);
  }
});
yellowBox.addEventListener('click', function() {
  if (yellowCheckBox.checked === true) {
    yellowLayer.addTo(map);
  } else {
    map.removeLayer(yellowLayer);
  }
});
orangeBox.addEventListener('click', function() {
  if (orangeBox.checked === true) {
    map.flyTo([21.61657, -15.46874], 2);
    orangeLayer.addTo(map);

  } else {
    map.removeLayer(orangeLayer);
  }
});
redBox.addEventListener('click', function() {
  if (redBox.checked === true) {
    map.flyTo([21.61657, -15.46874], 2);
    redLayer.addTo(map);
  } else {
    map.removeLayer(redLayer);
  }
});

L.control.mousePosition().addTo(map);
