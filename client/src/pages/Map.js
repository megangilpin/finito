import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Polyline, Marker } from 'react-google-maps';
import { Col, Row, Container } from "../components/Grid";
import Notification from "../components/Notification/Notification";
import Nav from "../components/Nav/"
import Main from "../components/Main"
import Map from "../components/Map"


class Home extends React.Component {
  state = {
    progress: [],
    loading: true,
    page:"Home"
  }
  
  render() {
    const MapComponent = withScriptjs(withGoogleMap(Map))
      return (
        <div>
          {console.log(this.state)}
          <Nav
            page={this.state.page}
          />
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
              <Notification />
            </Col>
          </Row>
        </div>
      )
  }
}

export default Home