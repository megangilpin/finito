import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Polyline, Marker } from 'react-google-maps';
import { Col, Row, Container } from "../components/Grid";

class Map extends React.Component {
  state = {
    progress: [],
  }

  initialLocation = () => { 
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    const error = {

    }

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          this.setState([{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }])
        }, error, options)
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  getLocation = () => {
      console.log('intitial',this.state.progress)
      window.setInterval(() => {
        navigator.geolocation.watchPosition(
          (position) => {
            let location = this.state.progress.concat({lat:position.coords.latitude,lng:position.coords.longitude})
            this.setState({ progress: location })
            setTimeout(()=>{console.log('added',this.state.progress)},5000)
          }

        )}
      ,1000); 
  }

  componentDidMount = () => { 
    if(this.state.progress.length === 1) { 
      // Set initial location if none exists
      this.initialLocation()
    } 
      // Start logging locations
      this.getLocation()
    
  }
  
  render = () => {
    return (
      <GoogleMap
        defaultZoom={5}
        defaultCenter={{lat:39.0921017, lng:-94.7158009}}
        >
          { this.state.progress && (
            <>
              {/* Set path */}
              <Polyline path={this.state.progress} options={{ strokeColor: "#FF0000 "}} />
              {/* Set marker to last known location */}
              <Marker position={this.state.progress[this.state.progress.length - 1]} />
            </>
          )}
      </GoogleMap>
    )
  }
}

const MapComponent = withScriptjs(withGoogleMap(Map))

export default () => (
  <Container fluid>
    <Row> 
      <Col size="md-10">
        <MapComponent
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%`, width: '100%' }} />}
          mapElement={<div style={{ height: `1000px` }} />}
        />
      </Col>
      <Col size="md-2">
        Arryvl
      </Col>
    </Row>
  </Container>
)
