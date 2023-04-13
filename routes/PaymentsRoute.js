const express = require('express');
const { isUserAuthenticated } = require('../middleware/auth');
const { processPayments, sendStripeApiKey } = require('../controllers/PaymentController');
const router = express.Router();

router.route("/payment/process/").post(isUserAuthenticated, processPayments);
router.route("/stripekey").get(isUserAuthenticated, sendStripeApiKey);


module.exports = router;