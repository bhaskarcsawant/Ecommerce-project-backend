const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');
const UserModel = require("../models/UserModel");



exports.isUserAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Please login to access"
        })
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await UserModel.findById(decodedData.id)
    next()
})
exports.isUserAdmin = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Please login to access"
        })
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await UserModel.findById(decodedData.id)
    if (req.user.role === 'Admin') {
        return next()
    }
    res.status(403).json({
        success: false,
        message: "Access denied",
    })

})

