import mongoose from 'mongoose';
import validator from 'validator';

const appointmentSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, 'No puede estar vacío'],
      trim: true,
      validate: {
        validator: function (value) {
          return validator.isAlphanumeric(value.split(' ').join(''), 'es-ES', {
            ignore: ',.!¡¿?"()',
          });
        },
        message: 'Solo puede contener caracteres y números',
      },
    },
    active: {
      type: Boolean,
      default: true,
    },
    date: {
      type: Date,
      required: [true, 'No puede estar vacío'],
    },
    service: {
      type: mongoose.Schema.ObjectId,
      ref: 'Service',
      required: [true, 'Una cita debe pertenecer a un servicio'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Una cita debe pertenecer a un usuario'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// --------------------------------------- MIDDLEWARE -----------------------------------------------

// appointmentSchema.index(
//   { user: 1 },
//   {
//     unique: true,
//   }
// );

// --------------- POPULATE APPOINTMENT -----------------
appointmentSchema.pre(/^find/, function (next) {
  this.populate('service', 'name image');
  this.populate('user', 'name photo');
  next();
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
