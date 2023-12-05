// services/userService.js
const User = require('../models/user');

exports.registerUser = async (userData) => {
  try {
    const result = await User.createUser(userData);
    return result;
  } catch (error) {
    throw new Error('Error registering user');
  }
};
