const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const foodRoute = require("./routes/meal.route");
const productsRoute = require("./routes/product.route");
const ordersRoute = require("./routes/order.route");
const statisticsRoute = require("./routes/statistics.route");

app.use(cors());
app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/meal", foodRoute);
app.use("/products", productsRoute);
app.use("/orders", ordersRoute);
app.use("/statistics", statisticsRoute);

module.exports = app;
