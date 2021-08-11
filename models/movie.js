const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const movieSchema = new Schema({
  name: {
    type: String,
  },
  time: {
    type: String,
  },
  date: {
    type: Date,
  },
  genre: {
    type: String,
  },
  type: {
    type: String,
  },
  tickets: {
    type: Number,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
