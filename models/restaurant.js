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
    required: [true, "missing branch city!"],
  },
  street: {
    type: String,
    required: [true, "missing branch street!"],
  },
  location: {
    type: GeoSchema,
    required: [false, "missing branch geo location information!"],
  },
});

const DailyOpenSchema = {
  startAt: {
    type: String,
    default: "09:00",
  },
  closeAt: {
    type: String,
    default: "18:00",
  },
};

const WeeklyOpenSchema = {
  sun: {
    type: DailyOpenSchema,
  },
  mon: {
    type: DailyOpenSchema,
  },
  tue: {
    type: DailyOpenSchema,
  },
  wed: {
    type: DailyOpenSchema,
  },
  thu: {
    type: DailyOpenSchema,
  },
};

const BranchSchema = new Schema({
  location_info: {
    type: LocationSchema,
    required: [true, "missing restaurant location information!"],
  },
  phone: {
    type: String,
    required: [true, "missing restaurant phone number!"],
  },
  openHours: {
    type: WeeklyOpenSchema,
    default: WeeklyOpenSchema,
  },
});

const RestSchema = new Schema({
  name: {
    type: String,
    required: [true, "missing restaurant name!"],
  },
  phone: {
    type: String,
  },
  branches: {
    type: [BranchSchema],
    required: [true, "missing restaurant branch information!"],
  },
  timestamp: {
    type: String,
    required: [true, "missing timestamp!"],
  },
  available: {
    type: Boolean,
    default: false,
  },
});

const Restaurant = mongoose.model("restaurant", RestSchema);

module.exports = Restaurant;
