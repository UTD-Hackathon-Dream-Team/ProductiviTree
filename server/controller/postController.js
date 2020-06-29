const Post = require("../models/post");

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    return res
      .status(200)
      .json({ success: true, count: posts.length, payload: posts });
  } catch (err) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.getPost = async (req, res, next) => {
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
      payload: post[0],
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};
