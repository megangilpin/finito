import React from "react";
import "./Nav.css";



function Nav(props) {
  return (
    <nav className="navbar navbar-light navbar-expand-md bg-light">
      <div className="container justify-content-center">
        <div>
          <a href="/"><img src="/images/logo.png" width="30px" alt="Arryvl Logo" /></a>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
