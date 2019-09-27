const client = require("twilio")(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
const db = require("../models")

module.exports = { 
    startTripText: (req, res) => { 
        const to = req.body.phone
<<<<<<< HEAD
        const tripURl = req.body.tripURL;
        client.messages
      .create({
         body: 'Your Friend wants you to know when they get home. Watch there trip here',
         from: '+16467626167',
         mediaUrl: ['http://localhost:3000/dashboard/'],
=======
        const tripURL = req.body.tripURL;
        console.log(to)
        client.messages.create({
         body: `Arryvl app: A friend wants to let you know that they're safe. Track their progress at: ${tripURL}`,
         from: "+16467626167",
>>>>>>> 0afd8a6691d1c862077360aa817a98e01d8f300f
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
