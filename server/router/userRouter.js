const express = require('express');
const router = express.Router();
const { getUsers, addUser , getUser , deleteUser , updateUser} = require('../controller/userController');

router
    .route('/')
    .get(getUsers)
    .post(addUser);

router
    .route('/:googleId')
    .get(getUser)
    .delete(deleteUser)
    .patch(updateUser)

module.exports = router;