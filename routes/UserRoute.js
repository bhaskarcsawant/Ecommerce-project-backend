const express = require('express');
const { registerUser, getAllUsers, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updatePassword } = require("../controllers/UserController");
const { isUserAuthenticated, isUserAdmin } = require('../middleware/auth');

const router = express.Router();

router.route('/users').get(isUserAdmin, getAllUsers)
router.route('/me/').get(isUserAuthenticated, getUserDetails)
router.route('/register/').post(registerUser)
router.route('/login/').post(loginUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/update').put(isUserAuthenticated, updatePassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/logout/').get(isUserAuthenticated, logoutUser)


module.exports = router