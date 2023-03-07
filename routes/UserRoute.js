const express = require('express');
const { registerUser, getAllUsers } = require("../controllers/UserController")

const router = express.Router();

router.route('/users').get(getAllUsers)
router.route('/register/').post(registerUser)
// router.route('/product/new').post(addProduct)
// router.route('/product/:id').patch(updateProduct).delete(deleteProduct).get(getSingleProduct)
// router.route('/deleteproduct/:id').post(deleteProduct)

module.exports = router