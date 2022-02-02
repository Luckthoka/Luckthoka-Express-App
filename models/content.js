const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoLink1: String,
  videoLink2: String,
  videoLink3: String,
  videoLink4: String,
});

module.exports = mongoose.model("Content", contentSchema);
