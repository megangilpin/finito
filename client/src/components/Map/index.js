import React from 'react';
import { GoogleMap, Polyline, Marker } from 'react-google-maps';
import { Col } from "../Grid";
import TransportationMethodButton from "../Transportation/Transportation";
import Address from "../Address/Address";
import Notification from "../Notification/Notification";
import API from "../../utils/API";

class Map extends React.Component {
  state = {
    progress: [],
    loading: true,
    googleAddress: "",
    geocodeLocation: [],
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
          // Start watching location
        }    
    }); 
 }

  watchPosition = () => {
    navigator.geolocation.watchPosition(
      (position) => {
        let location = this.state.progress.concat({ lat: position.coords.latitude, lng: position.coords.longitude })
        this.setState({ progress: location })
      }
    )
  }

  getGeocode = () => {
    console.log(this.refs)
    let address = {
      address: 123,
      city: 1,
      state: 1
    }
    this.watchPosition()
    
    API.getGeocode({
      address
    })
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState(() => ({
          googleAddress: res.data[0].formatted_address,
          geocodeLocation: [parseFloat(res.data[0].geometry.location.lat), parseFloat(res.data[0].geometry.location.lng)]
        }));
        console.log("Address from google: " + this.state.googleAddress)
        console.log("New address: " + this.state.geocodeLocation)
      })
      .catch(err => console.log(err));
  }

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
              </>
            )}
          </GoogleMap>
        </Col>
        <Col size="md-12 xs-12">
          <TransportationMethodButton />
          <Address />
          <Notification />
          <div>
            <button type="button" onClick={this.getGeocode} className="btn btn-dark">Get Geocode</button>
          </div>
        </Col>
      </div>
    )
  }
}

export default Map;