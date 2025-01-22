// Define a schema for your geo-data
mongoose = require("mongoose");

const TractsSchema = new mongoose.Schema({
  type: { type: String, required: true }, // Ensure `type` is required
  properties: {
    id: { type: Number },
    GEOID: { type: String },
    GEOID: { type: String },
    NAMELSAD: { type: String },
    ALAND: { type: Number },
    AWATER: { type: Number },
    INTPTLAT: { type: String },
    INTPTLON: { type: String },
    CENSUS_TRACT: { type: Number },
  },
  geometry: {
    type: { type: String, required: true }, // Ensure `type` is required for GeoJSON
    coordinates: {
      type: Array, // Each element is an array
      required: true,
    }, // Enforce array of numbers
  },
});
module.exports = mongoose.model("census_tracts", TractsSchema);
