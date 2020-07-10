const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
  Activity: {
    type: String,
    required: [true, "Add an activity"],
  },
  Category: {
    type: String,
    required: [true, "Add a category"],
  },
  Points: {
    type: Number,
    required: [true, "Add the number of points"],
  },
  Icon: {
    type: String,
    required: [true, "Add an icon"],
  },
});

module.exports = mongoose.model("Activity", ActivitySchema);
