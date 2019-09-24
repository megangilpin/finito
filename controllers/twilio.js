const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
const db = require("../models")

module.exports = { 
    message: (req, res) => { 
        const to = req.body.phone
        const tripURl = req.body.tripURL;
        client.messages
      .create({
         body: 'Your Friend wants you to know when they get home. Watch there trip here',
         from: '+16467626167',
         mediaUrl: [tripURL],
         to: to
       })
      .then(message => res.send(message));
    }
};