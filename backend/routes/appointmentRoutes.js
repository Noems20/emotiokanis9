import express from 'express';

import {
  getAllAppointments,
  createAppointment,
  deleteAppointment,
  updateAppointment,
  setUserIds,
  checkIfAuthor,
  checkIfActive,
  checkDate,
  getAppointment,
} from '../controllers/appointmentController.js';

import { protect, restrictTo } from '../controllers/authController.js';

const router = express.Router({ mergeParams: true });

router.use(protect);

router
  .route('/')
  .get(restrictTo('admin'), getAllAppointments)
  .post(setUserIds, checkIfActive, checkDate, createAppointment);

router
  .route('/:id')
  .get(restrictTo('admin'), getAppointment)
  .patch(
    restrictTo('user', 'admin'),
    checkIfAuthor,
    checkDate,
    updateAppointment
  )
  .delete(restrictTo('user', 'admin'), checkIfAuthor, deleteAppointment);

export default router;
