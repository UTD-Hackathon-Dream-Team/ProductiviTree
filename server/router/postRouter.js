const express = require("express");
const router = express.Router();
const {
  getPosts,
  addPost,
  getPost,
  updatePost,
  deletePost,
  getUserPost,
} = require("../controller/postController");

router.route("/").get(getPosts).post(addPost);

router.route("/:id").get(getPost).patch(updatePost).delete(deletePost);

router.route("/user/:userid").get(getUserPost);

module.exports = router;
