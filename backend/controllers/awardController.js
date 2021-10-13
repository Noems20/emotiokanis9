import Award from '../models/awardModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';
import validator from 'validator';

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

// ----------------- RESIZE CREATED AWARD IMAGE ----------------
export const resizeAwardImage = (req, res, next) => {
  let status = 201;
  if (req.update === true) {
    status = 200;
  }
  // As we saved image in memory filename doesn't exist but update needs it
  if (req.file) {
    req.file.filename = `award-${req.doc.id}.jpg`;

    sharp(req.file.buffer)
      .withMetadata()
      .toFormat('jpg')
      .jpeg({ quality: 95 })
      .toFile(`backend/public/img/awards/${req.file.filename}`)
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

// ----------------- CREATE AWARD -----------------------
export const createAward = catchAsync(async (req, res, next) => {
  if (!req.file)
    return next(
      new AppError('A award image is required', 400, {
        image: 'Una imagen del premio es requerida',
      })
    );

  if (req.body.date && !validator.isISO8601(req.body.date)) {
    return next(
      new AppError('Date must in be in format ISO8601', 400, {
        date: 'Debe ser una fecha valida',
      })
    );
  }

  const doc = await Award.create(req.body);
  req.doc = doc;
  next();
});

// ------------ GET ALL SERVICES -----------------------
export const getAllAwards = getAll(Award);

// ------------ UPDATE SERVICE -----------------------
export const updateAward = catchAsync(async (req, res, next) => {
  const { id: docID } = req.params;
  // new: true -> Is for return the updated object and not the old

  if (req.body.date && !validator.isISO8601(req.body.date)) {
    return next(
      new AppError('Date must in be in format ISO8601', 400, {
        date: 'Debe ser una fecha valida',
      })
    );
  }

  const doc = await Award.findByIdAndUpdate(docID, req.body, {
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
export const deleteAward = catchAsync(async (req, res, next) => {
  const { id: docID } = req.params;
  const doc = await Award.findByIdAndDelete(docID);
  const filename = `award-${docID}.jpg`;

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  const path = `backend/public/img/awards/${filename}`;

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
