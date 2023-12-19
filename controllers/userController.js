// controllers/userController.js
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const logger = require('../logger');

const generateToken = (user) => {
  const secretKey = process.env.JWT_SECRET_KEY; // Fetch the secret key from environment variables

  // Create a token using user information
  const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });

  return token;
};

exports.registerUser = async (req, res) => {
  logger.info(`Received data from application for registering user: ${JSON.stringify(req.body)}`);

  const { name, email, password } = req.body;

  try {
    // Call userService to register user
    const result = await userService.registerUser({ name, email, password });

    // Assuming the userService returns the registered user information
    const registeredUser = result.user;

    // Generate a token for the registered user
    const token = generateToken(registeredUser);

    // Handle successful registration along with token response
    res.status(200).json({ message: 'User registered successfully', token });
  } catch (error) {
    // Handle registration failure
    res.status(500).json({ message: 'Failed to register user', error: error.message });
  }
};

exports.checkUserRegistration = async (req, res) => {
  logger.info(`Received data from application for verification of user: ${JSON.stringify(req.body)}`);

  const { email, password } = req.body;

  try {
    // Call userService to check user registration
    const user = await userService.checkUserRegistration({ email, password });

    if (user && user.length > 0) {
      logger.info(`User verified`);

      // Assuming user is an array with user data, use user[0] to access the first user in the array
      const userData = user[0];

      // Generate a token for the registered user
      const token = generateToken(userData);

      // User is registered, respond with a token
      const response = {
        username: userData.name,
        email: userData.email,
        token: token
      };

      // User is registered, respond with status code 200 and user details along with token
      res.status(200).json(response);
    } else {
      // User is not registered
      res.status(404).json({ message: 'User is not registered' });
    }
  } catch (error) {
    // Handle error while checking user registration
    res.status(500).json({ message: 'Error checking user registration', error: error.message });
  }
};

exports.bookAppointment = async (req, res) => {
  logger.info(`Received data from application to book appointment: ${JSON.stringify(req.body)}`);

  const { name, email, token, selectedService } = req.body;

  try {
    // Call the userService to book the appointment
    const appointmentResult = await userService.bookAppointment({ name, email, selectedService });

    // Check if the appointment booking was successful
    if (appointmentResult) {
      logger.info(`Appointment booked successfully`);

      // Respond with a success message or relevant data
      res.status(200).json({ message: 'Appointment booked successfully' });
    } else {
      // Handle failed appointment booking
      res.status(400).json({ message: 'Failed to book appointment' });
    }
  } catch (error) {
    // Handle error while booking appointment
    res.status(500).json({ message: 'Error booking appointment', error: error.message });
  }
};
