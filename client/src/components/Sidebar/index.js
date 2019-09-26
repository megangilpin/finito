import React from "react";
import "./Sidebar.css";
import {Link} from "react-router-dom"

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
    <div>
      <Hidden smDown></Hidden>
    </div>
    <MenuList>
      <MenuItem component = {Link} to="/"> Start Trip </MenuItem>
    </MenuList>
    <MenuList>
      <MenuItem component = {Link} to="/Friends"> Friends </MenuItem>
    </MenuList>
    <MenuList>
      <MenuItem component = {Link} to="/Destinations"> Destinations </MenuItem>
    </MenuList>
    {/* <ul>
      <li><p href="/">Start Trip</p></li>
      <li><p href="/">Friends</p></li>
      <li><p href="/">Destinations</p></li>
    </ul> */}
  </nav>
  );
};

export default sideBar;