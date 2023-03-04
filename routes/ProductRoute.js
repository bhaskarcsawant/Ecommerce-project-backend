const express = require('express');
const { gelAllProducts, addProduct, updateProduct, deleteProduct, getSingleProduct } = require("../controllers/ProductController")

const router = express.Router();

router.route('/products').get(gelAllProducts)
router.route('/product/new').post(addProduct)
router.route('/product/:id').patch(updateProduct).delete(deleteProduct).get(getSingleProduct)
// router.route('/deleteproduct/:id').post(deleteProduct)

module.exports = router