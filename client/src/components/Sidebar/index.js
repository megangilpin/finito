import React from "react";
import "./Sidebar.css"
import Friends from "../Friends/Friends";
import Destinations from "../Destinations/Destinations"



const Sidebar = props => {
  let drawerClasses = "side-bar";
  
  if(props.show) {
    drawerClasses = "side-bar open";
  }
  if (props.page === "Home") {
    return ( 
      <nav className={drawerClasses}>
        <div className="py-4 bg-dark">
          <center>
            <img src="/images/logo.png" width="80px" alt="Arryvl Logo" />
          </center>
        </div>
        <ul>
          <li><p href="/">Start Trip</p></li>
          <li><p onClick={() => props.handlePageChange("Friends")}>Save Friends</p></li>
          <li><p onClick={() => props.handlePageChange("Destinations")}>Save Destinations</p></li>
        </ul>
      </nav>
    );
  } else if (props.page === "Friends") { 
    return ( 
      <nav className={drawerClasses}>
        <Friends 
          reset={props.reset}
        />
      </nav> 
    );
  } else {
    return ( 
      <nav className={drawerClasses}>
        <Destinations 
          reset={props.reset}
        />
      </nav> 
    );
  }
};

export default Sidebar;