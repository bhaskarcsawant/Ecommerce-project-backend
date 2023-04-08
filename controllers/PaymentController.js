const catchAsyncError = require("../middleware/catchAsyncError");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

exports.processPayments = catchAsyncError(async (req, res, next) => { 
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "inr",
        metadata: {
            company:"E-Store"
        },
    })

    res.status(200).json({
        success: true,
        client_secret:myPayment.client_secret
    })
})


exports.sendStripeApiKey = catchAsyncError(async (req, res, next) => { 
    res.status(200).json({
      stripeKey: process.env.STRIPE_API_SECRET,
    });
})