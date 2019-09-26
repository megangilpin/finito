import React from 'react';
import { GoogleMap, Polyline, Marker } from 'react-google-maps';
import { Col, Row } from "../Grid";
import API from "../../utils/API";



class Map extends React.Component {
  state = {
    progress: [],
    loading: true,
    trip_id: this.props.trip_id,
    tripTime: "",
    destinationCoords: [],
    destinationAddress: "",
    count: 0,
    switch: false
  }

  componentDidMount = () => {
    console.log(this.state.trip_id)
    this.getTrip(this.state.trip_id)
    
  }

  getTrip = (trip_id) =>{
    console.log("Trip Id sent to friend:" + this.state.trip_id)
    API.getTrip(
      trip_id
   )
      .then(res => {
        // if (res.data.status === "error") {
        //   throw new Error(res.data.message);
        // }
        this.setState(() => ({
          progress: res.data.progress,
          tripTime: res.data.tripTime,
          destinationAddress: res.data.destinationAddress,
          destinationCoords: [{ lat: res.data.destinationCoords[0].lat, lng: res.data.destinationCoords[0].lng }],
          loading: false,
          count: this.state.count + 1
        }));
        console.log(this.state.count)
        // setInterval(this.getTrip(trip_id), 5000)
      })
      .catch(err => console.log(err));
  }

  callAgain = () => {
    setTimeout(this.helper, 30000)
  }

  helper = () => {
    this.setState({ switch: !this.state.switch })
    this.getTrip(this.state.trip_id)
  }

  render() {
    const { loading, progress } = this.state;

    // Check if we have a position, if not, do not load map
    if (loading) {
      return null;
    }

    return (
      <div>
      {this.callAgain()}
        <Col size="md-12 xs-12">
          <GoogleMap
            defaultZoom={16}
            defaultCenter={{ lat: this.state.progress[0].lat, lng: this.state.progress[0].lng }}
          >
            {this.state.progress && (
              <>
                {/* Set path */}
                <Polyline path={this.state.progress} options={{ strokeColor: "#FF0000 " }} />
                {/* Set marker to last known location */}
                <Marker position={this.state.progress[this.state.progress.length - 1]} />
                {console.log("Destination Coords:" + this.state.destinationCoords[0].lng)}
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