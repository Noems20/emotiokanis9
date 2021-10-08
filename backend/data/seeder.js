import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from '../config/db.js';

// Data
import users from './users.js';
import services from './services.js';
import awards from './awards.js';

// Model Schemas
import User from '../models/userModel.js';
import Service from '../models/serviceModel.js';
import Award from '../models/awardModel.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // await User.deleteMany();
    // await Service.deleteMany();
    await Award.deleteMany();

    // await User.create(users, { validateBeforeSave: false });
    // await Service.create(services, { validateBeforeSave: false });
    await Award.create(awards, { validateBeforeSave: false });

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // await User.deleteMany();
    // await Service.deleteMany();
    await Award.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
