// const key = process.env.GOOGLEMAP;
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
    // const address = {
    //   address: "3692 Broadway",
    //   city: "New York",
    //   state: "New York"
    // }
    // console.log(req.body)
    let geocodeAddress = []
    // req.body should look like this 
  // {   
    //  "address": "3692 Broadway",
  //    "city": "New York",
  //    "state": "New York"
  // }
  
  // Replaces all spaces with a "+" and pushes it to the geocodeAddress array
    Object.keys(address).forEach((item) => {
        geocodeAddress.push(address[item].replace(/\s/g, '+'))
    })
    console.log(geocodeAddress)
    src = "https://maps.googleapis.com/maps/api/geocode/json?address=" + geocodeAddress[0] + ",+" + geocodeAddress[1] + ",+" + geocodeAddress[2] + "&key=" + key
    console.log(src)
    axios
      .get(src)
      .then(({ data: { results } }) => res.json(results))
      .catch(err => res.status(422).json(err));
  }
};