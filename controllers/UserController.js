const catchAsyncError = require('../middleware/catchAsyncError')
const User = require('../models/UserModel')
const sendToken = require('../utils/sendToken')



//register th euser
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const user = await User.find({ email: req.body.email })
    if (user.length) {
        return res.send("user already registered")
    }
    const { firstname, lastname, email, password, mobile } = req.body
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