import React from "react";
import "./Main.css";

function Main(props) {
  return (
    <section className="jumbotron jumbotron-fluid text-center main">
      <div>
        <img className="logoIcon mb-5" src={require('../assets/arryvl.png')} />
        <h1 className="jumbotron-heading logo">Welcome { props.name }</h1>
        <p className="lead text-white basic">With a click of a button track your location and let your friends know once you've <span className="logo">ARRYVD!</span></p>
      </div>
    </section>
  );
}

export default Main;