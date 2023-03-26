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

//update stock
async function updateStock(id, quantity) {
    const product = await Product.findById(id)
    product.stock -= quantity
    // console.log(product.size)
    product.size[0].quantity -= quantity

    await product.save({ validateBeforeSave: false })
}

//update order status

exports.updateOrderStatus = catchAsyncError(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (!order) return res.send("order not found");

    if (order.orderStatus === "Delivered") {
        return res.send("you have already delivered this order")
    }

    order.orderItems.forEach(async (order) => {
        await updateStock(order.product, order.quantity);
    })

    order.orderStatus = req.body.orderStatus

    await order.save({ validateBeforeSave: false })

    res.send(order)
})


//delete order

exports.deleteOrder = catchAsyncError(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (!order) return res.send("order not found");
    order.deleteOne()
    res.send("order deleted successfully !")
})