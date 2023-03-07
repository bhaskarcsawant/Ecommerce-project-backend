const express = require('express');
const app = express();

app.use(express.json())

//Routes
const product = require("./routes/ProductRoute")
const user = require("./routes/UserRoute")

app.use("/api/v1", product)
app.use("/api/v1", user)

module.exports = app