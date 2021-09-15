import express from 'express';

// Controllers
import { getAllUsers } from '../controllers/userController.js';
import {
  signup,
  login,
  protect,
  restrictTo,
  isLoggedIn,
} from '../controllers/authController.js';

const router = express.Router();

router.route('/login').post(login);
router.route('/logged').get(isLoggedIn);
router
  .route('/')
  .post(signup)
  .get(protect, restrictTo('admin', 'employee'), getAllUsers);

export default router;
