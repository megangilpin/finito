const key = process.env.GOOGLEMAP;
const db = require("../models")

module.exports = {
  tripURL: (req, res) => {
    // Variables for url to send to friend
    // comma-separated latitude/longitude coordinates
    const origin = req.body.origin;
    // comma-separated latitude/longitude coordinates
    const destination = req.body.destination;
    // Options are driving, walking, bicycling or transit
    const transport = req.body.transport;
    // Google map url to send to friend
    const mapURL = "https://www.google.com/maps/dir/?api=1&origin=" + origin + "&destination=" + destination + "&travelmode=" + transport

    res.json(mapURL)
  }
};