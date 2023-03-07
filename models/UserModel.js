const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userScema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please enter firstname"],
        maxLength: [30, 'name must be at least 30 characters'],
        minLength: [3, 'name must be at least 30 characters'],
        trim: true,
    },
    lastname: {
        type: String,
        required: [true, "Please enter lastname"],
        maxLength: [30, 'name must be at least 30 characters'],
        minLength: [3, 'name must be at least 3 characters'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please enter email id"],
        unique: true,
        validate: [validator.isEmail, 'please enter a valid email'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minLength: [8, 'name must be at least 8 characters'],
        // select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },

    }
    ,
    role: {
        type: String,
        default: 'user',
    },
    mobile: {
        type: Number,
        required: [true, "Please enter mobile number"],
        maxLength: [10, "price cannot exceed 10 characters"],
    },
    resetPasswordToken: String,
    resetPasswordDate: Date,
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

userScema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userScema.methods.getJWTtoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};


module.exports = mongoose.model('User', userScema)

