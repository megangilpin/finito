import React from "react";
import "./Nav.css";
import SidebarButton from "../Sidebar/SidebarButton"

function Nav(props) {
  return (
    <nav className="navbar navbar-light navbar-expand-md bg-light">
      <div className="container justify-content-between">
        {/* button to toggle sidebar */}
        <SidebarButton onClick={props.sidebarToggleHandler} />


        <img src="/images/logo.png" width="30px" alt="Arryvl Logo" />

        <button className="btn btn-light ml-1" type="button">
          <span ><i className="fas fa-cog"></i></span>
        </button>
      </div>
    </nav>
  );
}

export default Nav;
