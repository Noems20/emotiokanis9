import mongoose from 'mongoose';
import validator from 'validator';

const serviceSchema = new mongoose.Schema({
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
  description: {
    type: String,
    required: [true, 'No puede estar vacío'],
    trim: true,
  },
  priceLapse: {
    type: String,
    default: null,
    trim: true,
  },
  price: {
    type: String,
    required: [true, 'No puede estar vacío'],
    trim: true,
  },
  image: {
    type: String,
  },
});

// --------------- ADD SERVICE IMAGE -----------------
serviceSchema.pre('save', async function (next) {
  let image = `service-${this.id}`;
  this.image = image;
  next();
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
