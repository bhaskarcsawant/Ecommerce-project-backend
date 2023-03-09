const express = require('express');
const { registerUser, getAllUsers, loginUser, logoutUser } = require("../controllers/UserController");
const { isUserAuthenticated, isUserAdmin } = require('../middleware/auth');

const router = express.Router();

router.route('/users').get(isUserAdmin, getAllUsers)
router.route('/register/').post(registerUser)
router.route('/login/').post(loginUser)
router.route('/logout/').get(isUserAuthenticated, logoutUser)
// router.route('/product/new').post(addProduct)
// router.route('/product/:id').patch(updateProduct).delete(deleteProduct).get(getSingleProduct)
// router.route('/deleteproduct/:id').post(deleteProduct)

module.exports = router