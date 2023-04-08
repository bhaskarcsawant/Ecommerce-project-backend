const express = require('express');
const { isUserAuthenticated } = require('../middleware/auth');
const { processPayments } = require('../controllers/PaymentController');
const router = express.Router();

router.route("/payment/process/").post(isUserAuthenticated, processPayments);


module.exports = router;