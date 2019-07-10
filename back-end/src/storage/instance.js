import mysql from 'mysql';
import createMySQLWrap from 'mysql-wrap';
import _ from 'lodash';
import config from '../config';
import { JSON_BEAUTIFY } from '../utils/parser';

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
    this.uuidExist = this.uuidExist.bind(this);
    this.filterFieldList = this.filterFieldList.bind(this);
    this.changeListData = this.changeListData.bind(this);
  }

  // fectching utils from database
  async fetchData(TABLE, params = {}) {
    return this.conn.select(TABLE, params)
      .then(res => res)
      .then(r => JSON_BEAUTIFY(r));
  }

  // insert utils into database
  async saveData(TABLE, data = []) {
    return this.conn.insert(TABLE, data)
      .then(r => r);
  }

  // update utils in database
  async updateData(TABLE, data = {}, params = {}) {
    return this.conn.update(TABLE, data, params)
      .then(r => r);
  }

  // delete utils in databse
  async deleteData(TABLE, params = {}) {
    return this.conn.delete(TABLE, params)
      .then(r => r);
  }

  // check whether uuid exist
  async uuidExist(TABLE, uuid) {
    return this.fetchData(TABLE, { uuid })
      .then(res => res.length === 1);
  }

  // fetch utils and filter a field
  async filterFieldList(TABLE, params, field) {
    return this.fetchData(TABLE, params)
      .then(res => _.map(res, obj => obj[field]));
  }

  // update list of utils
  async changeListData(TABLE, { updateList = [], saveList = [], deleteList = [] }) {
    return await this.conn.beginTransaction()
      .then(async () => await Promise.all([
        _.map(deleteList, deleteItem => this.deleteData(TABLE, deleteItem)),
        _.map(updateList, updateItem => this.updateData(TABLE, updateItem.data, updateItem.params)),
        _.map(saveList, saveItem => this.saveData(TABLE, saveItem)),
      ]))
      .then(async () => {
        await this.conn.commit();
      })
      .catch(async (err) => await this.conn.rollback(() => {
        throw err;
      }));
  }
}
export default DataBase;
