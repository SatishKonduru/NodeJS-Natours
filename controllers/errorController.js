require("dotenv").config();
const AppError = require("./../utils/appError");
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  // res.status(err.statusCode).json({
  //   status: err.status,
  //   message: err.message,
  // });
  const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  };

  const sendErrorProd = (err, res) => {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "Something Went Wrong!!!",
      });
    }
  };
  const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
  };

  const handleDuplicateFieldsDB = (err) => {
    const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
    // console.log("Duplicate Value: ", value);
    const message = `Duplicate Field Value: ${value}`;
    return new AppError(message, 400);
  };

  const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid Input Data: ${errors.join(", ")}`;
    return new AppError(message, 400);
  };

  const handleJWTError = () =>
    new AppError("Invalid Token. Please Login.", 401);
  const handleTokenExpiredError = () =>
    new AppError("token Expired. Please Login Again.", 401);

  if ((process.env.NODE_ENV || " ").trim() === "development") {
    sendErrorDev(err, res);
  } else if ((process.env.NODE_ENV || " ").trim() === "production") {
    let error = { ...err };
    if (err.name === "CastError") error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.name === "ValidationError") error = handleValidationErrorDB(err);
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleTokenExpiredError();
    sendErrorProd(error, res);
  }
};
