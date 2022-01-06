const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const entrySchema = new Schema({
  name: {
    type: String,
    required: [true, "name key is required with string value"],
  },
  price: {
    type: Number,
    required: [true, "price key is required with number value"],
  },
  stock: {
    type: Number,
    default: 0,
  },
});

const Entry = mongoose.model("entry", entrySchema);

module.exports = Entry;
