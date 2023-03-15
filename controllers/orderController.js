const Order = require("../models/orderModel")
const Product = require("../models/ProductModel")
const catchAsyncError = require('../middleware/catchAsyncError')



//to create a order
exports.newOrder = catchAsyncError(async (req, res) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        orderStatus,
    } = req.body;

    const order = await Order.create(
        {
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            orderStatus,
            paidAt: Date.now(),
            user: req.user._id
        }
    );

    res.send(order)
})