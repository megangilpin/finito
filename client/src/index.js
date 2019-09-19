import React from "react";
import ReactDOM from "react-dom";
import HttpsRedirect from 'react-https-redirect';
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
    <HttpsRedirect>
        <App />
    </HttpsRedirect>, document.getElementById("root")
);

registerServiceWorker();
