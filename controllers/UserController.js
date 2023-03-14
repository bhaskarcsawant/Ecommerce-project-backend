const catchAsyncError = require('../middleware/catchAsyncError')
const User = require('../models/UserModel')
const sendEmail = require('../utils/sendEmail')
const sendToken = require('../utils/sendToken')
const crypto = require('crypto')



//register th euser
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const user = await User.find({ email: req.body.email })
    if (user.length) {
        return res.send("user already registered")
    }
    const { firstname, lastname, email, password, mobile, role } = req.body
    const userData = await User.create({
        firstname,
        lastname,
        email,
        password,
        avatar: {
            public_id: "sample",
            url: "sample bro"
        },
        mobile,
        role,
    });

    sendToken(userData, 200, res)
})


//get all user
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    let userCount = await User.countDocuments()
    const user = await User.find().then(users => {
        res.status(200).json({
            userCount,
            users
        })
    })
})


//login the user
exports.loginUser = catchAsyncError(async (req, res, next) => {

    const { email, password } = req.body

    if (!email || !password) {
        return res.send("Please enter your credentials")
    }
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return res.send("invalid email or password")
    }
    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
        return res.send("invalid email or password")
    }

    sendToken(user, 200, res)
})

//Logout the user

exports.logoutUser = catchAsyncError(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: "User logged out",
    })
})

//forgot password link send function

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.send("user not found")

    const resetToken = user.genrateResetPasswordToken()

    await user.save({ validateBeforeSave: false })

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token :- \n\n${resetPasswordUrl} \n\nIf you have not requested reset password then please ignore it.`

    try {
        await sendEmail({
            email: user.email,
            subject: 'Estore password reset',
            message,
        })
        return res.send("mail sent successfully")
    }
    catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordDate = undefined;
        await user.save({ validateBeforeSave: false })
        return res.send(error.message)
    }
})

//forgot password reset function

exports.resetPassword = catchAsyncError(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")
    const user = await User.findOne({ resetPasswordToken, resetPasswordDate: { $gt: Date.now() } })
    if (!user) return res.send("reset password token expired")

    if (req.body.password !== req.body.confirmPassword) return res.send("passwords do not match")

    user.password = req.body.password
    user.resetPasswordToken = undefined;
    user.resetPasswordDate = undefined;
    await user.save()
    sendToken(user, 200, res)
})

//to get user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.send(user)
})

//to get user details (admin)
exports.getUserDetailsAdmin = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.send("user not found")
    res.send(user)
})

//update password

exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)
    if (!isPasswordMatched) return res.send("old password is incorrect")
    if (req.body.newPassword !== req.body.confirmPassword) return res.send("passwords do not match")
    user.password = req.body.newPassword
    await user.save()
    sendToken(user, 200, res)
})

//update profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    user.updateOne(req.body)
    res.send(user)
})



