const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/restaurant");

router.get("/restaurants_all", (req, res, next) => {
  try {
    Restaurant.find().exec({ name: "pizza" }, (err, post) => {
      console.log(JSON.stringify(post, null, 2));
      res.send(JSON.stringify(post, null, 2));
    });
  } catch (err) {
    next();
  }
});

router.get("/restaurants", (req, res, next) => {
  const limit = req.query.limit ? Number(req.query.limit) : 1;
  console.log(`limit: ${limit}`);
  try {
    Restaurant.find()
      .sort("-timestamp")
      .limit(limit)
      .exec((err, post) => {
        res.send(post);
      });
  } catch (err) {
    next;
  }
});

router.post("/restaurants", async (req, res, next) => {
  Restaurant.create({ ...req.body, timestamp: new Date().getTime() })
    .then((restaurant) => {
      res.send(restaurant);
    })
    .catch(next);
});

router.put("/restaurants/:id", (req, res, next) => {
  Restaurant.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      Restaurant.findOne({ _id: req.params.id }).then((restaurant) => {
        res.send(restaurant);
      });
    })
    .catch(next);
});

router.delete("/restaurants/:id", (req, res, next) => {
  Restaurant.findByIdAndRemove({ _id: req.params.id })
    .then((restaurant) => {
      res.send(restaurant);
    })
    .catch(next);
});

module.exports = router;
