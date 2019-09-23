import axios from "axios";

// The getRecipes method retrieves recipes from the server
// It accepts a "query" or term to search the recipe api for
export default {
  getGeocode: function (address) {
    console.log(address)
    return axios.post("/googlemap/geocode", address);
  },
  // Saves a trip to the database
  updateTrip: function (progress) {
    return axios.post("/googlemap/updateTrip", progress);
  }
};
