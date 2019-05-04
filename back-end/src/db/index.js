const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'newuser',
  password : 'password',
  database : 'test'
});

connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;
