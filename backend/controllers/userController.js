import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import multer from 'multer';
import sharp from 'sharp';

// ----------------- FILE UPLOAD ----------------
// Store in file system
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // First parameter if there is an actual error, second parameter actual destination
//     cb(null, 'backend/data/img/users');
//   },
//   filename: (req, file, cb) => {
//     //user-id-timestamp.jpeg
//     const ext = file.mimetype.split('/')[1];
//     // Second parameter field name
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

// Image stores as a buffer
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new AppError('Not an image! Please upload only images.', 400, {
        photo: 'Por favor selecciona una imagen',
      }),
      false
    );
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export const uploadUserPhoto = upload.single('photo');

// ----------------- RESIZE USER PHOTO ----------------
export const resizeUserPhoto = (req, res, next) => {
  if (!req.file) return next();

  // As we saved image in memory filename doesn't exist but updateMe needs it
  req.file.filename = `user-${req.user.id}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`backend/public/img/users/${req.file.filename}`);

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

// ------------------ GET ALL USERS --------------
export const getAllUsers = async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    results: users.length,
    users,
  });
};

// ------------------- UPDATE USER -------------------
export const updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = req.file.filename;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    user: updatedUser,
  });
});
