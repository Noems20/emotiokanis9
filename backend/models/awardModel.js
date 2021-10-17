import mongoose from 'mongoose';
import validator from 'validator';

const awardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'No puede estar vacío'],
    maxlength: [60, 'Necesita ser menor a 36 caracteres'],
    trim: true,
    validate: {
      validator: function (value) {
        return validator.isAlphanumeric(value.split(' ').join(''), 'es-ES');
      },
      message: 'Solo puede contener caracteres y números',
    },
  },
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
  date: {
    type: Date,
    required: [true, 'No puede estar vacío'],
  },
  image: {
    type: String,
  },
});

// --------------- ADD SERVICE IMAGE -----------------
awardSchema.pre('save', async function (next) {
  let image = `award-${this.id}.jpg`;
  this.image = image;
  next();
});

const Award = mongoose.model('Award', awardSchema);

export default Award;
