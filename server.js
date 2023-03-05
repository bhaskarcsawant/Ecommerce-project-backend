// const express = require("express");
const app = require("./app")
const dotenv = require("dotenv")
const connectDb = require('./config/databse')
dotenv.config({ path: "./config/config.env" })

//connect db to express
connectDb()

app.listen(process.env.PORT, () => console.log('server running'))

