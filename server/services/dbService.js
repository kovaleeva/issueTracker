const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pass2sql',
  database: 'issue_tracker',
});

const test = query => new Promise((resolve, reject) => {
  connection.query(query, (error, results) => {
    if (error) {
      return reject(error);
    }
    return resolve(results);
  });
});

module.exports = test;
