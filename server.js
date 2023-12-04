const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint to handle user registration
app.post('/register', (req, res) => {
  const { name, email, password } = req.body; // Assuming registration data is sent in the request body

  // Handle the registration logic here (e.g., store data in the database)
  // For demonstration, let's log the received data
  console.log('Received registration data:');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Password:', password);

  // Send a response back to the client
  res.status(200).json({ message: 'Registration successful' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});