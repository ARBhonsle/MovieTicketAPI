const express = require("express");
const app = express();
const mongoose = require("mongoose");

const { MONGODB } = require("./config.js");
const port = process.env.port || 4000;

mongoose
  .connect(MONGODB, { useunifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error(err);
  });

app.get("/api", (req, res) => res.send("Working"));

// support for front-end files that'll be added in fu
app.use(express.json());

app.use("/api", require("./router/api"));

app.use(function (err, req, res, next) {
  res.status(422).send({ error: err.message });
});

app.listen(port, function () {
  console.log(`Now listening for requests on ${port}`);
});
