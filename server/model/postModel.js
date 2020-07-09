const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  Author: {
    type: String,
    required: [true, "Add an author"],
  },
  Picture: {
    type: String,
    required: [true, "Add a picture URL"],
  },
  Caption: {
    type: String,
    default: "",
  },
  Activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Activity",
    default: "5eff6d9d9e2e671284902e89",
  },
  Likes: {
    type: [String],
    default: [],
  },
  Public: {
    type: Boolean,
    default: true,
  },
  TimeStamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);
