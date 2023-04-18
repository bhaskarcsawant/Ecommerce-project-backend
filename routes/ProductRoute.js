const express = require('express');
const { gelAllProducts, addProduct, updateProduct, deleteProduct, getSingleProduct, gelAllAdminProducts } = require("../controllers/ProductController");
const { isUserAdmin } = require('../middleware/auth');

const router = express.Router();



router.route('/products').get(gelAllProducts)
router.route("/admin/productlist").get(isUserAdmin, gelAllAdminProducts);
router.route('/admin/product/new').post(isUserAdmin, addProduct)
router.route('/admin/product/:id').patch(isUserAdmin, updateProduct).delete(isUserAdmin, deleteProduct)
router.route('/product/:id').get(getSingleProduct)
// router.route('/deleteproduct/:id').post(deleteProduct)

module.exports = router