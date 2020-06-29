const express = require("express");
const router = express.Router();
const postControllers = require("../controller/userController");

router.route("/").get(postControllers.getPosts).post(postControllers.addPost);

router
  .route("/:id")
  .get(postControllers.getPost)
  .patch(postControllers.updatePost)
  .delete(postControllers.deletePost);

router.route("/user/:userid").get(postControllers.getUserPost);

module.exports = router;
