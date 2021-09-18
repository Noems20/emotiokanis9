import express from 'express';

// Controllers
import { getAllUsers } from '../controllers/userController.js';
import {
  signup,
  login,
  logout,
  protect,
  restrictTo,
  isLoggedIn,
} from '../controllers/authController.js';

const router = express.Router();

router.route('/login').post(login);
router.route('/logged').get(isLoggedIn);
router.route('/logout').get(logout);
router
  .route('/')
  .post(signup)
  .get(protect, restrictTo('admin', 'employee'), getAllUsers);

export default router;
