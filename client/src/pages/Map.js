import React from 'react';
import { withGoogleMap, withScriptjs } from 'react-google-maps';
import { Col, Row, Container} from "../components/Grid";
import Address from "../components/Address/Address";
import Notification from "../components/Notification/Notification";
import TransportationMethodButton from "../components/Transportation/Transportation";
import Map from "../components/Map"
import Tabs from "./Sidebar"

const Home = () => {
    const MapComponent = withScriptjs(withGoogleMap(Map))
    return (
        <div style={{height: "100%"}}>
        <Tabs />
          <Container >
          <Row>
            <Col size="md-12 xs-12">
              <MapComponent
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%`, width: '100%' }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </Col>
            <Col size="md-12 xs-12">
              <TransportationMethodButton />
              <Address />
              <Notification />
            </Col>
          </Row>
        </Container>
        </div>
      )
    }

export default Home
