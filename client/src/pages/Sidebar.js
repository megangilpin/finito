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

  handlePageChange = page => {
    this.setState({ page: page });
  };

  handleReset = (page) => {
    this.setState({ page: page });
  };

  render() {
    let backdrop;

    if (this.state.sidebarOpen) {
      backdrop = <Backdrop onClick={this.backdropClickHandler} />
    }

    return (
      <div style={{ height: "100%" }}>
        <Sidebar 
          show={this.state.sidebarOpen} 
          handlePageChange={this.handlePageChange}
          page={this.state.page}
          reset={this.handleReset}
        />
        <Nav
          page={this.state.page}
          sidebarToggleHandler={this.sidebarToggleHandler}
        />
        {backdrop}

      </div>
    )
  }
}

export default Tabs