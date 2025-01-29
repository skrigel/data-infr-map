// Define a schema for your geo-data
mongoose = require("mongoose");

const FacilitySchema = new mongoose.Schema({
  type: { type: String, required: true }, // Ensure `type` is required
  properties: {
    name: { type: String },
    type: { type: String },
    address: { type: String },
    locality: { type: String },
    county: { type: String },
    state: { type: String },
    country: { type: String },
    zip: { type: String },
    networks: { type: [Number] },
    management: { type: String },
    net_count: { type: Number },
    ix_count: { type: Number },
  },
  geometry: {
    type: { type: String, required: true }, // Ensure `type` is required for GeoJSON
    coordinates: { type: [Number], required: true }, // Enforce array of numbers
  },
});
module.exports = mongoose.model("facilities", FacilitySchema);
