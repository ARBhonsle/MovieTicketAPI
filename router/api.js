const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/user", function (req, res, next) {
  User.find({})
    .then(function (user) {
      res.send(user);
    })
    .catch(next);
});

router.post("/user", function (req, res, next) {
  User.create(req.body)
    .then(function (user) {
      res.send(user);
    })
    .catch(next);
});

router.put("/user/:id", function (req, res, next) {
  User.findOneAndUpdate({ _id: req.params.id }, req.body).then(function (user) {
    User.findOne({ _id: req.params.id }).then(function (student) {
      res.send(user);
    });
  });
});

router.delete("/user/:id", function (req, res, next) {
  User.findOneAndDelete({ _id: req.params.id }).then(function (user) {
    res.send(user);
  });
});
module.exports = router;
