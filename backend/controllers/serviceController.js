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
        image: 'Por favor selecciona una imagen',
      }),
      false
    );
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export const createServiceImage = upload.single('image');

// ----------------- RESIZE SERVICE IMAGE ----------------
export const resizeServiceImage = (req, res, next) => {
  // As we saved image in memory filename doesn't exist but updateMe needs it
  req.file.filename = `service-${req.doc.id}.jpeg`;

  sharp(req.file.buffer)
    .resize(1920, 1200)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`backend/public/img/services/${req.file.filename}`);

  res.status(201).json({
    status: 'success',
    service: req.doc,
  });
};

export const createService = catchAsync(async (req, res, next) => {
  if (!req.file)
    return next(
      new AppError('A service image is required', 400, {
        image: 'Una imagen del servicio es requerida',
      })
    );
  const doc = await Service.create(req.body);
  req.doc = doc;
  next();
});
