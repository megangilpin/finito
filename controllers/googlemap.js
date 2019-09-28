const key = process.env.GOOGLEMAP;
const db = require("../models")
const axios = require("axios");

module.exports = {
  tripURL: (req, res) => {
    const origin = req.body.origin;
    const destination = req.body.destination;
    // Options are driving, walking, bicycling or transit
    const transport = req.body.transport;
    // Google map url to send to friend
    const mapURL = "https://www.google.com/maps/dir/?api=1&origin=" + origin + "&destination=" + destination + "&travelmode=" + transport

    res.json(mapURL)
  },
  geocode: (req, res) => {
    const address = req.body.address
    console.log(req.body.address.userName)
    let geocodeAddress = []

    // Replaces all spaces with a "+" and pushes it to the geocodeAddress array
    Object.keys(address).forEach((item) => {
        geocodeAddress.push(address[item].replace(/\s/g, '+'))
    })
    src = `https://maps.googleapis.com/maps/api/geocode/json?address="${geocodeAddress[0]},+${geocodeAddress[1]},+${geocodeAddress[2]}&key=${key}`
    // Get location and start saving to mongo
    axios
    .get(src)
    .then(async ({ data: { results } }) => { 
    let tripId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    // Create a new trip
      const newTrip = await new db.Trip({ destinationAddress: results[0].formatted_address, destinationCoords: { lat: results[0].geometry.location.lat, lng: results[0].geometry.location.lng }, tripId, tripId, userId: req.body.address.user_id})
    await newTrip.save()
    // Send geolocation results up to the client so the destination can be plotted
    res.json({results,tripId})
    })
  }, 
  updateTrip: async (req, res) => { 
    await db.Trip.findOneAndUpdate(
      { tripId: req.body.tripId },
      { $addToSet: { progress: req.body.progress }, $set: { userId: req.body.userId, tripTime: req.body.tripTime, endTrip: req.body.endTrip, userName: req.body.userName } }
    ).then(results => (console.log(results)))
  },
  distanceMatrix: (req, res) => {
    let geocodeAddress = []
    let startDestination = [req.body.distanceMatrixInfo.start.lat, req.body.distanceMatrixInfo.start.lng]
    let mode = req.body.distanceMatrixInfo.mode
    if (req.body.distanceMatrixInfo.destination){
    const address = req.body.destination
      
      // Replaces all spaces with a "+" and pushes it to the geocodeAddress array
      Object.keys(address).forEach((item) => {
        geocodeAddress.push(address[item].replace(/\s/g, '+'))
      })

    let src = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + startDestination[0] + "," + startDestination[1] + "&destinations=" + geocodeAddress[0] + ", +" + geocodeAddress[1] + ", +" + geocodeAddress[2] +"&mode=" + mode + "&key=" + key
      axios
        .get(src)
        .then(({ data }) => {
          res.json(data)
        })
        .catch(err => {
          console.log(err)
          res.status(422).json(err)
        });
    }
    else if (req.body.distanceMatrixInfo.geocodeDestination) {

      let geocodeDestination = [req.body.distanceMatrixInfo.geocodeDestination.lat, req.body.distanceMatrixInfo.geocodeDestination.lng]
      let src = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + startDestination[0] + "," + startDestination[1] + "&destinations=" + geocodeDestination[0] + "," + geocodeDestination[1] + "&mode=" + mode + "&key=" + key

      axios
        .get(src)
        .then(({ data }) => {

          // Send geolocation results up to the client so the destination can be plotted
          res.json(data)
        })
        .catch(err => {
          console.log(err)
          res.status(422).json(err)
        });
    }
  },
  getTrip: async (req, res) => {
    db.Trip.findOne({ tripId: req.params.trip_id })
      .then(results => {
        console.log(results)
        res.json(results)
      })
      .catch(err => console.log(err));
  },
  getUser: async (req, res) => {
    db.User.findOne({_id: req.body.userId})
    .then(results => {
      res.json(results)
    })
  }
};