import React from "react";
import "./App.css";
import Main from "./components/Main/Main";


const App = () => {
  return (
    <>
    
    <div className="centered rounded border">
      <div className="py-4 bg-dark">
      <center>
        <img src="/images/logo.png" width="100px" alt="Arryvl Logo" />
      </center>
      </div>
      <Main />
    </div>
    </>
  );
}

export default App;
