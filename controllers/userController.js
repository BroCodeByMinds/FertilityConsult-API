// controllers/userController.js
const userService = require('../services/userService');

exports.registerUser = async (req, res) => {
  console.log(req.body); // Log the entire request body

  const { name, email, password } = req.body; // Assuming data is sent in the request body

  try {
    // Call userService to register user
    const result = await userService.registerUser({ name, email, password });
    
    // Handle successful registration
    res.status(200).json({ message: 'User registered successfully', result });
  } catch (error) {
    // Handle registration failure
    res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
};
