const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const poolSchema = new Schema({
  //TODO: update Schema.Types.ObjectId
  poolId: {
    type: String,
    required: true,
  },
  poolSlots: {
    type: String,
    required: true,
  },
  winner: {
    type: String,
    required: true,
  },
  winnerAddress: {
    type: String,
    ref: "User",
  },
  entryFee: {
    type: String,
    required: true,
  },
  entryFeeContract: {
    type: String,
    required: true,
  },
  conversionAmount: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  prizeAmount: {
    type: String,
    required: true,
  },
  prizeConversionAmount: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  isExists: {
    type: Boolean,
    required: true,
  },
  poolName: {
    type: String,
    required: true,
  },
  members: {
    type: [String],
    ref: "User",
  },
});

module.exports = mongoose.model("Pool", poolSchema);
