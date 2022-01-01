const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GeoSchema = Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
    required: [true, "missing Geo coordinates!"],
  },
});

const LocationSchema = Schema({
  city: {
    type: String,
    required: [true, "missing restaurant city!"],
  },
  street: {
    type: String,
    required: [true, "missing restaurant street!"],
  },

  geometry: {
    type: GeoSchema,
    required: [true, "missing restaurant geo location information!"],
  },
});

const RestSchema = new Schema({
  name: {
    type: String,
    required: [true, "missing restaurant name!"],
  },
  phone: {
    type: String,
    required: [true, "missing restaurant phone number!"],
  },
  location: {
    type: LocationSchema,
    required: [true, "missing restaurant location information!"],
  },
  timestamp: {
    type: String,
    required: [true, "missing timestamp!"],
  },
});

const Restaurant = mongoose.model("restaurant", RestSchema);

module.exports = Restaurant;
