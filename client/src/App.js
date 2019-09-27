import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Main from "./pages/Login.js";
import Home from "./pages/Map";
import Friendview from "./pages/Friendview";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/dashboard/" component={Home} />
          <Route path="/dashboard/friendview/:id" component={Friendview} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

