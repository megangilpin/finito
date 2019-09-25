import React from 'react';
import { GoogleMap, Polyline, Marker } from 'react-google-maps';
import { Col } from "../Grid";
import TransportationMethodButton from "../Transportation/Transportation";
import Notification from "../Notification/Notification";
import API from "../../utils/API";
import { Input } from "../Form";

class Map extends React.Component {
  state = {
    progress: [],
    loading: true,
    googleAddress: "",
    geocodeLocation: "",
    searchCity: "",
    st: "",
    searchAddress: "",
    zoom: 16,
    center: ""
  }

  initialLocation = () => {
    const getPosition = function () {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, {maximumAge: 0});
      });
    }

    getPosition().then((position) => {
        const { latitude, longitude } = position.coords
        if (position) {
          this.setState({
            progress: [{ lat: latitude, lng: longitude }],
            geocodeLocation: [{ lat: latitude, lng: longitude }],
            loading: false
          });
        }    
    }); 
 }

  watchPosition = (tripId) => {
    navigator.geolocation.watchPosition(
      (position) => {
        let location = this.state.progress.concat({ lat: position.coords.latitude, lng: position.coords.longitude });
        const userId = localStorage.getItem('user');
        this.setState({ progress: location })
        // Save each watchPosition update to mongo so it can be reproduced for friend looking to track location
        API.updateTrip(tripId, location, userId)
        this.distanceCalc(this.state.progress[this.state.progress.length-1].lat, this.state.progress[this.state.progress.length-1].lng, this.state.geocodeLocation[0].lat, this.state.geocodeLocation[0].lng)
      }
    )
  }

  distanceCalc = (lat1, lon1, lat2, lon2) => { 
    if ((lat1 === lat2) && (lon1 === lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (dist <= .06) { 
        // If the user is less then .06 miles from the destination point trigger text message to friend
        // Code to trigger message
      } 
    }
  }

  // Gets the Lat and Long from the google API
  getGeocode = () => {
    let address = {
      address: this.state.searchAddress.trim(),
      city: this.state.searchCity.trim(),
      state: this.state.st.trim()
    }
    
    API.getGeocode({
      address
    })
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        
        this.setState(() => ({
          googleAddress: res.data.results[0].formatted_address,
          geocodeLocation: [{lat:res.data.results[0].geometry.location.lat, lng:res.data.results[0].geometry.location.lng}],
          center: { lat:res.data.results[0].geometry.location.lat, lng:res.data.results[0].geometry.location.lng }
        }));
        this.watchPosition(res.data.tripId)
      })
      .catch(err => console.log(err));
  }; 

  mapCenterSetter = (coordinates) => { 
    this.setState({center:coordinates})
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  componentDidMount = () => {
    this.initialLocation()
  };
  
  render() {
    const { loading, progress } = this.state; 
    
    const boundsChanged = () => { 
      const google = window.google; 
      let bound = new google.maps.LatLng();
      const start = `${this.state.progress[0].lat}, ${this.state.progress[0].lng}`
      const end = `${this.state.geocodeLocation[0].lat}, ${this.state.geocodeLocation[0].lng}`
    
     // Because state changes each time a new character is added, don't exent bounds until we know that there is an end destination
     if (start !== end) {
      // Extend the bounds by the coordinates of the start and end markers
      bound.extend(new google.maps.LatLng({lat:parseFloat(this.state.geocodeLocation[0].lat), lng:parseFloat(this.state.geocodeLocation[0].lng)}));
      bound.extend(new google.maps.LatLng({lat:parseFloat(this.state.progress[0].lat), lng:parseFloat(this.state.progress[0].lng)}));
      google.maps.Map.fitBounds(bound);
      // Get the center of the map between these markers
      let centerCoordinates = { lat: bound.getCenter().lat(), lng: bound.getCenter().lat() }
      // Pass the newly centered coordinates to a setter function that changes the map center state so it re-renders
      this.mapCenterSetter(centerCoordinates);
     }
    }

    // Check if we have a position, if not, do not load map
    if (loading) {
      return null;
    }
    
    return (
      <div>

      <Col size="md-12 xs-12">
        <GoogleMap
          defaultZoom={this.state.zoom}
          center={{ lat: this.state.geocodeLocation[0].lat, lng: this.state.geocodeLocation[0].lng }}
          onBoundsChanged={boundsChanged}
        > 
          {this.state.progress && (
            <>
              {/* Set path */}
              <Polyline path={progress} options={{ strokeColor: "#FF0000 " }} />
              {/* Set marker to last known location */}
              <Marker position={progress[progress.length - 1]} />
                  <Marker position={{ lat: this.state.geocodeLocation[0].lat, lng: this.state.geocodeLocation[0].lng }} />
            </>
          )}
        </GoogleMap>
      </Col>
      <Col size="md-12 xs-12">
        <TransportationMethodButton />
          <form>
            <div className="row">
              <div className="col">
                <label><strong>Address</strong></label>
              </div>
            </div>

            <div className="form-row">
              <div className="col-md-12 col-xs-12 pt-2">
                <Input 
                  value={this.state.searchAddress  || ''}
                  onChange={this.handleInputChange}
                  name="searchAddress"
                  placeholder="Address (required)"
                  type="text"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="col">
                <Input 
                  value={this.state.searchCity || ''}
                  onChange={this.handleInputChange}
                  name="searchCity"
                  placeholder="City (required)"
                  type="text"
                />
              </div>
              <div className="col">
                <Input 
                  value={this.state.st || ''}
                  onChange={this.handleInputChange}
                  name="st"
                  placeholder="State (required)"
                  type="text"
                />
              </div>
            </div>
          </form>

        <Notification 
            onClick={this.getGeocode}
            
          />
      </Col>
      </div>
    )
  }
}

export default Map;