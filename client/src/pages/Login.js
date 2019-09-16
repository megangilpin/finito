import React, { Component } from "react";
import Login from "../components/Login/Login"
import Register from "../components/Register/Register"
import Notification from "../components/Notification/Notification"
import "./Login.css";

class Landing extends Component {
  render() {
    return (
      <>
        <div className="container pt-5">
          <Login /><br />
          <Register /><br />
          <Notification />
        </div>
      </>
    );
  }
}

export default Landing;
