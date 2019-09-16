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
              <Loginbar
                currentPage={this.state.currentPage}
                handlePageChange={this.handlePageChange}
              />
               {this.renderPage()}
            </>
          );
    };
};

export default Main;