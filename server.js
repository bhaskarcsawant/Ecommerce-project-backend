// const express = require("express");
const app = require("./app")
const db = require("./models")
const dotenv = require("dotenv")
dotenv.config({ path: "./config/config.env" })



db.sequelize.sync().then((req) => {
    app.listen(process.env.PORT, () => console.log('server running'))
})
