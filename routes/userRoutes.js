// In your userRoutes.js file or similar where you define routes

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to handle POST requests for user registration
router.post('/register', userController.registerUser);

// Route to handle GET requests for user registration (if needed)
router.get('/register', (req, res) => {
  // Handle GET request logic here if required
  res.status(405).send('GET method not allowed for user registration.');
});

module.exports = router;

