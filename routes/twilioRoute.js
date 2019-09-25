const express = require("express");
const router = require("express-promise-router")();

const twilioController = require("../controllers/twilio");

router.route("/text/message").post(twilioController.message); 
router.route("/text/endmessage").post(twilioController.endmessage); 

module.exports = router;