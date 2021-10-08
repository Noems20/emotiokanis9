import express from 'express';

import { protect, restrictTo } from '../controllers/authController.js';
import {
  createAward,
  uploadImage,
  getAllAwards,
  resizeAwardImage,
  updateAward,
  deleteAward,
} from '../controllers/awardController.js';

const router = express.Router();

router
  .route('/')
  .get(getAllAwards)
  .post(
    protect,
    restrictTo('admin'),
    uploadImage,
    createAward,
    resizeAwardImage
  );

router
  .route('/:id')
  .patch(
    protect,
    restrictTo('admin'),
    uploadImage,
    updateAward,
    resizeAwardImage
  )
  .delete(protect, restrictTo('admin'), deleteAward);

export default router;
