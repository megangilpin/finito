const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Users and inserts the Users below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/profiles"
);

const userSeed = [
  {
    name: "",
    phoneNumber: "",
    userName:"",
      
  },
];

const 

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
