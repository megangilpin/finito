const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");


    const SavedLocationsschema = new Schema {
    home: {
        address: String,
        loc: {
            type: {
                type: String,
                required: true,
                enum: ['Point', 'LineString', 'Polygon'],
                default: 'Point'
            },
            coordinates: []
          };
                 

const SavedLocation = mongoose.model("Saved Location", SavedLocationSchema);

module.export = SavedLocation;
module.export = Users; 