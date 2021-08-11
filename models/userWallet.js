const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const walletSchema = new Schema({
  id: {
    type: String,
  },
  amount: {
    type: Number,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("UserWallet", waletSchema);
