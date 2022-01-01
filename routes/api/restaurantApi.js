const express = require("express");
const router = express.Router();
const Restaurant = require("../../models/restaurant");

router.get("/restaurants", (req, res, next) => {
  Restaurant.find()
    .sort("-timestamp")
    .limit(5)
    .exec((err, post) => {
      res.send(post);
    });
});

router.post("/restaurants", (req, res, next) => {
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
