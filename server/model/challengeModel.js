const mongoose = require("mongoose");

const ChallengeSchema = new mongoose.Schema({
  Activities: {
    type: [mongoose.Schema.Types.ObjectId],
    required: [true, "Add a list of activities"],
  },
  Type: {
    type: String,
    required: [true, "Add a type"],
  },
  Points: {
    type: Number,
    required: [true, "Add the number of points"],
  },
});

module.exports = mongoose.model("Challenge", ChallengeSchema);
