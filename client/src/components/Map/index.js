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
    progress: [], // Handle GPS updates
    loading: true, // Prevent map from loading before initial position is collected
    googleAddress: "",
    geocodeLocation: "", // Handle lat, long for destination
    searchCity: "", // Handle "City" input
    st: "", // Handle "State" input
    phoneNumber: "", // Handle "Phone number input"
    searchAddress: "",
    zoom: 16, // Handle initial map zoom
    center: "", // Handle map centering
    bounds: false, // Handle map boundaries
    tripTime: "",
    user_id: "",
    trip_id: "",
    userName: "",
    mode: "",
    src: "", 
    startTextCount: 0, // Prevent initial text duplication on state changes
    endTextCount: 0, // Prevent arrival text duplication on state changes
    buttonDisabled: false, // Handle multiple address submissions
    buttonText: "Start" // Handle changing text on button to indicate that their friend has arrived
  }

  initialLocation = () => {
    const getPosition = function () {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, {maximumAge: 0});
      });
    }
    // Get the user's starting location
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
  };
 
  watchPosition = (tripId, tripTime) => {
    let endTrip = this.state.endTextCount
    let userName = this.state.userName
    const watch = navigator.geolocation.watchPosition(
      (position) => {
        let location = this.state.progress.concat({ lat: position.coords.latitude, lng: position.coords.longitude });
        console.log(location)
        const userId = localStorage.getItem('user');
        this.setState({ progress: location, buttonDisabled: true, buttonText: "Text Sent" })
        // Save GPS updates to database so it can be reproduced for friend to track the user's whereabouts. 
        API.updateTrip(tripId, location, userId, tripTime, endTrip, userName )
        this.distanceCalc(this.state.progress[this.state.progress.length-1].lat, this.state.progress[this.state.progress.length-1].lng, this.state.geocodeLocation[0].lat, this.state.geocodeLocation[0].lng)
        
        // If a text message has been sent to denote arrival, stop watching the user's position.
        if (this.state.endTextCount === 1) { 
          navigator.geolocation.clearWatch(watch);
        }
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
      if (dist <= .01) { 
        // If the user is less then .01 miles from the destination point trigger text message to friend
        if (this.state.endTextCount === 0) {
          API.arrivalText(this.state.phoneNumber)
          this.setState({endTextCount: this.state.endTextCount + 1})
        }
      } 
    }
  }

  // Gets the Lat and Long from the google API for the user's end destination
  getGeocode = () => {
    let address = {
      user_id: localStorage.getItem('user'),
      address: this.state.searchAddress.trim(),
      city: this.state.searchCity.trim(),
      state: this.state.st.trim(),
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
        // Jump to top of page after submission as scrolling upward to the map can sometimes refresh the page on a phone
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      })
      .catch(err => console.log(err));
  }

  // Calculate the estimated time for the trip based on the user's mode of transport
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
      mode: this.state.mode
    }

    API.distanceMatrix({
      distanceMatrixInfo
    })
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState(() => ({
          tripTime: res.data.rows[0].elements[0].duration.text,
          src: window.location.href + "/friendview/" + this.state.trip_id
        }));
        this.watchPosition(this.state.trip_id, this.state.tripTime)
        console.log(this.state.src)
        if (this.state.startTextCount === 0) {
          // Notify the friend of the user's trip
          API.startTripText(this.state.phoneNumber,this.state.src)
          // Ensure that only one text message is sent
          this.setState({startTextCount: this.state.startTextCount + 1})
        }
      })
      .catch(err => console.log(err));
  }; 

  // Handles resetting the map center
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
    this.getUser()
  };

  // Handle the changing of map boundaries so it zooms to include the markers on the screen
  boundsChanged = () => { 
    const google = window.google; 
    const bounds = new google.maps.LatLngBounds();
    const start = `${this.state.progress[0].lat}, ${this.state.progress[0].lng}`
    const end = `${this.state.geocodeLocation[0].lat}, ${this.state.geocodeLocation[0].lng}`
   // Don't exend map boundaries until we know that the user has added an end destination
   if (start !== end && this.state.bounds === false) {
    this.setState({bounds:true})
    // Extend map boundaries to encompass the start and end markers
    bounds.extend(new google.maps.LatLng(parseFloat(this.state.geocodeLocation[0].lat), parseFloat(this.state.geocodeLocation[0].lng)));
    bounds.extend(new google.maps.LatLng(parseFloat(this.state.progress[0].lat), parseFloat(this.state.progress[0].lng)));
    // Find the center of the start and end markers so the map can be repositioned
    let centerCoordinates = { lat: bounds.getCenter().lat(), lng: bounds.getCenter().lng() }
    // Pass the newly centered coordinates to a setter function that changes the map center state so it re-renders
    this.mapCenterSetter(centerCoordinates, bounds);
   }
  }

  getUser = async () => {
    console.log("userid" + localStorage.getItem('user'))
    await API.getUser(
      localStorage.getItem('user')
    )
      .then(res => {
        this.setState({ userName: res.data.name })
        console.log(this.state.userName)
      })
      .catch(err => console.log(err));
  }

  transportation = (type) => {
    this.setState({mode: type})
  }
  
  render() {
    const { loading, progress } = this.state; 

    // Check if we have the user's position. If not, do not load map until this is collected.
    if (loading) {
      return null;
    }
    
    return (
      <div style={{ backgroundColor: "white" }}>
        <Col size="md-12 xs-12">
          <GoogleMap
            defaultZoom={this.state.zoom}
            center={this.state.center}
            onBoundsChanged={this.boundsChanged}
            ref={(ref) => { this.map = ref; }}
          > 
            {this.state.progress && (
              <>
                {/* Build path */}
                <Polyline path={progress} options={{ strokeColor: "#FF0000 " }} />
                {/* Show current location by placing marker to last known GPS location collected */}
                <Marker position={progress[progress.length - 1]} />
                    <Marker position={{ lat: this.state.geocodeLocation[0].lat, lng: this.state.geocodeLocation[0].lng }} />
              </>
            )}
          </GoogleMap>
        </Col>
        <Col size="md-12 xs-12">
          <TransportationMethodButton transportationType={this.transportation}/>
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
                  placeholder="Address"
                  type="text"
                  disabled={this.state.buttonDisabled}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="col">
                <Input 
                  value={this.state.searchCity || ''}
                  onChange={this.handleInputChange}
                  name="searchCity"
                  placeholder="City"
                  type="text"
                  disabled={this.state.buttonDisabled}
                />
              </div>
              <div className="col">
                <Input 
                  value={this.state.st || ''}
                  onChange={this.handleInputChange}
                  name="st"
                  placeholder="State"
                  type="text"
                  disabled={this.state.buttonDisabled}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="col pt-4">
                    <label><strong>Notify a friend</strong></label>
                </div>
            </div>
            <div className="form-row">
                <div className="col">
                  <Input 
                    value={this.state.phoneNumber || ''}
                    onChange={this.handleInputChange}
                    name="phoneNumber"
                    placeholder="123-555-5555"
                    type="text"
                    disabled={this.state.buttonDisabled}
                  />
                </div>
            </div>
          </form>
          <Notification 
            onClick={this.getGeocode}
            isDisabled={this.state.buttonDisabled}
            buttonText={this.state.buttonText}
          />
        </Col>
      </div>
    )
  }
}

export default Map;