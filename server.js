// const express = require("express");
const app = require("./app")
const connectDb = require('./config/databse')
const cloudinary = require("cloudinary")
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "./config/config.env" })
}

//connect db to express
connectDb()
cloudinary.config({
    coud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.listen(process.env.PORT, () => console.log('server running', process.env.PORT))

