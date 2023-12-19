// userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to handle POST requests for user registration
router.post('/register', userController.registerUser);

// Route to check user registration
router.post('/checkUserRegistration', userController.checkUserRegistration);

// Route to handle booking appointments
router.post('/bookAppointment', userController.bookAppointment); // Using the bookAppointment controller function here

module.exports = router;