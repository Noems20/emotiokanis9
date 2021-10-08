import mongoose from 'mongoose';
import validator from 'validator';

const awardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'No puede estar vacío'],
    maxlength: [60, 'Necesita ser menor a 36 caracteres'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'No puede estar vacío'],
    trim: true,
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
