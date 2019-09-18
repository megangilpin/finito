require('dotenv').config();
const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); 
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/users";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const app = express();

// Define middleware here
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
}
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use("/auth", require("./routes/loginRoute.js"))
app.use("/notification", require("./routes/twilioRoute.js"))
app.use("/googlemap", require("./routes/googlemapRoute.js"))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

