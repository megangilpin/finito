import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{
        margin: 50, clear: "both", textAlign: "center" }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
