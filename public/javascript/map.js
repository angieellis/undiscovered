var geocoder;
var map;

function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644); //Setting Default
  var mapOptions = {
    zoom: 8,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
};

var markers_array = [];

function codeAddress() {
  console.log(markers_array);
  var address = document.getElementById('address').value; //Get the address
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      console.log(results)
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
          draggable: true
      });
      markers_array.push(marker);
      markers_array.forEach(function(obj){
        console.log(obj.position.A);
        console.log(obj.position.F)})
      google.maps.event.addListener( marker, 'dragend', function(ev){
       // イベントの引数evの、プロパティ.latLngが緯度経度。
        document.getElementById('latitude').value = ev.latLng.lat();
        document.getElementById('longitude').value = ev.latLng.lng();
      });

    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
};

google.maps.event.addDomListener(window, 'load', initialize); //Execute initialize
