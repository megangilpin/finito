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
    let src = "https://maps.googleapis.com/maps/api/geocode/json?address=" + geocodeAddress[0] + ",+" + geocodeAddress[1] + ",+" + geocodeAddress[2] + "&key=" + key
    // Get location and start saving to mongo
    axios
      .get(src)
      .then(async ({ data: { results } }) => {
        let tripId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        // Create a new trip
        const newTrip = await new db.Trip({ destinationAddress: results[0].formatted_address, destinationCoords: { lat: results[0].geometry.location.lat, lng: results[0].geometry.location.lng }, tripId, userId: "" })
        await newTrip.save()

        // Send geolocation results up to the client so the destination can be plotted
        res.json({ results, tripId })
      })
  },
  updateTrip: function (req, res) {
    db.Trip
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  distanceMatrix: (req, res) => {
    // let geocodeAddress = []
    // let startDestination = req.body.start
    // let mode = req.body.mode
    

    // // if(req.body.destination){
    // const address = req.body.destination
      
    //   // Replaces all spaces with a "+" and pushes it to the geocodeAddress array
    //   Object.keys(address).forEach((item) => {
    //     geocodeAddress.push(address[item].replace(/\s/g, '+'))
    //   })
      
      // let src = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + geocodeAddress[0] + ", +" + geocodeAddress[1] + ", +" + geocodeAddress[2] + "&destinations=40.7516,-73.9755&mode=" + mode + "&key="
      let src = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626&key="
      console.log(src)
      axios
        .get(src)
        .then(({ data }) => {
          console.log(data)
          // Send geolocation results up to the client so the destination can be plotted
          res.json(data)
        })
        .catch(err => {
          console.log(err)
          res.status(422).json(err)
        });
    // }
    // else if(req.body.geocodeDestination) {
    //   console.log(req.body.geocodeDestination)
    // }

    // altSrc ="https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.6905615%2C-73.9976592%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626%7C40.659569%2C-73.933783%7C40.729029%2C-73.851524%7C40.6860072%2C-73.6334271%7C40.598566%2C-73.7527626&key=AIzaSyAR9UNE2w5VbPW_9IJ3Z07w_tdUNsmdfos"

  }
};