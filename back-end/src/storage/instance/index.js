import mysql from 'mysql';
import createMySQLWrap from 'mysql-wrap';
import config from '../../config';
import { JSON_BEAUTIFY } from '../../utils/parser';

const getConnection = () => {
  const connection = mysql.createPool(config.mySQL);
  return createMySQLWrap(connection);
};

class DataBase {
  constructor() {
    this.conn = getConnection();
    this.fetchData = this.fetchData.bind(this);
    this.saveData = this.saveData.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  // fectching utils from database
  async fetchData(TABLE, params = {}) {
    return this.conn.select(TABLE, params).then(res => res).then(r => JSON_BEAUTIFY(r));
  }

  // insert utils into database
  async saveData(TABLE, data = []) {
    return this.conn.insert(TABLE, data).then(r => r);
  }

  // update utils in database
  async updateData(TABLE, data = {}, params = {}) {
    return this.conn.update(TABLE, data, params).then(r => r);
  }

  // delete utils in databse
  async deleteData(TABLE, params = {}) {
    return this.conn.delete(TABLE, params).then(r => r);
  }
}
export default DataBase;
