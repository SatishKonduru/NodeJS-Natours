const express = require("express");
// const fs = require("fs");
const morgon = require("morgan");
const tourRoutes = require("./routes/tourRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(morgon("dev"));
app.use(express.json()); //use() built-in middleware comes with expressJS

app.use(express.static(`${__dirname}/public`));

app.use("/api/v1/tours", tourRoutes);
app.use("/api/v1/users", userRoutes);

module.exports = app;
