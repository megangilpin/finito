import React from "react";
import "./Main.css";

function Main(props) {
  return (
    <section className="text-center bg-dark">
        <div className="heading pt-5">
          <div className="get-started text-right pr-3 text-white">
            Login | Register
          </div>

          <img src="/images/logo.png" alt="logo" width="40%" className="mt-5" />
          <h1 className="text-white pt-4 pb-2 bold">
            Arryvl
          </h1>

          <p className="text-white italic px-5">
            <em>Get where you're going safely with the click of a button!</em>
          </p>
        </div>
        
    </section>
  );
}

export default Main;