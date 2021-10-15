import express from 'express';

// Controllers
import {
  getAllUsers,
  updateMe,
  uploadUserPhoto,
  resizeUserPhoto,
} from '../controllers/userController.js';

import {
  signup,
  login,
  logout,
  protect,
  restrictTo,
  isLoggedIn,
  updatePassword,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.route('/logged').get(isLoggedIn);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router.use(protect);

router.patch('/updateMyPassword', updatePassword);
// router.get('/me', getMe, getUser);
router.patch('/updateMe', uploadUserPhoto, updateMe, resizeUserPhoto);
// router.delete('/deleteMe', deleteMe);

// ----------- GENERIC ROUTES --------
router.route('/').get(restrictTo('admin', 'employee'), getAllUsers);

export default router;
