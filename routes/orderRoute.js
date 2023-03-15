const express = require('express');
const { newOrder } = require('../controllers/orderController');
const { isUserAuthenticated } = require('../middleware/auth');

const router = express.Router();



router.route('/order/new').post(isUserAuthenticated, newOrder)

// router.route('/deleteproduct/:id').post(deleteProduct)

module.exports = router