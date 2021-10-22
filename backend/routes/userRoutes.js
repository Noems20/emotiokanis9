import express from 'express';

// Controllers
import {
  getAllUsers,
  updateMe,
  uploadUserPhoto,
  resizeUserPhoto,
  sendContactMail,
  deleteUser,
  changeUserRole,
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
  verifyAccount,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.route('/logged').get(isLoggedIn);
router.post('/forgotPassword', forgotPassword);
router.post('/sendContactMail', sendContactMail);
router.patch('/resetPassword/:token', resetPassword);
router.patch('/verifyAccount/:token', verifyAccount);

router.use(protect);

router.patch('/updateMyPassword', updatePassword);
router.patch('/changeUserRole/:id', restrictTo('admin'), changeUserRole);
// router.get('/me', getMe, getUser);
router.patch('/updateMe', uploadUserPhoto, updateMe, resizeUserPhoto);
// router.delete('/deleteMe', deleteMe);

// ----------- GENERIC ROUTES --------
router.route('/').get(restrictTo('admin'), getAllUsers);
router.route('/:id').delete(restrictTo('admin'), deleteUser);

export default router;
