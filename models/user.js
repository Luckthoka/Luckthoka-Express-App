const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  walletId: {
    type: String,
    require: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  //TODO: update Schema.Types.ObjectId
  poolsParticipated: {
    type: [String], //[Schema.Types.ObjectId],
    //ref: "Pool",
    required: true,
  },
  poolsWon: {
    type: [String], //[Schema.Types.ObjectId],
    //ref: "Pool",
    //equired: true,
  },
});

module.exports = mongoose.model("User", userSchema);
