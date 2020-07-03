const Post = require("../model/postModel");

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
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        error: "No user found",
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
    const post = await Post.create(req.body);
    return res.status(201).json({ success: true, payload: post });
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
    const post = Post.findById(req.params.id);
    if (post.length == 0) {
      return res.status(404).json({
        success: false,
        error: "No post found",
      });
    }
    await Post.deleteOne({ _id: req.params.id });
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
    const post = Post.findById(req.params.id);
    if (post.length == 0) {
      return res.status(404).json({
        success: false,
        error: "No post found",
      });
    }
    await post.replaceOne(
      {},
      {
        $set: {
          Caption: req.body.Caption,
        },
      }
    );
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
