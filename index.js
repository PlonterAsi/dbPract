const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// set up express app
const app = express();

// connect to mongodb
mongoose.connect("mongodb://localhost/restaurants");
mongoose.Promise = global.Promise;

// body parser middleware
app.use(bodyParser.json());

app.use("/api", require("./routes/api/entryApi"));
app.use("/api", require("./routes/api/restaurantApi"));

app.use((err, req, res, next) => {
  res.status(422).send(err.message);
});

app.listen(4000, () => {
  console.log("We are live and listening to port 4000");
});
