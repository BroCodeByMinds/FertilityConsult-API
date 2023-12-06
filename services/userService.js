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
