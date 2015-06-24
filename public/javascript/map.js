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

function codeAddress() {
  var address = document.getElementById('state').value + " " + document.getElementById('city').value + " " + document.getElementById('street').value;
   //Get the address
  geocoder.geocode( { 'address': address}, function(results, status) {
    document.getElementById('latitude').value = results[0].geometry.location.A;
    document.getElementById('longitude').value = results[0].geometry.location.F;
    if (status == google.maps.GeocoderStatus.OK) {
      console.log(results)
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
          draggable: true
      });

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
