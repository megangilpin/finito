import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Polyline, Marker } from 'react-google-maps';
import { Col, Row, Container } from "../components/Grid";
import Notification from "../components/Notification/Notification";
import Transportation from '../components/Transportation/Transportation';


class Map extends React.Component {
  state = {
    progress: [],
    loading: true, 
    transportationMethod: "Car"
  }

  handleTransportationMethod = method => {
    this.setState({ transportationMethod: method });
  };

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
          defaultZoom={16}
          defaultCenter={{lat:progress[0].lat, lng:progress[0].lng}}
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
      <Col size="md-10 xs-12">
        <MapComponent
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%`, width: '100%' }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </Col>
     
      
      <Col size="md-2 xs-12">
        <Transportation /> 
        <Notification 
          transportationMethod={this.state.transportationMethod}
          handleTransportationMethod={this.handleTransportationMethod}
        />
      </Col>
    </Row>
  </Container>
)