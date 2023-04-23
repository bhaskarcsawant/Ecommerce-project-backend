const express = require('express');
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config/config.env" });
}
app.use(
  cors({
    origin: [
      "https://ecommerce-project-frontend.vercel.app",
      "https://ecommerce-project-frontend.vercel.app",
    ],
    credentials: true,
  })
);

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    "https://ecommerce-project-frontend.vercel.app"
  );
  res.header("Access-Control-Allow-Headers", true);
res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});
// app.use(express.json())
app.use(cookieParser())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileupload())
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//Routes
const product = require("./routes/ProductRoute")
const user = require("./routes/UserRoute")
const order = require("./routes/orderRoute")
const payments = require("./routes/PaymentsRoute")

app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", order)
app.use("/api/v1", payments);

module.exports = app