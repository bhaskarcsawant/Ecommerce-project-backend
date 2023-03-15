const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.json())
app.use(cookieParser())

//Routes
const product = require("./routes/ProductRoute")
const user = require("./routes/UserRoute")
const order = require("./routes/orderRoute")

app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", order)

module.exports = app