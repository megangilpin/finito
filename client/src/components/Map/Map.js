import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Polyline, Marker } from 'react-google-maps';
import { Col, Row, Container } from "../components/Grid";

class Map extends React.Component {
  state = {
    progress: [],
    loading: true
  }

  initialLocation = () => { 
    const getPosition = function (options) {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
    }
    
    getPosition()
      .then((position) => {
        const { latitude, longitude } = position.coords

        this.setState({ 
          progress: [{lat: latitude, lng: longitude}],
          loading: false
        })
        this.watchPosition()
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  watchPosition = () => {
    navigator.geolocation.watchPosition(
      (position) => {
        let location = this.state.progress.concat({lat:position.coords.latitude,lng:position.coords.longitude})
        this.setState({ progress: location })
      }
    )
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
        <GoogleMap
          defaultZoom={5}
          defaultCenter={{lat:39.0921017, lng:-94.7158009}}
          >
            { this.state.progress && (
              <>
                {/* Set path */}
                <Polyline path={progress} options={{ strokeColor: "#FF0000 "}} />
                {/* Set marker to last known location */}
                <Marker position={progress[progress.length - 1]} />
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