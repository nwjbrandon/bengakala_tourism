import mysql from 'mysql';
import createMySQLWrap from 'mysql-wrap';
import config from '../../config';

const getConnection = () => {
  const connection = mysql.createConnection(config.mySQL);
  return createMySQLWrap(connection);
}

class DataBase {
  constructor() {
    this.conn = getConnection();
  }

  // fectching data from database
  fetchData(TABLE, params = {}) {
    return this.conn.select(TABLE, params).then(res => res).then(r => r);
  }

  // insert data into database
  saveData(TABLE, data = []) {
    return this.conn.insert(TABLE, data).then(r => r);
  }

  // update data in database
  updateData(TABLE, data = {}, params = {}) {
    return this.conn.update(TABLE, data, params).then(r => r);
  }

  // delete data in databse
  deleteData(TABLE, params = {}) {
    return this.conn.delete(TABLE, params).then(r => r);
  }

  // testing whether database works
  testing() {
    return this.conn.select('testing').then(r => r[0].name);
  }
}
export default DataBase;
