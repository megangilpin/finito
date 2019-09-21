import React from 'react';
// import { Col, Row, Container } from "../components/Grid";
import Nav from "../components/Nav/";
import Sidebar from "../components/Sidebar";
import Backdrop from "../components/Backdrop";




class Tabs extends React.Component {
  state = {
    page: "Home",
    sidebarOpen: false,
  }

  sidebarToggleHandler = () => {
    this.setState((prevState) => ({
      sidebarOpen: !prevState.sidebarOpen
    }));
  };

  backdropClickHandler = () => {
    this.setState({ sidebarOpen: false })
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