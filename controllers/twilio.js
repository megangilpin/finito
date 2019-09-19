const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
const db = require("../models")

module.exports = { 
    message: (req, res) => { 
        const to = req.body.phone;
        client.messages
      .create({
         body: 'Hello there!',
         from: '+16467626167',
         mediaUrl: ['https://demo.twilio.com/owl.png'],
         to: to
       })
      .then(message => res.send(message));
    }
};