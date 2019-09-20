
const express = require("express");
const router = require("express-promise-router")();
const googlemapController = require("../controllers/googlemap");


router.route("/tripURL").get(googlemapController.tripURL);
router.route("/geocode").post(googlemapController.geocode);

module.exports = router;