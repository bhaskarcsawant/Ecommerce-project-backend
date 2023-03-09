const express = require('express');
const { gelAllProducts, addProduct, updateProduct, deleteProduct, getSingleProduct } = require("../controllers/ProductController");
const { isUserAuthenticated } = require('../middleware/auth');

const router = express.Router();



router.route('/products').get(gelAllProducts)
router.route('/product/new').post(isUserAuthenticated, addProduct)
router.route('/product/:id').patch(isUserAuthenticated, updateProduct).delete(isUserAuthenticated, deleteProduct).get(getSingleProduct)
// router.route('/deleteproduct/:id').post(deleteProduct)

module.exports = router