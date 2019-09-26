import React from 'react';
import { GoogleMap, Polyline, Marker } from 'react-google-maps';
import { Col } from "../Grid";
import API from "../../utils/API";



class Map extends React.Component {
  state = {
    progress: [],
    loading: true,
    trip_id: this.props.trip_id,
    tripTime: "",
    destinationCoords: [{lat:"",lng:""}],
    destinationAddress: "",
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

  componentDidMount = () => {
    console.log(this.state.trip_id)
    this.initialLocation()
    this.getTrip(this.state.trip_id)
  }

  getTrip = (trip_id) =>{
    console.log("Trip Id sent to friend:" + this.state.trip_id)
    API.getTrip(
      trip_id
   )
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState(() => ({
          progress: res.data.progress,
          tripTime: res.data.tripTime,
          destinationAddress: res.data.destinationAddress
        }));

      })
      .catch(err => console.log(err));
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
                <Marker position={{ lat: this.state.destinationCoords[0].lat, lng: this.state.destinationCoords[0].lng }} />
              </>
            )}
          </GoogleMap>
        </Col>
        <Col size="md-12 xs-12">
          <p>{this.state.tripTime}</p>
          <p>{this.state.destinationAddress}</p>
        </Col>
      </div>
    )
  }
}

export default Map;