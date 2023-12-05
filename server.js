// // app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./routes/userRoutes');

// Other app configurations
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define user routes
app.use('/user', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});