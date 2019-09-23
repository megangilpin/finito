const express = require("express");
const router = require("express-promise-router")();
const tripController = require("../controllers/trip");


router.route("/updateTrip").post(tripController.update);


module.exports = router;