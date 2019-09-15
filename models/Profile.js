const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const profileSchema = new Schema({
    name:{
        type: String,
        required: true,
    },  
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true
    },
    number: {
        type: 
        required: true,
    }

    const User = mongoose.model("Profile", ProfileSchema);

    module.exports = Profile;