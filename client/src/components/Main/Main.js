import React, { Component } from "react";
import "./Main.css";
import Loginbar from "../Loginbar/Loginbar";
import Login from "../Login/Login";
import Register from "../Register/Register";

class Main extends Component {
    state = {
      currentPage: "Login"
    };
  
    handlePageChange = page => {
      this.setState({ currentPage: page });
    };
  
    renderPage = () => {
      if (this.state.currentPage === "Login") {
        return <Login />;
      } else { 
        return <Register />
      }
    };
  
    render() {
        return (
          <>
            <div className="centered rounded border">
              <div className="py-4 bg-dark">
                <center>
                <img src="/images/logo.png" width="100px" alt="Arryvl Logo" />
              </center>
            </div>
              <Loginbar
                currentPage={this.state.currentPage}
                handlePageChange={this.handlePageChange}
              />
              {this.renderPage()}
            </div>
          </>
        );
    };
};

export default Main;