const currentLocation = {
  latitude: null,
  longitude: null
}

navigator.geolocation.getCurrentPosition(
  (position) => {
      currentLocation.latitude = parseFloat(position.coords.latitude);
      currentLocation.longitude = parseFloat(position.coords.longitude);
    }
  );


function initMap() {
  console.log(currentLocation)
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: { lat: currentLocation.latitude, lng: currentLocation.longitude } 
  });

  const plotLocation = [{ lat: currentLocation.latitude, lng: currentLocation.longitude }];

  setInterval(() => {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        const { longitude, latitude } = position.coords
        plotLocation.push(new google.maps.LatLng({lat: parseFloat(40.779776),lng: parseFloat(-73.94754560000001)}))
        setInterval(() => { plotLocation.push(new google.maps.LatLng({lat:parseFloat(39.779776),lng:parseFloat(-73.94754560000001)})) }, 2000)
        setInterval(() => { plotLocation.push(new google.maps.LatLng({lat:parseFloat(38.779776),lng:parseFloat(-73.94754560000001)})) }, 4000)
        setInterval(() => { plotLocation.push(new google.maps.LatLng({lat:parseFloat(32.779776),lng:parseFloat(-73.94754560000001)})) }, 6000)
        setInterval(() => { plotLocation.push(new google.maps.LatLng({lat:parseFloat(30.779776),lng:parseFloat(-73.94754560000001)})) }, 8000)
        
        // Redraw line on map using new coordinates array
        const drawLine = new google.maps.Polyline({
          path: plotLocation,
          strokeColor: 'blue',
          strokeOpacity: 1.0,
          strokeWeight: 3
        });

        drawLine.setMap(map);
    })
  },100); 
}