import React from 'react';
// import { Col, Row, Container } from "../components/Grid";
import Nav from "../components/Nav/";
import Sidebar from "../components/Sidebar";
import Backdrop from "../components/Backdrop";
import API from "../utils/API";



class Tabs extends React.Component {
  state = {
    page: "Home",
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
    this.setState({ sidebarOpen: false })
  }

  getGeocode = () => {
    let address = {
        address: "3692 Broadway",
        city: "New York",
        state: "New York"
    }
    console.log(address)
    API.getGeocode({
      address
    })
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
    let backdrop;
    console.log(this.state)
    if (this.state.sidebarOpen) {

      backdrop = <Backdrop onClick={this.backdropClickHandler} />
    }
    return (
      <div style={{ height: "100%" }}>
        {console.log(this.state)}
        <Sidebar show={this.state.sidebarOpen} />
        <Nav
          page={this.state.page}
          sidebarToggleHandler={this.sidebarToggleHandler}
        />
        {backdrop}
        {/* <div>
          <button type="button" onClick={this.getGeocode} class="btn btn-dark">Dark</button>
        </div> */}

      </div>
    )
  }
}

export default Tabs