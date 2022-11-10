const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController')


console.log('router loaded for Orders');

router.post('/add-order/:id',orderController.Create);
router.get('/get-order/:id',orderController.show);

module.exports = router;