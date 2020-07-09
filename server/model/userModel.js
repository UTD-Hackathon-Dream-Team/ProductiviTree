const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: [true, "Add an id"],
  },
  googleID: {
    type: Number,
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
  Posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  Challenges: [{ type: mongoose.Schema.Types.ObjectId, ref: "Challenge" }],
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
