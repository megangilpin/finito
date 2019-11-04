import React from 'react';
import { GoogleMap, Polyline, Marker } from 'react-google-maps';
import { Col, Row } from "../Grid";
import API from "../../utils/API";
import "./Map.css"

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
    friendZoom: 16, // Handle initial map zoom
    center: "", // Handle map centering
    bounds: false, // Handle map boundaries,
    endTrip: "",
    userName: "", // stops setInterval
  }

  componentDidMount = () => {
    this.getTrip()
    // var intervalId = setInterval(this.timer, 30000);
    var interval = setInterval(this.getTrip, 5000)
    this.setState({ interval: interval });
  }

  getTrip = () =>{
    if(this.state.endTrip === 1){
      clearInterval(this.state.interval)
    } else {
    API.getTrip(
      this.state.trip_id
   )
      .then(res => {
        
        this.setState(() => ({
          progress: res.data.progress,
          tripTime: res.data.tripTime,
          destinationAddress: res.data.destinationAddress,
          destinationCoords: [{ lat: res.data.destinationCoords[0].lat, lng: res.data.destinationCoords[0].lng }],
          loading: false,
          endTrip: res.data.endTrip,
          count: this.state.count + 1,
          userName: res.data.userName
        }));
        if(this.state.endTrip === 1){
          clearInterval(this.state.intervalId);
        }
      })
      .catch(err => console.log(err));
    }
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
    const { loading } = this.state;

    // Check if we have a position, if not, do not load map
    if (loading) {
      return null;
    }

    return (
      <div style={{backgroundColor: "white"}}>
        <Col size="md-12 xs-12">
          <GoogleMap
            defaultZoom={this.state.zoom}
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
            <p className="mb-2 mt-3"><strong>{this.state.userName} is en route to: </strong></p>
              <p className="mb-2">{this.state.destinationAddress}</p>
            <hr className="hr-text" style={{ marginTop: 0, align: "left", width: "40%", height: "2px", backgroundColor:"#FF5722"}}></hr>
              <p className="mb-2 mt-3"><strong>Est. Arryvl in {this.state.tripTime}</strong></p>
            
          </div>
        </Col>
        </Row>
      </div>
    )
  }
}

export default Map;
