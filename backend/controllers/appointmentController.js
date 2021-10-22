import Appointment from '../models/appointmentModel.js';
import catchAsync from '../utils/catchAsync.js';
import validator from 'validator';
import AppError from '../utils/appError.js';
import moment from 'moment';

import {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} from './handlerFactory.js';

export const setUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

// ------------------ FILTER OBJECT -------------
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// ----------------------- CHECK IF AUTHOR -----------------------

export const checkIfAuthor = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    return next(new AppError(`Not found document with that id`, 404));
  }
  if (req.user.role !== 'admin') {
    if (appointment.user.id !== req.user.id)
      return next(
        new AppError(`You cannot edit someone's else appointment.`, 403)
      );
  }
  next();
});

// ----------------------- CHECK IF ACTIVE -----------------------

export const checkIfActive = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findOne({
    user: req.body.user,
    active: true,
  });

  // Check if user has an active appointment
  if (appointment) {
    return next(new AppError(`You already have an active appointment`, 403));
  }

  next();
});

// ----------------------- CHECK DATE -----------------------

export const checkDate = catchAsync(async (req, res, next) => {
  // Check if date of appointment is valid
  if (req.body.date && !validator.isISO8601(req.body.date)) {
    return next(
      new AppError('Date must in be in format ISO8601', 400, {
        date: 'Debe ser una fecha valida',
      })
    );
  }
  const date = moment(req.body.date);
  const lowerLimit = moment(date.toISOString()).hour(8).startOf('hour');
  const upperLimit = moment(date.toISOString()).hour(19).startOf('hour');
  // console.log(lowerLimit.toString());
  // console.log(upperLimit.toString());
  // console.log(date.day());
  if (
    !(
      date.isBefore(moment().add(30, 'day').startOf('day')) && // Checks if appointment before 30 days after current time
      date.isBetween(lowerLimit, upperLimit) && // Checks between hours 8-19
      date.isAfter(moment().add(2, 'hour')) && // Checks if two hours after current time
      date.day() !== 0
    ) // Checks if is not sunday
  ) {
    return next(
      new AppError(`Must be a valid date`, 400, {
        date: 'Debe ser una fecha válida',
      })
    );
  }

  next();
});

// ------------------- UPDATE USER LOGGED APPOINTMENT -------------------
export const updateAppointment = catchAsync(async (req, res, next) => {
  // 1) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'service', 'description', 'date');

  // 2) Update user document
  const updatedAppointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    appointment: updatedAppointment,
  });
});

export const getMyAppointments = catchAsync(async (req, res, next) => {
  let appointments = await Appointment.find({
    user: req.user.id,
  })
    .sort({ active: 1 })
    .sort({ date: -1 });

  if (!appointments.length) {
    appointments = null;
  }

  return res.status(200).json({
    status: 'success',
    data: appointments,
  });
});

// ----------------------- COMPLETE APPOINTMENT -----------------------

export const completeAppointment = catchAsync(async (req, res, next) => {
  const completedAppointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    {
      active: false,
    },
    {
      new: true,
    }
  );

  if (!completedAppointment) {
    return next(new AppError('Not found appointment with that id', 400));
  }

  return res.status(200).json({
    status: 'success',
    data: completedAppointment,
  });
});

export const getAllAppointments = getAll(Appointment);
export const getAppointment = getOne(Appointment);
export const createAppointment = createOne(Appointment);

// export const updateAppointment = updateOne(Appointment);
export const deleteAppointment = deleteOne(Appointment);
