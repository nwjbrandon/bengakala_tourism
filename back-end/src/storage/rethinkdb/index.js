import r from 'rethinkdb';
import config from '../../config';

class RethinkdbStorage {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
};
module.exports = RethinkdbStorage;
