import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import Email from '../utils/email.js';
import multer from 'multer';
import sharp from 'sharp';
import { validateMailData } from '../utils/validators.js';

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

export const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadUserPhoto = upload.single('photo');

// ----------------- RESIZE USER PHOTO ----------------
export const resizeUserPhoto = (req, res, next) => {
  // As we saved image in memory filename doesn't exist but updateMe needs it
  if (req.file) {
    req.file.filename = `user-${req.doc.id}.jpg`;

    sharp(req.file.buffer)
      .resize(500, 500)
      .withMetadata()
      .toFormat('jpg')
      .jpeg({ quality: 90 })
      .toFile(`backend/public/img/users/${req.file.filename}`)
      .then(() => {
        return res.status(200).json({
          status: 'success',
          user: req.doc,
        });
      });
  } else {
    res.status(200).json({
      status: 'success',
      user: req.doc,
    });
  }
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

  // console.log(req.body);
  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = `user-${req.user.id}.jpg`;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  req.doc = updatedUser;
  next();
});

// ------------------- SEND MAIL -------------------
export const sendContactMail = catchAsync(async (req, res, next) => {
  const { name, email, subject, message } = req.body;

  // 1) Check Data
  const { errors, valid } = validateMailData(name, email, subject, message);

  if (!valid) {
    return next(new AppError('Mail details must be valid', 400, errors));
  }

  const user = { name, email: process.env.EMAIL_FROM };
  const content = { subject, message, email };

  const url = `${req.protocol}://localhost:3000/`;

  // 4) Send it to own email
  try {
    await new Email(user, url, content).sendContactMail();
  } catch (error) {
    console.log(error);

    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500,
        {
          email: 'Ocurrio un error enviando el email',
        }
      )
    );
  }

  res.status(200).json({
    status: 'success',
    message: 'Mail sent!',
  });
});
