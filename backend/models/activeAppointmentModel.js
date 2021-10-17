import mongoose from 'mongoose';

const activeAppointmentSchema = new mongoose.Schema(
  {
    appointment: {
      type: mongoose.Schema.ObjectId,
      ref: 'Appointment',
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

activeAppointmentSchema.index(
  { user: 1 },
  {
    unique: true,
  }
);

// --------------- POPULATE APPOINTMENT -----------------
activeAppointmentSchema.pre(/^find/, function (next) {
  this.populate('appointment', 'user service date description');
  this.populate('user', 'name photo');
  next();
});

const activeAppointment = mongoose.model(
  'activeAppointment',
  activeAppointmentSchema
);

export default activeAppointment;
