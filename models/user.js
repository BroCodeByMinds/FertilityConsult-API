// models/user.js
const db = require('../db');
const logger = require('../logger');

class User {
  static createUser(userData) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO fertility_consult.customer (name, email, password) VALUES (?, ?, ?)';
      const values = [userData.name, userData.email, userData.password];
      
      logger.info(`create user SQL : ${sql} and values : ${values}`)

      db.query(sql, values, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  static checkUserRegistration(userData) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM fertility_consult.customer WHERE email = ? AND password = ?';
      const values = [userData.email, userData.password];
  
      logger.info(`check user SQL : ${sql} and values : ${JSON.stringify(values)}`);
  
      db.query(sql, values, (err, result) => {
        if (err) {
          logger.error(`checkUserRegistration error: ${err}`);
          reject(err);
          return;
        }
  
        if (result.length > 0) {
          logger.info(`User found in DB. Row count: ${result.length}`);
          result.forEach((row, index) => {
            logger.info(`Row ${index + 1}: ${JSON.stringify(row)}`);
          });
  
          // If user data is found, send the user data instead of just true
          resolve(result); // Sending the user data array
        } else {
          logger.info('User not found in DB.');
          resolve(result);
        }
      });
    });
  }
  
}

module.exports = User