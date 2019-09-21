import React from "react";

const SidebarButton = props => (
  <button className="toggle-button btn btn-light" onClick={props.onClick} type="button">
    <span ><i className="fas fa-bars"></i></span>
  </button>
);

export default SidebarButton 