import React from 'react';
import { withGoogleMap, withScriptjs } from 'react-google-maps';
import { Col, Row, Container } from "../components/Grid";
import Map from "../components/FriendMap"
import FriendNav from "../components/FriendNav"


const Friendview = ({ match }) => {
  
  const MapComponent = withScriptjs(withGoogleMap(Map))
  return (
    <div style={{ height: "100%" }}>
      <FriendNav />
      <Container >
        <Row>
          <Col size="md-12 xs-12">
            <MapComponent 
              
              trip_id={match.params.id}
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%`, width: '100%' }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}


export default Friendview