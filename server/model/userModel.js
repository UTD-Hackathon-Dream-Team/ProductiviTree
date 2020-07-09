const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleID: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Add a googleID"],
  },
  Username: {
    type: String,
    required: [true, "Add a username"],
  },
  Email: {
    type: String,
    required: [true, "Add an email"],
  },
  ProfilePic: {
    type: String,
  },
  ReceiveNotifications: {
    type: Boolean,
    default: true,
  },
  Bio: {
    type: String,
  },
  Posts: [mongoose.Schema.Types.ObjectId],
  Challenges: [mongoose.Schema.Types.ObjectId],
  Trees: {
    type: Number,
    default: 0,
  },
  Points: {
    type: Number,
    default: 0,
  },
  DailyGoal: {
    type: Number,
    default: 0,
  },
  Followers: [mongoose.Schema.Types.ObjectId],
  Following: [mongoose.Schema.Types.ObjectId],
});

module.exports = mongoose.model("User", UserSchema);
