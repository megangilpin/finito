const express = require("express");
const router = require("express-promise-router")();

const twilioController = require("../controllers/twilio");

router.route("/text").post(twilioController.message); 
router.route("/text/arrival").post(twilioController.arrival); 

module.exports = router;