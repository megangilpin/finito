import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Polyline, Marker } from 'react-google-maps';
import { Col, Row, Container } from "../components/Grid";
import Notification from "../components/Notification/Notification";
import Nav from "../components/Nav/"
import Map from "../components/Map"
import Sidebar from "../components/Sidebar"
import Backdrop from "../components/Backdrop"

 
class Home extends React.Component {
  state = {
    progress: [],
    loading: true,
    page:"Home",
    sidebarOpen: false,
  }
  
 sidebarToggleHandler = () => {
    this.setState((prevState) => ({
      sidebarOpen: !prevState.sidebarOpen
    }));
  };

  backdropClickHandler = () => {
    this.setState({sidebarOpen: false})
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

        </div>
      )
  }
}

export default Home