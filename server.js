// const express = require("express");
const app = require("./app")
const dotenv = require("dotenv")
const connectDb = require('./config/databse')
const cloudinary = require("cloudinary")
dotenv.config({ path: "./config/config.env" })

//connect db to express
connectDb()
cloudinary.config({
    coud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.listen(process.env.PORT, () => console.log('server running', process.env.PORT))

