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


//get all orders order -- admin

exports.getAllOrders = catchAsyncError(async (req, res) => {
    let orderCount = await Order.countDocuments()
    let totalCost = 0;
    const orders = await Order.find()
    orders.forEach((i) => {
        totalCost += i.totalPrice;
    })
    if (!orders) return res.send("order not found");
    res.status(200).json({
        orderCount,
        totalCost,
        orders
    })
})

//get single order

exports.getSingleOrder = catchAsyncError(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "firstname lastname email")
    if (!order) return res.send("order not found");
    res.send(order)
})


//get logged in user orders

exports.getMyOrders = catchAsyncError(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    if (!orders) return res.send("orders not found");
    res.send(orders)
})


//update order status

exports.updateOrderStatus = catchAsyncError(async (req, res) => {
    const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus: req.body.orderStatus }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    if (!order) return res.send("order not found");

    res.send(order)
})