import axios from "axios";

// The getRecipes method retrieves recipes from the server
// It accepts a "query" or term to search the recipe api for
export default {
  getGeocode: async (address) => {
    return await axios.post("/googlemap/geocode", address);
  },
  distanceMatrix: async (distanceMatrixInfo) => {
    return await axios.post("/googlemap/distanceMatrix", distanceMatrixInfo )
  },
  // Saves a trip to the database
  updateTrip: async (tripId, progress, userId, tripTime) => {
    return await axios.post("/googlemap/updateTrip", {tripId, progress, userId, tripTime});
  }, 
  // Saves a trip to the database
  arrivalText: async (phone) => {
    return await axios.post("/notification/text/arrival", {phone});
  },
  getTrip: async (trip_id) => {
    console.log(trip_id)
    return await axios.get("/googlemap/getTrip/" + trip_id);
  }
};