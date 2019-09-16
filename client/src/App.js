// import React, { Component } from "react";
// import Login from "./components/Login/Login";
// import Register from "./components/Register/Register";
// import Notification from "./components/Notification/Notification";
// import "./App.css";
// import Map from './components/Map/Map.js'



// export class App extends Component {
//   render() {
//     return (
//         <div className="container pt-5">
//           <Login /><br />
//           <Register /><br />
//           <Notification />
//           <Map />
//         </div>
//     );
//   }
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Google from "./pages/Map";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/map" component={Google} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

