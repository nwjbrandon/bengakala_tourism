const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'bengkala',
  password: 'bengkala',
  database: 'bengkala',
});

connection.connect((err) => {
  if (err) throw err;
});

class DataBase {
  constructor(name) {
    this.hello = this.hello.bind(this);
    this.name = name;
  }

  hello() {
    console.log(this.name);
  }
}
export default DataBase;