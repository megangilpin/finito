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
    console.log(req.body)
    const address = req.body.address
    let geocodeAddress = []
  // Replaces all spaces with a "+" and pushes it to the geocodeAddress array
    Object.keys(address).forEach((item) => {
        geocodeAddress.push(address[item].replace(/\s/g, '+'))
    })
    console.log(geocodeAddress)
    src = "https://maps.googleapis.com/maps/api/geocode/json?address=" + geocodeAddress[0] + ",+" + geocodeAddress[1] + ",+" + geocodeAddress[2] + "&key=" + key
    console.log(src)
    axios
      .get(src)
      .then(({ data: { results } }) => 
      // this is where you save to mongo db
      res.json(results))
      .catch(err => res.status(422).json(err));
  },
  updateTrip: function (req, res) {
    db.Trip
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  distanceMatrix: (req, res) => {

    const address = req.body.address
    console.log(address.city)
    if(req.body.address){
      
      const address = req.body.address
      let destinationAddress = []
      // Replaces all spaces with a "+" and pushes it to the geocodeAddress array
      Object.keys(address).forEach((item) => {
        destinationAddress.push(address[item].replace(/\s/g, '+'))
      })

    }


    src = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=3692+Broadway,+43,+NEW+YORK,+NY&destinations=40.7516,-73.9755&mode=bicycling&key=AIzaSyAR9UNE2w5VbPW_9IJ3Z07w_tdUNsmdfos"

    altSrc ="https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626&key=AIzaSyAR9UNE2w5VbPW_9IJ3Z07w_tdUNsmdfos"
  }
};