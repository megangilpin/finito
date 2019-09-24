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
    geocodeLocation: [{lat: 0, lng: 0}],
    searchCity: "",
    st: "",
    searchAddress: "",
    user_id: ""
  }

  initialLocation = () => {
    const getPosition = function (options) {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
    }

    getPosition().then((position) => {
        const { latitude, longitude } = position.coords
        
        if (position) {
          this.setState({
            progress: [{ lat: latitude, lng: longitude }],
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
      }
    )
  }

  // gets the Lat and Long from the google API
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
          geocodeLocation: [{lat:(res.data.results[0].geometry.location.lat), lng:(res.data.results[0].geometry.location.lng)}]
        }));
        this.watchPosition(res.data.tripId)
      })
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  componentDidMount = () => {
    this.initialLocation()
  }

  render() {
    const { loading, progress } = this.state;

    // Check if we have a position, if not, do not load map
    if (loading) {
      return null;
    }
    
    return (
      <div>

      <Col size="md-12 xs-12">
        <GoogleMap
          defaultZoom={16}
          defaultCenter={{ lat: progress[0].lat, lng: progress[0].lng }}
        >
          {this.state.progress && (
            <>
              {/* Set path */}
              <Polyline path={progress} options={{ strokeColor: "#FF0000 " }} />
              {/* Set marker to last known location */}
              <Marker position={progress[progress.length - 1]} />
                  <Marker position={{ lat: this.state.geocodeLocation[0].lat, lng: this.state.geocodeLocation[0].lng}} />
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