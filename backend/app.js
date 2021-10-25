import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import cookieParser from 'cookie-parser';
import compression from 'compression';

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
import serviceRouter from './routes/serviceRoutes.js';
import awardRouter from './routes/awardRoutes.js';
import appointmentRouter from './routes/appointmentRoutes.js';

dotenv.config();

const app = express();

app.enable('trust proxy');

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/backend/public')));

// ---------------------------- MIDDLEWARES ---------------------------
const limiter = rateLimit({
  max: 100,
  windowMS: 60 * 60 * 1000, // 1 hour
  message: 'Too many request from this IP',
});

// Set security http headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", 'data:', 'blob:', 'https:', 'ws:'],
        baseUri: ["'self'"],
        fontSrc: ["'self'", 'https:', 'data:'],
        scriptSrc: [
          "'self'",
          'https:',
          'http:',
          'blob:',
          'https://*.mapbox.com',
          'https://js.stripe.com',
          'https://m.stripe.network',
          'https://*.cloudflare.com',
        ],
        frameSrc: ["'self'", 'https://js.stripe.com'],
        objectSrc: ["'none'"],
        styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
        workerSrc: [
          "'self'",
          'data:',
          'blob:',
          'https://*.tiles.mapbox.com',
          'https://api.mapbox.com',
          'https://events.mapbox.com',
          'https://m.stripe.network',
        ],
        childSrc: ["'self'", 'blob:'],
        imgSrc: ["'self'", 'data:', 'blob:'],
        formAction: ["'self'"],
        connectSrc: [
          "'self'",
          "'unsafe-inline'",
          'data:',
          'blob:',
          'https://*.stripe.com',
          'https://*.mapbox.com',
          'https://*.cloudflare.com/',
          'https://bundle.js:*',
          'ws://127.0.0.1:*/',
        ],
        upgradeInsecureRequests: [],
      },
    },
  })
);

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
// app.use(compression);

app.use(cookieParser());

// ---------------------------- ROUTER'S ---------------------------
app.use('/api/v1/users', userRouter);
app.use('/api/v1/services', serviceRouter);
app.use('/api/v1/awards', awardRouter);
app.use('/api/v1/appointments', appointmentRouter);

// --------------------------- SERVE REACT STATIC'S ----------------
if (process.env.NODE_ENV === 'production') {
  // console.log(__dirname);
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
}

// ---------------------------- ERRORS ---------------------------

// ------------- ROUTE NOT FOUND -----------
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// ------------- ERROR HANDLER -----------
app.use(globalErrorHandler);

export default app;
