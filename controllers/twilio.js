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
         mediaUrl: ['http://localhost:3000/dashboard/'],
         to: to
       })
      .then(message => res.send(message));
    },
    endmessage: (req, res) => {
      const to = req.body.phone;
      client.messages
    .create({
      body: " Your friend is arriving at their destination. Thanks for using Arryvl!",
      from: '+16467626167',
      mediaURL: ['http://localhost:3000/dashboard/'],
      to:
    })
    .then(message => res.send(message));
    }
  };

