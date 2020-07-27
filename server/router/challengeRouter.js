const express = require("express");
const router = express.Router();
const {
  getChallenges,
  addChallenge,
  getChallenge,
  deleteChallenge,
  updateChallenge,
  getTypeChallenge,
  deleteTypeChallenge,
} = require("../controller/challengeController");

router.route("/").get(getChallenges).post(addChallenge);

router.route("/:id").get(getChallenge).delete(deleteChallenge).patch(updateChallenge);

router.route("/type/:type").get(getTypeChallenge).delete(deleteTypeChallenge);

module.exports = router;
