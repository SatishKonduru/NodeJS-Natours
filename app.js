const express = require("express");
// const fs = require("fs");
const morgon = require("morgan");

const AppError = require("./utils/appError");

const tourRoutes = require("./routes/tourRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(morgon("dev"));
app.use(express.json()); //use() built-in middleware comes with expressJS

app.use(express.static(`${__dirname}/public`));

app.use("/api/v1/tours", tourRoutes);

app.use("/api/v1/users", userRoutes);

// app.use((err, req, res, next) => {
//   // err.statusCode = err.statusCode || 500;
//   // err.status = err.status || "error";
//   // res.status(err.status).json({
//   //   status: err.status,
//   //   message: err.message,
//   // });
// });

app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: `Can't find ${req.originalUrl} on this server`,
  // });
  // const err = new Error(`Can't find ${req.originalUrl} on this server`);
  // err.status = "fail";
  // err.statusCode = 404;
  // next(err);

  next(new AppError(`Can't find ${req.originalUrl} on this server`), 404);
});


module.exports = app;
