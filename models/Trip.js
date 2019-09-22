const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TripSchema = new Schema({
    address: { 
        type: String
    },
    progress: { 
        type: Array
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
  });
  
  const Trip = mongoose.model("Trip", TripSchema);

  module.exports = Trip;