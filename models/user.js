// models/user.js
const db = require('../db');
const logger = require('../logger');

class User {
  static createUser(userData) {
    return new Promise((resolve, reject) => {
      const checkEmailSql = 'SELECT * FROM fertility_consult.customers WHERE email = ?';
      const checkEmailValues = [userData.email];
  
      db.query(checkEmailSql, checkEmailValues, (checkEmailErr, checkEmailResult) => {
        if (checkEmailErr) {
          reject(checkEmailErr);
          return;
        }
  
        if (checkEmailResult.length > 0) {
          // Email already exists in the database
          resolve({ message: 'Customer already exists' });
          return;
        }
  
        // Email doesn't exist, proceed to create a new user
        const createUserSql = 'INSERT INTO fertility_consult.customers (name, email, password) VALUES (?, ?, ?)';
        const createUserValues = [userData.name, userData.email, userData.password];
  
        db.query(createUserSql, createUserValues, (createUserErr, createUserResult) => {
          if (createUserErr) {
            reject(createUserErr);
            return;
          }
          resolve({ message: 'User created successfully' });
        });
      });
    });
  }

  static checkUserRegistration(userData) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM fertility_consult.customers WHERE email = ? AND password = ?';
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

  static bookAppointment(appointmentData) {
    return new Promise((resolve, reject) => {
      // Get customer_id based on email
      const selectCustomerIdSql = 'SELECT customer_id FROM fertility_consult.customers WHERE email = ?';
      const selectCustomerIdValues = [appointmentData.email];
  
      db.query(selectCustomerIdSql, selectCustomerIdValues, (selectErr, selectResult) => {
        if (selectErr) {
          reject(selectErr); // Reject on select error
          return;
        }
  
        if (selectResult.length === 0) {
          reject({ message: 'Customer not found' }); // Reject if customer not found
          return;
        }
  
        const customer_id = selectResult[0].customer_id;
  
        // Get service_id based on service name
        const selectServiceIdSql = 'SELECT service_id FROM fertility_consult.services WHERE service_name = ?';
        const selectServiceIdValues = [appointmentData.selectedService];
  
        db.query(selectServiceIdSql, selectServiceIdValues, (serviceErr, serviceResult) => {
          if (serviceErr) {
            reject(serviceErr); // Reject on service query error
            return;
          }
  
          if (serviceResult.length === 0) {
            reject({ message: 'Service not found' }); // Reject if service not found
            return;
          }
  
          const service_id = serviceResult[0].service_id;
  
          // Insert appointment
          const today = new Date().toISOString().split('T')[0]; // Get today's date
  
          const insertAppointmentSql = 'INSERT INTO fertility_consult.appointments (customer_id, service_id, service_name, appointment_date) VALUES (?, ?, ?, ?)';
          const insertAppointmentValues = [customer_id, service_id, appointmentData.selectedService, today];
  
          db.query(insertAppointmentSql, insertAppointmentValues, (insertErr, insertResult) => {
            if (insertErr) {
              console.error('Error inserting appointment:', insertErr);
              reject(insertErr); // Reject on appointment insertion error
              return;
            }
            resolve({ message: 'Appointment booked successfully' }); // Resolve on successful appointment booking
          });
        });
      });
    });
  }
}  

module.exports = User