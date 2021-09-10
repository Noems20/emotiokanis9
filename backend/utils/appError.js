class AppError extends Error {
  constructor(message, statusCode, uiErrors) {
    super(message);

    this.uiErrors = uiErrors;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
