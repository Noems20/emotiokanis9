import Service from '../models/serviceModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';

// HANDLER FACTORY
import { getAll } from './handlerFactory.js';

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

export const uploadImage = upload.single('image');

// ----------------- RESIZE CREATED SERVICE IMAGE ----------------
export const resizeServiceImage = (req, res, next) => {
  let status = 201;
  if (req.update === true) {
    status = 200;
  }
  // As we saved image in memory filename doesn't exist but update needs it
  if (req.file) {
    req.file.filename = `service-${req.doc.id}.jpg`;

    sharp(req.file.buffer)
      .resize(1920, 1200)
      .withMetadata()
      .toFormat('jpg')
      .jpeg({ quality: 90 })
      .toFile(`backend/public/img/services/${req.file.filename}`)
      .then(() => {
        return res.status(status).json({
          status: 'success',
          data: req.doc,
        });
      });
  } else {
    res.status(status).json({
      status: 'success',
      data: req.doc,
    });
  }
};

// ----------------- CREATE SERVICE -----------------------
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

// ------------ GET ALL SERVICES -----------------------
export const getAllServices = getAll(Service);

// ------------ UPDATE SERVICE -----------------------
export const updateService = catchAsync(async (req, res, next) => {
  const { id: docID } = req.params;
  // new: true -> Is for return the updated object and not the old
  const doc = await Service.findByIdAndUpdate(docID, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError('No doc found with that ID', 404));
  }

  req.doc = doc;
  req.update = true;
  next();
});

// ------------ DELETE SERVICE -----------------------
export const deleteService = catchAsync(async (req, res, next) => {
  const { id: docID } = req.params;
  const doc = await Service.findByIdAndDelete(docID);
  const filename = `service-${docID}.jpg`;

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  const path = `backend/public/img/services/${filename}`;

  const deleteImage = () => {
    fs.unlink(path, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  };

  // // Current date and time
  // let now = new Date();

  // // Time where we want to delete data (Takes the time of the current day)
  // let deleteHour = new Date(
  //   now.getFullYear(),
  //   now.getMonth(),
  //   now.getDate(),
  //   4,
  //   0,
  //   0,
  //   0
  // );

  // // Milliseconds till that desired hour
  // let millisTill4 = deleteHour - now;

  // // If that hour already passed we select the same hour of the next day
  // if (millisTill4 < 0) {
  //   deleteHour.setDate(deleteHour.getDate() + 1);
  //   millisTill4 = deleteHour - now;
  // }

  // // Delete image at desired hour
  // setTimeout(deleteImage, millisTill4);

  deleteImage();

  res.status(204).json({ status: 'success', data: null });
});
