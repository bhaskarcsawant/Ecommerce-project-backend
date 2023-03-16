const express = require('express');
const { newOrder, getSingleOrder, getMyOrders, getAllOrders, updateOrderStatus } = require('../controllers/orderController');
const { isUserAuthenticated, isUserAdmin } = require('../middleware/auth');

const router = express.Router();



router.route('/order/new').post(isUserAuthenticated, newOrder)
router.route('/orders/').get(isUserAuthenticated, isUserAdmin, getAllOrders)
router.route('/order/:id').get(isUserAuthenticated, getSingleOrder).put(isUserAuthenticated, isUserAdmin, updateOrderStatus)
router.route('/orders/me/').get(isUserAuthenticated, getMyOrders)

// router.route('/deleteproduct/:id').post(deleteProduct)

module.exports = router