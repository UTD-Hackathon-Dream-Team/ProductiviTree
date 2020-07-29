const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleID: {
    type: String,
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
  dailyChallenges: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      progress: {
        type: Number,
        default: 0,
      },
    },
  ],
  weeklyChallenges: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
      },
      progress: {
        type: Number,
        default: 0,
      },
    },
  ],
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
    default: 100,
  },
  Followers: [String],
  Following: [String],
});

module.exports = mongoose.model("User", UserSchema);
