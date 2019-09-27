import React from "react";
import "./Nav.css";



function Nav(props) {
  return (
    <nav className="navbar navbar-light navbar-expand-md bg-light sticky-top">
      <span className="navbar-brand d-flex flex-fill"><a href="/"><img src="/images/logo.png" width="30px" alt="Arryvl Logo" /></a></span>
      <div>
        <label><strong>Track your Friends Trip</strong></label>
      </div>
      <div class="d-flex flex-fill"></div>
    </nav>
  );
}

export default Nav;
