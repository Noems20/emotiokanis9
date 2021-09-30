import express from 'express';

import { protect, restrictTo } from '../controllers/authController.js';
import { createService } from '../controllers/serviceController.js';

const router = express.Router();

router.route('/').post(protect, restrictTo('admin'), createService);

export default router;
