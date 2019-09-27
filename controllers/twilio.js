const client = require("twilio")(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
const db = require("../models")

module.exports = { 
    startTripText: (req, res) => { 
        const to = req.body.phone
        const tripURL = req.body.tripURL;
        console.log(to)
        client.messages.create({
         body: `Arryvl app: A friend wants to let you know that they're safe. Track their progress at: ${tripURL}`,
         from: "+16467626167",
         to: to
       }).then(message => res.send(message));
    }, 
    arrival: (req, res) => { 
      const to = req.body.phone;
      client.messages.create({
       body: "Arryvl app: Your friend is reaching their destination. Give them a call to make sure they made it.",
       from: "+16467626167",
       to: to
     }).then(message => res.send(message));
  }, 

};
