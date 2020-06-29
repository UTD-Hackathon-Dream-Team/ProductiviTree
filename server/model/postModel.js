const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  Author: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Add an author"],
  },
  Picture: {
    type: String,
    required: [true, "Add a picture URL"],
  },
  Caption: {
    type: String,
  },
  Activity: mongoose.Schema.Types.ObjectId,
  Likes: [mongoose.Schema.Types.ObjectId],
  Public: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Post", PostSchema);
