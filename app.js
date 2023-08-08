const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

/* const employeeRoute = require("./routes/employee_route");
const productRoute = require("./routes/product_route");
const categoryRoute = require("./routes/category_route");
const orderRoute = require("./routes/order_route.js");
const paymentRoute = require("./routes/payment_route.js");
const tableRoute = require("./routes/table_route.js");
const statisticRoute = require("./routes/statistic_route.js");
const performanceRoute = require("./routes/performance"); */

app.use(cors());
app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* app.use("/employee", employeeRoute);
app.use("/product", productRoute);
app.use("/category", categoryRoute);
app.use("/order", orderRoute);
app.use("/payment", paymentRoute);
app.use("/table", tableRoute);
app.use("/statistic", statisticRoute);
app.use("/server", performanceRoute); */

module.exports = app;
