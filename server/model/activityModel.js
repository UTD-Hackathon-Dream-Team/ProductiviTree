const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
  activity: {
    type: String,
    required: [true, "Add an activity"],
  },
  category: {
    type: String,
    required: [true, "Add a category"],
  },
  points: {
    type: Number,
    required: [true, "Add the number of points"],
  },
  icon: {
    type: String,
    required: [true, "Add an icon"],
  },
});

module.exports = mongoose.model("Activity", ActivitySchema);
