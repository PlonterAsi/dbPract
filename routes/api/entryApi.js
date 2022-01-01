const express = require("express");
const router = express.Router();
const Entry = require("../../models/entry");

router.get("/entries", (req, res, next) => {
  res.send({ type: "GET" });
});

router.post("/entries", (req, res, next) => {
  Entry.create(req.body)
    .then((entry) => {
      res.send(entry);
    })
    .catch(next);
});

router.put("/entries/:id", (req, res, next) => {
  Entry.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      Entry.findOne({ _id: req.params.id }).then((entry) => {
        res.send(entry);
      });
    })
    .catch(next);
});

router.delete("/entries/:id", (req, res, next) => {
  Entry.findByIdAndRemove({ _id: req.params.id })
    .then((entry) => {
      res.send(entry);
    })
    .catch(next);
});

module.exports = router;
