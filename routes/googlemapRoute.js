const express = require("express");
const router = require("express-promise-router")();
const googlemapController = require("../controllers/googlemap");

router.route("/tripURL").get(googlemapController.tripURL);
router.route("/geocode").post(googlemapController.geocode);
router.route("/distanceMatrix").post(googlemapController.distanceMatrix);
router.route("/updateTrip").post(googlemapController.updateTrip);
router.route("/getTrip/:trip_id").get(googlemapController.getTrip);
router.route("/getUser/").post(googlemapController.getUser);

module.exports = router;