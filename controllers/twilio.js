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
    }, 
    arrival: (req, res) => { 
      const to = req.body.phone;
      client.messages
    .create({
       body: 'Your friend is arriving! Give them a call to make sure they made it.',
       from: '+16467626167',
       to: to
     })
    .then(message => res.send(message));
  }, 

};