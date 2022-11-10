const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController')


console.log('router loaded');
router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/Order',require('./Order'));




module.exports = router;