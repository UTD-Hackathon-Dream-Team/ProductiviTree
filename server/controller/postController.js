const mongoose = require("mongoose");
const Post = require("../model/postModel");
const User = require("../model/userModel");

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    return res
      .status(200)
      .json({ success: true, count: posts.length, payload: posts });
  } catch (err) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("Activity");
    if (!post) {
      return res.status(404).json({
        success: false,
        error: "No post found",
      });
    }

    return res.status(200).json({
      success: true,
      payload: post,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.addPost = async (req, res) => {
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    const post = await Post.create([{ ...req.body }], { session: sess });
    try {
      searchAuthor = await User.find({}).where({ googleID: post[0].Author });
    } catch (err) {
      post[0].remove();
      return res.status(404).json({
        success: false,
        error: "Post author not found so removed the post",
      });
    }
    user = searchAuthor[0];
    user.Posts.push(mongoose.Types.ObjectId(post[0]._id));
    await user.save({ session: sess });
    sess.commitTransaction();
    return res.status(201).json({ success: true, payload: post[0] });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({ success: false, error: messages });
    }
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    let post, user;
    try {
      post = await Post.findById(req.params.id);
    } catch (err) {
      return res.status(404).json({
        success: false,
        error: "No post found",
      });
    }
    try {
      searchAuthor = await User.find({}).where({ googleID: post.Author });
    } catch (err) {
      post.remove();
      return res.status(404).json({
        success: false,
        error: "Post author not found but removed the post",
      });
    }
    user = searchAuthor[0];
    user.Posts = user.Posts.filter(
      (val) => JSON.stringify(val) !== JSON.stringify(post._id)
    );
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await post.remove({ session: sess });
    await user.save({ session: sess });
    sess.commitTransaction();
    return res.status(200).json({
      success: true,
      payload: post,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    let post;
    try {
      post = await Post.findById(req.params.id);
    } catch (err) {
      return res.status(404).json({
        success: false,
        error: "No post found",
      });
    }
    post.Caption = req.body.Caption;
    post.save();
    return res.status(200).json({
      success: true,
      payload: post,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// note: we should add a seperate addLikes method so you can just add the user to the current list instead of patching the whole list

exports.getUserPost = async (req, res) => {
  try {
    const posts = await Post.find({ Author: req.params.userid });

    return res
      .status(200)
      .json({ success: true, count: posts.length, payload: posts });
  } catch (err) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};
