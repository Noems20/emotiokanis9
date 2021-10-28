import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

// Models
import User from '../models/userModel.js';

// Utils
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import Email from '../utils/email.js';
import { validateLoginData, isEmpty, isEmail } from '../utils/validators.js';

const signToken = (id) => {
  // return jwt.sign({ id:id }, process.env.JWT_SECRET, {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// ------------------ FILTER OBJECT -------------
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// ------------------------------ PUT COOKIE (LOG USER) ----------------------
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      // Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  // Put cookie in browser
  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    user,
  });
};

// --------------------- SIGN UP ---------------------------------------
export const signup = catchAsync(async (req, res) => {
  // 1) Filtered out unwanted fields names that are not allowed to be set
  const filteredBody = filterObj(
    req.body,
    'name',
    'email',
    'password',
    'passwordConfirm'
  );

  // 2) Create user
  const newUser = await User.create(filteredBody);

  // 3) Generate the random verification token
  const verificationToken = newUser.createVerificationToken();
  await newUser.save({ validateBeforeSave: false });

  // 4) Send it to user's email
  try {
    let verificationUrl;
    if (process.env.NODE_ENV === 'development') {
      verificationUrl = `${req.protocol}://localhost:3000/verificarCuenta/${verificationToken}`;
    } else {
      verificationUrl = `${req.protocol}://${req.get(
        'host'
      )}/verificarCuenta/${verificationToken}`;
    }

    await new Email(newUser, verificationUrl).sendWelcome();
  } catch (error) {
    console.log(error);
    newUser.userVerificationToken = undefined;
    await newUser.save({ validateBeforeSave: false });

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
    message: 'Token send to email',
  });

  // createSendToken(newUser, 201, res);
});

// --------------------- VERIFY ACCOUNT ------------------------------
export const verifyAccount = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    userVerificationToken: hashedToken,
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(
      new AppError('Token is invalid or has expired', 400, {
        general:
          'El token no es válido o ha caducado, por favor intenta de nuevo',
      })
    );
  }

  user.verified = true;
  user.userVerificationToken = undefined;
  await user.save({ validateBeforeSave: false });

  // 4) Log the user and send JWT to client
  createSendToken(user, 200, res);
});

// --------------------- LOG IN -----------------------------------------
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  const { errors, valid } = validateLoginData(email, password);

  if (!valid) {
    return next(
      new AppError('Please provide email and password!', 400, errors)
    );
  }

  // 2) Chek if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password))) {
    return next(
      new AppError('Incorrect email or password', 401, {
        general: 'Email o contraseña incorrectos',
      })
    );
  }

  // 3) Check if account is verified
  if (!user.verified) {
    return next(
      new AppError('Account not verified', 401, {
        general: 'Cuenta no verificada, por favor revisa tu Email',
      })
    );
  }

  // 4) If everything ok, send token to client
  createSendToken(user, 200, res);
});

// --------------------- LOG OUT -----------------------------------------
export const logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success', user: null });
};

// --------------------- PROTECT ROUTES -----------------------------------------
export const protect = catchAsync(async (req, res, next) => {
  // 1) Gettting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }
  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }
  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

// --------------------- RESTRICT ACCESS -----------------------------------------
export const restrictTo = (...roles) => {
  // We return the middleware
  return (req, res, next) => {
    // roles [admin, 'lead-guide']
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

// --------------------- CHECK IF USER IS LOGGED IN -----------------------------------------
// Only for rendered pages, no errors!
export const isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return res.status(200).json({
          user: null,
        });
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        // return next();
        return res.status(401).json({
          user: null,
        });
      }

      // THERE IS A LOGGED IN USER
      res.status(200).json({
        user: currentUser,
      });
    } catch (err) {
      // TOKEN WASN'T VALIDATED
      res.status(200).json({
        user: null,
      });
    }
  } else {
    res.status(200).json({
      user: null,
    });
  }
};

// --------------------- UPDATE PASSWORD -----------------------------------------
export const updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');
  // 1) Check if posted current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent))) {
    return next(
      new AppError('Incorrect password, please try again', 401, {
        passwordCurrent: 'Contraseña incorrecta',
      })
    );
  }
  // 1) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 1) Log user in, send JWT
  createSendToken(user, 200, res);
});

// --------------------- FORGOT PASSWORD -----------------------------------------
export const forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Check email
  if (isEmpty(req.body.email)) {
    return next(
      new AppError('Please provide email!', 400, {
        email: 'No puede estar vacio',
      })
    );
  }
  if (!isEmail(req.body.email)) {
    return next(
      new AppError('Please provide email!', 400, {
        email: 'Debe ser un email valido',
      })
    );
  }

  // 2) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });

  if (!user || user.verified === false) {
    return next(
      new AppError('There is no user with this email address.', 404, {
        email: 'No existe cuenta con este email',
      })
    );
  }

  // 3) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 4) Send it to user's email
  try {
    let resetUrl;
    if (process.env.NODE_ENV === 'development') {
      resetUrl = `${req.protocol}://localhost:3000/restablecerContraseña/${resetToken}`;
    } else {
      resetUrl = `${req.protocol}://${req.get(
        'host'
      )}/restablecerContraseña/${resetToken}`;
    }

    await new Email(user, resetUrl).sendPasswordReset();
  } catch (error) {
    console.log(error);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

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
    message: 'Token send to email',
  });
});

// --------------------- RESET PASSWORD -----------------------------------------
export const resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(
      new AppError('Token is invalid or has expired', 400, {
        general:
          'El token no es válido o ha caducado, por favor intenta de nuevo',
      })
    );
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user

  // 4) Log the user and send JWT to client
  createSendToken(user, 200, res);
});
