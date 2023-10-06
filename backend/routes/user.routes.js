const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user.controllers');

//Create user.
router.post('/', usersController.createUser);

//Login user
router.post('/auth/login', usersController.login);

module.exports = router;