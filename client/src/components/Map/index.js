import React from 'react';
import { Link } from 'react-router-dom'
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
    center: "", 
    bounds: false, 
    phoneNumber: "",
    tripTime: "",
    user_id: "",
    trip_id: "",
    src: "",
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
            center: { lat: latitude, lng: longitude },
            loading: false
          });
        }    
    }); 
 }
 
  getUserID = () =>{
    this.setState(() => ({
      user_id: localStorage.getItem('user')
    }))
    console.log("user id:" + this.state.user_id)
  }

  watchPosition = (tripId, tripTime) => {
    navigator.geolocation.watchPosition(
      (position) => {
        let location = this.state.progress.concat({ lat: position.coords.latitude, lng: position.coords.longitude });
        const userId = localStorage.getItem('user');
        this.setState({ progress: location })
        // Save each watchPosition update to mongo so it can be reproduced for friend looking to track location
        API.updateTrip(tripId, location, userId, tripTime)
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
        API.arrivalText(this.state.phoneNumber)
      } 
    }
  }

  // Gets the Lat and Long from the google API
  getGeocode = () => {
    let address = {
      user_id: this.state.user_id,
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
          center: { lat:res.data.results[0].geometry.location.lat, lng:res.data.results[0].geometry.location.lng },
          trip_id: res.data.tripId,
          
        }));
        this.distanceMatrix()
 
      })
      .catch(err => console.log(err));
  }

  // gets the travel time from google API and sets it to the state
  distanceMatrix = () => {
    let distanceMatrixInfo = {
      geocodeDestination: {
        lat: this.state.geocodeLocation[0].lat,
        lng: this.state.geocodeLocation[0].lng
      },
      start: {
        lat: this.state.progress[0].lat,
        lng: this.state.progress[0].lng
      },
      mode: "driving"
    }
    console.log(distanceMatrixInfo)
    API.distanceMatrix({
      distanceMatrixInfo
    })
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState(() => ({
          tripTime: res.data.rows[0].elements[0].duration.text,
          src: window.location.href + "friendview/" + this.state.trip_id
        }));
        this.watchPosition(this.state.trip_id, this.state.tripTime)
        console.log(this.state.src)
      })
      .catch(err => console.log(err));
  }; 

  mapCenterSetter = (coordinates, bounds) => { 
    this.setState({center:coordinates}); 
    this.map.fitBounds(bounds)
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

  boundsChanged = () => { 
    const google = window.google; 

    const bounds = new google.maps.LatLngBounds();
    const start = `${this.state.progress[0].lat}, ${this.state.progress[0].lng}`
    const end = `${this.state.geocodeLocation[0].lat}, ${this.state.geocodeLocation[0].lng}`
   // Because state changes each time a new character is added, don't exent bounds until we know that there is an end destination
   if (start !== end && this.state.bounds === false) {
    this.setState({bounds:true})
    // Extend the bounds by the coordinates of the start and end markers
    bounds.extend(new google.maps.LatLng(parseFloat(this.state.geocodeLocation[0].lat), parseFloat(this.state.geocodeLocation[0].lng)));
    bounds.extend(new google.maps.LatLng(parseFloat(this.state.progress[0].lat), parseFloat(this.state.progress[0].lng)));
    //google.maps.Map.fitBounds(bound);
    // Get the center of the map between these markers
    let centerCoordinates = { lat: bounds.getCenter().lat(), lng: bounds.getCenter().lng() }
    // Pass the newly centered coordinates to a setter function that changes the map center state so it re-renders
    this.mapCenterSetter(centerCoordinates, bounds);
   }
  }
  
  render() {
    const { loading, progress } = this.state; 
    
    // Check if we have a position, if not, do not load map
    if (loading) {
      return null;
    }
    
    return (
      <div style={{ backgroundColor: "white"}}>

      <Col size="md-12 xs-12">
        <GoogleMap
          defaultZoom={this.state.zoom}
          center={this.state.center}
          onBoundsChanged={this.boundsChanged}
          ref={(ref) => { this.map = ref; }}
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

            <div className="form-row">
              <div className="col pt-4">
                    <label><strong>Contact</strong></label>
                </div>
            </div>
            <div className="form-row">
                <div className="col">
                  {/* <input className="w-100 form-control mb-2" type="text" id="phoneNumber" placeholder="123-555-5555" required/> */}
                  <Input 
                    value={this.state.phoneNumber || ''}
                    onChange={this.handleInputChange}
                    name="phoneNumber"
                    placeholder="123-555-5555 (required)"
                    type="text"
                  />
                </div>
            </div>
          </form>

        <Notification 
            onClick={this.getGeocode}
          />
          <Link to={{ pathname: "/dashboard/friendview/" + this.state.trip_id }}>See Friends Page</Link>
      </Col>
      </div>
    )
  }
}

export default Map;