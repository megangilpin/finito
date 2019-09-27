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
    
     <div className="row">
        <div onClick={() => props.handlePageChange("/")} className={props.currentPage === "Start Trip" ? "button-color col-6 text-center py-3 boxes" : "col-6 text-center py-3 boxes"}>
            Start Trip
        </div>
        <div onClick={() => props.handlePageChange("Friends")} className={props.currentPage === "Friends" ? "button-color col-6 text-center py-3 boxes" : "col-6 text-center py-3 boxes"}>
            Friends
        </div>
        <div onClick={() => props.handlePageChange("Destinations")} className={props.currentPage === "Destinations" ? "button-color col-6 text-center py-3 boxes" : "col-6 text-center py-3 boxes"}>
            Destinations
        </div>
    </div> 
{/*      
    <ul>
      <div>
      <li><Link = "/"> Start Trip </Link></li>
      <li><Link = "/Friends"> Friends </Link></li>
      <li><Link = "/Destinations"> Destinations </Link> </li>
    </ul>
    </div> */}
  </nav>
  );
};

export default sideBar;