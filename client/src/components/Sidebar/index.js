import React from "react";
import "./Sidebar.css"

const sideBar = props => {
  let drawerClasses = "side-bar";
  if(props.show) {
    drawerClasses = "side-bar open";
  }
  return ( <nav className={drawerClasses}>
    <div className="py-4 bg-dark">
      <center>
        <img src="/images/logo.png" width="80px" alt="Arryvl Logo" />
      </center>
    </div>
    <ul>
      <li><p href="/">Start Trip</p></li>
      <li><p href="/">Friends</p></li>
      <li><p href="/">Destinations</p></li>
    </ul>
  </nav>
  );
};

export default sideBar;