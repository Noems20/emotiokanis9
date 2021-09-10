import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Utils
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';

// Routers
import userRouter from './routes/userRoutes.js';

dotenv.config();

const app = express();

// ---------------------------- MIDDLEWARES ---------------------------

// ------------- BODY PARSER -----------
app.use(
  express.json({
    limit: '10kb',
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
