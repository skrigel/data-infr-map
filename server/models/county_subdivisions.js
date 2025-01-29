// Define a schema for your geo-data
mongoose = require("mongoose");

const CountySubdivisionSchema = new mongoose.Schema({
  type: { type: String, required: true }, // Ensure `type` is required
  properties: {
    id: { type: Number },
    COUSUBNS: { type: String },
    GEOID: { type: String },
    GEOIDFQ: { type: String },
    NAMELSAD: { type: String },
    CLASSFP: { type: String },
    FUNCSTAT: { type: String },
    ALAND: { type: Number },
    AWATER: { type: Number },
    INTPTLAT: { type: String },
    INTPTLON: { type: String },
    COUNTY_ID: { type: String },
  },
  geometry: {
    type: { type: String, required: true }, // Ensure `type` is required for GeoJSON
    coordinates: {
      type: Array, // Each element is an array
      required: true,
    }, // Enforce array of numbers
  },
});
module.exports = mongoose.model("census_county_subdivisions", CountySubdivisionSchema);
