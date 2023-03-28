const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileupload())

//Routes
const product = require("./routes/ProductRoute")
const user = require("./routes/UserRoute")
const order = require("./routes/orderRoute")

app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", order)

module.exports = app