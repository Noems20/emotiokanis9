import express from 'express';

import { protect, restrictTo } from '../controllers/authController.js';
import {
  createService,
  uploadImage,
  getAllServices,
  resizeServiceImage,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';

const router = express.Router();

router
  .route('/')
  .get(getAllServices)
  .post(
    protect,
    restrictTo('admin'),
    uploadImage,
    createService,
    resizeServiceImage
  );

router
  .route('/:id')
  .patch(
    protect,
    restrictTo('admin'),
    uploadImage,
    updateService,
    resizeServiceImage
  )
  .delete(protect, restrictTo('admin'), deleteService);

export default router;
