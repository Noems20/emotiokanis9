import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// Validators run in: findByIdAndUpdate, create, save

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'No puede estar vacío'],
    trim: true,
    minlength: [3, 'Necesita ser mayor a 2 caracteres'],
    maxlength: [35, 'Necesita ser menor a 36 caracteres'],
    validate: {
      validator: function (value) {
        return validator.isAlpha(value.split(' ').join(''), 'es-ES');
      },
      message: 'Solo debe contener caracteres',
    },
  },
  email: {
    type: String,
    required: [true, 'No puede estar vacío'],
    unique: true,
    validate: [validator.isEmail, 'Debe ser un email valido'],
  },
  photo: { type: String, default: 'default.jpg' },
  role: {
    type: String,
    enum: ['user', 'employee', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'No puede estar vacío'],
    minLength: [8, 'Debe ser mayor a 7 caracteres'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'No puede estar vacío'],
    validate: {
      // Only works with CREATE and SAVE
      validator: function (el) {
        return el === this.password;
      },
      message: 'Las contraseñas no coinciden',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// --------------------------------------- MIDDLEWARE -----------------------------------------------

// --------------- ENCRYPT PASSWORD -----------------
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Encrypt-hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm Field
  this.passwordConfirm = undefined;
  next();
});

// --------------- CHECK ROLE -----------------
userSchema.pre('save', async function (next) {
  if (!this.isModified('role')) return next();
  this.role = 'user';

  next();
});

// ------------ CHANGE PASSWORD changedAt ------
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// --------------------------------------- METHODS -----------------------------------------------

// --------------- CHECK PASSWORD -----------------
userSchema.methods.correctPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// --------------- CHECK IF PASSWORD WAS CHANGED -----------------
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = this.passwordChangedAt.getTime() / 1000;

    return JWTTimestamp < changedTimestamp;
  }

  // False mean NOT changed
  return false;
};
// --------------- CREATE PASSWORD RESET TOKEN -----------------
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

export default User;
