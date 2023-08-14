const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const foodRoute = require("./routes/meal.route");

app.use(cors());
app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/meal", foodRoute);

module.exports = app;
