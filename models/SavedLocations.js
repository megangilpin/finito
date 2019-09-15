const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");


const SavedLocation = mongoose.model("Saved Location", SavedLocationSchema);

module.export = SavedLocation;