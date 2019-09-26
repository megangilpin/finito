import axios from "axios";

// The getRecipes method retrieves recipes from the server
// It accepts a "query" or term to search the recipe api for
export default {
  getGeocode: async (address) => {
    return await axios.post("/googlemap/geocode", address);
  },
  // Saves a trip to the database
  updateTrip: async (tripId, progress, userId) => {
    return await axios.post("/googlemap/updateTrip", {tripId, progress, userId});
  }, 
  // Saves a trip to the database
  arrivalText: async (phone) => {
    console.log("API")
    return await axios.post("/notification/text/arrival", {phone});
  }  
};