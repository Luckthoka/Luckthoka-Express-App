const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
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
  entryFee: {
    type: String,
    required: true,
  },
  conversionAmount: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
