const express = require('express');
const { gelAllProducts, addProduct, updateProduct, deleteProduct, getSingleProduct } = require("../controllers/ProductController");
const { isUserAdmin } = require('../middleware/auth');

const router = express.Router();



router.route('/products').get(gelAllProducts)
router.route('/product/new').post(isUserAdmin, addProduct)
router.route('/product/:id').patch(isUserAdmin, updateProduct).delete(isUserAdmin, deleteProduct).get(getSingleProduct)
// router.route('/deleteproduct/:id').post(deleteProduct)

module.exports = router