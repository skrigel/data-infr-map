// Define a schema for your geo-data
mongoose = require("mongoose");

const OrgSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String },
  aka: { type: String },
  website: { type: String },
  notes: { type: String },
  net_set: { type: [Number] },
  fac_set: { type: [Number] },
  ix_set: { type: [Number] },
  carrier_set: { type: [Number] },
  address1: { type: String },
  city: { type: String },
  country: { type: String },
  state: { type: String },
  zipcode: { type: String },
  latitude: { type: String },
  longitude: { type: String },
});

const NetworkSchema = new mongoose.Schema({
  net_id: { type: Number },
  name: { type: String },
  aka: { type: String },
  asn: { type: Number },
  fac_count: { type: Number },
  info_ratio: { type: String },
  info_scope: { type: String },
  info_traffic: { type: String },
  info_type: { type: String },
  ix_count: { type: Number },
  notes: { type: String },
  org: OrgSchema,
  org_id: { type: Number },
  facilities: { type: [Number] },
});
module.exports = mongoose.model("networks", NetworkSchema);
