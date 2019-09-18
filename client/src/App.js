import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Main from "./pages/Login.js";
import Google from "./pages/Map";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/dashboard" component={Google} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

