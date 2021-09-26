import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// SECURITY
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';

// UTILS
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';

// ROUTERS
import userRouter from './routes/userRoutes.js';

dotenv.config();

const app = express();

// ---------------------------- MIDDLEWARES ---------------------------
const limiter = rateLimit({
  max: 100,
  windowMS: 60 * 60 * 1000, // 1 hour
  message: 'Too many request from this IP',
});

// Set security http headers
app.use(helmet());

// Limit request from same API
app.use('/api', limiter);

// ------------- BODY PARSER -----------
// Reading data from body into req.body
app.use(
  express.json({
    limit: '10kb',
  })
);

// Data sanitization against NoSQL query injection
// { "$gt":"" } -> Always returns true so it finds all the users allowing sign in
// Checks request body, req query string and req.params and filters $ and .
app.use(mongoSanitize());

// Data sanitization against XSS
// Clean any user input from malicious html -> Converts html symbols
app.use(xss());

// Prevent parameter pollution -> Removes duplicated fields expect the ones in the whitelist
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

app.use(cookieParser());

// ---------------------------- ROUTER'S ---------------------------
app.use('/api/v1/users', userRouter);

// ---------------------------- ERRORS ---------------------------

// ------------- ROUTE NOT FOUND -----------
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// ------------- ERROR HANDLER -----------
app.use(globalErrorHandler);

export default app;
