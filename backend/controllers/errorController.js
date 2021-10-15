import AppError from '../utils/appError.js';

const handleUIErrors = (uiErrors, err) => {
  if (err.name === 'ValidationError') {
    Object.keys(err.errors).forEach((key) => {
      uiErrors[key] = err.errors[key].message;
    });
  }
  if (err.code === 11000) {
    Object.keys(err.keyValue).forEach((key) => {
      uiErrors[key] = 'Ya esta en uso';
    });
  }
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = Object.values(err.keyValue)[0];
  let uiErrors = {};

  handleUIErrors(uiErrors, err);

  const message = `Duplicate field value: ${value}. Use another value.`;
  return new AppError(message, 400, uiErrors);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  let uiErrors = {};

  handleUIErrors(uiErrors, err);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400, uiErrors);
};

const handleJWTError = () =>
  new AppError('Invalid token, Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again', 401);

const sendErrorDev = (err, req, res, uiErrors) => {
  if (
    uiErrors && // 👈 null and undefined check
    Object.keys(uiErrors).length === 0 &&
    uiErrors.constructor === Object
  ) {
    uiErrors = null;
  }
  // API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      uiErrors: uiErrors || err.uiErrors, // Undefined is not shown in response (if uiErrors is not defined as parameter)
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  // if (!(req.originalUrl === '/perfil')) {
  console.error('ERROR', err);
  // }
};

const sendErrorProd = (err, req, res) => {
  // API
  if (req.originalUrl.startsWith('/api')) {
    // Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        uiErrors: err.uiErrors,
        status: err.status,
        message: err.message,
      });
    }
    // Programming or other unknown error don't leak error details
    // 1) Log error
    console.error('ERROR', err);

    // 2) Send generate message
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }

  console.error('ERROR', err);
};

// Only by giving 4 arguments express recognizes as an error handler middleware
export default (err, req, res, next) => {
  //   console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = Object.assign(err);

  if (process.env.NODE_ENV === 'development') {
    let uiErrors = {};
    if (error.name === 'ValidationError' || error.code === 11000) {
      handleUIErrors(uiErrors, error);
      error.statusCode = 400;
    }
    sendErrorDev(error, req, res, uiErrors);
  } else if (process.env.NODE_ENV === 'production') {
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);

    if (error.name === 'CastError') error = handleCastErrorDB(error);

    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};
