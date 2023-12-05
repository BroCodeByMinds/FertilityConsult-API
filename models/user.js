// models/user.js
const db = require('../db');

class User {
  static createUser(userData) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO fertility_consult.customer (name, email, password) VALUES (?, ?, ?)';
      const values = [userData.name, userData.email, userData.password];

      db.query(sql, values, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }
}

module.exports = User;
