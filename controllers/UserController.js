const catchAsyncError = require('../middleware/catchAsyncError')
const User = require('../models/UserModel')



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

    const token = userData.getJWTtoken();
    res.status(201).json({
        token
    })
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