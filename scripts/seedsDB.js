const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Users and inserts the Users below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/profiles"
);

const Users = [User1, User2, User2]
var User = mongoose.model('User', profileSchema);

var User1 = new User({
    name: "Percy",
    username: "Percy Jackson",
    phoneNumber: "",
    contacts:["Ryan", "Megan", "New Friend"]
        });

  var User2 = new User({
    name: "Ryan",
    username: "Ryan Gosling",
    phoneNumber: "",
    contacts:["Percy", "Megan", "New Friend"]
  });.

  var User3 = new User({
    name: "Megan",
    username: "Megan Fox",
    phoneNumber: "",
    contacts:["Percy", "Megan", "New Friend"]
  };
  const Users = [User1, User2, User2]


db.User
  .remove({})
  .then(() => db.User.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " User inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });


