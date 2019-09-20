import React from 'react';
import { withGoogleMap, withScriptjs } from 'react-google-maps';
import { Col, Row } from "../components/Grid";
import { Input } from "../components/Form";
import Notification from "../components/Notification/Notification";
import TransportationMethodButton from "../components/Transportation/Transportation";
import Nav from "../components/Nav/"
import Map from "../components/Map"


class Home extends React.Component {
  state = {
    progress: [],
    loading: true,
    transportationMethod: "Car",
    page: "Home"
  }

  handleTransportationMethod = method => {
    this.setState({ transportationMethod: method });
  };
  
  render() {
    const MapComponent = withScriptjs(withGoogleMap(Map))
      return (
        <div>
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

              <TransportationMethodButton
                transportationMethod={this.state.transportationMethod}
                handleTransportationMethod={this.handleTransportationMethod}
              />

              <div className="row mx-3"> 
                <div className="col">
                  <label><strong>Destination</strong></label>
                </div>
              </div>

              <div className="form-row mx-4">
                <div className="col-md-12 col-xs-12 pt-2"> 
                  <Input className="form-control no-gutters" id="address" placeholder="Address" /> 
                </div>
              </div>
      
              <div className="form-row mx-4">
                <div className="col">
                  <Input className="form-control no-gutters" id="city" placeholder="City" /> 
                </div>
                <div className="col">
                  <Input className="form-control no-gutters" id="zip" placeholder="Zip" /> 
                </div>
              </div>

              <Notification />
            </Col>
          </Row>
        </div>
      )
    }
  }

export default Home
