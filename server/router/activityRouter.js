const express = require('express');
const router = express.Router();
const { getActivities, addActivity , getActivity , deleteActivity , updateActivity, getCategoryActivity} = require('../controller/activityController');

router
    .route('/')
    .get(getActivities)
    .post(addActivity);

router
    .route('/:id')
    .get(getActivity)
    .delete(deleteActivity)
    .patch(updateActivity);

router
    .route('/category/:category')
    .get(getCategoryActivity);

module.exports = router;