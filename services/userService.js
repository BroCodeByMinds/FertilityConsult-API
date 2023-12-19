const logger = require('../logger');
const User = require('../models/user');

exports.registerUser = async (userData) => {
  try 
  {
    const result = await User.createUser(userData);

    logger.info(`user registration result  : ${result}`)
    
    return result;
  } 
  catch (error) 
  {
    logger.error(`checkUserRegistration : ${error}`)
    throw new Error('Error registering user');
  }
};

exports.checkUserRegistration = async (userData) => {
  try 
  {
    const result = await User.checkUserRegistration(userData);

    logger.info(`user registration verification result  : ${result}`)

    return result;

  } 
  catch (error) 
  {
    logger.error(`checkUserRegistration : ${error}`)
    throw new Error('Error checking user registration');
  }
};

// Assuming you have a 'User' model imported and used here

exports.bookAppointment = async (appointmentData) => {
  try {
    // Perform the logic to book an appointment using the appointment data received
    // Here, 'appointmentData' contains details like name, email, selectedService, etc.

    // For instance, you might have a User model method to book an appointment
    const appointmentResult = await User.bookAppointment(appointmentData);

    // Assuming 'bookAppointment' method returns a boolean or an appropriate result

    return appointmentResult; // Return the result of the appointment booking
  } catch (error) {
    logger.error(`Error booking appointment: ${error}`);
    throw new Error('Error booking appointment');
  }
};

