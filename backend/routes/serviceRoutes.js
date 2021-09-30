import express from 'express';

import { protect, restrictTo } from '../controllers/authController.js';
import {
  createService,
  createServiceImage,
  resizeServiceImage,
} from '../controllers/serviceController.js';

const router = express.Router();

router
  .route('/')
  .post(
    protect,
    restrictTo('admin'),
    createServiceImage,
    createService,
    resizeServiceImage
  );

export default router;
