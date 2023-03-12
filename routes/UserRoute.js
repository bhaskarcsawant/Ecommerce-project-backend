const express = require('express');
const { registerUser, getAllUsers, loginUser, logoutUser, resetPassword } = require("../controllers/UserController");
const { isUserAuthenticated, isUserAdmin } = require('../middleware/auth');

const router = express.Router();

router.route('/users').get(isUserAdmin, getAllUsers)
router.route('/register/').post(registerUser)
router.route('/login/').post(loginUser)
router.route('/password/forgot').post(resetPassword)
router.route('/logout/').get(isUserAuthenticated, logoutUser)


module.exports = router