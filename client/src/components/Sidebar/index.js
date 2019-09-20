import React from "react";
import "./Sidebar.css"

const sideBar = props => {
  let drawerClasses = "side-bar";
  if(props.show) {
    drawerClasses = "side-bar open";
  }
  return ( <nav className={drawerClasses}>

    <ul>
      <li><p href="/">Friends</p></li>
      <li><p href="/">Destinations</p></li>
    </ul>
  </nav>
  );
};

export default sideBar; 