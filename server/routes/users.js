const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
// const { route } = require('./users');

console.log('router loaded');

router.post('/add-user',userController.register)
router.post('/login-user',userController.login);

module.exports = router;