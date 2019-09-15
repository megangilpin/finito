require('dotenv').config();
const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); 
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/users";
const axios = require("axios");

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const app = express();

// Define middleware here
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/public"));
}
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Routes
app.use("/auth", require("./routes/login.js"))


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
})

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

//  Route to send text with google url for where they are and where they are going
app.get("/sendText", (req, res) => {
  // Variables for url to send to friend
  // comma-separated latitude/longitude coordinates
  const origin = req.body.origin;
   // comma-separated latitude/longitude coordinates
  const destination = req.body.destination;
  // Options are driving, walking, bicycling or transit
  const transport = req.body.transport;
  // Google map url to send to friend
  const mapURL = "https://www.google.com/maps/dir/?api=1&origin=" + origin + "&destination=" + destination + "&travelmode=" + transport

  res.json(mapURL)
});
