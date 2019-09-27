import React from 'react';
import { Link } from 'react-router-dom'
import { GoogleMap, Polyline, Marker } from 'react-google-maps';
import { Col, Row } from "../Grid";
import TransportationMethodButton from "../Transportation/Transportation";
import Notification from "../Notification/Notification";
import API from "../../utils/API";
import { Input } from "../Form";



class Map extends React.Component {
  state = {
    progress: [],
    loading: true,
    trip_id: this.props.trip_id,
    tripTime: "",
    destinationCoords: [],
    destinationAddress: "",
    count: 0,
    switch: false,
    currentCount: 20,
    zoom: 16, // Handle initial map zoom
    center: "", // Handle map centering
    bounds: false, // Handle map boundaries
  }

  componentDidMount = () => {
    this.getTrip()
    // var intervalId = setInterval(this.timer, 30000);
    var interval = setInterval(this.getTrip, 30000)
    this.setState({ interval: interval });
  }

  getTrip = () =>{
    API.getTrip(
      this.state.trip_id
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

  // Handles resetting the map center
  mapCenterSetter = (coordinates, bounds) => {
    this.setState({ center: coordinates });
    this.map.fitBounds(bounds)
  }

  // Handle the changing of map boundaries so it zooms to include the markers on the screen
  boundsChanged = () => {
    const google = window.google;
    const bounds = new google.maps.LatLngBounds();
    const start = `${this.state.progress[0].lat}, ${this.state.progress[0].lng}`
    const end = `${this.state.destinationCoords[0].lat}, ${this.state.destinationCoords[0].lng}`
    // Don't exend map boundaries until we know that the user has added an end destination
    if (start !== end && this.state.bounds === false) {
      this.setState({ bounds: true })
      // Extend map boundaries to encompass the start and end markers
      bounds.extend(new google.maps.LatLng(parseFloat(this.state.destinationCoords[0].lat), parseFloat(this.state.destinationCoords[0].lng)));
      bounds.extend(new google.maps.LatLng(parseFloat(this.state.progress[0].lat), parseFloat(this.state.progress[0].lng)));
      // Find the center of the start and end markers so the map can be repositioned
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
      <div style={{backgroundColor: "white"}}>
       
        <Col size="md-12 xs-12">
          <GoogleMap
            defaultZoom={16}
            defaultCenter={{ lat: this.state.progress[0].lat, lng: this.state.progress[0].lng }}
            defaultZoom={this.state.zoom}
            center={this.state.center}
            onBoundsChanged={this.boundsChanged}
            ref={(ref) => { this.map = ref; }}
          >
            {this.state.progress && (
              <>
                {/* Set path */}
                <Polyline path={this.state.progress} options={{ strokeColor: "#FF0000 " }} />
                {/* Set marker to last known location */}
                <Marker position={this.state.progress[this.state.progress.length - 1]} />
                <Marker position={{ lat: this.state.destinationCoords[0].lat, lng: this.state.destinationCoords[0].lng }} />
              </>
            )}
            
          </GoogleMap>
        </Col>
        <Row>
        <Col size="md-12 xs-12">
          <div className="text-center mt-4">
            <p className="mb-2 mt-3"><strong>Est. Arryvl in {this.state.tripTime}</strong></p>
            <hr className="hr-text" style={{ marginTop: 0, align: "left", width: "40%", height: "2px", backgroundColor:"#FF5722"}}></hr>
            <p className="mb-2"><strong>Destination:</strong> {this.state.destinationAddress}</p>
          </div>
        </Col>
        </Row>
      </div>
    )
  }
}

export default Map;