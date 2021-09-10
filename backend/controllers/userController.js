import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';

export const getAllUsers = async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    results: users.length,
    users,
  });
};
