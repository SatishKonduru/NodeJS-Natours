class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "fail" : "error";
    this.isOperational = true; // To check is this error is of type operational?
    Error.captureStackTrace(this, this.constructor); //to Find the error from where it was raised
  }
}
module.exports = AppError;
