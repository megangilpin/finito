const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    name:{
        type: String,
        required: true,
    },  
    
    phoneNumber: {
        type: Number, 
        required: true,
    },
     
    contacts: {
        type: Schema.Types.ObjectId
        ref: "User"

    }

    const User = mongoose.model("Profile", ProfileSchema);

    module.exports = Profile;