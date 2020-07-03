const express = require('express');
const router = express.Router();
const { getChallenges, addChallenge , getChallenge , deleteChallenge , updateChallenge, getCategoryChallenge, deleteCategoryChallenge} = require('../controller/challengeController');

router
    .route('/')
    .get(getChallenges)
    .post(addChallenge);

router
    .route('/:id')
    .get(getChallenge)
    .delete(deleteChallenge)
    .patch(updateChallenge);

router
    .route('/category/:category')
    .get(getCategoryChallenge)
    .delete(deleteCategoryChallenge);

module.exports = router;