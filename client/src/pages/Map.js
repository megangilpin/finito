import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Polyline, Marker } from 'react-google-maps';
import { Col, Row, Container } from "../components/Grid";
import Notification from "../components/Notification/Notification";
import Nav from "../components/Nav/";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import Backdrop from "../components/Backdrop";
import API from "../utils/API";
 


class Home extends React.Component {
  state = {
    progress: [],
    loading: true,
    page:"Home",
    sidebarOpen: false,
    googleAddress: "",
    geocodeLocation: [],
  }
  
 sidebarToggleHandler = () => {
    this.setState((prevState) => ({
      sidebarOpen: !prevState.sidebarOpen
    }));
  };

  backdropClickHandler = () => {
    this.setState({sidebarOpen: false})
  }


 getGeocode = () => {
   let address = {
     address: "3692 Broadway",
     city: "New York",
     state: "New York"
   }
   console.log(address)
   API.getGeocode(address)
     .then(res => {
       if (res.data.status === "error") {
         throw new Error(res.data.message);
       }
       this.setState(() => ({
         googleAddress: res.data[0].formatted_address,
         geocodeLocation: [parseFloat(res.data[0].geometry.location.lat), parseFloat(res.data[0].geometry.location.lng)]
       }));
       console.log("Address from google: " + this.state.googleAddress)
       console.log("New address: " + this.state.geocodeLocation)
     })
     .catch(err => console.log(err));
 }

  render() {
    const MapComponent = withScriptjs(withGoogleMap(Map))
    let backdrop;

    if (this.state.sidebarOpen) {
      
      backdrop = <Backdrop onClick={this.backdropClickHandler}/>
    }
    return (
        <div style={{height: "100%"}}>
          {console.log(this.state)}
          <Sidebar show={this.state.sidebarOpen}/>
          <Nav
            page={this.state.page}
            sidebarToggleHandler={this.sidebarToggleHandler}
          />
        {backdrop}
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
          <div>
            <button type="button" onClick={this.getGeocode} class="btn btn-dark">Dark</button>
          </div>

        </div>
      )
  }
}

export default Home