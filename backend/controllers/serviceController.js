import Service from '../models/serviceModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import multer from 'multer';
import sharp from 'sharp';

// ----------------- FILE UPLOAD ----------------
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

export const createServiceImage = upload.single('photo');

// ----------------- RESIZE USER PHOTO ----------------
export const resizeUserPhoto = (req, res, next) => {
  if (!req.file) return next();

  // As we saved image in memory filename doesn't exist but updateMe needs it
  req.file.filename = `service-${req.service.id}.jpeg`;

  sharp(req.file.buffer)
    // .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`backend/public/img/services/${req.file.filename}`);

  next();
};

export const createService = catchAsync(async (req, res, next) => {
  const doc = await Service.create(req.body);
  res.status(201).json({
    status: 'success',
    service: doc,
  });
});
