const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TripSchema = new Schema({
    address: { 
        type: String
    },
    progress: { 
        type: Array
    },
    destinationAddress: { 
        type: String
    }, 
    destinationCoords: { 
        type: Array
    },
    tripId: { 
        type: String
    },
    userId: {
        type: String
    },
    tripTime: {
        type: String
    },
    endTrip: {
        type: Number
    }
  });
  
  const Trip = mongoose.model("Trip", TripSchema);

  module.exports = Trip;