const express = require('express');
const app = express();
app.use(express.json())

//Routes
const product = require("./routes/ProductRoute")


app.use("/api/v1", product)

module.exports = app