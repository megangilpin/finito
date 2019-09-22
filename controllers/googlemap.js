const key = process.env.GOOGLEMAP;
const db = require("../models")
const axios = require("axios");

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
  },
  geocode: (req, res) => {
    const address = req.body.address
    let geocodeAddress = []
  // Replaces all spaces with a "+" and pushes it to the geocodeAddress array
    Object.keys(address).forEach((item) => {
        geocodeAddress.push(address[item].replace(/\s/g, '+'))
    })
    src = "https://maps.googleapis.com/maps/api/geocode/json?address=" + geocodeAddress[0] + ",+" + geocodeAddress[1] + ",+" + geocodeAddress[2] + "&key=" + key
    // Get location and start saving to mongo
    axios
    .get(src)
    .then(async ({ data: { results } }) => {
    let tripId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    // Create a new trip
    const newTrip = await new db.Trip({destinationAddress: results[0].formatted_address, destinationCoords: {lat: results[0].geometry.location.lat, lng: results[0].geometry.location.lng}, tripId})
    newTrip.save().then(results => console.log(results))

    // Send geolocation results up to the client so the destination can be plotted
    await res.json({results,tripId})
    })
  }, 
  updateTrip: async (req, res) => { 
    await db.Trip.findOneAndUpdate(
      {tripId: req.body.tripId}, 
      {$addToSet: {progress: req.body.progress}},
    ).then(results => (console.log(results)))
  }
};